# SGH Japan Assistant Skill

<p align="center">
  <img src="assets/sgh-icon.png" alt="SGH Phone" width="88">
</p>

<p align="center">
  <a href="README.md">日本語</a> ・
  <a href="README.zh-TW.md">繁體中文</a> ・
  <a href="README.en.md">English</a> ・
  <a href="README.ko.md">한국어</a> ・
  <a href="README.tr.md">Türkçe</a>
</p>

![SGH Japan Assistant — 將日本電話、預約與確認需求交給 AI 整理](assets/sgh-skill-hero.png)

> **MVP／Private beta** — 公開 repository 與本機 Skill 是 SGH 的宣傳及需求整理入口。Remote MCP 的執行型工具在 OAuth、付費資格與正式環境驗證完成前，不視為正式服務。

## 那通日文電話，不必再自己硬撐。

**在日本需要打電話、預約或確認時，先讓你的 AI 整理，再交給 SGH。**

餐廳訂位、確認飯店規則、詢問診所、變更預約時間。在日本，許多事情即使查完網站，最後仍會遇到一句：「請直接打電話確認。」

`SGH Japan Assistant Skill` 是公開的 Agent Skill＋Remote MCP gateway，讓 ChatGPT、Codex、Claude Code 等 AI 建立草稿、取得本人明確確認、查詢進度並取得 SGH 驗證過的結果。

[查看 SGH Phone](https://phone.shingihou.com) ・ [預約初次諮詢](https://calendar.app.google/RF2YRyJifsPzjbDj8) ・ [聯絡我們](https://phone.shingihou.com/support/contact)

> [!IMPORTANT]
> **公開 repository、clone 或安裝 Skill，不代表附贈 SGH Phone 免費通話或免費代辦。**
> SGH 實際打電話、預約、改期、取消與人工處理均為付費服務。沒有有效合約、已付款額度，或由發行方負擔費用且適用於該服務的 SGH Pass，任務不會進入執行佇列。

## 免費公開層與付費執行層

| 免費公開／宣傳功能 | SGH 付費執行服務 |
|---|---|
| 閱讀 README、案例與公開文件 | SGH 對外撥打電話 |
| 安裝本機 Skill | 實際預約、改期與取消 |
| 整理需求與產生相談摘要 | 人工接手與後續處理 |
| 無副作用的能力／適用性確認 | 使用 Twilio、語音 AI 或營運人員的動作 |

公開層負責讓使用者認識 SGH 並把需求整理好；凡是會讓 SGH 產生電話或人工成本的動作，都必須先確認付費資格。

## 直接這樣告訴你的 AI

```text
「幫我整理一份日文電話委託，詢問這家餐廳明晚七點有沒有位子。」

「我想確認這間診所是否接待外國患者，請整理需要詢問的內容。」

「幫我準備一份把牙醫預約改到下週的相談摘要。」

「幫我確認飯店是否能在晚上十一點辦理入住。」

「先整理打這通日文電話所需要的資料。」
```

Skill 會整理對象、目的、希望時間、期限、可以提供給對方的資訊，產生 `SGH Consultation Brief`。

## 為什麼需要這個 Skill？

AI 很會搜尋資訊，但日本的預約與確認流程，最後一步常常還是電話。

- 不知道該用日文怎麼說
- 無法在對方營業時間打電話
- 想先準備對方可能詢問的內容
- 醫療、住宿或取消等事項不能說錯
- 希望用自己的語言理解通話結果

SGH 專注處理「搜尋之後，如何真正與日本店家完成協調」這段最麻煩的流程。

## 公開版 Skill 會做什麼

1. **理解需求** — 辨識電話、預約確認、改期、回撥等任務。
2. **整理必要資訊** — 確認對象、目的、時間、期限與結果語言。
3. **提早標示風險** — 將醫療、付款、個資、取消費用列為人工確認事項。
4. **產生 SGH 相談摘要** — 把 AI 對話轉換成 SGH 人員能快速判斷的格式。
5. **導向官方窗口** — 資訊準備完成後，前往 SGH Phone 官方諮詢管道。

![SGH Phone 電話工作流程](assets/sgh-phone-workflow.png)

## 適用情境

| 情境 | 相談範例 |
|---|---|
| 餐廳 | 空位、訂位條件、過敏原対応確認 |
| 飯店與旅遊 | 深夜入住、寄放行李、接送確認 |
| 診所 | 外語対応、初診條件、預約方式確認 |
| 美容與生活服務 | 預約、改期、服務條件確認 |
| 不動產與生活基礎服務 | 看房、管理公司、水電瓦斯與網路詢問 |
| 企業業務 | 日文電話接待、回撥、預約前確認與 follow-up |

實際能否受理、費用、時間與必要同意，均由 SGH 在正式諮詢後確認。

## 不只是廣告

這個 repository 是 SGH 的公開服務入口，但不只介紹公司。安裝後，AI 可以實際產生結構化的相談摘要：

```text
SGH Consultation Brief
- Fit: GOOD_FIT
- Target: Restaurant ABC, Fukuoka
- Goal: 確認明晚 19:00 是否能預約兩位
- Preferred timing: 19:00；18:30 也可以
- Deadline: 今天 17:00 前
- Result language: Traditional Chinese
- Information approved for sharing: 名字與用餐人數
- Missing information: 是否接受取消規則
- Next step: 透過 SGH 官方窗口送出相談
```

## 重要說明

只有本機 `SKILL.md` 不會撥電話。接上 Remote MCP 後，建立草稿仍不會產生電話副作用；必須先驗證有效付費合約、已付款額度或發行方出資的 SGH Pass，再由使用者明確確認對象、目的、分享資料、時間與費用，才可能排入非同步執行。`QUEUED` 或 `CALLING` 絕不等於預約已完成。

- 本 repo 不附贈任何 SGH 電話額度。
- 沒有付費資格時，應回傳 `ENTITLEMENT_REQUIRED`，不可建立電話或人工案件。
- SGH Pass 是受限的付費／贊助資格，不是公開免費 Token。

- SGH 會另外確認實際対応可行性。
- 不猜測價格、營業時間、空位或醫療機構接待條件。
- 不提供醫療診斷或治療建議。
- 請勿在公開 GitHub Issue 留下病歷、護照或信用卡資料。
- 分享個人資料前，必須取得本人明確同意。

## 安裝

將 `skills/sgh-japan-assistant` 資料夾加入支援 Agent Skills 的工具或專案 skills 目錄。

```text
Use $sgh-japan-assistant to draft a Japan phone request, then ask me to confirm it before SGH queues execution.
```

Skill package：[`skills/sgh-japan-assistant`](skills/sgh-japan-assistant)

## 企業服務

SGH Phone 是協助企業整理日文電話接待、IVR、通話紀錄、摘要、負責人通知、回撥管理、預約前確認與受控撥打作業的 B2B 電話基盤。

- 希望自己的服務能被 AI Agent 發現
- 希望改善外國顧客的日文電話與預約流程
- 希望少人數團隊也能持續處理電話與 follow-up

SGH 同樣提供企業導入諮詢。

## Menu Bridge 等宣傳型 Skill

Menu Bridge 可以免費提供菜單、FAQ、語言說明與需求整理，作為 `Powered by SGH` 的宣傳入口；真實電話、訂位、改期、取消或人工處理仍須轉入 SGH 的付費流程。宣傳型 Pass 不得共用或兌換 SGH Phone 額度。

## 授權不等於免費服務

MIT License 僅適用於這個 repository 的程式碼，不包含 SGH Phone 通話、代辦、人工服務、商標或品牌資產的使用權。

## 官方連結

- **SGH Phone**: https://phone.shingihou.com
- **初次諮詢**: https://calendar.app.google/RF2YRyJifsPzjbDj8
- **聯絡我們**: https://phone.shingihou.com/support/contact
- **營運公司**: [新義豊株式会社](https://shingihou.com)
