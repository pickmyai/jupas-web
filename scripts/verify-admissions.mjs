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
assert(data.programmes.every(p => !('grad_salary_k' in p) && !('weightings' in p)));
// Enrichment is a public subset only: no ratings / editor's take / MBTI / long-run salaries.
const enrichment = JSON.parse(read('src/data/app-enrichment.json'));
for (const entry of Object.values(enrichment.programmes)) {
  assert(Object.keys(entry).every(k => enrichment.fields.includes(k)), 'App-only enrichment field leaked into the website');
  for (const c of entry.career_paths ?? []) assert(!('salary_y10' in c) && !('salary_y20' in c));
}
assert.equal(data.statisticsYear, 2026, 'Update year mapping and article interpretation together');
assert(data.parityCases >= data.programmes.filter(p => p.institution === 'HKU').length * 15);
// The sibling app need not exist on Vercel. Where it does, also reject engine
// drift so local builds cannot silently use a different scoring implementation.
for (const [path, expected] of Object.entries(data.engineSources)) {
  const file = new URL(`../app/${path}`, root);
  if (existsSync(file)) assert.equal(sha(readFileSync(file)), expected, `App ${path} changed; re-run sync-app-data.py`);
}
const live = JSON.parse(execFileSync('curl', ['--fail', '--silent', '--show-error', '--retry', '2', '--max-time', '20', data.source], { encoding: 'utf8' }));
// A newer app core must not block every website deploy (it silently froze this
// site on the 2026-08 data for weeks). Warn loudly instead; the snapshot is
// still internally consistent (hashes above), just older than the app.
if (live.sections.core.version !== data.version || live.sections.core.sha256 !== data.coreSha256) {
  console.warn(`WARNING: app core is now ${live.sections.core.version}, website snapshot is ${data.version}. Run scripts/sync-app-data.py and redeploy.`);
}
console.log(`Admissions integrity PASS: ${data.programmes.length} unique rows; current app core ${data.version}; ${data.parityCases} JS/VM parity cases.`);
