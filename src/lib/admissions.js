import snapshot from '../data/app-admissions.json';

export { snapshot };
export const formatScore = value => value == null ? '—' : Number(value).toLocaleString('en-HK', { maximumFractionDigits: 3 });
export const years = [2023, 2024, 2025];
export const medianFor = (p, year) => p[year === 2025 ? 'median' : `median_${year}`];
export const schools = {
  hku: {
    code: 'HKU', name: '香港大學', shortName: '港大',
    title: 'HKU JUPAS 收生分數｜港大 2023–2025 Median、LQ 分析及計算器',
    description: '查看港大 HKU 課程 2023–2025 收生中位數、2025 LQ／UQ、計分公式及改制備註。免費單課程試算沿用 DSE Jupas 神器 App 計分引擎。',
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
    title: 'CUHK JUPAS 收生分數｜中大 2023–2025 Median、LQ 變化分析',
    description: '查看中大 CUHK 課程 2023–2025 收生中位數、2025 LQ／UQ 及科目加權。拆解醫科通識斷層、改公式及課程前身，避免誤讀收分升跌。',
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

export const programmesFor = code => snapshot.programmes.filter(p => p.institution === code);
