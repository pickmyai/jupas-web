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

export default function JupasEnglishQuickCalculator() {
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
                        <span className="inline-flex rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold tracking-wide text-amber-300">English web tool · Instant result</span>
                        <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">JUPAS Best 5<br />quick calculator</h2>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">Enter up to six HKDSE grades. The calculator uses the 8.5-point conversion commonly adopted for admissions from 2025 and automatically selects your five highest scores. Use this as an unweighted baseline before checking the exact rules for your target programme.</p>
                        <p className="mt-3 text-xs leading-relaxed text-slate-400">Independent reference tool. Institutions and programmes may use different conversions, compulsory subjects, M1/M2 rules and weightings.</p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white p-5 text-slate-900 shadow-2xl sm:p-7">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {subjects.map((value, index) => (
                                <label key={index} className="text-xs font-bold text-slate-500">
                                    Subject {index + 1}
                                    <select
                                        aria-label={`HKDSE grade for subject ${index + 1}`}
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
                            <p className="text-xs font-bold text-amber-700">Unweighted Best 5</p>
                            {result.missing > 0 ? (
                                <>
                                    <p className="mt-1 text-2xl font-extrabold text-slate-900">Add {result.missing} more {result.missing === 1 ? 'subject' : 'subjects'}</p>
                                    <p className="mt-1 text-xs text-slate-500">Enter at least five grades to calculate a score.</p>
                                </>
                            ) : (
                                <>
                                    <p className="mt-1 text-3xl font-extrabold text-slate-900">{Number.isInteger(result.total) ? result.total : result.total.toFixed(1)} points</p>
                                    <p className="mt-1 text-xs text-slate-500">Top five: {result.chosen.join(' + ')}. Check the programme formula before applying.</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
