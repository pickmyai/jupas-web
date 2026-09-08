import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root));
const sha = data => createHash('sha256').update(data).digest('hex');
const data = JSON.parse(read('src/data/app-admissions.json'));
assert.equal(sha(JSON.stringify(data.programmes)), data.programmeSha256, 'Generated rows changed: run sync-app-data.py instead of hand-editing');
assert.equal(sha(read('public/tools/app-score-engine.js')), data.engineSha256, 'Generated engine changed');
assert.equal(new Set(data.programmes.map(p => p.js_code)).size, data.programmes.length);
assert(data.programmes.every(p => ['HKU', 'CUHK'].includes(p.institution)));
assert(data.programmes.every(p => !('grad_salary_k' in p) && !('band_a_apply' in p)));
assert.equal(data.statisticsYear, 2025, 'Update year mapping and article interpretation together');
assert(data.parityCases >= data.programmes.filter(p => p.institution === 'HKU').length * 15);
// The sibling app need not exist on Vercel. Where it does, also reject engine
// drift so local builds cannot silently use a different scoring implementation.
for (const [path, expected] of Object.entries(data.engineSources)) {
  const file = new URL(`../app/${path}`, root);
  if (existsSync(file)) assert.equal(sha(readFileSync(file)), expected, `App ${path} changed; re-run sync-app-data.py`);
}
const live = JSON.parse(execFileSync('curl', ['--fail', '--silent', '--show-error', '--retry', '2', '--max-time', '20', data.source], { encoding: 'utf8' }));
assert.equal(live.sections.core.version, data.version, 'App OTA core updated: re-sync before building');
assert.equal(live.sections.core.sha256, data.coreSha256, 'Website no longer matches live app data');
console.log(`Admissions integrity PASS: ${data.programmes.length} unique rows; current app core ${data.version}; ${data.parityCases} JS/VM parity cases.`);
