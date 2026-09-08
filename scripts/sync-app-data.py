#!/usr/bin/env python3
"""Generate the website's HKU/CUHK projection and JS from the LIVE app data.

No independent admissions dataset or formula implementation is maintained here.
Requires the matching sibling app checkout and Dart SDK. Fails if the app's
authoring assets differ from its published OTA core; never publishes app data.
Run again after an app core/engine update, then build and deploy this website.
"""
import argparse
import hashlib
import json
import pathlib
import shutil
import subprocess
import tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
FILES = [
    'lib/services/jupas/score_calculator.dart',
    *['lib/models/jupas/' + name + '.dart' for name in ['programme', 'dse_result', 'subject', 'grade']],
]
FIELDS = [
    'js_code', 'js_code_2024', 'institution', 'faculty', 'title',
    'scoring_method', 'weighting_detail', 'bonus_system', 'score_rules',
    'median', 'uq', 'lq', 'median_2024', 'uq_2024', 'lq_2024',
    'median_2023', 'uq_2023', 'lq_2023', 'entry_req', 'interview',
    'other_considerations', 'data_remark',
]

def digest(raw):
    return hashlib.sha256(raw).hexdigest()

def canonical(data):
    return json.dumps(data, ensure_ascii=False, separators=(',', ':')).encode()

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--app', type=pathlib.Path, default=ROOT.parent / 'app')
    args = parser.parse_args()
    app = args.app.resolve()
    assets = app / 'assets/jupas'
    rows = json.loads((assets / 'programmes_2025.json').read_text())
    english = json.loads((assets / 'programmes_en_2025.json').read_text())
    raw = canonical({'programmes': rows, 'english_titles': english})
    live = json.loads(subprocess.check_output(['curl', '--fail', '--silent', '--show-error', '--max-time', '20', 'https://www.pickmyquiz.com/jupas-data/meta.json']))
    section = live['sections']['core']
    assert digest(raw) == section['sha256'], 'STOP: local app core is not the published OTA core'
    assert len(rows) == section['count']
    selected = [{k: row.get(k) for k in FIELDS} for row in rows if row['institution'] in ['HKU', 'CUHK']]
    assert len({p['js_code'] for p in selected}) == len(selected)
    engine_hashes = {name: digest((app / name).read_bytes()) for name in FILES}
    with tempfile.TemporaryDirectory(prefix='jupas-web-engine-') as tmp:
        temp = pathlib.Path(tmp)
        for name in FILES:
            dest = temp / 'app' / name
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(app / name, dest)
        for src in (ROOT / 'scripts/dart').glob('*.dart'):
            shutil.copyfile(src, temp / src.name)
        metadata = json.loads(subprocess.check_output(['dart', 'run', str(temp / 'cli.dart'), '--metadata'], cwd=temp))
        out = temp / 'app-score-engine.js'
        subprocess.run(['dart', 'compile', 'js', '-O2', '--no-source-maps', '-o', str(out), str(temp / 'web.dart')], cwd=temp, check=True)
        # Check JS/VM parity on EVERY pilot calculator programme, across grades,
        # science/arts mixes, M1/M2 and missing/failed core subjects.
        scenarios = []
        for grade in ['g5ss', 'g5s', 'g5', 'g4', 'g3', 'g2']:
            for electives in [('生物', '化學', 'M2'), ('經濟', '歷史', 'M1')]:
                scenarios.append({'中文': grade, '英文': grade, '數學': grade, '公民': 'attained', **{s: grade for s in electives}})
        scenarios.extend([
            {'中文':'g3', '英文':'g5ss', '數學':'g4', '公民':'attained', '生物':'g5s', '化學':'g5', 'M2':'g3'},
            {'中文':'g1', '英文':'g5ss', '數學':'g5ss', '公民':'untaken', '生物':'g5ss', '化學':'g5ss'},
            {},
        ])
        cases = [{'programme': p, 'grades': grades} for p in selected if p['institution'] == 'HKU' for grades in scenarios]
        payload = b'\n'.join(canonical(c) for c in cases) + b'\n'
        native = subprocess.check_output(['dart', 'run', str(temp / 'cli.dart')], input=payload, cwd=temp)
        harness = temp / 'parity.cjs'
        harness.write_text("global.self = global; require('./app-score-engine.js'); const fs = require('fs'); for (const line of fs.readFileSync(0,'utf8').trim().split('\\n')) console.log(global.jupasCompute(line));")
        javascript = subprocess.check_output(['node', str(harness)], input=payload, cwd=temp)
        expected = [json.loads(line) for line in native.splitlines()]
        actual = [json.loads(line) for line in javascript.splitlines()]
        for index, (a, b) in enumerate(zip(expected, actual, strict=True)):
            assert abs(a['total'] - b['total']) < 1e-8 and a['approx'] == b['approx'] and a['requirement'] == b['requirement'] and a['formula'] == b['formula'], f'JS/VM mismatch in case {index}'
            assert len(a['used']) == len(b['used'])
            for x, y in zip(a['used'], b['used']):
                assert x['subject'] == y['subject'] and x['grade'] == y['grade'] and abs(x['weighted'] - y['weighted']) < 1e-8 and x['weight'] == y['weight']
        generated = ROOT / 'src/data'
        generated.mkdir(exist_ok=True)
        public = ROOT / 'public/tools'
        public.mkdir(exist_ok=True)
        engine = out.read_bytes()
        shutil.copyfile(out, public / 'app-score-engine.js')
        snapshot = {
            'source': 'https://www.pickmyquiz.com/jupas-data/meta.json',
            'version': section['version'], 'coreSha256': section['sha256'],
            'sourceUpdatedAt': live['updated_at'], 'statisticsYear': 2025,
            'programmeSha256': digest(subprocess.check_output(['node', '-e', "process.stdout.write(JSON.stringify(JSON.parse(require('fs').readFileSync(0,'utf8'))))"], input=canonical(selected))),
            'engineSources': engine_hashes, 'engineSha256': digest(engine),
            'parityCases': len(cases), 'metadata': metadata, 'programmes': selected,
        }
        (generated / 'app-admissions.json').write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + '\n')
        print(f'Exported {len(selected)} HKU/CUHK rows; {len(cases)} JS/VM parity cases PASS. Live core v{section["version"]}.')

if __name__ == '__main__':
    main()
