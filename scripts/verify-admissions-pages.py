#!/usr/bin/env python3
"""Read final HTML (without JS) and compare every rendered score with the app projection."""
from html.parser import HTMLParser
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

class Page(HTMLParser):
    def __init__(self, raw):
        super().__init__()
        self.rows, self.row, self.cell, self.in_table = {}, None, None, False
        self.h1_count, self.canonical, self.links = 0, None, []
        self.feed(raw)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == 'h1': self.h1_count += 1
        if tag == 'link' and attrs.get('rel') == 'canonical': self.canonical = attrs['href']
        if tag == 'a': self.links.append(attrs.get('href', ''))
        if tag == 'table' and attrs.get('id') == 'scores-table': self.in_table = True
        if self.in_table and tag == 'tr' and attrs.get('id'):
            self.row = {'cells': [], 'text': ''}
            self.rows[attrs['id'].upper()] = self.row
        if self.row is not None and tag == 'td': self.cell = ''

    def handle_data(self, data):
        if self.row is not None: self.row['text'] += data
        if self.cell is not None: self.cell += data

    def handle_endtag(self, tag):
        if tag == 'td' and self.cell is not None:
            self.row['cells'].append(self.cell.strip())
            self.cell = None
        if tag == 'tr': self.row = None
        if tag == 'table': self.in_table = False

snapshot = json.loads((ROOT / 'src/data/app-admissions.json').read_text())
total = 0
for school in ['HKU', 'CUHK']:
    raw = (ROOT / f'dist/universities/{school.lower()}/index.html').read_text()
    assert '\0' not in raw
    page = Page(raw)
    expected = {p['js_code']: p for p in snapshot['programmes'] if p['institution'] == school}
    assert set(page.rows) == set(expected), 'Rendered programme coverage differs'
    assert page.h1_count == 1
    assert page.canonical == f'https://www.jupascalculator.app/universities/{school.lower()}/'
    assert '/universities/' in page.links
    for code, p in expected.items():
        row = page.rows[code]
        assert p['title'] in row['text'], code
        for cell, field in zip(row['cells'], ['median', 'lq', 'uq', 'median_2024', 'median_2023'], strict=True):
            if p[field] is None: assert cell == '—', (code, field, cell)
            else: assert abs(float(cell.replace(',', '')) - p[field]) < 1e-8, (code, field, cell)
        if p.get('data_remark'): assert p['data_remark'] in row['text'], f'{code} lost original caveat'
        total += 1
    assert 'noindex' not in raw
    if school == 'CUHK': assert 'astro-island' not in raw, 'CUHK article should not need React hydration'
    print(f'{school}: {len(expected)} full HTML rows, exact scores, caveats, canonical and one H1 PASS')
sitemap = (ROOT / 'dist/sitemap-0.xml').read_text()
for path in ['universities/', 'universities/hku/', 'universities/cuhk/']:
    assert f'https://www.jupascalculator.app/{path}' in sitemap, path
home = Page((ROOT / 'dist/index.html').read_text())
assert '/universities/hku/' in home.links and '/universities/cuhk/' in home.links
print(f'PASS: {total} programme rows / {total * 5} score cells; sitemap and homepage links present.')
