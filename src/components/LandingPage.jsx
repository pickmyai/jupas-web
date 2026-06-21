import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight, Quote, RefreshCw, Clock, HelpCircle, PenTool,
    CheckCircle2, Languages, Wifi, Users, Globe, ChevronDown, Menu, X,
    ChevronRight, Star, Volume2, Brain, Play, Zap, BookOpen, BarChart3,
    Target, Repeat, Calculator, GraduationCap, Mic, TrendingUp, Award, ListChecks
} from "lucide-react";
import { cn } from "../lib/utils";

export const LANGUAGES = [
    { code: "zh-HK", name: "繁體中文 (香港)" },
    { code: "zh-CN", name: "简体中文" },
    { code: "en", name: "English" },
];

export const translations = {
    "zh-HK": {
        nav: { features: "功能", reviews: "用家評價", faq: "常見問題", blog: "升學攻略", cta: "下載 App" },
        hero: {
            tagline: "JUPAS 計分 · 入學分析 · 面試模擬 · 免費下載",
            title: "一秒計好 JUPAS 分數",
            titleHighlight: "再睇實你入到邊間",
            subheading: "DSE Jupas 神器幫你計分、分析入學機會、操練面試，一個 App 搞掂升大學",
            subtitle: "輸入 DSE 成績，自動套用八大及自資院校嘅收生計分公式（Best 5、4C+2X、科目加權、加分制），即時計出每個課程分數；再用 AI 對比歷年收生 median 同 LQ，話你知邊個課程穩陣、邊個進取，仲有約 1500 條真實面試題等你操練。",
            bullets: [
                "約 440 個真實 JUPAS 課程，八大計分公式一鍵套用",
                "AI 入學機會分析——你嘅分對比歷年 median／LQ，知道自己穩唔穩",
                "大學面試模擬——14 個學系大類、約 1500 題，AI 即時評分",
            ],
            cta: "免費下載",
            secondaryCta: "了解更多",
            videoLabel: "App 示範",
        },
        stats: [
            { value: "約 440", label: "真實 JUPAS 課程" },
            { value: "八大", label: "院校計分公式" },
            { value: "約 1500", label: "大學面試題" },
        ],
        features: {
            title: "點解揀 DSE Jupas 神器？",
            subtitle: "計分、入學機會、面試三合一——由揀科、估自己穩唔穩、到面試操練，一個 App 幫你由放榜計到入大學",
            items: [
                { icon: Calculator, label: "JUPAS 計分", title: "JUPAS 計分神器", desc: "輸入 DSE 成績，自動套用八大及自資院校唔同收生計分公式，即時計出每個課程嘅真實分數。", bullets: ["Best 5、4C+2X、科目加權、加分制全支援", "涵蓋約 440 個真實 JUPAS 課程", "唔同院校公式自動切換，即時出分"], color: "orange" },
                { icon: Brain, label: "AI 入學分析", title: "AI 入學機會分析", desc: "你嘅分數對比每個課程歷年收生 median 同 LQ，AI 話你知係穩陣、進取定保底。", bullets: ["對比歷年收生中位數同下四分位", "AI 判斷穩陣／進取／保底", "俾埋 Band A–E 排位策略建議"], color: "teal" },
                { icon: Mic, label: "面試模擬", title: "大學面試模擬", desc: "AI 語音面試官，涵蓋 14 個學系大類、約 1500 條真實面試題，中英雙語即時評分。", bullets: ["醫、牙、法律、商、教育、社工、護理全覆蓋", "中英雙語，AI 即時評分", "附改善建議，練到有信心為止"], color: "orange" },
                { icon: GraduationCap, label: "八大全覆蓋", title: "八大院校計分公式", desc: "港大、中大、科大、城大、理大、浸大、教大、嶺大——八大收生計分公式全部內建。", bullets: ["八大及主要自資院校公式齊備", "每間大學收生計分邏輯逐一拆解", "唔使再自己查 prospectus 慢慢計"], color: "teal" },
                { icon: BarChart3, label: "收生數據", title: "歷年收生數據參考", desc: "每個課程附歷年收生 median 同 LQ，仲有收生分數趨勢，幫你判斷自己嘅位置。", bullets: ["median／LQ 收生數據逐科呈現", "過去幾年收生分數趨勢圖", "用真實數據估自己入到邊"], color: "orange" },
                { icon: ListChecks, label: "心願清單", title: "心願清單 Wishlist", desc: "將心儀課程加入 wishlist，一覽你嘅分數對每個課程嘅入學機會，方便排志願。", bullets: ["一鍵收藏心儀課程", "並排比較分數同入學機會", "排志願前一目了然"], color: "teal" },
                { icon: TrendingUp, label: "選科策略", title: "Band A–E 選科策略", desc: "AI 根據你嘅分數同收生數據，建議邊啲課程放 Band A、邊啲放保底，排得穩陣又博得起。", bullets: ["進取到保底分層建議", "夢想課程同安全課程平衡排位", "20 個志願部署一目了然"], color: "orange" },
                { icon: Wifi, label: "離線可用", title: "離線都計到分", desc: "計分器同收生數據離線都用到，隨時隨地拎出嚟計，唔受網絡限制。", bullets: ["計分功能完全離線運作", "收生數據已內建，唔使等 loading", "只需首次下載時連接網絡"], color: "teal" },
            ],
        },
        process: {
            title: "三步搞掂升大學",
            steps: [
                { num: "01", title: "輸入 DSE 成績", desc: "填入你各科 DSE 成績，App 自動套用八大計分公式，即時計分", icon: Calculator },
                { num: "02", title: "揀心儀課程睇分析", desc: "睇每個課程嘅計分同入學機會，AI 話你知穩陣、進取定保底", icon: BarChart3 },
                { num: "03", title: "AI 面試模擬操練", desc: "用約 1500 條真實面試題操練，AI 語音面試官即時評分俾建議", icon: Mic },
            ],
        },
        reviews: {
            title: "真實用家評價",
            items: [
                { text: "以前要自己查 prospectus 逐科計分，計到頭都暈。而家輸入成績即刻出晒八大每個課程嘅分，慳返好多時間。", name: "Wong 同學", detail: "中六 DSE 應屆", avatar: "王" },
                { text: "最正係 AI 入學分析，將我嘅分同歷年 median、LQ 比，話我知邊啲穩陣邊啲進取，排 Band A 嘅時候安心好多。", name: "Chan 同學", detail: "DSE 考生", avatar: "陳" },
                { text: "面試模擬幫到我好多，醫科 MMI 啲題真係似考評嗰啲，練咗幾日真係夾返有信心，面試講嘢冇咁驚。", name: "Lee 同學", detail: "報讀醫科", avatar: "李" },
            ],
        },
        faq: {
            title: "常見問題",
            items: [
                { q: "計分準唔準？數據邊度嚟？", a: "計分器依據八大及自資院校公開嘅收生計分公式（Best 5、4C+2X、科目加權、加分制等）逐一實現，並對照社群整理嘅真實課程計分方法。結果只供參考，正式收生以各院校公佈為準。", icon: Calculator },
                { q: "覆蓋幾多個課程？", a: "目前涵蓋約 440 個真實 JUPAS 課程，包括八大院校及主要自資院校嘅熱門學系，並會持續更新。", icon: GraduationCap },
                { q: "AI 入學機會分析點計？", a: "AI 會將你嘅計分對比每個課程歷年收生 median（中位數）同 LQ（下四分位數），判斷你係穩陣、進取定保底，再俾 Band A–E 排位策略建議。", icon: Brain },
                { q: "需要全程連網嗎？", a: "唔需要。計分器同收生數據參考支援離線使用；AI 入學分析同面試模擬需要連網先用到。", icon: Wifi },
                { q: "面試題啱唔啱真實？", a: "面試題庫涵蓋 14 個學系大類、約 1500 條題目，參考各神科真實面試常見題型（包括醫科 MMI），中英雙語，配 AI 即時評分同改善建議。", icon: Mic },
            ],
        },
        cta: {
            title: "由放榜計到入大學",
            subtitle: "計分、入學分析、面試模擬，一個 App 搞掂升大學。免費下載，即刻試。",
        },
        footer: {
            copyright: "© 2026 DSE Jupas 神器",
            tagline: "JUPAS 計分 · 入學分析 · 面試模擬",
            privacy: "私隱政策",
            terms: "使用條款",
        },
    },
    "zh-CN": {
        nav: { features: "功能", reviews: "用户好评", faq: "常见问题", blog: "升学攻略", cta: "下载 App" },
        hero: {
            tagline: "JUPAS 计分 · 入学分析 · 面试模拟 · 免费下载",
            title: "一秒算好 JUPAS 分数",
            titleHighlight: "再看清你能进哪一间",
            subheading: "DSE Jupas 神器帮你计分、分析入学机会、操练面试，一个 App 搞定升大学",
            subtitle: "输入 DSE 成绩，自动套用八大及自资院校的收生计分公式（Best 5、4C+2X、科目加权、加分制），即时算出每个课程分数；再用 AI 对比历年收生 median 与 LQ，告诉你哪个课程稳妥、哪个进取，还有约 1500 条真实面试题供你操练。",
            bullets: [
                "约 440 个真实 JUPAS 课程，八大计分公式一键套用",
                "AI 入学机会分析——你的分数对比历年 median／LQ，掌握自己稳不稳",
                "大学面试模拟——14 个学系大类、约 1500 题，AI 即时评分",
            ],
            cta: "免费下载",
            secondaryCta: "了解更多",
            videoLabel: "App 示范",
        },
        stats: [
            { value: "约 440", label: "真实 JUPAS 课程" },
            { value: "八大", label: "院校计分公式" },
            { value: "约 1500", label: "大学面试题" },
        ],
        features: {
            title: "为何选择 DSE Jupas 神器？",
            subtitle: "计分、入学机会、面试三合一——从选科、评估自己稳不稳、到面试操练，一个 App 帮你从放榜算到进大学",
            items: [
                { icon: Calculator, label: "JUPAS 计分", title: "JUPAS 计分神器", desc: "输入 DSE 成绩，自动套用八大及自资院校不同收生计分公式，即时算出每个课程的真实分数。", bullets: ["Best 5、4C+2X、科目加权、加分制全支持", "涵盖约 440 个真实 JUPAS 课程", "不同院校公式自动切换，即时出分"], color: "orange" },
                { icon: Brain, label: "AI 入学分析", title: "AI 入学机会分析", desc: "你的分数对比每个课程历年收生 median 与 LQ，AI 告诉你是稳妥、进取还是保底。", bullets: ["对比历年收生中位数与下四分位", "AI 判断稳妥／进取／保底", "附带 Band A–E 排位策略建议"], color: "teal" },
                { icon: Mic, label: "面试模拟", title: "大学面试模拟", desc: "AI 语音面试官，涵盖 14 个学系大类、约 1500 条真实面试题，中英双语即时评分。", bullets: ["医、牙、法律、商、教育、社工、护理全覆盖", "中英双语，AI 即时评分", "附改善建议，练到有信心为止"], color: "orange" },
                { icon: GraduationCap, label: "八大全覆盖", title: "八大院校计分公式", desc: "港大、中大、科大、城大、理大、浸大、教大、岭大——八大收生计分公式全部内建。", bullets: ["八大及主要自资院校公式齐备", "每间大学收生计分逻辑逐一拆解", "不必再自己查 prospectus 慢慢算"], color: "teal" },
                { icon: BarChart3, label: "收生数据", title: "历年收生数据参考", desc: "每个课程附历年收生 median 与 LQ，还有收生分数趋势，帮你判断自己的位置。", bullets: ["median／LQ 收生数据逐科呈现", "过去数年收生分数趋势图", "用真实数据评估自己能进哪间"], color: "orange" },
                { icon: ListChecks, label: "心愿清单", title: "心愿清单 Wishlist", desc: "将心仪课程加入 wishlist，一览你的分数对每个课程的入学机会，方便排志愿。", bullets: ["一键收藏心仪课程", "并排比较分数与入学机会", "排志愿前一目了然"], color: "teal" },
                { icon: TrendingUp, label: "选科策略", title: "Band A–E 选科策略", desc: "AI 根据你的分数与收生数据，建议哪些课程放 Band A、哪些放保底，排得稳妥又博得起。", bullets: ["进取到保底分层建议", "梦想课程与安全课程平衡排位", "20 个志愿部署一目了然"], color: "orange" },
                { icon: Wifi, label: "离线可用", title: "离线也能算分", desc: "计分器与收生数据离线也能用，随时随地拿出来算，不受网络限制。", bullets: ["计分功能完全离线运作", "收生数据已内建，不必等 loading", "只需首次下载时连接网络"], color: "teal" },
            ],
        },
        process: {
            title: "三步搞定升大学",
            steps: [
                { num: "01", title: "输入 DSE 成绩", desc: "填入你各科 DSE 成绩，App 自动套用八大计分公式，即时计分", icon: Calculator },
                { num: "02", title: "选心仪课程看分析", desc: "查看每个课程的计分与入学机会，AI 告诉你稳妥、进取还是保底", icon: BarChart3 },
                { num: "03", title: "AI 面试模拟操练", desc: "用约 1500 条真实面试题操练，AI 语音面试官即时评分给建议", icon: Mic },
            ],
        },
        reviews: {
            title: "真实用户评价",
            items: [
                { text: "以前要自己查 prospectus 逐科算分，算到头都晕。现在输入成绩立刻算出八大每个课程的分，省了好多时间。", name: "王同学", detail: "中六 DSE 应届", avatar: "王" },
                { text: "最赞的是 AI 入学分析，把我的分和历年 median、LQ 比，告诉我哪些稳妥哪些进取，排 Band A 的时候安心多了。", name: "陈同学", detail: "DSE 考生", avatar: "陈" },
                { text: "面试模拟帮了我很多，医科 MMI 那些题真的很像考评那些，练了几天真的找回信心，面试讲话没那么紧张。", name: "李同学", detail: "报读医科", avatar: "李" },
            ],
        },
        faq: {
            title: "常见问题",
            items: [
                { q: "计分准不准？数据从哪里来？", a: "计分器依据八大及自资院校公开的收生计分公式（Best 5、4C+2X、科目加权、加分制等）逐一实现，并对照社群整理的真实课程计分方法。结果仅供参考，正式收生以各院校公布为准。", icon: Calculator },
                { q: "覆盖多少个课程？", a: "目前涵盖约 440 个真实 JUPAS 课程，包括八大院校及主要自资院校的热门学系，并会持续更新。", icon: GraduationCap },
                { q: "AI 入学机会分析怎么算？", a: "AI 会将你的计分对比每个课程历年收生 median（中位数）与 LQ（下四分位数），判断你是稳妥、进取还是保底，再给出 Band A–E 排位策略建议。", icon: Brain },
                { q: "需要全程联网吗？", a: "不需要。计分器与收生数据参考支持离线使用；AI 入学分析与面试模拟则需要联网才能使用。", icon: Wifi },
                { q: "面试题符不符合真实？", a: "面试题库涵盖 14 个学系大类、约 1500 条题目，参考各热门学系真实面试常见题型（包括医科 MMI），中英双语，配 AI 即时评分与改善建议。", icon: Mic },
            ],
        },
        cta: { title: "从放榜算到进大学", subtitle: "计分、入学分析、面试模拟，一个 App 搞定升大学。免费下载，立即试。" },
        footer: { copyright: "© 2026 DSE Jupas 神器", tagline: "JUPAS 计分 · 入学分析 · 面试模拟", privacy: "隐私政策", terms: "使用条款" },
    },
    en: {
        nav: { features: "Features", reviews: "Reviews", faq: "FAQ", blog: "Guides", cta: "Download" },
        hero: {
            tagline: "JUPAS Scoring · Admission Analysis · Interview Sim · Free App",
            title: "Calculate Your JUPAS Score in a Second",
            titleHighlight: "Then See Which Uni You Can Get Into",
            subheading: "DSE Jupas does the scoring, analyses your admission chances and drills your interviews — your whole university journey in one app",
            subtitle: "Enter your DSE results and DSE Jupas instantly applies each university's admission scoring formula (Best 5, 4C+2X, subject weighting, bonus points) across the eight UGC universities and self-financing institutions. AI then compares your score against each programme's historical median and lower quartile, tells you whether it's safe, ambitious or a safety net — plus ~1,500 real interview questions to practise.",
            bullets: [
                "~440 real JUPAS programmes with one-tap scoring across all eight universities",
                "AI admission analysis — your score vs historical median / LQ, so you know where you stand",
                "University interview simulation — 14 faculty groups, ~1,500 questions, instant AI scoring",
            ],
            cta: "Download Free",
            secondaryCta: "Learn More",
            videoLabel: "App Demo",
        },
        stats: [
            { value: "~440", label: "Real JUPAS Programmes" },
            { value: "8", label: "University Scoring Formulas" },
            { value: "~1,500", label: "Interview Questions" },
        ],
        features: {
            title: "Why DSE Jupas?",
            subtitle: "Scoring, admission chances and interviews in one — from choosing programmes to knowing if you're safe to drilling your interview, one app takes you from results day to your offer",
            items: [
                { icon: Calculator, label: "JUPAS Scoring", title: "JUPAS Score Calculator", desc: "Enter your DSE results and instantly get your real score for every programme using each institution's own admission formula.", bullets: ["Best 5, 4C+2X, subject weighting & bonus points all supported", "Covers ~440 real JUPAS programmes", "Auto-switches formulas per institution for instant results"], color: "orange" },
                { icon: Brain, label: "AI Analysis", title: "AI Admission Analysis", desc: "Your score is compared against each programme's historical median and LQ — AI tells you if it's safe, ambitious or a safety net.", bullets: ["Compared against historical median & lower quartile", "AI verdict: safe / ambitious / safety net", "Includes Band A–E ranking strategy advice"], color: "teal" },
                { icon: Mic, label: "Interview Sim", title: "University Interview Simulation", desc: "An AI voice interviewer covering 14 faculty groups and ~1,500 real interview questions, with bilingual instant scoring.", bullets: ["Medicine, dentistry, law, business, education, social work, nursing & more", "Bilingual (Chinese & English) with instant AI scoring", "Actionable feedback until you feel confident"], color: "orange" },
                { icon: GraduationCap, label: "All 8 Unis", title: "Eight-University Scoring Formulas", desc: "HKU, CUHK, HKUST, CityU, PolyU, HKBU, EdUHK, LingnanU — every admission scoring formula built in.", bullets: ["Formulas for all eight unis & major self-financing schools", "Each university's scoring logic broken down", "No more digging through prospectuses by hand"], color: "teal" },
                { icon: BarChart3, label: "Admission Data", title: "Historical Admission Data", desc: "Every programme comes with historical median and LQ scores plus admission trends to help you read your position.", bullets: ["Median / LQ admission data per programme", "Score trends over recent years", "Use real data to judge where you can get in"], color: "orange" },
                { icon: ListChecks, label: "Wishlist", title: "Programme Wishlist", desc: "Add programmes you love to your wishlist and see your admission chances for each at a glance when ordering choices.", bullets: ["Save favourite programmes in one tap", "Compare scores & admission chances side by side", "See everything clearly before ranking choices"], color: "teal" },
                { icon: TrendingUp, label: "Choice Strategy", title: "Band A–E Choice Strategy", desc: "Based on your score and admission data, AI suggests which programmes to put in Band A and which as safety nets — ambitious yet safe.", bullets: ["Layered advice from ambitious to safety net", "Balance dream and safe programmes", "All 20 choices laid out at a glance"], color: "orange" },
                { icon: Wifi, label: "Offline", title: "Works Offline", desc: "The calculator and admission data work offline, so you can crunch numbers anytime, anywhere.", bullets: ["Scoring works fully offline", "Admission data built in — no loading wait", "Internet only needed for the first download"], color: "teal" },
            ],
        },
        process: {
            title: "3 Steps to Your University Offer",
            steps: [
                { num: "01", title: "Enter DSE Results", desc: "Fill in your subject grades and the app applies all eight scoring formulas instantly", icon: Calculator },
                { num: "02", title: "Pick Programmes & Analyse", desc: "See each programme's score and admission chances — AI tells you safe, ambitious or safety net", icon: BarChart3 },
                { num: "03", title: "Drill AI Interviews", desc: "Practise with ~1,500 real interview questions and an AI voice interviewer scoring you live", icon: Mic },
            ],
        },
        reviews: {
            title: "Real Student Reviews",
            items: [
                { text: "I used to dig through prospectuses and score each programme by hand until my head spun. Now I just enter my results and get scores for every uni programme instantly. Huge time-saver.", name: "Wong", detail: "Form 6 DSE Student", avatar: "W" },
                { text: "The best bit is the AI admission analysis — it compares my score against the historical median and LQ and tells me what's safe vs ambitious. Made ranking my Band A choices way less stressful.", name: "Chan", detail: "DSE Candidate", avatar: "C" },
                { text: "The interview simulation helped a lot. The Medicine MMI questions really felt like the real thing — a few days of practice and I genuinely got my confidence back.", name: "Lee", detail: "Applying for Medicine", avatar: "L" },
            ],
        },
        faq: {
            title: "Common Questions",
            items: [
                { q: "How accurate is the scoring? Where's the data from?", a: "The calculator implements the published admission scoring formulas of the eight universities and self-financing institutions (Best 5, 4C+2X, subject weighting, bonus points, etc.), cross-checked against community-compiled programme scoring methods. Results are for reference only; official admissions follow each institution's announcements.", icon: Calculator },
                { q: "How many programmes are covered?", a: "Currently ~440 real JUPAS programmes, including popular faculties across the eight universities and major self-financing institutions, with ongoing updates.", icon: GraduationCap },
                { q: "How does the AI admission analysis work?", a: "The AI compares your score against each programme's historical median and lower quartile (LQ), judges whether it's safe, ambitious or a safety net, then gives Band A–E ranking strategy advice.", icon: Brain },
                { q: "Do I need internet?", a: "No for the calculator and admission data reference — they work offline. AI admission analysis and interview simulation require a connection.", icon: Wifi },
                { q: "Are the interview questions realistic?", a: "The bank covers 14 faculty groups and ~1,500 questions modelled on each field's common interview formats (including Medicine MMI), bilingual, with instant AI scoring and improvement feedback.", icon: Mic },
            ],
        },
        cta: { title: "From Results Day to Your University Offer", subtitle: "Scoring, admission analysis and interview simulation — your whole university journey in one app. Download free and try it now." },
        footer: { copyright: "© 2026 DSE Jupas", tagline: "JUPAS Scoring · Admission Analysis · Interview Sim", privacy: "Privacy", terms: "Terms" },
    },
};

const getTranslation = (lang) => translations[lang] || translations["en"];

const FadeUp = ({ children, delay = 0, className }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

const FAQItem = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-gray-100 last:border-b-0">
        <button onClick={onClick} className="w-full flex items-center justify-between py-5 text-left group">
            <span className="text-base font-semibold text-gray-800 group-hover:text-amber-500 transition-colors pr-6 leading-snug">{question}</span>
            <div className={cn("w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 transition-transform duration-200", isOpen && "rotate-180 bg-amber-500")}>
                <ChevronDown size={15} className={cn("text-amber-500 transition-colors", isOpen && "text-white")} />
            </div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                    <p className="pb-5 text-gray-500 leading-relaxed text-sm pr-10">{answer}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

// Phone Mockup Video Placeholder
const PhoneMockup = ({ label }) => (
    <div className="relative flex items-center justify-center">
        {/* Glow */}
        <div className="absolute inset-0 bg-amber-400/20 blur-3xl rounded-full scale-75" />
        {/* Phone frame */}
        <div className="relative w-56 md:w-64 bg-gray-900 rounded-[3rem] shadow-2xl border-4 border-gray-800 overflow-hidden">
            {/* Status bar */}
            <div className="bg-gray-900 px-6 pt-3 pb-1 flex justify-between items-center">
                <span className="text-white text-[10px] font-medium">9:41</span>
                <div className="w-20 h-5 bg-gray-800 rounded-full" />
                <div className="flex gap-1">
                    <div className="w-3 h-2 bg-white/60 rounded-sm" />
                    <div className="w-1 h-2 bg-white/40 rounded-sm" />
                </div>
            </div>
            {/* Screen content placeholder */}
            <div className="bg-gradient-to-b from-amber-50 to-white min-h-[420px] flex flex-col items-center justify-center gap-4 px-4">
                <motion.div
                    className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-200"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Calculator size={28} className="text-white" />
                </motion.div>
                <p className="text-xs text-gray-400 font-medium text-center">{label}</p>
                {/* Fake UI cards: programme + score + band */}
                <div className="w-full space-y-2 mt-2">
                    {[
                        { name: "港大 醫學士", score: "41.5", band: "A" },
                        { name: "中大 環球商業", score: "37.0", band: "B" },
                        { name: "城大 法學士", score: "33.5", band: "C" },
                    ].map((row, i) => (
                        <motion.div
                            key={row.name}
                            className="bg-white rounded-xl px-3 py-2.5 shadow-sm border border-amber-100 flex items-center justify-between gap-2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.15 }}
                        >
                            <span className="text-[11px] font-semibold text-gray-700 truncate">{row.name}</span>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                <span className="text-xs font-bold text-amber-600">{row.score}</span>
                                <span className="text-[9px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded-full">Band {row.band}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            {/* Bottom bar */}
            <div className="bg-gray-900 h-8 flex items-center justify-center">
                <div className="w-24 h-1 bg-gray-600 rounded-full" />
            </div>
        </div>
    </div>
);

const BLOG_POSTS = [
    {
        url: "/blog/jupas-scoring-methods-explained",
        image: "/blog-covers/jupas-scoring-methods-explained.webp",
        category: "計分攻略",
        title: "JUPAS 計分方法全攻略：Best 5、4C+2X 同各大學收生公式拆解",
        desc: "八大院校點計分？Best 5、4C+2X、科目加權、加分制一次過拆清，附每間大學收生計分公式對照。",
        readTime: "12 分鐘",
    },
    {
        url: "/blog/jupas-band-a-strategy",
        image: "/blog-covers/jupas-band-a-strategy.webp",
        category: "選科策略",
        title: "JUPAS Band A 排位策略：20 個課程點排先穩陣又博得起",
        desc: "Band A 放夢想定保險？教你用收生 median／LQ 數據，由進取到保底排好 20 個志願。",
        readTime: "11 分鐘",
    },
    {
        url: "/blog/jupas-admission-scores-2026",
        image: "/blog-covers/jupas-admission-scores-2026.webp",
        category: "收生數據",
        title: "2026 JUPAS 收生分數參考：八大熱門課程 median 同 LQ 一覽",
        desc: "醫科、法律、環球商業、計算機⋯⋯八大熱門神科收生中位數同下四分位分數懶人包。",
        readTime: "13 分鐘",
    },
    {
        url: "/blog/university-interview-preparation",
        image: "/blog-covers/university-interview-preparation.webp",
        category: "面試攻略",
        title: "大學入學面試準備：醫科、法律、商科常見題 + 答題框架",
        desc: "Multiple Mini Interview 點應對？拆解各神科最常考嘅面試題，附 STAR 答題框架同示範。",
        readTime: "12 分鐘",
    },
    {
        url: "/blog/jupas-change-of-choices-guide",
        image: "/blog-covers/jupas-change-of-choices-guide.webp",
        category: "JUPAS 流程",
        title: "JUPAS 改選 Change of Choices 全指南：時間線同放榜前後策略",
        desc: "由 12 月到放榜，每個 JUPAS 改選窗口點部署？教你 DSE 放榜前後改選同補位策略。",
        readTime: "10 分鐘",
    },
];

// Feature visual mock-UI cards (one per feature, index 0-5)
const FeatureVisual = ({ index }) => {
    const cards = [
        // 0: 計分器結果卡
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-100 w-full max-w-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center flex-shrink-0">
                    <Calculator size={20} className="text-white" />
                </div>
                <div className="min-w-0">
                    <div className="font-bold text-gray-900 text-sm leading-tight">香港大學 內外全科醫學士</div>
                    <div className="text-xs text-gray-400">JS6456 · MBBS</div>
                </div>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4 text-center mb-4">
                <div className="text-[10px] text-amber-600 font-semibold uppercase tracking-wide mb-0.5">你嘅計分</div>
                <div className="text-4xl font-extrabold text-amber-600 leading-none">41.5</div>
                <span className="inline-block mt-2 text-[10px] font-bold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">Best 5 + 數理加權</span>
            </div>
            <div className="space-y-2">
                {[
                    { sub: "中文", grade: "5*" },
                    { sub: "英文", grade: "5" },
                    { sub: "數學", grade: "5*" },
                    { sub: "生物", grade: "5*" },
                    { sub: "化學", grade: "5" },
                ].map((r) => (
                    <div key={r.sub} className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">{r.sub}</span>
                        <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded-md">{r.grade}</span>
                    </div>
                ))}
            </div>
        </div>,

        // 1: 入學機會分析卡
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-sky-100 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="font-bold text-gray-900 text-sm">入學機會分析</div>
                <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">穩陣 ✓</span>
            </div>
            <div className="space-y-3 mb-4">
                {[
                    { label: "你嘅分", val: 41.5, pct: 92, color: "bg-amber-500", txt: "text-amber-600" },
                    { label: "收生 median", val: 39.0, pct: 78, color: "bg-sky-500", txt: "text-sky-600" },
                    { label: "收生 LQ", val: 37.5, pct: 68, color: "bg-sky-300", txt: "text-sky-500" },
                ].map((b) => (
                    <div key={b.label}>
                        <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="text-gray-500">{b.label}</span>
                            <span className={cn("font-bold", b.txt)}>{b.val}</span>
                        </div>
                        <div className="bg-gray-100 rounded-full h-2.5">
                            <div className={cn("h-2.5 rounded-full", b.color)} style={{ width: `${b.pct}%` }} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-sky-50 rounded-xl p-3">
                <div className="text-[11px] text-gray-600 leading-relaxed"><span className="font-bold text-sky-700">AI 建議：</span>你嘅分高於 median 2.5 分，屬穩陣之選，可放心排 Band A。</div>
            </div>
        </div>,

        // 2: 課程比較排行
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-100 w-full max-w-sm">
            <div className="flex items-center justify-between mb-1">
                <div className="font-bold text-gray-900 text-sm">課程比較</div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">你嘅分 41.5</span>
            </div>
            <div className="text-xs text-gray-400 mb-4">依入學機會排序</div>
            <div className="space-y-2.5">
                {[
                    { prog: "中大 環球商業", score: "37.0", band: "A", c: "bg-green-100 text-green-700" },
                    { prog: "港大 法學士", score: "39.5", band: "A", c: "bg-green-100 text-green-700" },
                    { prog: "科大 計算機科學", score: "35.0", band: "B", c: "bg-sky-100 text-sky-700" },
                    { prog: "城大 數據科學", score: "32.5", band: "B", c: "bg-sky-100 text-sky-700" },
                    { prog: "理大 工程學", score: "30.0", band: "C", c: "bg-amber-100 text-amber-700" },
                ].map((r) => (
                    <div key={r.prog} className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-800 flex-1 truncate">{r.prog}</span>
                        <span className="text-[11px] text-gray-400">{r.score}</span>
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", r.c)}>Band {r.band}</span>
                    </div>
                ))}
            </div>
        </div>,

        // 3: 收生分數趨勢
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-sky-100 w-full max-w-sm">
            <div className="font-bold text-gray-900 text-sm mb-1">收生分數趨勢</div>
            <div className="text-xs text-gray-400 mb-4">港大 內外全科醫學士 · 近 3 年</div>
            <div className="relative h-40 mb-4">
                <svg viewBox="0 0 260 110" className="w-full h-full">
                    <line x1="0" y1="25" x2="260" y2="25" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="55" x2="260" y2="55" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="85" x2="260" y2="85" stroke="#f1f5f9" strokeWidth="1" />
                    <text x="2" y="22" fontSize="7" fill="#cbd5e1">42</text>
                    <text x="2" y="52" fontSize="7" fill="#cbd5e1">39</text>
                    <text x="2" y="82" fontSize="7" fill="#cbd5e1">36</text>
                    {/* median line (amber) */}
                    <path d="M 30 45 L 130 38 L 230 35" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                    {/* LQ line (sky) */}
                    <path d="M 30 68 L 130 60 L 230 55" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" />
                    <text x="195" y="30" fontSize="8" fill="#f59e0b" fontWeight="bold">median</text>
                    <text x="205" y="68" fontSize="8" fill="#0ea5e9" fontWeight="bold">LQ</text>
                </svg>
                <div className="absolute bottom-0 left-7 right-2 flex justify-between text-[10px] text-gray-300">
                    <span>2023</span><span>2024</span><span>2025</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-amber-50 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-amber-600">39.0</div>
                    <div className="text-[10px] text-gray-400">median 中位數</div>
                </div>
                <div className="bg-sky-50 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-sky-600">37.5</div>
                    <div className="text-[10px] text-gray-400">LQ 下四分位</div>
                </div>
            </div>
        </div>,

        // 4: 面試題卡
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-100 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">醫科 Medicine</span>
                <span className="text-[10px] text-gray-400">MMI · 第 3 題</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">面試題</div>
                <div className="text-sm font-medium text-gray-800 leading-relaxed">病人拒絕接受你建議嘅治療方案，你會點處理？</div>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeDasharray="97.4" strokeDashoffset="17.5" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-lg font-extrabold text-amber-600 leading-none">82</span>
                        <span className="text-[8px] text-gray-400">分</span>
                    </div>
                </div>
                <div className="text-[11px] text-gray-600 leading-relaxed">
                    <span className="font-bold text-sky-700">AI 評語：</span>有同理心，結構清晰；可補充病人自主權同知情同意嘅倫理考量。
                </div>
            </div>
        </div>,

        // 5: 心願清單 / 選科進度 dashboard
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-sky-100 w-full max-w-sm">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <div className="font-bold text-gray-900 text-sm">心願清單</div>
                    <div className="text-xs text-gray-400">已收藏 12 個課程</div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-sky-500 flex items-center justify-center">
                    <ListChecks size={20} className="text-white" />
                </div>
            </div>
            <div className="space-y-3">
                {[
                    { band: "A", label: "進取", c: "text-green-700 bg-green-100", chips: ["港大 醫學", "中大 法律"] },
                    { band: "B", label: "穩陣", c: "text-sky-700 bg-sky-100", chips: ["科大 商學", "城大 數據"] },
                    { band: "C", label: "保底", c: "text-amber-700 bg-amber-100", chips: ["理大 工程", "浸大 傳理"] },
                ].map((g) => (
                    <div key={g.band}>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", g.c)}>Band {g.band}</span>
                            <span className="text-[10px] text-gray-400">{g.label}</span>
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                            {g.chips.map((ch) => (
                                <span key={ch} className="text-[11px] text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg">{ch}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 bg-sky-50 rounded-xl p-3 text-center">
                <span className="text-xs font-bold text-sky-700">20 個志願已排好 ✓</span>
            </div>
        </div>,
    ];
    return <div className="flex justify-center">{cards[index] ?? cards[0]}</div>;
};

export default function LandingPage({ initialLang = "zh-HK" }) {
    const [lang, setLang] = useState(initialLang);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openFAQ, setOpenFAQ] = useState(0);
    const [showMobileCTA, setShowMobileCTA] = useState(false);

    React.useEffect(() => { setLang(initialLang); }, [initialLang]);

    useEffect(() => {
        const update = () => {
            const y = window.scrollY;
            const docH = document.documentElement.scrollHeight;
            const winH = window.innerHeight;
            const nearBottom = y + winH > docH - 200;
            setShowMobileCTA(y > 400 && !nearBottom);
        };
        window.addEventListener("scroll", update, { passive: true });
        update();
        return () => window.removeEventListener("scroll", update);
    }, []);

    const t = getTranslation(lang);
    const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
    const showChineseName = lang.startsWith("zh");

    const featureColorMap = {
        orange: { bg: "bg-amber-50", icon: "text-amber-500", border: "border-amber-100", dot: "bg-amber-500" },
        teal:   { bg: "bg-sky-50",   icon: "text-sky-500",   border: "border-sky-100",   dot: "bg-sky-500"   },
    };

    return (
        <div className="min-h-screen font-sans bg-white overflow-hidden">
            <style>{`
                * { box-sizing: border-box; }
                .font-sans { font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans TC', 'PingFang TC', 'Segoe UI', sans-serif; }
                .gradient-text { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
                .hero-gradient { background: linear-gradient(135deg, #fffbeb 0%, #fff 50%, #f0f9ff 100%); }
                .cta-gradient { background: linear-gradient(135deg, #f59e0b 0%, #d97706 60%, #b45309 100%); }
                .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
                .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(245,158,11,0.12); }
            `}</style>

            {/* ===== NAVBAR ===== */}
            <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-6xl">
                    <a href="/" className="flex items-center gap-2.5">
                        <img src="/logo-transparent.png" alt="DSE Jupas 神器" className="w-10 h-10 object-contain" />
                        <div className="leading-tight">
                            <span className="font-bold text-gray-900 text-sm block">DSE Jupas 神器</span>
                            <span className="text-[10px] text-gray-400 block">JUPAS 計分 ・ 入學分析 ・ 面試模擬</span>
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex gap-7 text-sm text-gray-500">
                            <a href="#features" className="hover:text-amber-500 transition-colors font-medium">{t.nav.features}</a>
                            <a href="#faq"      className="hover:text-amber-500 transition-colors font-medium">{t.nav.faq}</a>
                            <a href="#reviews"  className="hover:text-amber-500 transition-colors font-medium">{t.nav.reviews}</a>
                            <a href="/blog/" className="hover:text-amber-500 transition-colors font-medium">{t.nav.blog}</a>
                            <a href="#scores" className="hover:text-amber-500 transition-colors font-medium">收生分數</a>
                        </div>
                        {/* Language picker */}
                        <div className="relative">
                            <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                <Globe size={14} /><span>{currentLang.name}</span>
                                <ChevronDown size={12} className={cn("transition-transform", langMenuOpen && "rotate-180")} />
                            </button>
                            {langMenuOpen && (
                                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 max-h-72 overflow-y-auto">
                                    {LANGUAGES.map((l) => (
                                        <a key={l.code} href={l.code === "zh-HK" ? "/" : `/${l.code.toLowerCase()}/`}
                                            className={cn("block px-4 py-2 text-sm text-gray-600 hover:bg-amber-50 hover:text-amber-500 transition-colors", lang === l.code && "text-amber-500 font-semibold bg-amber-50")}>
                                            {l.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <a href="https://apps.apple.com/app/id6780134101"
                            className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors shadow-md shadow-amber-200">
                            {t.nav.cta}
                        </a>
                    </div>

                    {/* Mobile burger */}
                    <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Menu size={22} className="text-gray-700" />
                    </button>
                </div>
            </nav>

            {/* ===== MOBILE MENU ===== */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 z-50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
                        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }} className="fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-2">
                                        <img src="/logo-transparent.png" alt="DSE Jupas 神器" className="w-9 h-9 object-contain" />
                                        <div className="leading-tight">
                                            <span className="font-bold text-gray-900 text-sm block">DSE Jupas 神器</span>
                                            <span className="text-[10px] text-gray-400 block">JUPAS 計分 ・ 入學分析 ・ 面試模擬</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                                        <X size={20} className="text-gray-600" />
                                    </button>
                                </div>
                                <nav className="flex flex-col gap-1">
                                    {[
                                        { label: t.nav.features, href: "#features" },
                                        { label: t.nav.faq,      href: "#faq"      },
                                        { label: t.nav.reviews,  href: "#reviews"  },
                                        { label: t.nav.blog,     href: "/blog/" },
                                    ].map((item) => (
                                        <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center justify-between text-gray-700 py-3 px-3 rounded-xl hover:bg-amber-50 hover:text-amber-500 transition-colors font-medium">
                                            {item.label} <ChevronRight size={16} className="text-gray-300" />
                                        </a>
                                    ))}
                                </nav>
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <a href="https://apps.apple.com/app/id6780134101"
                                        className="block text-center bg-amber-500 text-white font-semibold py-3 rounded-xl hover:bg-amber-600 transition-colors">
                                        {t.nav.cta}
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ===== HERO ===== */}
            <section className="hero-gradient pt-24 pb-20 md:pt-32 md:pb-28 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl relative">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left: Text */}
                        <div className="relative">
                            <FadeUp>
                                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-600 text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                    {t.hero.tagline}
                                </div>
                            </FadeUp>
                            <FadeUp delay={0.08}>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-4">
                                    {t.hero.title}<br />
                                    <span className="gradient-text">{t.hero.titleHighlight}</span>
                                </h1>
                            </FadeUp>
                            {t.hero.subheading && (
                                <FadeUp delay={0.12}>
                                    <p className="text-lg md:text-xl font-semibold text-gray-700 mb-4 max-w-lg">
                                        {t.hero.subheading}
                                    </p>
                                </FadeUp>
                            )}
                            <FadeUp delay={0.16}>
                                <p className="text-base text-gray-500 leading-relaxed mb-5 max-w-lg">
                                    {t.hero.subtitle}
                                </p>
                            </FadeUp>
                            {t.hero.bullets && (
                                <FadeUp delay={0.20}>
                                    <ul className="space-y-2.5 mb-8 max-w-lg">
                                        {t.hero.bullets.map((b, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                                                <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </FadeUp>
                            )}
                            <FadeUp delay={0.24} className="flex flex-wrap gap-3">
                                <a href="https://apps.apple.com/app/id6780134101" className="hover:opacity-90 transition-opacity">
                                    <img src="/ios-icon.png" alt="Download on App Store" className="h-12 w-auto" />
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=app.jupas.dse" className="hover:opacity-90 transition-opacity">
                                    <img src="/android-icon.png" alt="Get it on Google Play" className="h-12 w-auto" />
                                </a>
                            </FadeUp>
                        </div>

                        {/* Right: App demo video in phone frame */}
                        <FadeUp delay={0.12} className="flex justify-center md:justify-end">
                            <div className="relative">
                                {/* Glow */}
                                <div className="absolute inset-0 bg-amber-300/30 blur-3xl rounded-full scale-90" />
                                {/* Soft cream card */}
                                <div className="relative bg-gradient-to-br from-amber-50 to-white rounded-[2.6rem] p-6 shadow-xl border border-amber-100 w-[270px] md:w-[300px]">
                                    <img
                                        src="/app/illu_calc.png"
                                        className="w-full h-auto block drop-shadow-md"
                                        alt={t.hero.videoLabel}
                                    />
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* ===== STATS STRIP ===== */}
            <section className="bg-white border-y border-gray-100 py-8">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="grid grid-cols-3 divide-x divide-gray-100">
                        {t.stats.map((s, i) => (
                            <FadeUp key={i} delay={i * 0.08} className="flex flex-col items-center py-2">
                                <span className="text-2xl md:text-3xl font-extrabold gradient-text">{s.value}</span>
                                <span className="text-xs text-gray-400 font-medium mt-1 text-center">{s.label}</span>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FEATURES ===== */}
            <section id="features" className="py-20 bg-slate-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <FadeUp className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-3">
                            <motion.img
                                src="/app/star_cheer.png"
                                alt="DSE Jupas 神器 星星吉祥物"
                                aria-hidden="true"
                                className="w-10 h-10 md:w-12 md:h-12 pointer-events-none select-none"
                                initial={{ rotate: -8 }}
                                animate={{ rotate: [-8, 4, -8] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">{t.features.title}</h2>
                        </div>
                        <p className="text-gray-500 max-w-xl mx-auto">{t.features.subtitle}</p>
                    </FadeUp>
                    <div className="space-y-20 md:space-y-28">
                        {t.features.items.map((feature, i) => {
                            const isEven = i % 2 === 0;
                            const accentBg = isEven ? "bg-amber-100 text-amber-600" : "bg-sky-100 text-sky-600";
                            const checkColor = isEven ? "bg-amber-100 text-amber-500" : "bg-sky-100 text-sky-500";
                            const TextBlock = (
                                <div className="flex flex-col justify-center">
                                    <div className={cn("inline-block self-start text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide uppercase", accentBg)}>
                                        {feature.label || feature.title}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">{feature.title}</h3>
                                    <p className="text-gray-500 leading-relaxed mb-6 text-lg">{feature.desc}</p>
                                    {feature.bullets && (
                                        <ul className="space-y-3">
                                            {feature.bullets.map((b, j) => (
                                                <li key={j} className="flex items-center gap-3 text-gray-700">
                                                    <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0", checkColor)}>
                                                        <CheckCircle2 size={13} />
                                                    </div>
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                            const Visual = <FeatureVisual index={i} />;
                            return (
                                <div key={i} className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                                    {isEven ? (
                                        <><FadeUp>{Visual}</FadeUp><FadeUp delay={0.1}>{TextBlock}</FadeUp></>
                                    ) : (
                                        <><FadeUp>{TextBlock}</FadeUp><FadeUp delay={0.1}>{Visual}</FadeUp></>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-5xl relative">
                    <FadeUp className="text-center mb-14">
                        <div className="inline-flex items-center gap-3">
                            <motion.img
                                src="/app/star_think.png"
                                alt="DSE Jupas 神器 星星吉祥物"
                                aria-hidden="true"
                                className="w-10 h-10 md:w-12 md:h-12 pointer-events-none select-none"
                                initial={{ rotate: 8 }}
                                animate={{ rotate: [8, -6, 8] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">{t.process.title}</h2>
                        </div>
                    </FadeUp>
                    <div className="grid md:grid-cols-3 gap-6 relative">
                        {/* Connector line (desktop) */}
                        <div className="hidden md:block absolute top-10 left-[calc(33.3%+1rem)] right-[calc(33.3%+1rem)] h-px bg-amber-200 z-0" />
                        {t.process.steps.map((step, i) => (
                            <FadeUp key={i} delay={i * 0.12} className="relative z-10">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 rounded-3xl bg-amber-50 border-2 border-amber-200 flex flex-col items-center justify-center mb-5 shadow-sm">
                                        <step.icon size={26} className="text-amber-500" />
                                        <span className="text-[10px] font-black text-amber-300 mt-0.5 tracking-widest">{step.num}</span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== INTERVIEW SIM DEMO ===== */}
            <section className="py-20 bg-gradient-to-br from-amber-50 via-white to-sky-50 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-5xl relative">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <FadeUp>
                            <div className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 bg-sky-100 text-sky-700 uppercase tracking-wide">
                                AI 面試模擬
                            </div>
                            <div className="flex items-start gap-3 mb-5">
                                <motion.img
                                    src="/app/star_wave.png"
                                    alt="DSE Jupas 神器 星星吉祥物"
                                    aria-hidden="true"
                                    className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 mt-1 pointer-events-none select-none"
                                    initial={{ rotate: -10 }}
                                    animate={{ rotate: [-10, 6, -10] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                                    唔止計到分——<br/>
                                    <span className="gradient-text">AI 面試官陪你操到有信心</span>
                                </h2>
                            </div>
                            <p className="text-gray-500 leading-relaxed text-lg mb-6 max-w-md">
                                揀好心儀學系，AI 語音面試官即場出真實面試題——醫科 MMI、法律、商科都有。你答完即時評分，仲會話你邊度好、邊度可以改善，練到面試嗰日唔再驚。
                            </p>
                            <ul className="space-y-3 text-gray-700">
                                {[
                                    "14 個學系大類、約 1500 條真實面試題",
                                    "AI 語音面試官，中英雙語即時評分",
                                    "逐題俾改善建議，操到有信心為止",
                                ].map((b, j) => (
                                    <li key={j} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 size={13} />
                                        </div>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </FadeUp>
                        <FadeUp delay={0.12} className="flex justify-center md:justify-end">
                            <div className="relative">
                                <div className="absolute inset-0 bg-sky-300/30 blur-3xl rounded-full scale-90" />
                                <div className="relative bg-gradient-to-br from-sky-50 to-white rounded-[2.6rem] p-6 shadow-xl border border-sky-100 w-[270px] md:w-[300px]">
                                    <img
                                        src="/app/illu_mock.png"
                                        className="w-full h-auto block drop-shadow-md"
                                        alt="DSE Jupas 神器 面試模擬示範"
                                    />
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* ===== REVIEWS ===== */}
            <section id="reviews" className="py-20 bg-gray-50 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl relative">
                    <FadeUp className="text-center mb-12">
                        <div className="inline-flex items-center gap-3">
                            <motion.img
                                src="/app/illu_analysis.png"
                                alt="DSE Jupas 神器 星星吉祥物"
                                aria-hidden="true"
                                className="w-10 h-10 md:w-12 md:h-12 pointer-events-none select-none"
                                initial={{ rotate: -12 }}
                                animate={{ rotate: [-12, 4, -12] }}
                                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">{t.reviews.title}</h2>
                        </div>
                    </FadeUp>
                    <div className="grid md:grid-cols-3 gap-6">
                        {t.reviews.items.map((review, i) => (
                            <FadeUp key={i} delay={i * 0.1}>
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 card-hover h-full flex flex-col">
                                    <div className="flex gap-0.5 mb-4">
                                        {[...Array(5)].map((_, si) => (
                                            <Star key={si} size={14} className="text-amber-400 fill-amber-400" />
                                        ))}
                                    </div>
                                    <Quote size={20} className="text-amber-200 mb-3" />
                                    <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-6">{review.text}</p>
                                    <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                            {review.avatar}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-800 text-sm">{review.name}</div>
                                            <div className="text-gray-400 text-xs">{review.detail}</div>
                                        </div>
                                    </div>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== BLOG ===== */}
            <section id="blog" className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <FadeUp className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-3">
                            <motion.img
                                src="/app/illu_report.png"
                                alt="DSE Jupas 神器 星星吉祥物"
                                aria-hidden="true"
                                className="w-10 h-10 md:w-12 md:h-12 pointer-events-none select-none"
                                initial={{ rotate: -10 }}
                                animate={{ rotate: [-10, 4, -10] }}
                                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">JUPAS 升學攻略</h2>
                        </div>
                        <p className="text-gray-500 max-w-xl mx-auto">由計分、選科到面試準備，一站式幫你升大學</p>
                    </FadeUp>
                    <div className="grid md:grid-cols-3 gap-6">
                        {BLOG_POSTS.slice(0, 6).map((post, i) => (
                            <FadeUp key={i} delay={i * 0.1}>
                                <a href={post.url} className="group block bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                                    {post.image && (
                                        <div className="aspect-[16/9] overflow-hidden bg-amber-50">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                loading="lazy"
                                                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full">{post.category}</span>
                                            <span className="text-xs text-gray-400">{post.readTime}閱讀</span>
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-amber-500 transition-colors mb-3 line-clamp-2">{post.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-grow">{post.desc}</p>
                                        <div className="flex items-center gap-1 mt-5 text-amber-500 text-sm font-semibold">
                                            閱讀全文 <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </a>
                            </FadeUp>
                        ))}
                    </div>
                    <FadeUp className="text-center mt-10">
                        <a href="/blog/" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-amber-500 transition-colors text-sm font-medium">
                            查看所有升學攻略 <ChevronRight size={14} />
                        </a>
                    </FadeUp>
                </div>
            </section>

            {/* ===== ADMISSION SCORES PREVIEW ===== */}
            <section id="scores" className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <FadeUp className="text-center mb-12">
                        <div className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 bg-amber-100 text-amber-700 uppercase tracking-wider">八大收生數據</div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">JUPAS 收生分數參考</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">每個課程附歷年收生 median 同 LQ，輸入你嘅分即知入學機會。App 已內建約 440 個真實課程嘅收生數據。</p>
                    </FadeUp>

                    <FadeUp delay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
                        {[
                            { val: "約 440", label: "真實 JUPAS 課程" },
                            { val: "八大", label: "院校計分公式" },
                            { val: "median / LQ", label: "歷年收生數據" },
                            { val: "免費", label: "下載使用" },
                        ].map((s, i) => (
                            <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-center">
                                <div className="text-2xl md:text-3xl font-extrabold text-amber-500">{s.val}</div>
                                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                            </div>
                        ))}
                    </FadeUp>

                    <FadeUp delay={0.2} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border-separate border-spacing-0 min-w-[640px]">
                                <thead>
                                    <tr className="bg-gray-900 text-white">
                                        <th className="text-left px-4 py-3 font-semibold">院校</th>
                                        <th className="text-left px-4 py-3 font-semibold">課程</th>
                                        <th className="text-left px-4 py-3 font-semibold">計分</th>
                                        <th className="text-right px-4 py-3 font-semibold">median</th>
                                        <th className="text-right px-4 py-3 font-semibold">LQ</th>
                                        <th className="text-right px-4 py-3 font-semibold">參考 Band</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {[
                                        { uni: "港大", prog: "內外全科醫學士", method: "Best 5 + 數理加權", median: "39.0", lq: "37.5", band: "A" },
                                        { uni: "中大", prog: "環球商業學", method: "4C+2X", median: "37.0", lq: "35.0", band: "A" },
                                        { uni: "港大", prog: "法學士", method: "Best 5", median: "38.5", lq: "36.5", band: "A" },
                                        { uni: "科大", prog: "計算機科學", method: "Best 5 + 加分", median: "34.0", lq: "31.5", band: "B" },
                                        { uni: "城大", prog: "數據科學", method: "Best 5", median: "31.0", lq: "29.0", band: "B" },
                                    ].map((r) => (
                                        <tr key={r.prog} className="even:bg-gray-50 border-t border-gray-100">
                                            <td className="px-4 py-3 font-bold text-gray-900">{r.uni}</td>
                                            <td className="px-4 py-3">{r.prog}</td>
                                            <td className="px-4 py-3 text-xs text-gray-500">{r.method}</td>
                                            <td className="px-4 py-3 text-right font-semibold text-amber-600">{r.median}</td>
                                            <td className="px-4 py-3 text-right text-sky-600">{r.lq}</td>
                                            <td className="px-4 py-3 text-right">
                                                <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 bg-sky-50 px-2 py-1 rounded-md">Band {r.band}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-amber-50/60 text-xs text-gray-600 border-t border-gray-100">
                            <strong className="text-gray-900">點樣讀：</strong>median 係課程歷年收生中位數、LQ 係下四分位數。你嘅計分高過 median 通常較穩陣，介乎 LQ 同 median 之間屬進取，低過 LQ 則建議放保底。數字僅供參考，正式收生以各院校公佈為準。
                        </div>
                    </FadeUp>

                    <FadeUp delay={0.3} className="mt-10 text-center">
                        <p className="text-gray-500 text-sm mb-5">App 已內建約 440 個課程嘅 median／LQ 收生數據 + AI 入學機會分析 + 面試模擬</p>
                        <a href="https://apps.apple.com/app/id6780134101" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-7 py-3.5 rounded-full transition-colors shadow-lg shadow-amber-200">
                            免費下載 DSE Jupas 神器 <ChevronRight size={16} />
                        </a>
                    </FadeUp>
                </div>
            </section>

            {/* ===== FAQ ===== */}
            <section id="faq" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-2xl">
                    <FadeUp className="text-center mb-12">
                        <div className="inline-flex items-center gap-3">
                            <motion.img
                                src="/app/star_think.png"
                                alt="DSE Jupas 神器 星星吉祥物"
                                aria-hidden="true"
                                className="w-10 h-10 md:w-12 md:h-12 pointer-events-none select-none"
                                initial={{ rotate: 8 }}
                                animate={{ rotate: [8, -6, 8] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">{t.faq.title}</h2>
                        </div>
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-6">
                            {t.faq.items.map((item, i) => (
                                <FAQItem key={i} question={item.q} answer={item.a} isOpen={openFAQ === i} onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)} />
                            ))}
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <FadeUp>
                        <div className="cta-gradient rounded-3xl px-8 py-14 text-center relative overflow-hidden">
                            {/* Decorative circles */}
                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full" />
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full" />
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-3 mb-3">
                                    <motion.img
                                        src="/app/star_cheer.png"
                                        alt="DSE Jupas 神器 星星吉祥物"
                                        aria-hidden="true"
                                        className="w-10 h-10 md:w-12 md:h-12 pointer-events-none select-none drop-shadow-lg"
                                        initial={{ rotate: 10 }}
                                        animate={{ rotate: [10, -6, 10] }}
                                        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">{t.cta.title}</h2>
                                </div>
                                <p className="text-amber-50 mb-10 text-lg max-w-xl mx-auto">{t.cta.subtitle}</p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <a href="https://apps.apple.com/app/id6780134101" className="hover:opacity-90 transition-opacity drop-shadow-lg">
                                        <img src="/ios-icon.png" alt="Download on App Store" className="h-14 w-auto" />
                                    </a>
                                    <a href="https://play.google.com/store/apps/details?id=app.jupas.dse" className="hover:opacity-90 transition-opacity drop-shadow-lg">
                                        <img src="/android-icon.png" alt="Get it on Google Play" className="h-14 w-auto" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* Sticky mobile download bar */}
            <div className={cn(
                "md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                showMobileCTA ? "translate-y-0" : "translate-y-full"
            )}>
                <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
                    <div className="flex items-center gap-2.5">
                        <img src="/logo-80.webp" alt="DSE Jupas 神器" className="w-10 h-10 rounded-xl border border-amber-100 flex-shrink-0" width={40} height={40} />
                        <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-bold text-gray-900 leading-tight truncate">
                                {showChineseName ? "DSE Jupas 神器" : "DSE Jupas"}
                            </p>
                            <p className="text-[10.5px] text-gray-400 leading-tight mt-0.5 flex items-center gap-1">
                                <span className="text-amber-400">★</span>
                                <span className="text-gray-700 font-medium">4.9</span>
                                <span className="text-gray-300">·</span>
                                <span>{t.hero.cta}</span>
                            </p>
                        </div>
                        <a href="https://apps.apple.com/app/id6780134101" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-amber-500 active:bg-amber-600 text-white text-[12px] font-semibold px-3 py-2 rounded-lg shadow-sm flex-shrink-0">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                            iOS
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=app.jupas.dse" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-white text-gray-900 border border-gray-200 active:border-amber-300 text-[12px] font-semibold px-3 py-2 rounded-lg shadow-sm flex-shrink-0">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.61V3.39a1 1 0 0 1 1.53-.85l14.12 8.61a1 1 0 0 1 0 1.7L4.53 21.46A1 1 0 0 1 3 20.61z"/></svg>
                            Android
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
}
