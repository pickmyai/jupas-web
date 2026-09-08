import React, { useEffect, useState } from 'react';

let enginePromise;
function loadEngine(engineVersion) {
  if (typeof window.jupasCompute === 'function') return Promise.resolve();
  if (!enginePromise) {
    enginePromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `/tools/app-score-engine.js?v=${engineVersion}`;
      script.onload = () => typeof window.jupasCompute === 'function' ? resolve() : reject(new Error('engine'));
      script.onerror = () => { script.remove(); reject(new Error('network')); };
      document.head.append(script);
    }).catch(error => { enginePromise = undefined; throw error; });
  }
  return enginePromise;
}

const format = n => Number(n).toLocaleString('en-HK', { maximumFractionDigits: 3 });
const notify = (name, programme) => {
  if (['www.jupascalculator.app', 'jupascalculator.app'].includes(location.hostname)) {
    // No grades or scores leave the browser. Optional Vercel custom events;
    // the existing layout separately records page views and store clicks.
    window.va?.('event', { name, data: { institution: 'HKU', programme } });
  }
};

export default function UniversityCalculator({ programmes, metadata, engineVersion }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);
  const [code, setCode] = useState(programmes[0].js_code);
  const [grades, setGrades] = useState({});
  const [electives, setElectives] = useState(['', '', '']);
  const [module, setModule] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const programme = programmes.find(p => p.js_code === code);
  const core = metadata.subjects.filter(s => s.core);
  const options = metadata.subjects.filter(s => !s.core && !s.m12);
  const clearResult = () => { setResult(null); setError(''); };
  const changeGrade = (key, value) => { clearResult(); setGrades(old => ({ ...old, [key]: value })); };
  const changeElective = (index, value) => {
    clearResult();
    const next = [...electives]; next[index] = value;
    setGrades(old => { const copy = { ...old }; delete copy[electives[index]]; return copy; });
    setElectives(next);
  };
  const selectGrade = (subject, label, csd = false) => <label className="calc-field" key={subject}>
    <span>{label}</span>
    <select aria-label={`${label}成績`} value={grades[subject] || ''} onChange={e => changeGrade(subject, e.target.value)} disabled={!subject || busy || !ready} required>
      <option value="">請選成績</option>
      {(csd ? metadata.grades.filter(g => ['attained', 'untaken'].includes(g.key)) : metadata.grades.filter(g => g.key !== 'attained')).map(g =>
        <option key={g.key} value={g.key}>{csd && g.key === 'untaken' ? '未達標' : g.label}</option>)}
    </select>
  </label>;

  async function calculate(event) {
    event.preventDefault();
    const selected = [...core.map(s => s.key), ...electives.filter(Boolean), ...(module ? [module] : [])];
    if (selected.some(key => !grades[key]) || electives.filter(Boolean).length + (module ? 1 : 0) < 2) {
      setError('請填妥四個核心科目，並選擇至少兩科選修科／M1 或 M2 的成績。'); return;
    }
    setBusy(true); setError(''); setResult(null);
    try {
      await loadEngine(engineVersion);
      const input = Object.fromEntries(selected.map(key => [key, grades[key]]));
      const next = JSON.parse(window.jupasCompute(JSON.stringify({ programme, grades: input })));
      setResult(next);
      notify('hku_calculator_complete', code);
    } catch {
      setError('計分工具暫時未能載入，請再試一次，或使用下方港大官方計算器。');
    } finally { setBusy(false); }
  }

  return <div className="university-calculator">
    <p className="calc-intro">選一個港大課程，睇清楚邊幾科計入、每科比重同試算結果。成績只在這個瀏覽器分頁處理。</p>
    {!ready && <p className="fine-print" role="status">正在準備計分工具，課程數據表可先閱讀。</p>}
    <form onSubmit={calculate}>
      <label className="calc-field programme-select"><span>心儀課程</span>
        <select value={code} disabled={busy || !ready} onChange={e => { setCode(e.target.value); clearResult(); }}>
          {programmes.map(p => <option key={p.js_code} value={p.js_code}>{p.js_code} · {p.title}</option>)}
        </select>
      </label>
      <p className="calc-formula"><strong>App 比較公式：</strong>{programme.scoring_method}。{programme.weighting_detail || '資料未列額外科目比重。'}</p>
      {programme.data_remark && <p className="data-note">{programme.data_remark}</p>}
      <fieldset disabled={busy || !ready}><legend>核心科目</legend><div className="calc-grid">{core.map(s => selectGrade(s.key, s.display, s.csd))}</div></fieldset>
      <fieldset disabled={busy || !ready}><legend>選修科目（最少兩科，可包括 M1 或 M2）</legend>
        <div className="elective-grid">{electives.map((key, i) => <div className="elective-pair" key={i}>
          <label className="calc-field"><span>選修科 {i + 1}{i === 2 ? '（選填）' : ''}</span>
            <select value={key} onChange={e => changeElective(i, e.target.value)}>
              <option value="">未選修</option>
              {options.filter(s => s.key === key || !electives.includes(s.key)).map(s => <option value={s.key} key={s.key}>{s.display}</option>)}
            </select>
          </label>
          {key && selectGrade(key, `選修科 ${i + 1}`)}
        </div>)}</div>
        <div className="module-pair"><label className="calc-field"><span>數學延伸部分（選填，只選一科）</span>
          <select value={module} onChange={e => { clearResult(); setModule(e.target.value); setGrades(old => { const copy = { ...old }; delete copy.M1; delete copy.M2; return copy; }); }}>
            <option value="">未選修</option><option value="M1">M1</option><option value="M2">M2</option>
          </select>
        </label>{module && selectGrade(module, module)}</div>
      </fieldset>
      <div className="calc-actions"><button type="submit" disabled={busy || !ready}>{!ready ? '準備計分工具…' : busy ? '正在計算…' : '計算這個課程'}</button>
        <button type="button" className="secondary-button" disabled={busy || !ready} onClick={() => { setGrades({}); setElectives(['', '', '']); setModule(''); clearResult(); }}>清除成績</button>
      </div>
      <p className="fine-print">本試算涵蓋畫面列出的科目，未處理丙類語言、替代中文資格及重考扣分。沿用 App 的歷史比較公式；如資料備註列明保留舊公式，結果並非該課程現行申請年度的官方計分。</p>
    </form>
    <div aria-live="polite" aria-atomic="true">
      {error && <p className="data-note" role="alert">{error}</p>}
      {result && <section className="calc-result" aria-label="試算結果">
        <span className="eyebrow">{code} · {result.approx ? '約算結果' : '課程試算分數'}</span>
        <p className="result-number">{format(result.total)}<span>分</span></p>
        <p>{result.formula}</p>
        {result.approx && <p className="data-note">這個課程的部分條件由 App 引擎約算，請以官方計算器核對，勿直接推斷取錄機會。</p>}
        <p className="requirement-note"><strong>{result.requirement.kind === 'notMet' ? '基本要求檢查：未符合已知條件' : result.requirement.kind === 'maybe' ? '基本要求檢查：尚須核對' : '基本要求檢查：已通過本工具檢查的條件'}</strong><br />{result.requirement.reason}。此檢查不代表已符合所有課程甄選要求。</p>
        <ul className="contribution-list">{result.used.map((s, i) => <li key={`${s.subject}-${i}`}><span>{s.subject} · {s.grade} · ×{s.weight}</span><strong>{format(s.weighted)}</strong></li>)}</ul>
        <p className="fine-print">如公式有額外科目 bonus，總分會包括該加分，未必等於以上主要入選科目的小計。</p>
        <div className="comparison-grid"><p>2025 Median<strong>{programme.median == null ? '未有資料' : format(programme.median)}</strong></p><p>2025 LQ<strong>{programme.lq == null ? '未有資料' : format(programme.lq)}</strong></p></div>
        {!result.approx && result.requirement.kind !== 'notMet' && programme.median != null && <p>與資料所列 2025 中位數相差 <strong>{format(result.total - programme.median)}</strong> 分。只表示歷史分數位置，並非錄取概率。</p>}
        <p><a href={`#${code.toLowerCase()}`}>查看這個課程的歷年數據及完整備註 →</a></p>
      </section>}
    </div>
    <noscript><p className="data-note">請啟用 JavaScript 使用試算。下方歷年數據表及官方連結毋須 JavaScript 亦可閱讀。</p></noscript>
    <a className="official-link" href="https://admissions.hku.hk/apply/jupas/score-calculator">前往港大官方計算器核對 ↗</a>
  </div>;
}
