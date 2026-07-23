# SGH Japan Assistant — AI × LINE Service Navigator

<p align="center">
  <img src="assets/sgh-icon.png" alt="SGH Japan Assistant" width="88">
</p>

<p align="center">
  <a href="README.md">日本語</a> ・
  <a href="README.zh-TW.md">繁體中文</a> ・
  <a href="README.en.md">English</a> ・
  <a href="README.ko.md">한국어</a> ・
  <a href="README.tr.md">Türkçe</a>
</p>

![SGH Japan Assistant — 新義豊のサービスへつながる公式AI入口](assets/sgh-service-navigator-hero.png)

> **Public Skill available / Remote execution private beta**
> 公開Skillは、SGHのサービスを見つけ、相談を整理し、正しい窓口へつなぐための入口です。電話・予約・人的対応を行うRemote MCPは、有料利用資格と明示確認が必要な限定提供です。

## LINEで受け止め、AIで整理し、必要な画面・担当者・業務へつなぐ。

**探す。整理する。つなぐ。必要なときだけ実行する。**

`SGH Japan Assistant` は、新義豊株式会社のLINE Bot／LIFF、医療・越境支援、MS Platform、Clinic DX、AI自動化、日本語対応サービスを、ChatGPT、Codex、Claude CodeなどのAIから発見・理解するための公式Agent Skillです。

電話だけのSkillではありません。あなたのAIが、SGHのLINE、Web、医療支援、業務自動化、電話、人的支援の中から次の入口を選びます。曖昧な相談を一枚のBriefにし、自然な日本語の問い合わせを準備し、実作業が必要な場合だけ正式な申込みへ進みます。

[SGHのサービスを探す](https://www.shingihou.com/ja/services?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [AI・業務自動化を見る](https://www.shingihou.jp/ai-automation?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [法人相談をする](https://www.shingihou.com/ja/contact?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill)

## 60秒でできること

- 自分の課題に合うSGHサービスを見つける
- Medical SupporterのLINE、SGH Service、MS Platformの違いを知る
- 相談内容を `SGH Consultation Brief` に整理する
- 日本企業へ送れる自然な日本語の問い合わせ案を作る
- LINE予約、Rich Menu、LIFF、MyPage、通知の導入要件を整理する
- 電話・LINE・メール・フォーム・CRMの手作業を棚卸しする
- 実行前に、不足情報・費用区分・次の公式窓口を確認する

AIには、たとえば次のように頼めます。

```text
「外国人患者の受入れを整えたい。SGHのどのサービスが合う？」

「Medical SupporterのLINEでは何ができる？
  個人情報は入力せず、使える入口だけ教えて」

「クリニックにLINE予約とMyPageを導入したい。
  MS Platform向けのNo-PHI導入Briefを作って」

「Rich Menuから予約、AI翻訳、有人相談へつなぐ構成を考えて。
  まだ公開も送信もしないで」

「電話・LINE・メール・CRMの手作業を整理して、
  自動化候補を3つ出して」

「この内容を、日本企業へ送れる自然な日本語の問い合わせ案にして」

「この相談をSGHへ渡せる一枚のBriefにして。まだ送信しないで」

「レストランへ確認したい。電話はせず、必要情報だけ整理して」
```

## SGHには、すでに「LINEで触れられる入口」があります

LINEは単なる通知先ではありません。新義豊には、医療支援、サービス案内、MyPage、予約導線、多言語コミュニケーションをLINEから始める既存のプロダクト面があります。このSkillは、それらを一つのBotに混ぜるものではなく、利用者の目的に合う入口をAIが説明できるようにする公開ナビゲーターです。

| LINE／LIFF入口 | ユーザーが見つけられるもの | 現在の位置づけ |
|---|---|---|
| Medical Supporter Official LINE | 日本の医療機関、サービスの流れ、相談窓口、MyPage構想、予約・案件情報への導線 | 公式相談入口／LINE Login導線あり。Rich Menu運用中。MyPageはMVP・連携整備中 |
| 醫療助手 LINE | 医療機関案内、サービスフロー、AI即時翻訳への導線、費用・サービス、SGH Service | LINE公式アカウント／Rich Menu運用あり。翻訳はコミュニケーション補助であり医療判断ではない |
| SGH SERVICE LINE／LIFF | AIが相談を構造化し、Web上の確認・会員・依頼導線へ渡すサービス入口 | 実装例あり。実送信・外部AI・予約・電話は認証、契約、料金確認後 |
| MenuBridge LIFF | カメラでメニューを読み取り、多言語で内容や注文条件を理解する入口 | 既存プロダクト面。AI利用量と提供条件はサービス表示に従う |
| クリニック向けLINE／LIFF | 予約、MyPage、通知、オンライン診療入室を医療機関単位で構成 | MS Platformの公開Demo／MVP。実利用は個別導入とLINE初期設定後 |
| LINE Commerce | 商品検索、アカウント連携、Rich Menu、Webhook、CRM／n8n連携 | コード実装・review例あり。本番有効化は外部設定と個別確認後 |
| クリニック客製LINE Bot | テキスト、音声、画像、多言語案内、予約意図、有人引継ぎを組み合わせる | Demo／MVP実装例。すべての医療機関で稼働中とは表現しない |

<table>
  <tr>
    <td width="50%"><img src="assets/medical-supporter-line-rich-menu.webp" alt="Medical Supporter LINE Rich Menu"></td>
    <td width="50%"><img src="assets/medical-assistant-line-rich-menu.webp" alt="醫療助手 LINE Rich Menu"></td>
  </tr>
  <tr>
    <td align="center"><strong>MEDICAL SUPPORTER</strong><br>MyPage・相談進捗・予約記録・資料導線</td>
    <td align="center"><strong>醫療助手</strong><br>サービスフロー・AI翻訳導線・SGH Service</td>
  </tr>
</table>

上記2点は2026年7月22日に既存LINE公式アカウントへ保存確認したRich Menuの実例です。画像に表示されるMyPage、資料導線、AI翻訳などは機能別の条件や整備状況があり、すべての遷移先が一般公開済みという意味ではありません。GitHub Skillのインストールだけで無料開放されることもありません。

[Medical Supporterを見る](https://medicalsupporter.org/?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [Medical Supporter Official LINEを開く](https://line.me/R/ti/p/%40acl1165c)

## 一つのBotではなく、再利用できるLINE実装ポートフォリオ

SGHが法人に提供できる価値は、チャット返信だけではありません。問い合わせを受け止め、必要情報を整理し、本人確認された画面や担当者へ渡し、その後の記録まで設計することです。

```text
Discover          LINE intake         Prepare
サービス発見  →  相談・質問を受付  →  AIが分類・不足情報を整理
                                              ↓
Track             Human / System      Confirm & Route
履歴・進捗確認 ← 担当者・CRM・業務へ ← 本人が内容と条件を確認
```

実装の組み合わせ例：

- LINE Official Account、LINE Login、LIFF、Rich Menu
- FAQ／RAG、多言語案内、テキスト・音声・画像の受付
- 予約、MyPage、通知、商品検索、オンライン診療への入口
- Supabase、CRM、カレンダー、n8n、決済、有人引継ぎ

公開Skillは、この設計を説明し、非機密のBriefを作るところまでです。実際のLINE送信、Rich Menu公開、患者登録、予約、外部AI利用、決済、電話、人的作業は、それぞれの本番システム側で認証・権限・料金・明示確認を満たした場合だけ行います。

## MS Platformは、LINE Botの先にある医療機関の運用レイヤーです

Medical Supporter LINEが海外患者との接点をつくるのに対し、MS Platformは医療機関側の予約、本人確認、MyPage、通知、オンライン診療入室、管理画面を段階的に整える導入支援プラットフォームです。

<table>
  <tr>
    <td width="50%"><img src="assets/ms-platform-patient-mypage-demo.png" alt="MS Platform patient MyPage demo"></td>
    <td width="50%"><img src="assets/ms-platform-admin-dashboard-demo.png" alt="MS Platform clinic administration dashboard demo"></td>
  </tr>
  <tr>
    <td align="center"><strong>患者MyPage Demo</strong><br>予約内容・確認コード・入室導線</td>
    <td align="center"><strong>医療機関Dashboard Demo</strong><br>予約・準備状況・通知結果</td>
  </tr>
</table>

- 公開Demoでは、すべて架空データを使用し、実際のLINE、SMS、電話、決済を送信しません。
- LINE予約、MyPage、通知、オンライン診療、決済案内は、医療機関ごとの契約・tenant設定・審査・外部サービス設定後に有効化するMVP／Pilot機能です。
- 患者が回答する問診、電子署名、電子カルテ、電子処方箋、オンライン資格確認が全面的に本番提供済みとは表現しません。

[MS Platformを確認する](https://ms-platform.shingihou.com/?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [公開Demoを見る](https://ms-platform.shingihou.com/demo?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill)

## Skillの仕組み

```text
Discover              Understand             Prepare
サービスを見つける →  課題と制約を理解する →  Brief・問い合わせ案を作る
                                                   ↓
Track                 Execute                Route
進捗と結果を確認する ← 必要時のみ有料実行へ ← 正しい公式窓口へつなぐ
```

最初の4段階は、公開Skill内のサービスカタログとテンプレートで行えます。外部への送信、電話、予約、人工確認、個別システム導入は自動では始まりません。

## SGHサービスマップ

| 相談テーマ | 公開Skill内で整理できること | SGH側で別途扱うこと | 公開状態 |
|---|---|---|---|
| Medical Supporter／LINE | 海外患者支援の入口、LINEで見られる情報、必要項目と注意事項を整理 | 医療機関との連絡、通訳・書類・手続支援 | 公式サイト・LINE窓口あり |
| LINE Bot／LIFF | Rich Menu、FAQ、多言語案内、予約・MyPage・有人引継ぎの構成をBrief化 | LINE公式アカウント、LIFF、Webhook、CRM連携の設計・構築 | 既存実例あり・個別見積 |
| MS Platform | LINE予約、MyPage、本人確認、通知、オンライン診療入室の導入要件を整理 | tenant初期設定、要件定義、導入、外部サービス連携 | 公開Demo／MVP・個別導入 |
| SGH Phone | 電話業務の用途、対象、台本、運用条件を整理 | AI受付、IVR、記録、要約、通知、発信 | B2B提供・個別見積 |
| 891 AI Automation | LINE、メール、フォーム、CRM、n8nの自動化候補を整理 | ワークフロー設計、構築、運用支援 | 相談受付中 |
| Web / SNS | 目的、対象者、導線、必要コンテンツをBrief化 | Web制作、運用、SNS支援 | 個別相談 |
| KusuriJapan | 公開情報と相談窓口へ案内 | 輸入・手続に関する個別確認 | 情報・相談サービス |
| SGH Bio Lab | B2B相談項目と用途を整理 | RUO関連の供給・調整相談 | B2B問い合わせ |
| Travel / Dining showcase | メニュー、予約条件、旅程の確認項目を整理 | Menu Bridge等の個別サービス、実予約、電話 | 機能ごとに条件が異なる |

> [!NOTE]
> この表はサービスを発見するための案内です。契約、料金、対応可否、提供時期を保証するものではありません。LINE Rich Menuが運用中でも、その遷移先の全機能が本番提供済みとは限りません。MS Platformを含むDemo／MVP機能は、医療機関ごとの初期設定なしに利用できるものではありません。

## 個人の方と、企業・医療機関の方へ

### 個人・訪日／在日ユーザー

- 日本語の問い合わせ内容を準備したい
- 予約、ホテル、生活サービスの確認項目を整理したい
- 海外患者支援の正しい相談窓口を知りたい
- Medical SupporterのLINE、MyPage、サービスフローの入口を知りたい
- 日本語の結果や案内を自分の言語で理解したい

### 企業・クリニック・自治体・宿泊事業者

- 電話、LINE、メール、フォームが分断されている
- 外国人顧客・患者の受付導線を整えたい
- LINE予約、Rich Menu、LIFF、MyPage、通知を設計したい
- 予約、診療前確認、CRM、担当者引継ぎを見直したい
- 自社サービスをAI Agentから見つけてもらいたい
- 自社ブランドの公式Skill、FAQ、Menu Bridgeを作りたい

## 出力例：SGH Consultation Brief

```text
SGH Consultation Brief

相談者区分: クリニック運営者
目的: 外国人患者からの問い合わせ受付を整理したい
現状: 電話・LINE・Webフォームを別々に管理
希望: 受付分類、必要情報の確認、担当者通知、履歴管理
制約: AIは診断・治療判断を行わない
共有してよい情報: 業務フローと公開済み診療案内
共有しない情報: 患者名、病歴、診断書
不足情報: 月間件数、対応言語、現在のCRM、営業時間
候補: Medical Supporter LINE + MS Platform + 891 AI Automation
次の一手: 公式相談窓口で要件と見積を確認
```

Skillは相談票を作れますが、送信、契約、電話、予約、システム変更は行いません。

## Showcase：LINEとAIから見つけてもらうためのSkill

SGHは、実行機能だけでなく「企業のサービスをAI Agentが理解し、LINE／Webの正しい入口へ案内できる形」にする設計も行います。

```text
Restaurant ABC Menu Bridge — Powered by SGH

発見: メニュー、FAQ、店舗ルール
理解: 多言語説明、アレルギー確認項目
準備: 来店条件、予約相談Brief
実行: 店舗またはSGHの正式な有料導線へ
```

Menu Bridge、公開FAQ、サービスカタログは、利用者に役立つ宣伝入口になります。ただし、それらの閲覧やTokenがSGH Phone、予約代行、人的対応の無料利用権に変わることはありません。

同じ考え方で、企業や医療機関向けに次の入口を設計できます。

- 公式サービスを発見するAgent Skill
- LINE Official AccountとRich Menu
- LIFF上の予約、MyPage、フォーム、会員画面
- 多言語FAQ、問い合わせ分類、AI翻訳補助
- CRM、カレンダー、n8n、担当者通知、有人引継ぎ

## AI・Web・LINE、それぞれの公式入口

| 入口 | 役割 |
|---|---|
| [shingihou.com](https://www.shingihou.com/ja) | 会社情報、公式サービス、責任範囲、法的情報、正式な相談窓口 |
| [shingihou.jp](https://www.shingihou.jp/) | 多言語のサービス案内、ユースケース、Demo・導入情報 |
| [Medical Supporter Official LINE](https://line.me/R/ti/p/%40acl1165c) | 海外患者支援についてLINEから相談を始める公式入口 |
| [MS Platform](https://ms-platform.shingihou.com/demo) | 医療機関向け患者導線・管理画面の公開mock Demo |
| [SGH-skill](https://github.com/linchichuan/SGH-skill) | AI Agentがサービスを発見し、相談を整理し、正しい公式入口へ進むための公開パッケージ |

GitHubは公式サイトの代替ではなく、AI時代の「見つけてもらう入口」です。料金、契約、提供条件、個人情報の取扱いは、該当する公式サイトと個別契約で確認します。

## 無料の公開部分と、有料の実行部分

| 公開Skillに含まれるもの | 別契約・見積が必要なもの |
|---|---|
| README、サービスカタログ、公開資料 | 実際の対外電話 |
| ローカルSkillのインストール | 実予約、変更、取消 |
| サービス診断、相談Brief、問い合わせ案 | 人による確認、調整、例外対応 |
| 公式URL、LINE入口、公開Demoの案内 | LINE送信、Rich Menu公開、LIFF／tenant設定 |
| 副作用のない対応可否チェック | MenuBridge解析、Clinic DX、自動化、Web等の個別導入 |
| ローカルテンプレートによる設計案 | SGHの外部AI/API、通信、決済、運用資源を使う処理 |

> [!IMPORTANT]
> **このリポジトリの閲覧、clone、Skillのインストールによって、SGHのLINE送信、MenuBridge解析、電話、予約、人的作業、AI API処理、システム構築の無料枠は付与されません。**
> ChatGPT、Claude、Codexなど、利用者自身が使用するAIサービスの料金と利用条件は、それぞれの提供元との契約に従います。

公開ツールの `get_sgh_capabilities` と `check_task_supported` は、MCP gateway内のバージョン管理されたローカル規則だけを参照します。SGH Service、Supabase、Twilio、LINE Messaging API、MenuBridge、外部AI API、人的キューを呼び出さず、requestも作成しません。

## Remote MCP：電話・予約を扱う有料実行モジュール

現在のRemote MCPは、SGH全サービスを実行する万能APIではありません。Phase 1では、非緊急の電話問い合わせと通常予約を中心に、下書き、見積確認、明示確認、進捗、結果を扱います。

```text
相談を整理                   電話なし
    ↓
OAuthで本人確認              電話なし
    ↓
request単位の見積・利用資格   電話なし
    ↓
対象・共有情報・料金を明示確認
    ↓
利用枠を確保できた場合のみQUEUED
```

- `DRAFT` — 下書き。電話も予約もしていません。
- `AWAITING_CONFIRMATION` — 情報、見積または確認待ちです。
- `QUEUED` — 有料実行待ちです。予約完了ではありません。
- `CONFIRMED` — 相手先から検証可能な確認結果を得た状態です。

SGH Passは、購入済みまたは発行元負担の利用資格です。tenant、service scope、issuer、期限、回数を検証し、requestと原子的に結び付けます。公開用TokenやMenu Bridge用Passを電話・人的作業へ転用できません。

## 提供状況

| 項目 | 状態 |
|---|---|
| Public Agent Skill / README | **Available** |
| ローカルでのサービス案内・Brief作成 | **Available** |
| Medical Supporter Official LINE相談入口 | **Available・MyPageはMVP／連携整備中** |
| Medical Supporter／醫療助手 LINE Rich Menu | **運用確認済み・遷移先は機能別条件** |
| SGH SERVICE LINE／MenuBridge LIFF | **実装・既存product面あり・利用条件は機能別** |
| LINE Commerce／clinic客製Bot | **code-level／Demo・MVP実例・本番は個別確認** |
| MS Platform公開サイト／Demo | **Available・架空データ** |
| MS Platform本番LINE／LIFF機能 | **productized pre-pilot / MVP・個別設定後** |
| Remote MCP `/mcp` | **Private beta / live未検証** |
| OAuth・課金を伴う本番実行 | **正式提供前の検証が必要** |
| 韓国語・トルコ語 | README / discovery copyのみ |
| API結果言語 | 日本語・繁體中文・英語（Phase 1） |

最終確認日: **2026-07-22**

## インストール

`skills/sgh-japan-assistant` を、Agent Skills対応ツールまたはプロジェクトのskillsディレクトリへ追加してください。

```text
Use $sgh-japan-assistant to identify the right SGH service,
compare its LINE / LIFF and MS Platform routes, create a consultation brief,
and show the official next step. Do not send, publish, register, upload,
call, book, pay, or create a human task.
```

Skill package: [`skills/sgh-japan-assistant`](skills/sgh-japan-assistant)

開発・ローカル検証：

```bash
cp env.example .env
npm install
npm run typecheck
npm test
npm run dev
```

- [クライアント接続](docs/client-setup.md)
- [アーキテクチャ](docs/sgh-skill-architecture.md)
- [無料／有料の境界](docs/commercial-boundary.md)
- [Remote MCP tool contract](skills/sgh-japan-assistant/references/tool-contracts.md)

## GitHub宣伝素材

- README hero: [`assets/sgh-service-navigator-hero.png`](assets/sgh-service-navigator-hero.png)
- Social preview: [`assets/sgh-service-navigator-social-preview.png`](assets/sgh-service-navigator-social-preview.png)
- Skill icon: [`assets/sgh-icon.svg`](assets/sgh-icon.svg)
- Medical Supporter LINE実例: [`assets/medical-supporter-line-rich-menu.webp`](assets/medical-supporter-line-rich-menu.webp)
- 醫療助手 LINE実例: [`assets/medical-assistant-line-rich-menu.webp`](assets/medical-assistant-line-rich-menu.webp)
- MS Platform Demo画面: [`assets/ms-platform-patient-mypage-demo.png`](assets/ms-platform-patient-mypage-demo.png) / [`assets/ms-platform-admin-dashboard-demo.png`](assets/ms-platform-admin-dashboard-demo.png)

HeroとSocial previewは画像内に文字を入れていないため、5言語のREADMEで共通利用できます。LINEとMS Platformの画像は、実例または明確にDemo表示された画面です。Social previewはファイルを置くだけではGitHubへ自動設定されないため、repositoryの **Settings → General → Social preview** から画像を指定してください。

GitHub公開時の推奨metadata：

- Description: `LINEで受け止め、AIで整理し、Medical Supporter・MS Platform・SGHの正しい入口へつなぐ公開Agent Skill`
- Website: `https://www.shingihou.com/ja/services`
- Topics: `agent-skills`, `ai-agent`, `line-bot`, `liff`, `mcp`, `medical-supporter`, `ms-platform`, `multilingual`

## 安全・責任範囲

- 緊急通報、診断、処方、治療方針、法律判断は行いません。
- 公開Skillへ病歴、診断書、パスポート、カード情報、パスワード、認証コードを入力しないでください。
- 空席、受入可否、料金、輸入可否、納期、治療結果を推測・保証しません。
- 医療、物販、AI自動化、電話など、サービスごとの契約主体と責任範囲を分離します。
- `QUEUED` や `CALLING` を「予約完了」と表現しません。
- Secret、OAuth Token、Twilio資格情報、患者情報をこのrepositoryに保存しません。

## よくある質問

### Skillをインストールすると、何ができますか？

SGHサービスの発見、相談内容の整理、問い合わせ案、次の公式窓口の確認ができます。インストールだけで電話や外部送信は始まりません。

### GitHubで公開されているので、SGHのサービスも無料ですか？

いいえ。MIT Licenseは公開コードに適用されますが、SGHの電話、予約代行、人的対応、外部API利用、システム導入、商標利用権は含みません。

### 電話以外も依頼できますか？

はい。SkillはMedical Supporter LINE、LINE Bot／LIFF、MS Platform、Clinic DX、AI自動化、Web/SNS、KusuriJapanなどの適切な窓口を案内できます。ただし、LINEへの送信、Rich Menu公開、MS Platformへの患者登録や予約は、この公開Skillから自動実行しません。現行MCPが直接扱うのはPhase 1の電話・通常予約系だけです。

### Medical Supporter LINEとMS Platformは同じものですか？

いいえ。Medical Supporter LINEは、海外患者向けの情報・相談・支援サービスへの入口です。MS Platformは、医療機関側のLINE予約、MyPage、通知、オンライン診療導線などを個別導入するためのプラットフォームです。Skillは目的に応じて両者を案内します。

### READMEにあるLINE Botは、すべて今すぐ本番利用できますか？

いいえ。Official LINE相談入口、運用確認済みRich Menu、既存product面、公開Demo、MVP、code-level実装例を区別して掲載しています。アカウント、LIFF、tenant、Webhook、外部AI、決済、予約又は患者機能は、対象プロジェクトごとの契約・設定・審査・試験が必要です。

### Menu Bridgeは無料電話Tokenですか？

いいえ。Menu Bridgeは情報発見と利用体験のShowcaseです。利用条件は各サービス表示に従い、SGH Phoneまたは人的対応の無料枠にはなりません。

### 医療相談を入力できますか？

一般的な窓口・準備項目は案内できますが、公開Skillに症状、病歴、診断書などの要配慮情報を入力しないでください。診断や治療判断も行いません。

## 法務・料金

正式提供前レビュー用の料金、取消、利用規約、プライバシー、適正利用に関する文書は [docs/legal](docs/legal/README.md) にまとめています。現時点では施行前ドラフトを含みます。実際の契約では、公開URLに掲示された最新版、requestごとの確認画面、個別契約が優先されます。

## 公式リンク

- [新義豊株式会社](https://www.shingihou.com/ja)
- [サービス一覧](https://www.shingihou.com/ja/services)
- [多言語サービス案内](https://www.shingihou.jp/)
- [Medical Supporter](https://medicalsupporter.org/)
- [MS Platform](https://ms-platform.shingihou.com/)
- [SGH Phone](https://phone.shingihou.com/)
- [KusuriJapan](https://kusurijapan.com/)
- [お問い合わせ](https://www.shingihou.com/ja/contact)

---

<p align="center">
  <strong>Discover. Understand. Prepare. Route. Track.</strong><br>
  SGH Japan Assistant — Powered by Shingihou
</p>
