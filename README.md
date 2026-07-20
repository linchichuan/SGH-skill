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

![SGH Japan Assistant — 日本語の電話・予約・確認をAIからSGHへ](assets/sgh-skill-hero.png)

> **MVP / Private beta** — 公開リポジトリとローカルSkillは、SGHを知っていただき、依頼内容を整理するための入口です。Remote MCP の実行系ツールは、OAuth・有料利用資格・明示確認・本番検証が完了するまで正式提供とは扱いません。

## その日本語の電話、AIで準備してSGHへ。

**日本での電話・予約・確認を、あなたのAIからSGHへ相談できます。**

レストランの予約、ホテルへの確認、クリニックへの問い合わせ、予約日時の変更。日本では、Webだけでは完結せず「電話で確認してください」と言われる場面が、まだ数多くあります。

`SGH Japan Assistant Skill` は、ChatGPT、Codex、Claude Code などの対応AIが、相談内容を整理し、SGHに渡せる下書きを作り、利用資格が確認された依頼の進捗と結果を扱うための公開 Agent Skill です。

[SGH Phoneを見る](https://phone.shingihou.com?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill&utm_content=hero) ・ [導入相談を予約する](https://calendar.app.google/RF2YRyJifsPzjbDj8) ・ [お問い合わせ](https://phone.shingihou.com/support/contact?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill&utm_content=hero)

> [!IMPORTANT]
> **このリポジトリの公開、clone、Skillのインストールは、SGH Phoneの無料通話枠または無料代行サービスを付与するものではありません。**
> SGHによる電話、予約、変更、取消、人的対応は有料サービスです。有効な契約、決済済みクレジット、または発行元が費用を負担する対象サービス用SGH Passが確認できない依頼は、実行キューへ送信されません。

## 無料の公開部分と、有料の実行部分

| 無料の公開・宣伝機能 | 有料のSGH実行サービス |
|---|---|
| README、ユースケース、公開資料の閲覧 | SGHによる対外電話 |
| ローカルSkillのインストール | 実際の予約、変更、取消 |
| 相談内容・必要情報の整理 | 人による確認、例外対応、継続フォロー |
| 副作用のない対応可否チェック | Twilio、音声AI、業務オペレーションを使う処理 |
| ローカルでの `SGH Consultation Brief` 作成 | 検証済み通話結果の提供 |

公開部分は、利用者に価値を提供しながらSGHを知ってもらうためのものです。SGH側に電話費用や人的対応が発生する処理は、必ず有料利用資格の確認後に行います。

## 使い方は3ステップ

```text
1. Skillで相談内容を整理する                 無料・電話なし
                ↓
2. SGHが対応可否、見積、契約またはPassを確認   まだ電話なし
                ↓
3. 本人確認＋有料利用資格の確保後に実行         有料サービス
```

AIには、まずこのように依頼します。

```text
「明日の夜、このレストランへ確認したい内容をSGH相談票にして」

「このクリニックが外国人患者を受け入れるか、確認項目を整理して」

「歯科の予約変更について、相手に伝える条件をまとめて」

「ホテルへ23時のチェックイン可否を聞くため、必要情報を整理して」

「電話はまだ実行せず、対象・目的・期限・共有情報だけ確認して」
```

ローカルSkillは、対象、目的、希望日時、期限、伝えてよい情報、不足情報を整理し、次のような相談票を作ります。

```text
SGH Consultation Brief
- Target: Restaurant ABC, Fukuoka
- Goal: 明日19:00に2名で予約可能か確認
- Alternative: 18:30も可
- Deadline: 本日17:00まで
- Result language: 日本語
- Approved data: 予約名と人数
- Missing: キャンセル条件への同意
- Next step: SGHの見積・利用資格を確認
```

## SGHが解決したい「最後の一歩」

AIは情報を探すことが得意です。しかし、日本での予約や確認は、最後の一歩が電話に残っていることがあります。

- 日本語で何をどう伝えればよいか分からない
- 相手の営業時間内に電話する時間がない
- 聞かれそうな内容を事前に整理したい
- 医療、宿泊、予約変更など、間違えたくない
- 電話結果を自分の言語で理解したい

SGHは、その「検索した後、実際に相手と調整するまで」を、電話基盤、案件管理、多言語対応、必要に応じた人的確認で支援します。

![SGH Phoneの実行・進捗管理イメージ](assets/sgh-phone-workflow.png)

## 想定される利用シーン

| シーン | 相談例 |
|---|---|
| レストラン | 空席、予約条件、アレルギー対応の確認 |
| ホテル・旅行 | レイトチェックイン、荷物預かり、送迎の確認 |
| クリニック | 外国語対応、初診条件、予約方法の確認 |
| 美容・生活サービス | 予約、日時変更、サービス条件の確認 |
| 不動産・生活インフラ | 内見、管理会社、電気・ガス・通信の問い合わせ整理 |
| 法人業務 | 日本語電話受付、折り返し、予約前確認、フォロー業務 |

各案件の対応可否、料金、所要時間、必要な同意は、正式相談後にSGHが確認します。医療相談では診断や治療提案を行いません。

## Remote MCP の安全・課金境界

Remote MCP は、電話中ずっと接続を保持する仕組みではありません。実行可能な依頼だけを非同期キューへ送り、`request_id` で進捗を確認します。

```text
公開情報・対応可否確認
        ↓
OAuthで本人を確認
        ↓
副作用のないdraftを作成
        ↓
見積／契約／対象サービス用SGH Passを確認
        ↓
本人が対象・共有情報・料金を明示確認
        ↓
利用枠を原子的に確保できた場合だけQUEUED
```

以下は同じ意味ではありません。

- `DRAFT` — 下書き。電話はしていません。
- `AWAITING_CONFIRMATION` — 情報、見積または利用資格の確認待ちです。
- `QUEUED` — 有料利用資格を確保し、実行待ちに入りました。予約完了ではありません。
- `CONFIRMED` — 相手先から検証可能な確認結果を得た状態です。

すべてのMCP応答は、状態を推測せず、次の共通契約で返します。

```json
{
  "request_id": "req_xxx",
  "status": "AWAITING_CONFIRMATION",
  "is_final": false,
  "requires_user_action": true,
  "display_message": "見積または有料利用資格を確認してください。電話はまだ実行されていません。",
  "next_action": {
    "type": "CONTACT_SALES",
    "description": "SGHの正式な見積、契約または対象サービス用SGH Passを確認してください。"
  },
  "updated_at": "2026-07-20T12:00:00+09:00"
}
```

## SGH Passについて

SGH Pass は「無料通話Token」ではなく、誰が費用を負担し、どのサービスを何回利用できるかを示す利用資格です。

- 利用者が購入済みのPass
- 契約企業の利用枠
- ホテル、診所、店舗など発行元が費用を負担する sponsored Pass

Passは、tenant、対象サービス、回数、期限、scopeを限定します。Menu Bridgeなどの無料宣伝用Passや公開Tokenを、SGH Phoneまたは人的対応へ転用することはできません。

## Menu Bridgeのような宣伝Skillへの応用

Menu Bridge は、電話を無料提供せずにSGHを知ってもらう入口として使えます。

```text
Restaurant ABC Menu Bridge — Powered by SGH

無料：メニュー、FAQ、言語説明、アレルギー確認項目、相談内容の整理
有料：電話、実予約、変更、取消、人的対応
```

利用者が実行を希望した時点で、SGHの見積または対象サービス用Passへ案内します。これにより、公開Skillは広告と実用性を両立しながら、SGHの電話費用を無制限に開放しません。

## インストール

`skills/sgh-japan-assistant` を、Agent Skills対応ツールまたはプロジェクトのskillsディレクトリへ追加してください。

```text
Use $sgh-japan-assistant to prepare an SGH consultation brief.
Do not place a call. Show the target, shared data, missing information,
and paid-service boundary before asking for confirmation.
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

接続方法は [docs/client-setup.md](docs/client-setup.md)、実装境界は [docs/sgh-skill-architecture.md](docs/sgh-skill-architecture.md)、無料／有料の境界は [docs/commercial-boundary.md](docs/commercial-boundary.md) を参照してください。

## 法人の方へ

SGH Phoneは、日本語の電話受付、IVR、通話記録、要約、担当者通知、折り返し管理、予約前ヒアリング、必要に応じた発信業務を整理するB2B電話基盤です。

- 自社サービスをAI Agentから見つけてもらいたい
- 外国人顧客向けの電話・予約対応を整理したい
- 自社ブランドの公式SkillやMenu Bridgeを公開したい
- 電話、CRM、多言語対応、人的引継ぎを一つの導線にしたい

企業ごとのブランド、知識、権限、電話スクリプト、料金、Passを分離した `Powered by SGH` の導入相談も受け付けています。

## よくある質問

### Skillをインストールすると電話がかかりますか？

いいえ。ローカルSkillは情報を整理するだけです。Remote MCPでも、draft作成では電話・予約・人的案件を開始しません。

### GitHubで公開されているので、SGHのサービスも無料ですか？

いいえ。MIT Licenseは公開コードにのみ適用され、SGH Phoneの通話料、代行、人的対応、商標またはサービス利用権は含みません。

### いつ料金が発生しますか？

SGHが案件ごとの対応可否と料金を提示し、利用者が明示確認した後です。料金体系、未接続時の扱い、取消条件は、適用される見積または契約条件で確認します。

### SGH Passなら利用者は無料ですか？

利用者の支払いが不要なPassでも、発行元または契約企業が費用を負担します。公開された無制限の無料通話枠ではありません。

## 法務・料金（公開前レビュー用ドラフト）

SGH Assistantの有料実行に適用する法務・料金文書を、正式公開前のレビュー用としてまとめています。

| 文書 | 確認する内容 |
|---|---|
| [料金及び見積方針](docs/legal/pricing.md) | request単位の税込見積、決済承認、SGH Pass及び人的対応料金 |
| [キャンセル・返金方針](docs/legal/cancellation-refund.md) | 実行開始前後の取消、承認解除、利用枠返却及び返金 |
| [SGH Assistant 利用規約](docs/legal/terms.md) | 利用条件、責任分界、結果非保証及び禁止事項 |
| [プライバシーポリシー](docs/legal/privacy.md) | 認証、依頼、通話、要配慮個人情報及び委託先での取扱い |
| [適正利用ガイドライン](docs/legal/aup.md) | 迷惑発信、不正利用、医療・緊急用途及び権限回避の禁止 |
| [特定商取引法に基づく表記](docs/legal/sctl.md) | 事業者情報、販売価格、支払、提供時期及び取消条件 |
| [法務文書インデックス](docs/legal/README.md) | 適用対象、優先順位及び正式公開前の設定項目 |

> [!CAUTION]
> これらは**公開前レビュー用ドラフトであり、現時点では施行されていません**。正式な利用には、SGHが公開URLで掲示する施行日・バージョン付き文書、各requestの確認画面及び個別契約が適用されます。固定の標準料金、未接続・再試行・人的対応の具体的料金、受付時間、保存期間及び委託先情報は、正式提供開始前に確定して表示します。

GitHubリポジトリの閲覧、clone及びSkillのインストールは無料ですが、SGHによる電話、実予約、変更、取消及び人的対応は無料ではありません。各requestの税込金額、課金条件、共有情報及び取消条件を表示し、利用者が明確に確認する前に実行しません。

## 公開リポジトリの注意事項

- 公開Issueへ病歴、症状、パスポート、カード情報、電話番号、Pass Tokenを投稿しないでください。
- 料金、営業時間、空席、医療機関の受入条件を推測しません。
- `QUEUED` や `CALLING` を「予約完了」と表現しません。
- 本番secret、Twilio資格情報、OAuth Token、患者情報はこのrepositoryに保存しません。
- SGHの名称、ロゴ、ブランド資産は、MIT Licenseによる商標利用許諾の対象外です。

## 公式リンク

- **SGH Phone**: https://phone.shingihou.com
- **導入相談**: https://calendar.app.google/RF2YRyJifsPzjbDj8
- **お問い合わせ**: https://phone.shingihou.com/support/contact
- **運営会社**: [新義豊株式会社](https://shingihou.com)

---

<p align="center">
  <strong>公開Skillで見つけてもらい、有料実行はSGHで安全に。</strong><br>
  SGH Japan Assistant Skill — Powered by SGH Phone
</p>
