import sourceSnapshot from '../data/app-admissions.json';
// The current web engine understands this formula; older installed apps keep
// the legacy fields in the identical OTA dataset.
const snapshot = { ...sourceSnapshot, programmes: sourceSnapshot.programmes.map(p =>
  p.actual_2026_requires_engine === 'cityu_2027' && p.scoring_2027
    ? { ...p, ...p.scoring_2027, actual_2026_comparable_to_calculator: true } : p) };
import enrichmentSnapshot from '../data/app-enrichment.json';

export { snapshot };
export const formatScore = value => value == null ? '—' : Number(value).toLocaleString('en-HK', { maximumFractionDigits: 3 });
export const years = [2023, 2024, 2025];

// ── 2026 official results + the 2025 reference they sit next to ──
// The raw `median/lq/uq` fields are the 2025 reference, except where the app
// marks `actual_2026_prior_reference_is_2025: false` (then 2025 is unknown).
export const has2026 = p => ['median', 'mean', 'lq', 'uq'].some(key => p[`actual_2026_${key}`] != null);
export const median2025 = p => p.actual_2026_prior_reference_is_2025 === false ? null : p.median;
export const lq2025 = p => p.actual_2026_prior_reference_is_2025 === false ? null : p.lq;
export const uq2025 = p => p.uq;
export const medianFor = (p, year) =>
  year === 2026 ? p.actual_2026_median : year === 2025 ? median2025(p) : p[`median_${year}`];
/** Every year with at least one published figure, newest first. */
export function yearRows(p) {
  const rows = [];
  if (has2026(p)) rows.push({ year: 2026, uq: p.actual_2026_uq, median: p.actual_2026_median, mean: p.actual_2026_mean, lq: p.actual_2026_lq, formulaYear: p.actual_2026_formula_year, formulaChanged: p.actual_2026_comparable_to_calculator === false });
  const r25 = { year: 2025, formulaYear: p.score_history_formula_years?.['2025'], uq: uq2025(p), median: median2025(p), lq: lq2025(p), mean: p.median == null ? p.mean : null };
  if ([r25.uq, r25.median, r25.lq, r25.mean].some(v => v != null)) rows.push(r25);
  for (const year of [2024, 2023]) {
    const meanOnly = p.median == null && p.mean != null;
    const r = { year, uq: p[`uq_${year}`], median: meanOnly ? null : p[`median_${year}`], mean: p[`mean_${year}`] ?? (meanOnly ? p[`median_${year}`] : null), lq: p[`lq_${year}`] };
    if ([r.uq, r.median, r.mean, r.lq].some(v => v != null)) rows.push(r);
  }
  return rows;
}
export const latestRow = p => yearRows(p)[0] ?? null;
export const scoreMetric = row => row?.median != null ? '中位數' : row?.mean != null ? '平均分' : '未公布中位數／平均分';
export const scoreBasis = row => row?.formulaYear && row.formulaYear !== row.year ? `${row.year} 錄取者・按 ${row.formulaYear} 公式重算` : row ? `${row.year} 年取錄分數` : '未有數據';
export const schools = {
  hku: {
    code: 'HKU', name: '香港大學', shortName: '港大',
    title: 'HKU JUPAS 收生分數｜港大 2023–2026 收生中位數、LQ 及計算器',
    description: '查看港大 HKU 課程 2023–2026 收生中位數、LQ／UQ、計分公式及改制備註。免費單課程試算沿用 DSE Jupas 神器 App 計分引擎。',
    intro: '港大收分要按課程睇。同樣寫 Best 5，指定科、科目比重同額外科加分都可能不同。先搵心儀課程，核對年份同公式，再將自己的分數放返同一基準比較。',
    highlights: ['JS6016', 'JS6028', 'JS6004'],
    official: 'https://admissions.hku.hk/apply/jupas/score-calculator',
    sources: [
      ['港大官方 JUPAS 計分器及適用限制', 'https://admissions.hku.hk/apply/jupas/score-calculator'],
      ['港大招生刊物：逐年收生資料及預期分數', 'https://admissions.hku.hk/explore/publications'],
      ['JUPAS 港大課程目錄及入學要求', 'https://www.jupas.edu.hk/en/programme/hku/'],
    ],
  },
  cuhk: {
    code: 'CUHK', name: '香港中文大學', shortName: '中大',
    title: 'CUHK JUPAS 收生分數｜中大歷年 Median、LQ 及 2026 醫科收分',
    description: '查看中大各課程歷年收生分數及 2026 醫科中位數，分清取錄年份、科目加權與未公布項目。',
    intro: '中大歷年收分最容易睇錯嘅地方，係將不同年份嘅公式當成一樣。醫科嘅通識科斷層、商科加權調整、新課程承接前身，都要連同數字一齊睇。',
    highlights: ['JS4018', 'JS4501', 'JS4238'],
    official: 'https://admission.cuhk.edu.hk/application/jupas/programme-specific-requirements-and-score-calculator/',
    sources: [
      ['中大官方課程要求、計分器及 Expected Score 說明', 'https://admission.cuhk.edu.hk/application/jupas/programme-specific-requirements-and-score-calculator/'],
      ['中大 2023 入學收生統計（官方 PDF）', 'https://admission.cuhk.edu.hk/wp-content/uploads/2023/12/admission_grades_2023.pdf'],
      ['JUPAS 中大課程目錄及入學要求', 'https://www.jupas.edu.hk/en/programme/cuhk/'],
    ],
  },
};

const JUPAS = ['JUPAS 官方網站：課程目錄及入學要求', 'https://www.jupas.edu.hk/'];
const official2026 = code => [...new Set(snapshot.programmes
  .filter(p => (schools[slugFor(p.institution)]?.code === code) && p.actual_2026_source)
  .map(p => p.actual_2026_source))];

// Institutions without a hand-written analysis: generic copy, sources limited
// to JUPAS plus the 2026 documents the app itself cites.
const generic = (code, name, shortName, match) => {
  const last = snapshot.programmes.some(p => match.includes(p.institution) && has2026(p)) ? 2026 : 2025;
  const own = snapshot.programmes.filter(p => match.includes(p.institution));
  const hasMean = own.some(p => p.actual_2026_mean != null || p.mean != null);
  const hasMedian = own.some(p => p.actual_2026_median != null || p.median != null);
  const metrics = hasMean && hasMedian ? '中位數、平均分及四分位數' : hasMean ? '平均分及四分位數' : '中位數及四分位數';
  const title = `${code} JUPAS 收生分數｜${shortName} 2023–${last} ${metrics}`;
  return {
    code, name, shortName, match, title,
    description: `查看${name}（${shortName}）各 JUPAS 課程 2023–${last} ${metrics}、計分方法及資料備註。每個數字分開標明錄取年份與公式基準，未公布項目留空。`,
    intro: `${shortName}各課程的計分方法（Best 5、Best 6、科目比重）不同，同一份成績在不同課程會得出不同分數。先找心儀課程，核對年份及公式，再與自己按同一方法計算的分數比較。`,
    highlights: [], official: 'https://www.jupas.edu.hk/', sources: null,
  };
};
Object.assign(schools, {
  hkust: generic('HKUST', '香港科技大學', '科大', ['HKUST']),
  polyu: generic('PolyU', '香港理工大學', '理大', ['PolyU']),
  cityu: generic('CityU', '香港城市大學', '城大', ['CityU']),
  hkbu: generic('HKBU', '香港浸會大學', '浸大', ['HKBU']),
  lingu: generic('LingU', '嶺南大學', '嶺大', ['LingU']),
  eduhk: generic('EdUHK', '香港教育大學', '教大', ['EdUHK']),
  hkmu: generic('HKMU', '香港都會大學', '都大', ['HKMU', '都會大學']),
  sssdp: { ...generic('SSSDP', '自資院校（指定專業／界別課程資助計劃）', '自資院校', ['THEi', '東華學院', '聖方濟各大學', '恒生大學', '伍倫貢學院', '樹仁大學', '珠海學院']),
    title: 'SSSDP 自資課程 JUPAS 收生分數｜THEi、恒大、樹仁等歷年 Median、LQ 一覽' },
});
schools.hku.match = ['HKU'];
schools.cuhk.match = ['CUHK'];
for (const school of Object.values(schools)) {
  if (!school.sources) school.sources = [JUPAS];
  const docs = official2026(school.code);
  school.sources = [...school.sources, ...docs.map(href => [`${school.shortName} 2026 年收生分數（官方公布）`, href])];
}

export function slugFor(institution) {
  return Object.keys(schools).find(slug => schools[slug].match?.includes(institution)) ?? null;
}
export const programmePath = p => `/universities/${slugFor(p.institution)}/${p.js_code.toLowerCase()}/`;
export const programmesFor = code => snapshot.programmes.filter(p => schools[slugFor(p.institution)]?.code === code);
export const institutionNames = {
  THEi: '香港高等教育科技學院', 東華學院: '東華學院', 聖方濟各大學: '聖方濟各大學', 恒生大學: '香港恒生大學',
  伍倫貢學院: '香港伍倫貢學院', 樹仁大學: '香港樹仁大學', 珠海學院: '珠海學院', 都會大學: '香港都會大學（自資）',
};

// ── Public subset of the app's enrichment section (see sync-app-data.py) ──
export const enrichmentFor = p => enrichmentSnapshot.programmes[p.js_code] ?? {};
export const enrichmentVersion = enrichmentSnapshot.version;

// ── 申請熱度: same percentile rule as the app's PopularityIndex ──
// Band A applicants per place, as a percentile of every programme that has
// both official figures; ties count half. Tiers: ≥90 / ≥75 / ≥25 / rest.
const perPlace = p => (p.band_a_apply > 0 && p.quota > 0) ? p.band_a_apply / p.quota : null;
const ratios = snapshot.programmes.map(perPlace).filter(r => r != null).sort((a, b) => a - b);
export function popularityFor(p) {
  const r = perPlace(p);
  if (r == null) return null;
  const below = ratios.filter(x => x < r).length;
  const equal = ratios.filter(x => x === r).length;
  const percentile = (below + equal / 2) / ratios.length * 100;
  const tier = percentile >= 90 ? '極熱門' : percentile >= 75 ? '熱門' : percentile >= 25 ? '適中' : '較少人報';
  const peers = snapshot.programmes.filter(x => x.institution === p.institution && perPlace(x) != null)
    .map(perPlace).sort((a, b) => b - a);
  return { applicants: p.band_a_apply, places: p.quota, offers: p.band_a_offer, admitted: p.admitted,
    perPlace: r, percentile, tier, rank: peers.indexOf(r) + 1, peers: peers.length };
}
