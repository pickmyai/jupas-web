---
layout: ../../layouts/BlogPost.astro
title: "同一張 DSE 成績單點解間間大學計分唔同？JUPAS Best 5、4C+2X 全拆解"
description: "同一張 DSE 成績單，點解 HKU、CUHK、HKUST、CityU、PolyU、HKBU、LingU、EdUHK 計出嚟嘅分可以差好遠？一篇拆清 Best 5、4C+2X、核心科要求、選修科加權、特定科目 bonus、面試 / 比賽額外分，附八大計分差異對照表。"
image: "/blog-covers/jupas-scoring-methods-explained.webp"
category: "計分攻略"
readTime: "12 分鐘"
pubDate: "2026-06-18"
---

<div class="not-prose my-8 grid sm:grid-cols-4 gap-4">
  <div class="border border-slate-200 rounded-xl bg-white p-5">
    <div class="flex items-center gap-2 text-slate-500 text-xs tracking-wider uppercase mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
      Best 5
    </div>
    <div class="text-2xl font-extrabold text-slate-900">5 科</div>
    <div class="text-xs text-slate-600 mt-1">最好 5 科總分，最常見</div>
  </div>
  <div class="border border-slate-200 rounded-xl bg-white p-5">
    <div class="flex items-center gap-2 text-slate-500 text-xs tracking-wider uppercase mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
      4C+2X
    </div>
    <div class="text-2xl font-extrabold text-slate-900">6 科</div>
    <div class="text-xs text-slate-600 mt-1">4 核心 + 2 選修固定組合</div>
  </div>
  <div class="border border-slate-200 rounded-xl bg-white p-5">
    <div class="flex items-center gap-2 text-slate-500 text-xs tracking-wider uppercase mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
      科目加權
    </div>
    <div class="text-2xl font-extrabold text-slate-900">×1.5 / ×2</div>
    <div class="text-xs text-slate-600 mt-1">指定科目乘 weighting</div>
  </div>
  <div class="border border-slate-200 rounded-xl bg-white p-5">
    <div class="flex items-center gap-2 text-slate-500 text-xs tracking-wider uppercase mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.6 5.8 21 7 14 2 9.3 9 8.5 12 2"/></svg>
      額外分 Bonus
    </div>
    <div class="text-2xl font-extrabold text-slate-900">+1 ~ +2</div>
    <div class="text-xs text-slate-600 mt-1">M1/M2、5** bonus、比賽</div>
  </div>
</div>

## 「同一張成績單，點解每間大學計出嚟嘅分都唔同？」

每年放榜後總有同學發現：用同一張 DSE 成績單，套入 HKU 嘅商科同 CUHK 嘅理科，分數竟然差成 3、4 分。明明科目一樣，點解會咁？答案係——**JUPAS 每個課程都有自己一套計分公式**。有啲用 Best 5、有啲用 4C+2X、有啲將數學或選修科 ×2 加權、有啲仲會幫你 M1/M2 加 bonus。你唔搞清楚邊條公式對你最有利，就好難判斷自己應該排邊個課程、放邊個志願先穩陣。

呢篇文會由最基本嘅 5\*\*=7 分換算開始，逐層拆解 Best 5、4C+2X、核心科最低要求（俗稱「3322」）、選修科加權、特定科目 bonus、面試同比賽額外分，再用一張 DSE 成績單示例計出唔同課程嘅分。睇完你應該可以自己手動 mock 任何一個課程嘅分數。

<div class="not-prose my-8 p-6 rounded-2xl border border-slate-200 bg-white">
  <div class="text-xs tracking-wider uppercase text-slate-500 mb-3 flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    快速 reference — DSE 級別換算分數
  </div>
  <ul class="m-0 text-slate-700 text-sm leading-relaxed space-y-1.5">
    <li>5\*\* = 7 分（部分課程 5\*\* 額外 +0.5 bonus）</li>
    <li>5\* = 6 分；5 = 5 分；4 = 4 分；3 = 3 分；2 = 2 分；1 = 1 分</li>
    <li>M1 / M2（數學延伸）通常按比例折算，例如 5\*\* 當 1 分加分或 ×0.5 計入</li>
    <li>核心科最低門檻「3322」= 中文 3 / 英文 3 / 數學 2 / 公民與社會發展（達標）</li>
  </ul>
</div>

## 第一步：DSE 級別點換成分數？

JUPAS 計分嘅第一步，係將你每科嘅 DSE level 換成數字。最通用嘅換算係 **5\*\* = 7、5\* = 6、5 = 5、4 = 4、3 = 3、2 = 2、1 = 1**。換句話講，每科最高 7 分。

但要留意三件事：

- **部分課程畀 5\*\* 額外 bonus**：例如某啲大學會將 5\*\* 當 8.5 分計（即 7 + 1.5 bonus），鼓勵尖子報讀。
- **核心科同選修科換算可能唔同**：有啲課程數學或指定選修科會用更高 multiplier。
- **公民與社會發展科（前通識）**：現時只設「達標 / 未達標」，達標通常當作滿足核心科要求，但唔一定計入分數總和（視乎課程公式）。

明白咗呢個換算，先可以講 Best 5 同 4C+2X。

## Best 5 點計？

Best 5 = 攞你 DSE **最好 5 科**嘅分數加埋。呢個係 JUPAS 最常見、最容易理解嘅計法。

### Best 5 計分例子

假設考生 Ken 成績如下：

<div class="not-prose my-8 overflow-hidden rounded-2xl border border-slate-200">
  <table class="w-full text-sm border-separate border-spacing-0">
    <thead>
      <tr class="bg-slate-900 text-white">
        <th class="text-left px-4 py-3">科目</th>
        <th class="text-left px-4 py-3">Level</th>
        <th class="text-left px-4 py-3">分數</th>
      </tr>
    </thead>
    <tbody class="text-slate-700">
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">中文</td><td class="px-4 py-3">5</td><td class="px-4 py-3">5</td></tr>
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">英文</td><td class="px-4 py-3">5*</td><td class="px-4 py-3">6</td></tr>
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">數學（必修）</td><td class="px-4 py-3">5**</td><td class="px-4 py-3">7</td></tr>
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">物理</td><td class="px-4 py-3">5*</td><td class="px-4 py-3">6</td></tr>
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">化學</td><td class="px-4 py-3">5</td><td class="px-4 py-3">5</td></tr>
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">經濟</td><td class="px-4 py-3">4</td><td class="px-4 py-3">4</td></tr>
    </tbody>
  </table>
</div>

Best 5 = 攞最高 5 科：數學(7) + 英文(6) + 物理(6) + 中文(5) + 化學(5) = **29 分**（經濟嘅 4 分被丟棄，因為佢係第 6 高）。

呢個 29 分就係 Ken 喺「Best 5」課程嘅分數。睇落簡單，但有兩個陷阱：

<div class="not-prose my-6 border-l-4 border-amber-400 bg-amber-50/60 rounded-r-lg p-4 flex gap-3">
  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  <div>
    <div class="font-semibold text-amber-900 text-sm mb-1">Best 5 嘅兩個隱藏條件</div>
    <p class="text-amber-900/80 text-sm leading-relaxed m-0">① 就算用 Best 5，課程通常仍然要求中、英文達到最低 level（例如英文 3）先收。② 部分課程要求 Best 5 之中至少包含某科（例如商科要求 Best 5 必須包含數學）。所以「Best 5 高分」唔等於「一定收」，仲要過科目門檻。</p>
  </div>
</div>

## 4C+2X 點計？

4C+2X 係另一種常見公式：**4 個核心科（Core）+ 2 個選修科（X / Elective）** 嘅固定組合，總共 6 科。

- **4C** = 中文、英文、數學（必修）、公民與社會發展（或舊制通識）
- **2X** = 你最好嘅 2 科選修科（物理、化學、生物、經濟、BAFS、歷史、地理、M1/M2 等）

用返 Ken 嘅成績：4C+2X = 中文(5) + 英文(6) + 數學(7) + 公民（達標，視公式可能當 0 或固定分）+ 物理(6) + 化學(5)。如果公民唔計分，總和 = 5+6+7+6+5 = **29 分**；如果公民達標當作某固定分數，總和會更高。

### Best 5 同 4C+2X 點揀？

- **Best 5 對「核心科較弱、選修科強」嘅同學有利**——因為佢可以丟棄一科核心。
- **4C+2X 強制計入全部 4 核心**——對「核心科平均、唔想被某弱科拖累」嘅同學反而麻煩，但對「核心科全部高分」嘅尖子就冇分別。

關鍵：**你冇得自己揀公式**，係課程指定用邊條。所以同一個你，喺 Best 5 課程同 4C+2X 課程嘅分可能唔同，要分開計。

## 核心科最低要求：3322 同 33222

幾乎所有八大學位課程都有一條入場門檻：**中文 3、英文 3、數學 2、公民與社會發展達標**（簡稱「3322」）。部分課程仲會加要求 2 科選修科達 2 或 3 級（變成 33222 或更高）。

<div class="not-prose my-6 border-l-4 border-sky-400 bg-sky-50/60 rounded-r-lg p-4 flex gap-3">
  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  <div>
    <div class="font-semibold text-sky-900 text-sm mb-1">門檻 ≠ 收生分</div>
    <p class="text-sky-900/80 text-sm leading-relaxed m-0">「3322」只係最低入場券（minimum entrance requirement），達到先有資格被考慮，唔代表收到。熱門課程實際收生 median 分往往遠高過門檻。所以唔好見到自己「過 3322」就以為穩，要再睇課程嘅實際收生分數區間。</p>
  </div>
</div>

特別注意：英文門檻對好多課程係 **Level 3**，但醫科、法律、環球商業等神科普遍要求英文 **Level 4 甚至 5**。差一級可以直接被 filter 走，分數再高都冇用。

## 選修科加權（Subject Weighting）

部分課程會將**指定科目乘以 weighting**（通常 ×1.5 或 ×2），令該科對總分影響更大。常見例子：

- **工程 / 計算機課程**：數學（必修）或 M1/M2 ×1.5 或 ×2
- **商科 / 經濟課程**：數學、經濟或 BAFS 加權
- **理學課程**：相關 science 科加權
- **語文 / 翻譯課程**：中文或英文加權

### 加權點影響你嘅排位？

如果你嘅強項啱啱係課程加權嘅科目，你嘅「加權後分數」會比普通 Best 5 高，等於變相幫你打高分。反之，如果你加權科目較弱，呢個課程對你就唔利。所以**揀課程時要對返自己嘅科目強弱同課程加權**，而唔係淨係睇 raw total。

## 特定科目 bonus 同額外分

除咗加權，部分課程仲有額外加分機制：

- **M1 / M2 bonus**：好多理工 / 商科會將 M1 或 M2 額外當分加入，鼓勵修讀。有啲當「第 6 科」計入 Best 6，有啲畀固定 bonus。
- **5\*\* bonus**：部分課程將 5\*\* 當作高於 7 分（例如 8.5），獎勵頂尖表現。
- **第 3 / 第 4 選修科 bonus**：考多過 2 科選修，部分課程會將額外選修科按比例加少少分。

呢啲 bonus 通常每個課程唔同、每年可能微調，所以查官方 admission profile 最穩陣。

## 面試、作品集、比賽額外分

唔係所有分都嚟自 DSE。部分課程嘅最終收生計分包含 **非學術部分**：

- **面試分**：醫科、牙科、教育、護理等好多會面試，面試表現直接計入最終 ranking。
- **作品集 / 試演**：設計、建築、音樂、藝術等課程要交 portfolio 或試音。
- **比賽 / 課外活動**：部分課程（尤其體育、表演、創意學科）會考慮獲獎紀錄、OEA（Other Experiences and Achievements）。
- **SLP / 自述**：學生學習概覽同個人陳述，部分課程會作 holistic 參考。

所以**「DSE 分數 = 一切」係錯嘅**。對有面試 / portfolio 嘅課程，DSE 只係入場篩選，最終排位仲要睇你嘅綜合表現。

## 八大計分差異對照表

以下係八大主要計分傾向嘅**概括對照**（每間大學唔同 faculty / 課程仍會有自己變化，務必以官方 admission profile 為準）：

<div class="not-prose my-8 overflow-hidden rounded-2xl border border-slate-200">
  <table class="w-full text-sm border-separate border-spacing-0">
    <thead>
      <tr class="bg-slate-900 text-white">
        <th class="text-left px-4 py-3">大學</th>
        <th class="text-left px-4 py-3">常見計分傾向</th>
        <th class="text-left px-4 py-3">特點</th>
      </tr>
    </thead>
    <tbody class="text-slate-700">
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">HKU 港大</td><td class="px-4 py-3">多數 Best 6 / 課程自訂組合</td><td class="px-4 py-3">部分課程選修加權、重面試（醫 / 法 / 環球商業）</td></tr>
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">CUHK 中大</td><td class="px-4 py-3">多數 4C+2X / Best 5</td><td class="px-4 py-3">部分課程指定選修、英文門檻較高</td></tr>
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">HKUST 科大</td><td class="px-4 py-3">多數 Best 5，理工常加權數學 / science</td><td class="px-4 py-3">School-based admission（先入 School 後揀主修）</td></tr>
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">CityU 城大</td><td class="px-4 py-3">多數 Best 5，部分加權</td><td class="px-4 py-3">商 / 工程加權數學或相關選修</td></tr>
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">PolyU 理大</td><td class="px-4 py-3">多數 Best 5 / 自訂，常加權</td><td class="px-4 py-3">護理 / 物理治療等競爭大，重特定選修</td></tr>
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">HKBU 浸大</td><td class="px-4 py-3">多數 Best 5 / 4C+2X</td><td class="px-4 py-3">傳理 / 中醫等有面試或特定要求</td></tr>
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">LingU 嶺大</td><td class="px-4 py-3">多數 Best 5</td><td class="px-4 py-3">博雅取向，部分重個人陳述 / 面試</td></tr>
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">EdUHK 教大</td><td class="px-4 py-3">多數 Best 5，部分加權相關科</td><td class="px-4 py-3">師訓課程多數設面試 + LPATE / 語文要求</td></tr>
    </tbody>
  </table>
</div>

<p class="text-sm text-slate-500 italic">上表為一般傾向概述，並非官方公式；每個課程每年計分方法可能更新，一切以 JUPAS 及各大學官方 admission profile 公佈為準。</p>

## 一張成績單，計出唔同課程嘅分

我哋用 Ken 嘅成績再示範一次「同人唔同分」：

<div class="not-prose my-8 overflow-hidden rounded-2xl border border-slate-200">
  <table class="w-full text-sm border-separate border-spacing-0">
    <thead>
      <tr class="bg-slate-900 text-white">
        <th class="text-left px-4 py-3">課程類型</th>
        <th class="text-left px-4 py-3">公式</th>
        <th class="text-left px-4 py-3">Ken 計出嚟</th>
      </tr>
    </thead>
    <tbody class="text-slate-700">
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">文 / 社科</td><td class="px-4 py-3">Best 5（無加權）</td><td class="px-4 py-3">7+6+6+5+5 = 29</td></tr>
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">工程</td><td class="px-4 py-3">Best 5，數學 ×2</td><td class="px-4 py-3">(7×2)+6+6+5+5 = 36</td></tr>
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">商科</td><td class="px-4 py-3">4C+2X，數學 ×1.5</td><td class="px-4 py-3">5+6+(7×1.5)+物理6+化學5 = 32.5（公民另計）</td></tr>
      <tr class="even:bg-slate-50"><td class="px-4 py-3 font-semibold text-[#f59e0b]">理學</td><td class="px-4 py-3">Best 5，science 加權</td><td class="px-4 py-3">視乎加權科目而定，約 32–35</td></tr>
    </tbody>
  </table>
</div>

睇到無？同一個 Ken，喺工程課程「值」36 分、喺文社科課程只「值」29 分。所以**你嘅分數冇一個絕對數字，只有對應某課程公式嘅數字**。呢個就係點解你需要逐個課程計，而唔係背一個「我有 29 分」就周圍套。

<figure class="not-prose my-10">
  <blockquote class="relative pl-16 italic text-slate-700 leading-relaxed border-0 bg-transparent p-0">
    <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-0 top-0 w-12 h-12 text-slate-300" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 .85 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>
    <p class="m-0">「最常見嘅排位失誤，唔係分數唔夠，而係用咗一個錯誤嘅『單一分數』去衡量所有課程。每個課程嘅公式都應該分開計。」</p>
    <footer class="text-sm text-slate-500 not-italic mt-3">— DSE Jupas 神器 編輯團隊</footer>
  </blockquote>
</figure>

## 常見問題 FAQ

<details class="not-prose my-4 rounded-xl border border-slate-200 bg-white p-5">
<summary class="font-semibold text-slate-900 cursor-pointer">Best 5 同 Best 6 有咩分別？</summary>
<p class="text-slate-700 text-sm mt-3 leading-relaxed">Best 5 = 最好 5 科加埋；Best 6 = 最好 6 科加埋。Best 6 通常會將你嘅 M1/M2 或第 3 選修科都計入，對考得多科嘅同學有利。但兩者邊個用，係課程指定，你冇得自己揀。揀課程時要睇清楚佢用 Best 幾，再對返自己邊個組合最高分。</p>
</details>

<details class="not-prose my-4 rounded-xl border border-slate-200 bg-white p-5">
<summary class="font-semibold text-slate-900 cursor-pointer">公民與社會發展科計唔計分？</summary>
<p class="text-slate-700 text-sm mt-3 leading-relaxed">公民與社會發展科現時只設「達標 / 未達標」。對大部分課程嚟講，達標係滿足核心科最低要求嘅必要條件，但係咪計入分數總和就視乎課程公式——有啲完全唔計入 Best 5、有啲當作一個固定分。建議查返目標課程嘅 admission profile 確認。</p>
</details>

<details class="not-prose my-4 rounded-xl border border-slate-200 bg-white p-5">
<summary class="font-semibold text-slate-900 cursor-pointer">M1 / M2 對 JUPAS 分有幾大幫助？</summary>
<p class="text-slate-700 text-sm mt-3 leading-relaxed">視乎課程。對理工、計算機、商科、精算等課程，M1/M2 經常被計入分數或畀額外 bonus，幫助可以好大（一級可能值幾分）。但對文社科課程，M1/M2 可能完全唔計分。所以「值唔值得修 M1/M2」要對返你想報嘅課程類型。</p>
</details>

<details class="not-prose my-4 rounded-xl border border-slate-200 bg-white p-5">
<summary class="font-semibold text-slate-900 cursor-pointer">英文 Level 3 同 Level 4 差好遠嗎？</summary>
<p class="text-slate-700 text-sm mt-3 leading-relaxed">對好多神科（醫、牙、法律、環球商業）差好遠——佢哋英文門檻係 Level 4 甚至 5，你 Level 3 即使總分高都會被門檻 filter 走，根本入唔到 consideration。對一般課程 Level 3 已滿足門檻。所以英文係好多人嘅「隱形天花板」，值得優先谷。</p>
</details>

<details class="not-prose my-4 rounded-xl border border-slate-200 bg-white p-5">
<summary class="font-semibold text-slate-900 cursor-pointer">點先可以快速計到我每個課程嘅分？</summary>
<p class="text-slate-700 text-sm mt-3 leading-relaxed">手動計每個課程嘅 Best 5 / 4C+2X / 加權好花時間，亦容易計錯。最快係用 DSE Jupas 神器 嘅 JUPAS 計分器：輸入你嘅 DSE 成績一次，App 就會自動套用唔同課程嘅公式（Best 5、4C+2X、科目加權、bonus），即時計出你喺每個課程嘅分數，慳返你逐張表手計嘅時間。</p>
</details>

<div class="not-prose my-8 p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-100">
  <div class="flex items-start gap-4">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-[#f59e0b] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
    <div>
      <div class="text-lg font-bold text-slate-900 mb-1">唔使再逐張表手計分</div>
      <p class="text-slate-700 m-0 text-sm leading-relaxed">輸入一次 DSE 成績，DSE Jupas 神器 嘅 JUPAS 計分器就會自動為每個課程套用正確公式（Best 5 / 4C+2X / 科目加權 / bonus），即時計出你喺每個課程嘅分數，再配合 AI 入學機會分析同你比對歷年收生 median 同 LQ，一眼睇晒邊個穩陣、邊個進取、邊個保底。</p>
    </div>
  </div>
</div>

## 結語

JUPAS 計分嘅核心觀念只有一句：**你冇一個絕對分數，只有對應每個課程公式嘅分數**。同一張成績單，套入 Best 5、4C+2X、加權、bonus 之後，喺唔同課程嘅「值」可以差好幾分。掌握咗呢套換算同公式邏輯，你就可以理性判斷自己應該主攻邊類課程、邊個志願最有利。

重點 recap：① 5\*\*=7 分為基礎換算；② Best 5 = 最好 5 科、4C+2X = 4 核心 + 2 選修；③ 「3322」只係門檻唔係收生分，英文門檻尤其關鍵；④ 加權同 bonus 令同人喺唔同課程分數唔同；⑤ 面試 / portfolio 課程，DSE 只係入場篩選。

想由「自己手計、計到頭都暈」變成「一輸入即見每個課程分數」，可以即刻試 DSE Jupas 神器 嘅 JUPAS 計分器 —— <a href="https://apps.apple.com/app/id6780134101">立即下載 DSE Jupas 神器</a>，配合 AI 入學機會分析同大學面試模擬，一條龍由計分計到入學策略。

<p class="text-sm text-slate-500 italic">分數及計分公式僅供參考，一切以 JUPAS / 各大學官方公佈為準。</p>
