#!/usr/bin/env python3
"""Read final HTML (without JS) and compare every rendered score with the app projection."""
from html.parser import HTMLParser
import re
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

class Page(HTMLParser):
    def __init__(self, raw, table_id='scores-table'):
        super().__init__()
        self.rows, self.row, self.cell, self.in_table = {}, None, None, False
        self.table_id, self.score_kind = table_id, None
        self.in_score_value, self.score_value = False, ''
        self.h1_count, self.canonical, self.links = 0, None, []
        self.feed(raw)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == 'h1': self.h1_count += 1
        if tag == 'link' and attrs.get('rel') == 'canonical': self.canonical = attrs['href']
        if tag == 'a':
            self.links.append(attrs.get('href', ''))
            if self.row is not None: self.row['links'].append(attrs.get('href', ''))
        if tag == 'table' and attrs.get('id') == self.table_id: self.in_table = True
        if self.in_table and tag == 'tr' and attrs.get('id'):
            self.row = {'cells': [], 'text': '', 'links': [], 'scores': {}, 'year': attrs.get('data-year'), 'programme': attrs.get('data-programme')}
            self.rows[attrs['id'].upper()] = self.row
        if self.row is not None and tag == 'td':
            self.cell = ''
            self.score_kind = attrs.get('data-score')
        if tag == 'strong' and self.score_kind:
            self.in_score_value, self.score_value = True, ''

    def handle_data(self, data):
        if self.row is not None: self.row['text'] += data
        if self.cell is not None: self.cell += data
        if self.in_score_value: self.score_value += data

    def handle_endtag(self, tag):
        if tag == 'td' and self.cell is not None:
            self.row['cells'].append(self.cell.strip())
            self.cell = None
            self.score_kind = None
        if tag == 'strong' and self.in_score_value:
            value = self.score_value.strip().replace(',', '')
            self.row['scores'][self.score_kind] = None if value == '—' else float(value)
            self.in_score_value = False
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
    mean_only = p.get('median') is None and p.get('mean') is not None
    return [('mean', p['actual_2026_mean']) if p.get('actual_2026_mean') is not None else p.get('actual_2026_median'),
            ('quartiles', p.get('actual_2026_lq'), p.get('actual_2026_uq')) if p.get('actual_2026_uq') is not None else p.get('actual_2026_lq'),
            ('mean', p['mean']) if m25 is None and p.get('mean') is not None else m25,
            l25, ('mean', p['median_2024']) if mean_only and p.get('median_2024') is not None else p['median_2024'],
            ('mean', p['median_2023']) if mean_only and p.get('median_2023') is not None else p['median_2023']]


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
            elif isinstance(want, tuple):
                if want[0] == 'mean':
                    assert '平均分' in cell, (code, cell)
                    assert abs(float(cell.split('（')[0].replace(',', '')) - want[1]) < 1e-8, (code, cell)
                else:
                    assert 'UQ' in cell, (code, cell)
                    values = [float(v) for v in re.findall(r'\d+(?:\.\d+)?', cell.replace(',', ''))]
                    assert values == [float(v) for v in want[1:] if v is not None], (code, cell, want)
            else: assert abs(float(cell.replace(',', '')) - want) < 1e-8, (code, cell)
        if p.get('actual_2026_note') or p.get('data_remark'): assert (p.get('actual_2026_note') or p['data_remark']) in row['text'], f'{code} lost original caveat'
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
hub_raw = (ROOT / 'dist/universities/index.html').read_text()
hub = Page(hub_raw, table_id='quick-scores-table')
assert hub.h1_count == 1 and hub.canonical == 'https://www.jupascalculator.app/universities/'
assert 'JUPAS 收分 2026' in hub_raw
by_code = {p['js_code']: p for p in snapshot['programmes']}
assert {row['programme'] for row in hub.rows.values()} == set(by_code), 'The hub must list every programme without JavaScript'
assert len(hub.rows) == len(by_code), 'A programme is repeated in the hub'
for row in hub.rows.values():
    code = row['programme']
    p = by_code[code]
    if any(p.get('actual_2026_' + metric) is not None for metric in ['median', 'mean', 'lq', 'uq']):
        year, median, lq = 2026, p.get('actual_2026_median'), p.get('actual_2026_lq')
    elif any(value is not None for value in [p.get('uq'), *expected_cells(p)[2:4]]):
        year = 2025
        median = p['median'] if p.get('actual_2026_prior_reference_is_2025') is not False else None
        lq = p['lq'] if p.get('actual_2026_prior_reference_is_2025') is not False else None
    else:
        year = next((y for y in [2024, 2023] if any(p.get(f'{key}_{y}') is not None for key in ['uq', 'median', 'lq'])), None)
        median = p.get(f'median_{year}') if year else None
        lq = p.get(f'lq_{year}') if year else None
    assert row['year'] == (str(year) if year else 'none'), code
    assert p['title'] in row['text'], code
    mean = p.get('actual_2026_mean') if year == 2026 else p.get('mean') if year == 2025 and median is None else None
    assert row['scores'] == {'reference': median if median is not None else mean, 'lq': lq}, f'{code}: hub shows wrong year or score'
    if year == 2026 and p.get('actual_2026_formula_year') == 2027:
        assert '按 2027 公式重算' in row['text'], code
    if mean is not None:
        assert '平均分' in row['text'], code
    if year == 2026:
        assert p['actual_2026_source'] in row['links'], f'{code}: official source lost'
    elif year:
        assert '未有 2026 數字' in row['text'], f'{code}: historical year must be explicit'
    if year == 2025 and median is None and p.get('mean') is not None:
        assert '只公布平均分' in row['text'], f'{code}: mean must not become median'
    slug = next(s for s, names in SCHOOLS.items() if p['institution'] in names)
    assert f'/universities/{slug}/{code.lower()}/' in row['links'], f'{code}: programme link lost'
    if year == 2026 and p.get('actual_2026_comparable_to_calculator') is False and p.get('actual_2026_requires_engine') != 'cityu_2027':
        assert '公布數字與 App 計分參考分開列示' in row['text'], f'{code}: formula change caveat lost'
assert '/universities/' in home.links
blog = Page((ROOT / 'dist/blog/jupas-admission-scores-2026/index.html').read_text())
assert '/universities/' in blog.links, 'Keep the explainer linked to the score hub'
print(f'Hub: all {len(hub.rows)} programmes, correct latest years/scores, mean labels, sources and entry links PASS')
print(f'PASS: {total} programme rows and pages; sitemap and homepage links present.')
