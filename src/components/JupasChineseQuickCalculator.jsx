import { useMemo, useState } from 'react';

const grades = [
    { label: '—', value: '' },
    { label: '5**', value: '8.5' },
    { label: '5*', value: '7' },
    { label: '5', value: '5.5' },
    { label: '4', value: '4' },
    { label: '3', value: '3' },
    { label: '2', value: '2' },
    { label: '1', value: '1' },
    { label: 'U', value: '0' },
];

export default function JupasChineseQuickCalculator() {
    const [subjects, setSubjects] = useState(['', '', '', '', '', '']);

    const result = useMemo(() => {
        const values = subjects.filter((value) => value !== '').map(Number).sort((a, b) => b - a);
        const chosen = values.slice(0, 5);
        return {
            missing: Math.max(0, 5 - values.length),
            chosen,
            total: chosen.reduce((sum, value) => sum + value, 0),
        };
    }, [subjects]);

    const updateSubject = (index, value) => {
        setSubjects((current) => current.map((grade, subjectIndex) => subjectIndex === index ? value : grade));
    };

    return (
        <section id="quick-calculator" className="bg-slate-950 py-16 text-white">
            <div className="container mx-auto max-w-5xl px-6">
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                    <div>
                        <span className="inline-flex rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold tracking-wide text-amber-300">繁中網頁版 · 即時計分</span>
                        <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">JUPAS Best 5<br />快速計分器</h2>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">輸入最多六科 DSE 等級，系統會按 2025 年入學起常見的 8.5 制，自動選出最高五科。先取得未加權基準，再按目標課程核對指定科和加權。</p>
                        <p className="mt-3 text-xs leading-relaxed text-slate-400">非官方工具；各院校及課程可採用不同換算、指定科目、M1/M2 及加權方法。</p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white p-5 text-slate-900 shadow-2xl sm:p-7">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {subjects.map((value, index) => (
                                <label key={index} className="text-xs font-bold text-slate-500">
                                    第 {index + 1} 科
                                    <select
                                        aria-label={`第 ${index + 1} 科 DSE 等級`}
                                        value={value}
                                        onChange={(event) => updateSubject(index, event.target.value)}
                                        className="mt-1.5 min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-base font-extrabold text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                                    >
                                        {grades.map((grade) => <option key={grade.label} value={grade.value}>{grade.label}</option>)}
                                    </select>
                                </label>
                            ))}
                        </div>

                        <div className="mt-5 rounded-2xl bg-amber-50 p-5" aria-live="polite">
                            <p className="text-xs font-bold text-amber-700">未加權 Best 5</p>
                            {result.missing > 0 ? (
                                <>
                                    <p className="mt-1 text-2xl font-extrabold text-slate-900">仲差 {result.missing} 科</p>
                                    <p className="mt-1 text-xs text-slate-500">輸入最少五科先可以計分。</p>
                                </>
                            ) : (
                                <>
                                    <p className="mt-1 text-3xl font-extrabold text-slate-900">{Number.isInteger(result.total) ? result.total : result.total.toFixed(1)} 分</p>
                                    <p className="mt-1 text-xs text-slate-500">最高五科：{result.chosen.join(' + ')}。正式報讀前要再核對課程公式。</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
