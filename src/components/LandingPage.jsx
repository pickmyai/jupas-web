import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Quote, CheckCircle2, Wifi, Globe, ChevronDown, Menu, X,
    ChevronRight, Star, Brain, BarChart3, Calculator, GraduationCap,
    Mic, TrendingUp, Award, ListChecks
} from "lucide-react";
import { cn } from "../lib/utils";

export const LANGUAGES = [
    { code: "zh-HK", name: "繁體中文 (香港)" },
    { code: "zh-CN", name: "简体中文" },
    { code: "en", name: "English" },
];

export const translations = {
    "zh-HK": {
        nav: { features: "功能", reviews: "使用情境", faq: "常見問題", blog: "升學攻略", cta: "下載 App" },
        resultsBanner: { label: "2026 DSE 放榜季", text: "7 月 15 日放榜．JUPAS 改選 48 小時攻略", cta: "睇放榜時間表" },
        hero: {
            tagline: "JUPAS 計分 · 出路評級 · 入學分析 · 面試模擬",
            title: "一秒計好 JUPAS 分數",
            titleHighlight: "再睇清入學機會同出路",
            subheading: "DSE Jupas 神器幫你計分、分析入學機會、比較出路評級、操練面試，一個 App 搞掂升大學",
            subtitle: "輸入 DSE 成績，自動套用八大及自資院校嘅收生計分公式（Best 5、4C+2X、科目加權、加分制），即時計出每個課程分數；再用 AI 對比歷年收生 median 同 LQ，配合 413 個課程嘅 6 維出路評級，睇清邊科穩陣、邊科進取、邊科職涯 ROI 最高，仲有約 1500 條面試練習題等你操練。",
            disclaimer: "非 JUPAS 官方網站或 JUPAS Office 認可服務；資料及分析只供升學參考，正式安排以 JUPAS 及各院校公布為準。",
            bullets: [
                "約 440 個 JUPAS 課程資料，八大計分公式一鍵套用",
                "413 個課程出路評級——就業、薪酬、抗 AI、升學、院校排名、技能複利一眼比較",
                "AI 入學機會分析——你嘅分對比歷年 median／LQ，再結合出路評級講策略",
                "大學面試模擬——14 個學系大類、約 1500 條練習題，AI 即時評分",
            ],
            cta: "免費下載",
            secondaryCta: "了解更多",
            videoLabel: "App 示範",
        },
        stats: [
            { value: "約 440", label: "JUPAS 課程資料" },
            { value: "413", label: "課程出路評級" },
            { value: "八大", label: "院校計分公式" },
            { value: "約 1500", label: "大學面試題" },
        ],
        features: {
            title: "點解揀 DSE Jupas 神器？",
            subtitle: "計分、入學機會、出路評級、課程比較、面試操練一站式——由放榜計到入大學",
            items: [
                { icon: Calculator, label: "JUPAS 計分", title: "JUPAS 計分神器", desc: "輸入 DSE 成績，自動套用八大及自資院校唔同收生計分公式，即時計出每個課程嘅對應分數。", bullets: ["Best 5、4C+2X、科目加權、加分制全支援", "涵蓋約 440 個 JUPAS 課程資料", "唔同院校公式自動切換，即時出分"], color: "orange" },
                { icon: Brain, label: "AI 入學分析", title: "AI 入學機會分析", desc: "你嘅分數對比每個課程歷年收生 median 同 LQ，AI 話你知係穩陣、進取定保底。", bullets: ["對比歷年收生中位數同下四分位", "AI 判斷穩陣／進取／保底", "俾埋 Band A–E 排位策略建議"], color: "teal" },
                { icon: Award, label: "出路評級", title: "413 個課程出路評級", desc: "已評級課程會以 A+ 至 C+ 顯示職涯 ROI 參考，按 6 個維度評估，唔止睇收生分數。", bullets: ["就業前景、薪酬回報、抗 AI 能力", "升學潛力、院校排名、技能複利", "可按出路評級排序，配合分數差篩選"], color: "orange" },
                { icon: BarChart3, label: "課程比較", title: "課程比較雷達圖", desc: "兩三個課程並排比較，分數、入學機會、出路評級、薪酬、學費一次睇清。", bullets: ["多課程出路評級雷達圖疊線比較", "A/B/C 等級並排顯示", "幫你喺相近分數課程之間揀得更有根據"], color: "teal" },
                { icon: Mic, label: "面試模擬", title: "大學面試模擬", desc: "AI 語音面試官，涵蓋 14 個學系大類、約 1500 條面試練習題，中英雙語即時評分。", bullets: ["醫、牙、法律、商、教育、社工、護理常見題型", "中英雙語，AI 即時評分", "附改善建議，練到有信心為止"], color: "orange" },
                { icon: GraduationCap, label: "八大全覆蓋", title: "八大院校計分公式", desc: "港大、中大、科大、城大、理大、浸大、教大、嶺大——八大收生計分公式全部內建。", bullets: ["八大及主要自資院校公式齊備", "每間大學收生計分邏輯逐一拆解", "唔使再自己查 prospectus 慢慢計"], color: "teal" },
                { icon: BarChart3, label: "收生數據", title: "歷年收生數據參考", desc: "每個課程附歷年收生 median 同 LQ，仲有收生分數趨勢，幫你判斷自己嘅位置。", bullets: ["median／LQ 收生數據逐科呈現", "過去幾年收生分數趨勢圖", "用歷年數據參考自己位置"], color: "orange" },
                { icon: TrendingUp, label: "選科策略", title: "Band A–E 選科策略", desc: "AI 根據你嘅分數同收生數據，建議邊啲課程放 Band A、邊啲放保底，排得穩陣又博得起。", bullets: ["進取到保底分層建議", "夢想課程同安全課程平衡排位", "20 個志願部署一目了然"], color: "orange" },
            ],
        },
        process: {
            title: "三步搞掂升大學",
            steps: [
                { num: "01", title: "輸入 DSE 成績", desc: "填入你各科 DSE 成績，App 自動套用八大計分公式，即時計分", icon: Calculator },
                { num: "02", title: "睇入學機會同出路評級", desc: "比較每個課程嘅收生分數、機會、A+ 至 C+ 出路評級，再決定點排志願", icon: Award },
                { num: "03", title: "AI 面試模擬操練", desc: "用約 1500 條面試練習題操練，AI 語音面試官即時評分俾建議", icon: Mic },
            ],
        },
        reviews: {
            title: "學生使用情境",
            items: [
                { text: "以前要自己查 prospectus 逐科計分，計到頭都暈。而家輸入成績即刻出晒八大每個課程嘅分，慳返好多時間。", name: "Wong 同學", detail: "中六 DSE 應屆", avatar: "王" },
                { text: "最正係 AI 入學分析，將我嘅分同歷年 median、LQ 比，話我知邊啲穩陣邊啲進取，排 Band A 嘅時候安心好多。", name: "Chan 同學", detail: "DSE 考生", avatar: "陳" },
                { text: "面試模擬幫到我好多，醫科 MMI 常見追問方式都有得練，練咗幾日真係夾返有信心，面試講嘢冇咁驚。", name: "Lee 同學", detail: "報讀醫科", avatar: "李" },
            ],
        },
        faq: {
            title: "常見問題",
            items: [
                { q: "計分準唔準？數據邊度嚟？", a: "計分器依據八大及自資院校公開嘅收生計分公式（Best 5、4C+2X、科目加權、加分制等）逐一實現，並對照公開及整理所得嘅 JUPAS 課程計分資料。結果只供參考，正式收生以各院校公佈為準。", icon: Calculator },
                { q: "覆蓋幾多個課程？", a: "目前整理約 440 個 JUPAS 課程資料，包括八大院校及主要自資院校嘅熱門學系，並會持續更新。", icon: GraduationCap },
                { q: "AI 入學機會分析點計？", a: "AI 會將你嘅計分對比每個課程歷年收生 median（中位數）同 LQ（下四分位數），判斷你係穩陣、進取定保底，再結合出路評級俾 Band A–E 排位策略建議。", icon: Brain },
                { q: "出路評級係咩？", a: "出路評級係職涯 ROI 導向參考，413 個課程按就業前景、升學潛力、抗 AI 能力、院校排名、薪酬回報、技能複利 6 個維度評估，再用 A+ 至 C+ 顯示。它唔等同官方意見，亦唔代表課程學術價值或個人適合度。", icon: Award },
                { q: "需要全程連網嗎？", a: "唔需要。計分器同收生數據參考支援離線使用；AI 入學分析同面試模擬需要連網先用到。", icon: Wifi },
                { q: "面試題庫點樣參考？", a: "面試題庫涵蓋 14 個學系大類、約 1500 條練習題，參考各熱門學系常見面試題型（包括醫科 MMI），中英雙語，配 AI 即時評分同改善建議。", icon: Mic },
            ],
        },
        cta: {
            title: "由放榜計到入大學",
            subtitle: "計分、出路評級、入學分析、課程比較、面試模擬，一個 App 搞掂升大學。免費下載，即刻試。",
        },
        footer: {
            copyright: "© 2026 DSE Jupas 神器",
            tagline: "JUPAS 計分 · 出路評級 · 入學分析 · 面試模擬",
            privacy: "私隱政策",
            terms: "使用條款",
        },
    },
    "zh-CN": {
        nav: { features: "功能", reviews: "使用情境", faq: "常见问题", blog: "升学攻略", cta: "下载 App" },
        resultsBanner: { label: "2026 DSE 放榜季", text: "7 月 15 日放榜．JUPAS 改选 48 小时攻略", cta: "看放榜时间表" },
        hero: {
            tagline: "JUPAS 计分 · 出路评级 · 入学分析 · 面试模拟",
            title: "一秒算好 JUPAS 分数",
            titleHighlight: "再看清入学机会和出路",
            subheading: "DSE Jupas 神器帮你计分、分析入学机会、比较出路评级、操练面试，一个 App 搞定升大学",
            subtitle: "输入 DSE 成绩，自动套用八大及自资院校的收生计分公式（Best 5、4C+2X、科目加权、加分制），即时算出每个课程分数；再用 AI 对比历年收生 median 与 LQ，配合 413 个课程的 6 维出路评级，看清哪个课程稳妥、哪个进取、哪个职业 ROI 最高，还有约 1500 条面试练习题供你操练。",
            disclaimer: "非 JUPAS 官方网站或 JUPAS Office 认可服务；资料及分析只供升学参考，正式安排以 JUPAS 及各院校公布为准。",
            bullets: [
                "约 440 个 JUPAS 课程资料，八大计分公式一键套用",
                "413 个课程出路评级——就业、薪酬、抗 AI、升学、院校排名、技能复利一眼比较",
                "AI 入学机会分析——你的分数对比历年 median／LQ，再结合出路评级讲策略",
                "大学面试模拟——14 个学系大类、约 1500 条练习题，AI 即时评分",
            ],
            cta: "免费下载",
            secondaryCta: "了解更多",
            videoLabel: "App 示范",
        },
        stats: [
            { value: "约 440", label: "JUPAS 课程资料" },
            { value: "413", label: "课程出路评级" },
            { value: "八大", label: "院校计分公式" },
            { value: "约 1500", label: "大学面试题" },
        ],
        features: {
            title: "为何选择 DSE Jupas 神器？",
            subtitle: "计分、入学机会、出路评级、课程比较、面试操练一站式——从放榜算到进大学",
            items: [
                { icon: Calculator, label: "JUPAS 计分", title: "JUPAS 计分神器", desc: "输入 DSE 成绩，自动套用八大及自资院校不同收生计分公式，即时算出每个课程的对应分数。", bullets: ["Best 5、4C+2X、科目加权、加分制全支持", "涵盖约 440 个 JUPAS 课程资料", "不同院校公式自动切换，即时出分"], color: "orange" },
                { icon: Brain, label: "AI 入学分析", title: "AI 入学机会分析", desc: "你的分数对比每个课程历年收生 median 与 LQ，AI 告诉你是稳妥、进取还是保底。", bullets: ["对比历年收生中位数与下四分位", "AI 判断稳妥／进取／保底", "附带 Band A–E 排位策略建议"], color: "teal" },
                { icon: Award, label: "出路评级", title: "413 个课程出路评级", desc: "已评级课程会以 A+ 至 C+ 显示职业 ROI 参考，按 6 个维度评估，不只看收生分数。", bullets: ["就业前景、薪酬回报、抗 AI 能力", "升学潜力、院校排名、技能复利", "可按出路评级排序，配合分数差筛选"], color: "orange" },
                { icon: BarChart3, label: "课程比较", title: "课程比较雷达图", desc: "两三个课程并排比较，分数、入学机会、出路评级、薪酬、学费一次看清。", bullets: ["多课程出路评级雷达图叠线比较", "A/B/C 等级并排显示", "帮你在相近分数课程之间选得更有根据"], color: "teal" },
                { icon: Mic, label: "面试模拟", title: "大学面试模拟", desc: "AI 语音面试官，涵盖 14 个学系大类、约 1500 条面试练习题，中英双语即时评分。", bullets: ["医、牙、法律、商、教育、社工、护理常见题型", "中英双语，AI 即时评分", "附改善建议，练到有信心为止"], color: "orange" },
                { icon: GraduationCap, label: "八大全覆盖", title: "八大院校计分公式", desc: "港大、中大、科大、城大、理大、浸大、教大、岭大——八大收生计分公式全部内建。", bullets: ["八大及主要自资院校公式齐备", "每间大学收生计分逻辑逐一拆解", "不必再自己查 prospectus 慢慢算"], color: "teal" },
                { icon: BarChart3, label: "收生数据", title: "历年收生数据参考", desc: "每个课程附历年收生 median 与 LQ，还有收生分数趋势，帮你判断自己的位置。", bullets: ["median／LQ 收生数据逐科呈现", "过去数年收生分数趋势图", "用历年数据参考自己位置"], color: "orange" },
                { icon: TrendingUp, label: "选科策略", title: "Band A–E 选科策略", desc: "AI 根据你的分数与收生数据，建议哪些课程放 Band A、哪些放保底，排得稳妥又博得起。", bullets: ["进取到保底分层建议", "梦想课程与安全课程平衡排位", "20 个志愿部署一目了然"], color: "orange" },
            ],
        },
        process: {
            title: "三步搞定升大学",
            steps: [
                { num: "01", title: "输入 DSE 成绩", desc: "填入你各科 DSE 成绩，App 自动套用八大计分公式，即时计分", icon: Calculator },
                { num: "02", title: "看入学机会和出路评级", desc: "比较每个课程的收生分数、机会、A+ 至 C+ 出路评级，再决定怎样排志愿", icon: Award },
                { num: "03", title: "AI 面试模拟操练", desc: "用约 1500 条面试练习题操练，AI 语音面试官即时评分给建议", icon: Mic },
            ],
        },
        reviews: {
            title: "学生使用情境",
            items: [
                { text: "以前要自己查 prospectus 逐科算分，算到头都晕。现在输入成绩立刻算出八大每个课程的分，省了好多时间。", name: "王同学", detail: "中六 DSE 应届", avatar: "王" },
                { text: "最赞的是 AI 入学分析，把我的分和历年 median、LQ 比，告诉我哪些稳妥哪些进取，排 Band A 的时候安心多了。", name: "陈同学", detail: "DSE 考生", avatar: "陈" },
                { text: "面试模拟帮了我很多，医科 MMI 常见追问方式都有得练，练了几天真的找回信心，面试讲话没那么紧张。", name: "李同学", detail: "报读医科", avatar: "李" },
            ],
        },
        faq: {
            title: "常见问题",
            items: [
                { q: "计分准不准？数据从哪里来？", a: "计分器依据八大及自资院校公开的收生计分公式（Best 5、4C+2X、科目加权、加分制等）逐一实现，并对照公开及整理所得的 JUPAS 课程计分资料。结果仅供参考，正式收生以各院校公布为准。", icon: Calculator },
                { q: "覆盖多少个课程？", a: "目前整理约 440 个 JUPAS 课程资料，包括八大院校及主要自资院校的热门学系，并会持续更新。", icon: GraduationCap },
                { q: "AI 入学机会分析怎么算？", a: "AI 会将你的计分对比每个课程历年收生 median（中位数）与 LQ（下四分位数），判断你是稳妥、进取还是保底，再结合出路评级给出 Band A–E 排位策略建议。", icon: Brain },
                { q: "出路评级是什么？", a: "出路评级是职业 ROI 导向参考，413 个课程按就业前景、升学潜力、抗 AI 能力、院校排名、薪酬回报、技能复利 6 个维度评估，再用 A+ 至 C+ 显示。它不是官方意见，也不代表课程学术价值或个人适合度。", icon: Award },
                { q: "需要全程联网吗？", a: "不需要。计分器与收生数据参考支持离线使用；AI 入学分析与面试模拟则需要联网才能使用。", icon: Wifi },
                { q: "面试题库怎样参考？", a: "面试题库涵盖 14 个学系大类、约 1500 条练习题，参考各热门学系常见面试题型（包括医科 MMI），中英双语，配 AI 即时评分与改善建议。", icon: Mic },
            ],
        },
        cta: { title: "从放榜算到进大学", subtitle: "计分、出路评级、入学分析、课程比较、面试模拟，一个 App 搞定升大学。免费下载，立即试。" },
        footer: { copyright: "© 2026 DSE Jupas 神器", tagline: "JUPAS 计分 · 出路评级 · 入学分析 · 面试模拟", privacy: "隐私政策", terms: "使用条款" },
    },
    en: {
        nav: { features: "Features", reviews: "Reviews", faq: "FAQ", blog: "Guides", cta: "Download" },
        resultsBanner: { label: "2026 DSE Results Season", text: "Results out 15 Jul · JUPAS 48-hour re-ordering guide", cta: "See the timeline" },
        hero: {
            tagline: "JUPAS Scoring · Outcome Rating · Admission Analysis · Interview Sim",
            title: "Calculate Your JUPAS Score in a Second",
            titleHighlight: "Then Compare Admission Chances and Outcomes",
            subheading: "DSE Jupas scores your results, analyses admission chances, compares outcome ratings and drills interviews — your university journey in one app",
            subtitle: "Enter your DSE results and DSE Jupas instantly applies each university's admission scoring formula (Best 5, 4C+2X, subject weighting, bonus points) across the eight UGC universities and self-financing institutions. AI then compares your score against each programme's historical median and lower quartile, while 413 programme Outcome Ratings help you compare career ROI across six dimensions — plus ~1,500 interview practice prompts.",
            disclaimer: "Not an official JUPAS website or a service endorsed by the JUPAS Office. Data and analysis are for admissions reference only; official JUPAS and institution announcements prevail.",
            bullets: [
                "~440 JUPAS programme data entries with one-tap scoring across all eight universities",
                "413 programme Outcome Ratings — employment, salary, AI resilience, further study, university ranking and skill compounding",
                "AI admission analysis — your score vs historical median / LQ, with outcome context for ranking strategy",
                "University interview simulation — 14 faculty groups, ~1,500 practice prompts, instant AI scoring",
            ],
            cta: "Download Free",
            secondaryCta: "Learn More",
            videoLabel: "App Demo",
        },
        stats: [
            { value: "~440", label: "JUPAS Programme Data" },
            { value: "413", label: "Outcome Ratings" },
            { value: "8", label: "University Scoring Formulas" },
            { value: "~1,500", label: "Interview Questions" },
        ],
        features: {
            title: "Why DSE Jupas?",
            subtitle: "Scoring, admission chances, outcome ratings, programme comparison and interview practice — one app takes you from results day to your offer",
            items: [
                { icon: Calculator, label: "JUPAS Scoring", title: "JUPAS Score Calculator", desc: "Enter your DSE results and instantly get your calculated score for every programme using each institution's admission formula.", bullets: ["Best 5, 4C+2X, subject weighting & bonus points all supported", "Covers ~440 JUPAS programme data entries", "Auto-switches formulas per institution for instant results"], color: "orange" },
                { icon: Brain, label: "AI Analysis", title: "AI Admission Analysis", desc: "Your score is compared against each programme's historical median and LQ — AI tells you if it's safe, ambitious or a safety net.", bullets: ["Compared against historical median & lower quartile", "AI verdict: safe / ambitious / safety net", "Includes Band A–E ranking strategy advice"], color: "teal" },
                { icon: Award, label: "Outcome Rating", title: "413 Programme Outcome Ratings", desc: "Rated programmes show an A+ to C+ career-ROI reference across six dimensions, so you don't only compare admission scores.", bullets: ["Employment outlook, salary ROI and AI resilience", "Further-study path, university ranking and skill compounding", "Sort by outcome rating and combine it with score-gap filters"], color: "orange" },
                { icon: BarChart3, label: "Comparison", title: "Programme Comparison Radar", desc: "Compare two or three programmes side by side: score, chance, outcome rating, salary and tuition in one view.", bullets: ["Overlayed outcome radar charts", "A/B/C ratings shown side by side", "Better decisions when programmes have similar scores"], color: "teal" },
                { icon: Mic, label: "Interview Sim", title: "University Interview Simulation", desc: "An AI voice interviewer covering 14 faculty groups and ~1,500 interview practice prompts, with bilingual instant scoring.", bullets: ["Medicine, dentistry, law, business, education, social work, nursing & more", "Bilingual (Chinese & English) with instant AI scoring", "Actionable feedback until you feel confident"], color: "orange" },
                { icon: GraduationCap, label: "All 8 Unis", title: "Eight-University Scoring Formulas", desc: "HKU, CUHK, HKUST, CityU, PolyU, HKBU, EdUHK, LingnanU — every admission scoring formula built in.", bullets: ["Formulas for all eight unis & major self-financing schools", "Each university's scoring logic broken down", "No more digging through prospectuses by hand"], color: "teal" },
                { icon: BarChart3, label: "Admission Data", title: "Historical Admission Data", desc: "Every programme comes with historical median and LQ scores plus admission trends to help you read your position.", bullets: ["Median / LQ admission data per programme", "Score trends over recent years", "Use historical data to judge your position"], color: "orange" },
                { icon: TrendingUp, label: "Choice Strategy", title: "Band A–E Choice Strategy", desc: "Based on your score and admission data, AI suggests which programmes to put in Band A and which as safety nets — ambitious yet safe.", bullets: ["Layered advice from ambitious to safety net", "Balance dream and safe programmes", "All 20 choices laid out at a glance"], color: "orange" },
            ],
        },
        process: {
            title: "3 Steps to Your University Offer",
            steps: [
                { num: "01", title: "Enter DSE Results", desc: "Fill in your subject grades and the app applies all eight scoring formulas instantly", icon: Calculator },
                { num: "02", title: "Compare Chances and Outcomes", desc: "Review scores, admission chances and A+ to C+ Outcome Ratings before ranking choices", icon: Award },
                { num: "03", title: "Drill AI Interviews", desc: "Practise with ~1,500 interview prompts and an AI voice interviewer scoring you live", icon: Mic },
            ],
        },
        reviews: {
            title: "Student Use Cases",
            items: [
                { text: "I used to dig through prospectuses and score each programme by hand until my head spun. Now I just enter my results and get scores for every uni programme instantly. Huge time-saver.", name: "Wong", detail: "Form 6 DSE Student", avatar: "W" },
                { text: "The best bit is the AI admission analysis — it compares my score against the historical median and LQ and tells me what's safe vs ambitious. Made ranking my Band A choices way less stressful.", name: "Chan", detail: "DSE Candidate", avatar: "C" },
                { text: "The interview simulation helped a lot. It let me practise common Medicine MMI follow-ups out loud, and a few days of practice genuinely brought back my confidence.", name: "Lee", detail: "Applying for Medicine", avatar: "L" },
            ],
        },
        faq: {
            title: "Common Questions",
            items: [
                { q: "How accurate is the scoring? Where's the data from?", a: "The calculator implements the published admission scoring formulas of the eight universities and self-financing institutions (Best 5, 4C+2X, subject weighting, bonus points, etc.), cross-checked against community-compiled programme scoring methods. Results are for reference only; official admissions follow each institution's announcements.", icon: Calculator },
                { q: "How many programmes are covered?", a: "Currently ~440 JUPAS programme data entries, including popular faculties across the eight universities and major self-financing institutions, with ongoing updates.", icon: GraduationCap },
                { q: "How does the AI admission analysis work?", a: "The AI compares your score against each programme's historical median and lower quartile (LQ), judges whether it's safe, ambitious or a safety net, then uses outcome context to give Band A–E ranking strategy advice.", icon: Brain },
                { q: "What is the Outcome Rating?", a: "Outcome Rating is a career-ROI reference for 413 programmes across six dimensions: employment outlook, further-study path, AI resilience, university ranking, salary ROI and skill compounding. It is not official advice and does not measure academic value or personal fit.", icon: Award },
                { q: "Do I need internet?", a: "No for the calculator and admission data reference — they work offline. AI admission analysis and interview simulation require a connection.", icon: Wifi },
                { q: "How should I use the interview question bank?", a: "The bank covers 14 faculty groups and ~1,500 practice prompts modelled on common interview formats (including Medicine MMI), bilingual, with instant AI scoring and improvement feedback.", icon: Mic },
            ],
        },
        cta: { title: "From Results Day to Your University Offer", subtitle: "Scoring, Outcome Ratings, admission analysis, programme comparison and interview simulation — your whole university journey in one app. Download free and try it now." },
        footer: { copyright: "© 2026 DSE Jupas", tagline: "JUPAS Scoring · Outcome Rating · Admission Analysis · Interview Sim", privacy: "Privacy", terms: "Terms" },
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
                        { name: "港大 醫學士", score: "41.5", band: "A+" },
                        { name: "中大 精算", score: "37.0", band: "A" },
                        { name: "城大 會計", score: "33.5", band: "B+" },
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
                                <span className="text-[9px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded-full">{row.band}</span>
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
        url: "/blog/dse-results-day-2026-guide/",
        image: "/blog-covers/dse-results-day-2026-guide.webp",
        category: "放榜攻略",
        title: "DSE 放榜 2026 攻略｜7 月 15 日放榜日時間表、JUPAS 改選 48 小時、派位全流程",
        desc: "由放榜前準備、放榜日行動清單，到 48 小時改選同 8 月派位補選，拆清 2026 放榜季每個關鍵日期。",
        readTime: "11 分鐘",
    },
    {
        url: "/blog/jupas-scoring-methods-explained/",
        image: "/blog-covers/jupas-scoring-methods-explained.webp",
        category: "計分攻略",
            title: "同一張 DSE 成績單點解間間大學計分唔同？JUPAS Best 5、4C+2X 全拆解",
            desc: "八大院校點計分可以差幾遠？Best 5、4C+2X、科目加權、加分制一次過拆清。",
        readTime: "12 分鐘",
    },
    {
        url: "/blog/jupas-band-a-strategy/",
        image: "/blog-covers/jupas-band-a-strategy.webp",
        category: "選科策略",
            title: "20 個 JUPAS 志願點排先唔會放榜得個吉？Band A 排位策略全拆解",
            desc: "Band A 放夢想定保險？用收生 median／LQ 數據，由進取到保底排好 20 個志願。",
        readTime: "11 分鐘",
    },
    {
        url: "/blog/jupas-admission-scores-2026/",
        image: "/blog-covers/jupas-admission-scores-2026.webp",
        category: "收生數據",
            title: "你嘅 DSE 分數夠唔夠入八大熱門科？2026 JUPAS 收生 median、LQ 參考一覽",
            desc: "距離熱門科 median 仲差幾多？醫科、法律、環球商業、計算機等收生分數懶人包。",
        readTime: "13 分鐘",
    },
    {
        url: "/blog/university-interview-preparation/",
        image: "/blog-covers/university-interview-preparation.webp",
        category: "面試攻略",
            title: "大學面試一開口就扣分？醫科、法律、商科常見題 + STAR 答題框架",
            desc: "面試一緊張就口窒窒？拆解神科最常考題型，附 STAR 答題框架同 mock interview 方法。",
        readTime: "12 分鐘",
    },
    {
        url: "/blog/jupas-change-of-choices-guide/",
        image: "/blog-covers/jupas-change-of-choices-guide.webp",
        category: "JUPAS 流程",
            title: "DSE 分數比預期差怕入唔到 U？JUPAS 改選時間線同放榜前後逆襲策略",
            desc: "分數失手仲有冇得救？由 12 月到放榜，拆清每個 JUPAS 改選窗口同補位策略。",
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

        // 2: 出路評級
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-100 w-full max-w-sm">
            <div className="flex items-center justify-between mb-1">
                <div className="font-bold text-gray-900 text-sm">出路評級</div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">6 維 ROI</span>
            </div>
            <div className="text-xs text-gray-400 mb-4">413 個課程 · A+ 至 C+</div>
            <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                    { grade: "A+", label: "醫科" },
                    { grade: "A", label: "精算" },
                    { grade: "A-", label: "數據" },
                ].map((r) => (
                    <div key={r.grade} className="rounded-2xl bg-amber-50 border border-amber-100 p-3 text-center">
                        <div className="text-xl font-extrabold text-amber-600">{r.grade}</div>
                        <div className="text-[10px] text-gray-500 mt-1">{r.label}</div>
                    </div>
                ))}
            </div>
            <div className="space-y-2.5">
                {[
                    { label: "就業前景", val: 92, color: "bg-green-500" },
                    { label: "抗 AI 能力", val: 84, color: "bg-sky-500" },
                    { label: "薪酬回報", val: 78, color: "bg-amber-500" },
                    { label: "技能複利", val: 88, color: "bg-orange-500" },
                ].map((b) => (
                    <div key={b.label}>
                        <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-gray-500">{b.label}</span>
                            <span className="font-bold text-gray-700">{Math.round(b.val / 20)}/5</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100">
                            <div className={cn("h-2 rounded-full", b.color)} style={{ width: `${b.val}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>,

        // 3: 課程比較雷達
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-sky-100 w-full max-w-sm">
            <div className="font-bold text-gray-900 text-sm mb-1">課程比較雷達圖</div>
            <div className="text-xs text-gray-400 mb-4">分數 · 機會 · 出路評級並排</div>
            <div className="relative h-40 mb-4">
                <svg viewBox="0 0 260 110" className="w-full h-full">
                    <polygon points="130,12 214,44 190,92 70,92 46,44" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
                    <polygon points="130,30 188,52 172,82 88,82 72,52" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="130" y1="12" x2="130" y2="92" stroke="#edf2f7" />
                    <line x1="46" y1="44" x2="190" y2="92" stroke="#edf2f7" />
                    <line x1="214" y1="44" x2="70" y2="92" stroke="#edf2f7" />
                    <polygon points="130,16 202,48 178,86 78,88 58,47" fill="#f59e0b22" stroke="#f59e0b" strokeWidth="2.5" />
                    <polygon points="130,26 188,50 164,78 92,82 72,54" fill="#0ea5e922" stroke="#0ea5e9" strokeWidth="2.5" />
                    <text x="116" y="9" fontSize="8" fill="#94a3b8">就業</text>
                    <text x="215" y="44" fontSize="8" fill="#94a3b8">薪酬</text>
                    <text x="176" y="105" fontSize="8" fill="#94a3b8">抗AI</text>
                    <text x="48" y="105" fontSize="8" fill="#94a3b8">升學</text>
                    <text x="18" y="44" fontSize="8" fill="#94a3b8">排名</text>
                </svg>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-amber-50 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-amber-600">A</div>
                    <div className="text-[10px] text-gray-400">港大醫學</div>
                </div>
                <div className="bg-sky-50 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-sky-600">B+</div>
                    <div className="text-[10px] text-gray-400">城大會計</div>
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
                            <span className="text-[10px] text-gray-400 block">JUPAS 計分 ・ 出路評級 ・ 入學分析</span>
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
                                            <span className="text-[10px] text-gray-400 block">JUPAS 計分 ・ 出路評級 ・ 入學分析</span>
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

            {/* ===== SEASONAL RESULTS-DAY BANNER ===== */}
            {t.resultsBanner && (
                <div className="pt-16">
                    <a
                        href="/blog/dse-results-day-2026-guide/"
                        className="block bg-amber-500 hover:bg-amber-600 transition-colors text-white"
                    >
                        <div className="container mx-auto px-6 max-w-6xl py-2.5 flex items-center justify-center gap-2 text-center text-sm font-medium flex-wrap">
                            <span className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                {t.resultsBanner.label}
                            </span>
                            <span>{t.resultsBanner.text}</span>
                            <span className="underline underline-offset-2 font-semibold">{t.resultsBanner.cta} →</span>
                        </div>
                    </a>
                </div>
            )}

            {/* ===== HERO ===== */}
            <section className={`hero-gradient pb-20 md:pb-28 relative overflow-hidden ${t.resultsBanner ? 'pt-12 md:pt-16' : 'pt-24 md:pt-32'}`}>
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
                            {t.hero.disclaimer && (
                                <FadeUp delay={0.22}>
                                    <p className="text-xs text-gray-400 leading-relaxed mb-6 max-w-lg">
                                        {t.hero.disclaimer}
                                    </p>
                                </FadeUp>
                            )}
                            <FadeUp delay={0.26} className="flex flex-wrap gap-3">
                                <a href="https://apps.apple.com/app/id6780134101" className="hover:opacity-90 transition-opacity">
                                    <img src="/ios-icon.png" alt="Download on App Store" className="h-12 w-auto" />
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=app.jupas.dse" className="hover:opacity-90 transition-opacity">
                                    <img src="/android-icon.png" alt="Get it on Google Play" className="h-12 w-auto" />
                                </a>
                            </FadeUp>
                        </div>

                        {/* Right: real app screens in phone frames */}
                        <FadeUp delay={0.12} className="flex justify-center md:justify-end">
                            <div className="relative">
                                {/* Soft glow */}
                                <div className="absolute inset-0 bg-amber-300/25 blur-3xl rounded-full scale-90" />
                                <img
                                    src="/app/hero_phones.png"
                                    className="relative w-[300px] sm:w-[360px] md:w-[420px] h-auto block"
                                    alt={t.hero.videoLabel}
                                    width="1500"
                                    height="2071"
                                />
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* ===== STATS STRIP ===== */}
            <section className="bg-white border-y border-gray-100 py-8">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
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
                                揀好心儀學系，AI 語音面試官即場出面試練習題——醫科 MMI、法律、商科都有。你答完即時評分，仲會話你邊度好、邊度可以改善，練到面試嗰日唔再驚。
                            </p>
                            <ul className="space-y-3 text-gray-700">
                                {[
                                    "14 個學系大類、約 1500 條面試練習題",
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
                        <p className="text-gray-500 max-w-2xl mx-auto">每個課程附歷年收生 median 同 LQ，輸入你嘅分即知入學機會。App 已整理約 440 個 JUPAS 課程資料作參考。</p>
                    </FadeUp>

                    <FadeUp delay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
                        {[
                            { val: "約 440", label: "JUPAS 課程資料" },
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
                                        <th className="text-left px-4 py-3 font-semibold">類型</th>
                                        <th className="text-left px-4 py-3 font-semibold">課程例子</th>
                                        <th className="text-left px-4 py-3 font-semibold">常見計分</th>
                                        <th className="text-right px-4 py-3 font-semibold">分數帶</th>
                                        <th className="text-right px-4 py-3 font-semibold">LQ 參考</th>
                                        <th className="text-right px-4 py-3 font-semibold">參考 Band</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {[
                                        { uni: "高競爭", prog: "醫療 / 牙科 / 頂尖專業", method: "Best 5 + 指定科目加權", median: "高分段", lq: "仍偏高", band: "A" },
                                        { uni: "熱門專業", prog: "法律 / 環球商業 / 量化金融", method: "Best 5 / 4C+2X", median: "中高至高分段", lq: "需留 buffer", band: "A" },
                                        { uni: "熱門 STEM", prog: "計算機 / 數據科學 / 工程", method: "Best 5 + 加分", median: "中高分段", lq: "看科目加權", band: "A/B" },
                                        { uni: "穩陣選擇", prog: "同領域較低競爭課程", method: "按院校公式", median: "接近你分數", lq: "高過較安心", band: "B/C" },
                                        { uni: "保底選擇", prog: "自資 / 副學位 / 較冷門課程", method: "按院校公式", median: "低於你分數", lq: "留足距離", band: "D/E" },
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
                            <strong className="text-gray-900">點樣讀：</strong>上表係讀法示例，不是任何課程嘅官方 admission profile。實際 median / LQ、加權方法、面試比重每年都可能變，正式收生以 JUPAS 及各院校公佈為準。
                        </div>
                    </FadeUp>

                    <FadeUp delay={0.3} className="mt-10 text-center">
                        <p className="text-gray-500 text-sm mb-5">App 已內建約 440 個課程嘅 median／LQ 收生數據 + 413 個出路評級 + AI 入學機會分析 + 面試模擬</p>
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
                                <span>JUPAS 計分</span>
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
