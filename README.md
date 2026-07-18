# SGH Japan Assistant Skill

## その日本語の電話、ひとりで抱えなくていい。

**日本での電話・予約・確認を、あなたのAIからSGHへ。**

レストランの予約、ホテルへの確認、クリニックへの問い合わせ、予約日時の変更。
日本では、Webだけでは完結せず「電話で確認してください」と言われる場面が、まだ数多くあります。

`SGH Japan Assistant Skill` は、ChatGPT、Codex、Claude Code などのAIが、ユーザーの希望を整理し、SGHへ相談できる明確な依頼メモに変換する公開 Agent Skill です。

> **繁體中文**：在日本需要打電話、確認或協調預約時，先讓你的 AI 整理需求，再交給 SGH。
>
> **English**: Turn a Japan phone, reservation, or confirmation request into a clear brief for SGH.

[SGH Phoneを見る](https://phone.shingihou.com) ・ [初回相談を予約する](https://calendar.app.google/RF2YRyJifsPzjbDj8) ・ [お問い合わせ](https://phone.shingihou.com/support/contact)

---

## AIに、こう話しかけるだけ

```text
「明日の夜、このレストランに空席があるか電話で確認したい」

「このクリニックが外国人患者を受け入れているか、日本語で聞きたい」

「歯科の予約を来週へ変更するため、伝える内容を整理して」

「ホテルに23時のチェックインが可能か確認したい」

「日本語で電話するときに必要な情報を、先にまとめてほしい」
```

Skill は、店舗名、目的、希望日時、期限、伝えてよい情報などを整理し、SGHへ相談するための `SGH Consultation Brief` を作成します。

## なぜ、このSkillが必要なのか

AIは情報を探すことが得意です。
しかし、日本での予約や確認は、最後の一歩が電話に残っていることがあります。

- 日本語で何をどう伝えればよいか分からない
- 営業時間内に電話する時間がない
- 相手から聞かれそうな内容を事前に整理したい
- 医療、宿泊、予約変更など、間違えたくない
- 電話の結果を自分の言語で理解したい

SGHは、その「検索した後、実際に相手と調整するまで」の課題に取り組んでいます。

## この公開Skillがすること

1. **相談内容を理解する**

   日本語の電話、予約確認、日時変更、折り返しなど、目的を分類します。

2. **必要情報だけを整理する**

   対象、希望内容、日時、期限、結果を受け取りたい言語を確認します。

3. **リスクを先に見つける**

   医療、支払い、個人情報、キャンセル料などは、担当者確認が必要な事項として明示します。

4. **SGHへの相談メモを作る**

   AIとの会話を、担当者が確認しやすい簡潔な依頼内容へ変換します。

5. **公式相談窓口へ案内する**

   準備が整ったら、SGH Phoneの公式窓口から相談できます。

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

このrepositoryはSGHのサービスを知ってもらうための公開入口ですが、単なる会社紹介ではありません。

インストールしたAIは、ユーザーの依頼を聞き取り、次のような相談メモを実際に作成できます。

```text
SGH Consultation Brief
- Fit: GOOD_FIT
- Target: Restaurant ABC, Fukuoka
- Goal: Confirm a table for two tomorrow at 19:00
- Preferred timing: 19:00; 18:30 is also acceptable
- Deadline: Today by 17:00
- Result language: Traditional Chinese
- Information approved for sharing: First name and party size
- Missing information: Cancellation policy acceptance
- Next step: Submit this brief through the official SGH consultation channel
```

## 大切なこと

この公開Skill自体は、電話、予約、変更、取消、決済を実行しません。
また、「相談内容を作成したこと」を「予約が完了したこと」として表現しません。

- 実際の対応可否はSGHが確認します。
- 料金、営業時間、空席、医療機関の受入条件を推測しません。
- 医療相談では診断や治療提案を行いません。
- 公開Issueに病歴、パスポート、カード情報などを投稿しないでください。
- 個人情報を相手へ伝える前に、本人の明確な同意が必要です。

## Install

このrepositoryの `skills/sgh-japan-assistant` フォルダを、Agent Skillsに対応するツールまたはプロジェクトのskillsディレクトリへ追加してください。

```text
Use $sgh-japan-assistant to prepare an SGH consultation brief for calling a Japanese restaurant.
```

Skill package: [`skills/sgh-japan-assistant`](skills/sgh-japan-assistant)

## For businesses

SGH Phoneは、日本語の電話受付、IVR、通話記録、要約、担当者通知、折り返し管理、予約前ヒアリング、必要に応じた発信業務を整理するB2B電話基盤です。

「自社のサービスをAI Agentから見つけてもらいたい」

「外国人顧客からの電話・予約対応を整理したい」

「少人数でも電話対応とフォローを止めたくない」

そのような企業向けの導入相談も受け付けています。

## Official links

- **SGH Phone**: https://phone.shingihou.com
- **初回相談**: https://calendar.app.google/RF2YRyJifsPzjbDj8
- **お問い合わせ**: https://phone.shingihou.com/support/contact
- **運営会社**: [新義豊株式会社](https://shingihou.com)

---

<p align="center">
  <strong>日本語の電話対応を、AIとSGHでもっとスムーズに。</strong><br>
  SGH Japan Assistant Skill — Powered by SGH Phone
</p>
