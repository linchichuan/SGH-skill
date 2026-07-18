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

> **MVP / Private beta** — このrepositoryには Agent Skill だけでなく、Streamable HTTP `/mcp`、9 tools、OAuth resource-server、SGH Service adapter、Supabase migration、テストが含まれます。`https://mcp.shingihou.com/mcp` は deployment と OAuth smoke test 完了までは公開稼働中とは扱いません。

## その日本語の電話、ひとりで抱えなくていい。

**日本での電話・予約・確認を、あなたのAIからSGHへ。**

レストランの予約、ホテルへの確認、クリニックへの問い合わせ、予約日時の変更。
日本では、Webだけでは完結せず「電話で確認してください」と言われる場面が、まだ数多くあります。

`SGH Japan Assistant Skill` は、ChatGPT、Codex、Claude Code などのAIが依頼の下書きを作り、本人確認後に実行を確定し、進捗と検証済み結果を取得するための公開 Agent Skill＋Remote MCP gateway です。

[SGH Phoneを見る](https://phone.shingihou.com) ・ [初回相談を予約する](https://calendar.app.google/RF2YRyJifsPzjbDj8) ・ [お問い合わせ](https://phone.shingihou.com/support/contact)

## AIに、こう話しかけるだけ

```text
「明日の夜、このレストランに空席があるか電話で確認したい」

「このクリニックが外国人患者を受け入れているか、日本語で聞きたい」

「歯科の予約を来週へ変更するため、伝える内容を整理して」

「ホテルに23時のチェックインが可能か確認したい」

「日本語で電話するときに必要な情報を、先にまとめてほしい」
```

Skill は、対象、目的、希望日時、期限、伝えてよい情報などを整理し、実行前に確認できる assistance draft と状態契約を作成します。

## なぜ、このSkillが必要なのか

AIは情報を探すことが得意です。しかし、日本での予約や確認は、最後の一歩が電話に残っていることがあります。

- 日本語で何をどう伝えればよいか分からない
- 営業時間内に電話する時間がない
- 相手から聞かれそうな内容を事前に整理したい
- 医療、宿泊、予約変更など、間違えたくない
- 電話の結果を自分の言語で理解したい

SGHは、その「検索した後、実際に相手と調整するまで」の課題に取り組んでいます。

## この公開Skillがすること

1. **相談内容を理解する** — 電話、予約確認、日時変更、折り返しなど、目的を分類します。
2. **必要情報だけを整理する** — 対象、希望内容、日時、期限、結果言語を確認します。
3. **リスクを先に見つける** — 医療、支払い、個人情報、キャンセル料などを人による確認事項として明示します。
4. **実行前の下書きを作る** — 対象、目的、共有情報、費用、`contract_version` を確認可能な形で返します。
5. **明示確認後だけ実行する** — OAuth、明示確認、idempotency を通過した依頼だけを非同期処理へ送ります。
6. **進捗と結果を分けて返す** — `QUEUED` を予約完了と表現せず、検証済み結果だけを final result として返します。

![SGH Phone workflow](assets/sgh-phone-workflow.png)

## 想定される利用シーン

| シーン | 相談例 |
|---|---|
| レストラン | 空席、予約条件、アレルギー対応の確認 |
| ホテル・旅行 | レイトチェックイン、荷物預かり、送迎の確認 |
| クリニック | 外国語対応、初診条件、予約方法の確認 |
| 美容・生活サービス | 予約、日時変更、サービス条件の確認 |
| 不動産・生活インフラ | 内見、管理会社、電気・ガス・通信の問い合わせ整理 |
| 法人業務 | 日本語電話受付、折り返し、予約前確認、フォロー業務の相談 |

各案件の対応可否、費用、所要時間、必要な同意は、正式相談後にSGHが確認します。

## 広告だけで終わらせない設計

このrepositoryはSGHのサービスを知ってもらうための公開入口ですが、単なる会社紹介ではありません。Remote MCP を接続したAIは、次のような状態契約を扱えます。

```text
{
  "request_id": "req_xxx",
  "status": "QUEUED",
  "is_final": false,
  "requires_user_action": false,
  "display_message": "依頼は実行待ちです。予約完了ではありません。",
  "next_action": null,
  "updated_at": "2026-07-18T15:30:00+09:00"
}
```

## 大切なこと

ローカルの `SKILL.md` だけでは電話を実行しません。認証済み Remote MCP でも、draft は副作用を起こさず、対象、目的、共有情報、費用を本人が明示確認した後の `confirm_assistance_request` だけが非同期実行を開始できます。

- 実際の対応可否はSGHが確認します。
- 料金、営業時間、空席、医療機関の受入条件を推測しません。
- 医療相談では診断や治療提案を行いません。
- 公開Issueに病歴、パスポート、カード情報などを投稿しないでください。
- 個人情報を相手へ伝える前に、本人の明確な同意が必要です。

## Install

このrepositoryの `skills/sgh-japan-assistant` フォルダを、Agent Skillsに対応するツールまたはプロジェクトのskillsディレクトリへ追加してください。

```text
Use $sgh-japan-assistant to draft this Japan phone request, then wait for my explicit confirmation before SGH queues execution.
```

Skill package: [`skills/sgh-japan-assistant`](skills/sgh-japan-assistant)

Remote MCP をローカルで検証する場合：

```bash
cp env.example .env
npm install
npm run typecheck
npm test
npm run dev
```

Codex、Claude Code、ChatGPT developer mode の接続方法は [docs/client-setup.md](docs/client-setup.md) を参照してください。

## Repository

- `src/` — Remote MCP、OAuth token verification、SGH Service adapter
- `skills/sgh-japan-assistant/` — installable Agent Skill package
- `supabase/migrations/` — OAuth subject、consent、hash-only Pass、outbox migration
- `docs/` — audit、architecture、n8n contract、client setup
- `tests/` — status、idempotency、OAuth challenge、Streamable HTTP tests

## 法人の方へ

SGH Phoneは、日本語の電話受付、IVR、通話記録、要約、担当者通知、折り返し管理、予約前ヒアリング、必要に応じた発信業務を整理するB2B電話基盤です。

- 自社のサービスをAI Agentから見つけてもらいたい
- 外国人顧客からの電話・予約対応を整理したい
- 少人数でも電話対応とフォローを止めたくない

そのような企業向けの導入相談も受け付けています。

## 公式リンク

- **SGH Phone**: https://phone.shingihou.com
- **初回相談**: https://calendar.app.google/RF2YRyJifsPzjbDj8
- **お問い合わせ**: https://phone.shingihou.com/support/contact
- **運営会社**: [新義豊株式会社](https://shingihou.com)

---

<p align="center">
  <strong>日本語の電話対応を、AIとSGHでもっとスムーズに。</strong><br>
  SGH Japan Assistant Skill — Powered by SGH Phone
</p>
