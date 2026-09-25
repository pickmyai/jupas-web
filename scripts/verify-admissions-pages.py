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
SCHOOLS = {'hku': ['HKU'], 'cuhk': ['CUHK'], 'hkust': ['HKUST'], 'polyu': ['PolyU'], 'cityu': ['CityU'],
           'hkbu': ['HKBU'], 'lingu': ['LingU'], 'eduhk': ['EdUHK'], 'hkmu': ['HKMU', '都會大學'],
           'sssdp': ['THEi', '東華學院', '聖方濟各大學', '恒生大學', '伍倫貢學院', '樹仁大學', '珠海學院']}

def expected_cells(p):
    prior = p.get('actual_2026_prior_reference_is_2025') is not False
    m25 = p['median'] if prior else None
    l25 = p['lq'] if prior else None
    return [p.get('actual_2026_median'), p.get('actual_2026_lq'),
            ('mean', p['mean']) if m25 is None and p.get('mean') is not None else m25,
            l25, p['median_2024'], p['median_2023']]

total = 0
covered = set()
for slug, names in SCHOOLS.items():
    raw = (ROOT / f'dist/universities/{slug}/index.html').read_text()
    assert '\0' not in raw
    page = Page(raw)
    expected = {p['js_code']: p for p in snapshot['programmes'] if p['institution'] in names}
    assert set(page.rows) == set(expected), f'{slug}: rendered programme coverage differs'
    assert page.h1_count == 1
    assert page.canonical == f'https://www.jupascalculator.app/universities/{slug}/'
    assert '/universities/' in page.links
    for code, p in expected.items():
        row = page.rows[code]
        assert p['title'] in row['text'], code
        for cell, want in zip(row['cells'], expected_cells(p), strict=True):
            if want is None: assert cell == '—', (code, cell)
            elif isinstance(want, tuple): assert abs(float(cell.rstrip('*')) - want[1]) < 1e-8, (code, cell)
            else: assert abs(float(cell.replace(',', '')) - want) < 1e-8, (code, cell)
        if p.get('data_remark'): assert p['data_remark'] in row['text'], f'{code} lost original caveat'
        detail = ROOT / f'dist/universities/{slug}/{code.lower()}/index.html'
        assert detail.exists(), f'{code}: programme page missing'
        dpage = Page(detail.read_text())
        assert dpage.h1_count == 1 and dpage.canonical == f'https://www.jupascalculator.app/universities/{slug}/{code.lower()}/', code
        covered.add(code)
        total += 1
    assert 'noindex' not in raw
    if slug == 'cuhk': assert 'astro-island' not in raw, 'CUHK article should not need React hydration'
    print(f'{slug}: {len(expected)} rows + programme pages PASS')
assert covered == {p['js_code'] for p in snapshot['programmes']}, 'Some programmes have no institution page'
sitemap = (ROOT / 'dist/sitemap-0.xml').read_text()
for code in covered:
    p = next(x for x in snapshot['programmes'] if x['js_code'] == code)
    slug = next(s for s, n in SCHOOLS.items() if p['institution'] in n)
    assert f'https://www.jupascalculator.app/universities/{slug}/{code.lower()}/' in sitemap, code
home = Page((ROOT / 'dist/index.html').read_text())
assert '/universities/hku/' in home.links and '/universities/cuhk/' in home.links
print(f'PASS: {total} programme rows and pages; sitemap and homepage links present.')
