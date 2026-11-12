#!/usr/bin/env python3
"""Fetch the official JUPAS 2027 programme list and write src/data/jupas-2027-official.json.

The score rows come from the app core (sync-app-data.py), which still carries the
2026 programme names. This file only adds what JUPAS publishes for the 2027 cycle:
the official Chinese / English names, which codes are no longer offered, and which
codes are new. Pages show the 2027 name and keep the 2026 name next to the scores
that were published under it.

Usage:
  python3 scripts/sync-jupas-2027-official.py               # fetch all pages
  python3 scripts/sync-jupas-2027-official.py --cache DIR   # reuse/keep raw HTML in DIR
"""
import argparse
import datetime as dt
import html
import json
import re
import subprocess
import tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'src/data/jupas-2027-official.json'
SNAPSHOT = ROOT / 'src/data/app-admissions.json'
BASE = 'https://www.jupas.edu.hk'
# JUPAS institution slugs in /en/programme/<slug>/ (SSSDP codes sit under the institutions too).
SLUGS = ['cityuhk', 'cuhk', 'eduhk', 'hkbu', 'hkmu', 'hku', 'hkust', 'lingnanu', 'polyu', 'sssdp']
# Codes JUPAS split into new codes for 2027 (from each new programme's official page).
SUCCESSORS = {'JS2060': ['JS2030', 'JS2050'], 'JS3011': ['JS3923', 'JS3997']}


def fetch(url, dest):
    if dest.exists() and dest.stat().st_size > 5000:
        return dest.read_text(encoding='utf-8', errors='ignore')
    for _ in range(3):
        subprocess.run(['curl', '-sL', '--max-time', '25', '-A', 'Mozilla/5.0', '-o', str(dest), url], check=False)
        if dest.exists() and dest.stat().st_size > 5000:
            return dest.read_text(encoding='utf-8', errors='ignore')
    raise SystemExit(f'Could not fetch {url}')


def text(s):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', s))).strip()


def core(name):
    """Name without provider prefix, feature/stream notes and punctuation, for rename detection."""
    s = re.sub(r'^由.+?開辦[：:]\s*', '', name)
    for a, b in {'（': '(', '）': ')', '［': '[', '］': ']', '／': '/', '：': ':', '，': ',', '、': ',', '－': '-', '–': '-'}.items():
        s = s.replace(a, b)
    s = re.sub(r'\((?:[^()]*(?:特點|專修|課程特色|可選專修|雙學位|特色)[^()]*)\)', '', s)
    s = re.sub(r'\[(?:選項|主修)[^\]]*\]', '', s)
    s = re.sub(r'(學系|雙學位課程)', '', s)
    return re.sub(r'[\s()\[\]/,:\-．･・]', '', s)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--cache')
    args = ap.parse_args()
    cache = Path(args.cache) if args.cache else Path(tempfile.mkdtemp())
    (cache / 'det').mkdir(parents=True, exist_ok=True)

    codes = {}
    for slug in SLUGS:
        raw = fetch(f'{BASE}/en/programme/{slug}/', cache / f'L_{slug}.html')
        for m in re.finditer(r'/en/programme/([a-z]+)/(JS[0-9A-Z]{4})', raw):
            codes[m.group(2)] = m.group(1)
    if len(codes) < 400:
        raise SystemExit(f'Only {len(codes)} codes found; JUPAS markup may have changed')

    def detail(item):
        code, slug = item
        raw = fetch(f'{BASE}/tc/programme/{slug}/{code}/', cache / 'det' / f'{code}.html')
        m = re.search(r'class="programCode_block">(JS\w+)</p>(.*?)<h2', raw, re.S)
        if not m or m.group(1) != code:
            raise SystemExit(f'{code}: title block not found')
        en = re.search(r'class="before_label">(.*?)</span>', m.group(2), re.S)
        zh = re.search(r'class="program_title_cn">(.*?)</span>', m.group(2), re.S)
        return code, {'zh': text(zh.group(1)) if zh else '', 'en': text(en.group(1)) if en else ''}

    with ThreadPoolExecutor(4) as ex:
        official = dict(ex.map(detail, sorted(codes.items())))

    ours = {p['js_code']: p for p in json.loads(SNAPSHOT.read_text())['programmes']}
    programmes = {}
    for code, o in sorted(official.items()):
        display = re.sub(r'^由.+?開辦[：:]\s*', '', o['zh']).strip()
        entry = {'title': display, 'title_en': o['en']}
        if code in ours and core(ours[code]['title']) != core(display):
            entry['renamed_from'] = ours[code]['title']
        programmes[code] = entry
    not_offered = {c: {'successors': SUCCESSORS.get(c, [])} for c in sorted(set(ours) - set(official))}
    out = {
        'source': f'{BASE}/tc/programmes-offered',
        'changes': f'{BASE}/tc/programmes-offered/programme-changes',
        'fetchedAt': dt.date.today().isoformat(),
        'programmes': programmes,
        'notOffered2027': not_offered,
        'newIn2027': sorted(set(official) - set(ours)),
    }
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=1) + '\n')
    renamed = sum('renamed_from' in v for v in programmes.values())
    print(f'{len(programmes)} official 2027 programmes; {renamed} renamed; not offered {list(not_offered)}; new {out["newIn2027"]}')


if __name__ == '__main__':
    main()
