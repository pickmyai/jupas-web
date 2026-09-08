# HKU / CUHK admissions pages

The website is a **derived projection of the app**, not another admissions database.

## Source and limits

- App authoring source: `../app/assets/jupas/programmes_2025.json` plus its English-title overlay.
- The app prefers its published OTA `core` section. The exporter recomputes that section's exact SHA-256 and refuses to export if it differs from `https://www.pickmyquiz.com/jupas-data/meta.json`.
- Current projection: HKU and CUHK only. Public fields include names, scoring rules, admission statistics, requirements and the original `data_remark`. Salary/enrichment, interview content, AI, ranking and account data are not exported.
- `median` / `lq` / `uq` mean **2025 entry** in this app schema; `_2024` and `_2023` preserve their existing meanings. A source version date is not an admissions year. When the upstream schema rolls over, update the mapping, article examples and verification together.
- Public articles acknowledge historical formula differences. Missing values stay missing. The pages do not infer cutoff scores or admission probabilities and do not compute a whole-school difficulty ranking.
- This is a versioned static publication, not a live university feed. The page displays its data version. A new app OTA publication requires regenerating and deploying these pages; the build freshness check rejects a stale projection but does not update an already-deployed page automatically.

## Refresh after the app's core is published

From this repository, with the matching app checkout and Dart SDK available:

```sh
npm run sync:admissions
npm run build
python3 scripts/verify-admissions-pages.py
```

`sync:admissions` changes only generated website files. It **does not** publish or alter the app data, app formulas or app paywalls. Never hand-edit `src/data/app-admissions.json` or `public/tools/app-score-engine.js`.

The bridge compiles the app's original `score_calculator.dart` and four models with `dart compile js`. Source files are copied unmodified into a temporary directory; there is no JavaScript formula rewrite. Only score calculation and requirement checks are reachable from the web wrapper. The AES/update code and encryption key are never imported.

Generation compares native Dart and compiled JavaScript on all 55 pilot HKU courses using 15 scenarios (825 cases), including grade scales, mixed grades, arts/science electives, M1/M2, failed/missing core subjects and empty input. It compares totals, formula, approximation status, requirement result and every selected contribution. The build checks the compiled artifact, dataset and engine source hashes, plus the current live core version.

`verify-admissions-pages.py` reads the built HTML without JavaScript, verifies every score and original caveat against the projection, and checks programme coverage, canonical, sitemap and homepage entry links.

## First release scope and follow-up measurement

- `/universities/`: index; `/universities/hku/`: article, full school table and single-course calculator; `/universities/cuhk/`: article and full school table.
- Keep the existing generic Median/LQ explainer URL; its cards now describe its actual contents and link to the two school pages.
- Existing production page-view and app-store-click instrumentation is inherited from `Layout.astro` (page path distinguishes the new pages). A production-only Vercel `hku_calculator_complete` custom event records the selected course code, never entered grades or computed scores. Verify the deployment's analytics entitlement before treating this event as reported; the browser call alone is not ingestion proof.
- Review Search Console query/page performance for school-name, institution-code and programme-code queries at 14 and 28 days, with a longer 8–12 week view for new-page discovery. Seasonality and admissions deadlines confound month-to-month comparisons.
- Evaluate store clicks separately from installed/paid users. No new app attribution or subscription entitlement behavior is shipped here.
- Expand the next school only after checking search evidence, data coverage and maintenance cost. Cross-school saved plans, AI advice and interview practice remain in the app experience.

## Editorial evidence

All numeric article examples render from the same projection at build time. HKU examples: JS6016 (Median vs LQ), JS6028 (observed sequence without causal forecast), JS6004 (missing year and Expected Score distinction). CUHK examples: JS4018 (three-year context), JS4501 (Liberal Studies discontinuity), JS4238 (weighting change), JS4100 (predecessor programme). These are analyses of the supplied, app-maintained records; the source links are official verification entry points, not a claim that every historical document was freshly re-audited during this website release.
