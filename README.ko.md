# SGH Japan Assistant

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

![SGH Japan Assistant — 신의호 서비스로 연결되는 공식 AI 관문](assets/sgh-service-navigator-hero.png)

> **Public Skill available / Remote execution private beta**
> 공개 Skill은 SGH 서비스를 찾고, 상담 내용을 정리해 적절한 공식 창구로 연결하는 입구입니다. 전화·예약·인력 대응을 수행하는 Remote MCP는 유료 이용 자격과 명시적 확인이 필요한 제한 제공 기능입니다.

## 일본에서 필요한 ‘다음 행동’을 당신의 AI에서.

**찾고, 이해하고, 준비하고, 연결합니다. 실행은 필요할 때만 진행합니다.**

`SGH Japan Assistant`는 Shingihou(新義豊)의 LINE Bot·LIFF, Medical Supporter, MS Platform, Clinic DX, AI 자동화, Web, 일본어 대응 서비스를 ChatGPT, Codex, Claude Code 등의 AI에서 발견하고 이해할 수 있게 하는 공식 Agent Skill입니다.

핵심은 전화가 아니라 **LINE에서 요청을 받고, AI가 내용을 정리한 뒤, 알맞은 화면·담당자·업무 흐름으로 연결하는 것**입니다. 전화는 그 흐름에서 실제 일본어 연락이 필요할 때만 사용하는 유료 execution adapter입니다. Skill은 막연한 상담을 한 장의 Brief로 만들고 공식 창구를 안내하며, 실제 전화·예약·조율·인력 작업은 견적과 명시적 확인을 거친 경우에만 별도로 진행합니다.

[SGH 서비스 찾기](https://www.shingihou.com/ja/services?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [AI·업무 자동화 보기](https://www.shingihou.jp/ai-automation?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [기업 상담 문의](https://www.shingihou.com/ja/contact?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill)

## 60초 안에 할 수 있는 일

- 자신의 과제에 맞는 SGH 서비스 찾기
- Medical Supporter LINE, SGH SERVICE, MenuBridge, MS Platform의 역할 구분하기
- 상담 내용을 `SGH Consultation Brief`로 정리하기
- 일본 기업에 보낼 수 있는 자연스러운 일본어 문의안 만들기
- LINE 예약, Rich Menu, LIFF, MyPage, 알림의 도입 요건 정리하기
- 전화·LINE·이메일·폼·CRM의 수작업 흐름 점검하기
- 실행 전에 부족한 정보, 요금 구분, 다음 공식 창구 확인하기

AI에게 다음과 같이 요청할 수 있습니다.

```text
“외국인 환자 수용 체계를 정비하고 싶어. 어떤 SGH 서비스가 적합해?”

“Medical Supporter Official LINE에서 이용할 수 있는 입구를 알려 줘.
  개인정보나 의료정보는 입력하지 않을게.”

“클리닉에 LINE 예약과 MyPage를 도입하고 싶어.
  MS Platform용 No-PHI 도입 Brief를 작성해 줘.”

“Rich Menu에서 예약, AI 번역, 담당자 상담으로 이어지는 구조를 설계해 줘.
  아직 게시하거나 LINE으로 보내지는 마.”

“전화, LINE, 이메일, CRM의 수작업을 정리하고
  자동화 후보를 세 가지 제안해 줘.”

“이 내용을 일본 기업에 보낼 수 있는 자연스러운 일본어 문의문으로 작성해 줘.”

“이 상담을 SGH에 전달할 수 있는 한 장의 Brief로 만들어 줘. 아직 보내지는 마.”

“레스토랑에 확인할 사항이 있어. 전화하지 말고 필요한 정보만 정리해 줘.”
```

## SGH에는 이미 LINE에서 시작할 수 있는 제품 입구가 있습니다

LINE은 단순한 알림 채널이 아닙니다. SGH는 LINE에서 상담을 접수하고, AI가 내용을 정리한 뒤, LIFF 화면·MyPage·예약·담당자·CRM·업무 자동화로 연결하는 제품군을 구축해 왔습니다.

| LINE/LIFF 입구 | 사용자가 만나는 기능 | 현재 위치 |
|---|---|---|
| Medical Supporter Official LINE | 일본 의료기관 안내, 서비스 흐름, 상담 창구, MyPage 구상, 예약·사례 정보로 이어지는 동선 | 공식 상담 입구와 LINE Login 동선이 있으며 Rich Menu 운영 중. MyPage는 MVP/연계 정비 중 |
| 醫療助手 LINE | 의료기관 안내, 서비스 흐름, AI 실시간 번역 입구, 요금·서비스, SGH SERVICE | LINE Official Account와 Rich Menu 운영 사례가 있음. 번역은 의사소통 보조이며 의료 판단이 아님 |
| SGH SERVICE LINE/LIFF | AI가 상담을 구조화해 Web 확인, 회원, 요청 동선으로 넘기는 서비스 입구 | 구현 사례 있음. 실제 발송, 외부 AI, 예약, 전화는 인증·계약·요금 확인 후 |
| MenuBridge LIFF | 카메라로 메뉴를 읽고 다국어로 내용과 주문 조건을 이해하는 입구 | 기존 제품 화면. AI 사용량과 제공 조건은 서비스 화면을 따름 |
| 클리닉용 LINE/LIFF | LINE 예약, MyPage, 알림, 온라인 진료 입실 동선 | MS Platform의 공개 mock Demo 및 productized pre-pilot. 실사용은 의료기관별 계약·초기 설정 후 |
| LINE Commerce | 상품 검색, 계정 연계, Rich Menu, Webhook, CRM/n8n 연계 | code-level 구현 및 review 사례 있음. production 활성화는 외부 설정과 개별 확인 후 |
| 클리닉 맞춤형 LINE Bot | 텍스트, 음성, 이미지, 다국어 안내, 예약 의도, 담당자 인계를 조합 | Demo/MVP 구현 사례. 모든 의료기관에서 운영 중이라고 표현하지 않음 |

<table>
  <tr>
    <td width="50%"><img src="assets/medical-supporter-line-rich-menu.webp" alt="Medical Supporter LINE Rich Menu"></td>
    <td width="50%"><img src="assets/medical-assistant-line-rich-menu.webp" alt="의료 조수 LINE Rich Menu"></td>
  </tr>
  <tr>
    <td align="center"><strong>MEDICAL SUPPORTER</strong><br>MyPage·상담 진행·예약 기록·자료 제출 동선</td>
    <td align="center"><strong>醫療助手</strong><br>서비스 흐름·AI 번역 동선·SGH SERVICE</td>
  </tr>
</table>

위 이미지는 2026년 7월 22일 기존 LINE Official Account에 저장된 것을 확인한 Rich Menu 사례입니다. 각 버튼의 목적지나 전체 MyPage가 모두 production에서 일반 공개되었다는 뜻은 아니며, Skill 설치만으로 해당 기능 또는 SGH 유료 서비스가 무료로 열리지도 않습니다.

> [!IMPORTANT]
> 공개 Skill은 LINE 메시지를 보내거나 Rich Menu를 게시하지 않습니다. 환자 계정을 만들거나 의료기록을 업로드하지 않으며, 전화·예약·결제도 실행하지 않습니다. 여기서는 서비스 발견, 요구사항 정리, Brief 작성과 공식 창구 안내까지만 제공합니다.

[Medical Supporter 보기](https://medicalsupporter.org/?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [Medical Supporter Official LINE 열기](https://line.me/R/ti/p/%40acl1165c)

## 하나의 Bot이 아니라 재사용 가능한 LINE 구현 포트폴리오

SGH가 기업에 제공하는 가치는 채팅 답변만이 아닙니다. 문의를 받아 필요한 정보를 AI가 정리하고, 본인 확인을 거친 화면이나 담당자에게 전달하며, 이후 기록과 업무 흐름까지 설계합니다.

```text
Discover          LINE intake         Prepare
서비스 발견    →  상담·질문 접수    →  AI 분류·부족 정보 정리
                                              ↓
Track             Human / System      Confirm & Route
기록·진행 확인 ← 담당자·CRM·업무로 ← 본인이 내용과 조건 확인
```

조합할 수 있는 구현 요소:

- LINE Official Account, LINE Login, LIFF, Rich Menu
- FAQ/RAG, 다국어 안내, 텍스트·음성·이미지 접수
- 예약, MyPage, 알림, 상품 검색, 온라인 진료 입구
- Supabase, CRM, 캘린더, n8n, 결제, 담당자 인계

공개 Skill은 이 설계를 설명하고 비기밀 Brief를 만드는 단계까지만 담당합니다. 실제 LINE 발송, Rich Menu 게시, 환자 등록, 예약, 외부 AI 사용, 결제, 전화, 인력 작업은 각 production 시스템에서 인증·권한·요금·명시적 확인 요건을 충족한 경우에만 진행합니다.

## MS Platform은 LINE Bot 다음 단계를 담당하는 의료기관 운영 레이어입니다

Medical Supporter LINE이 해외 환자와 지원 서비스의 접점을 만든다면, MS Platform은 의료기관 측의 LINE 예약, MyPage, 본인 확인, 알림, 온라인 진료 입실, 관리 화면을 단계적으로 구성하는 플랫폼입니다. 전화 제품의 의료 버전이 아니라, 환자 여정과 클리닉 운영을 연결하는 별도의 제품 영역입니다.

<table>
  <tr>
    <td width="50%"><img src="assets/ms-platform-patient-mypage-demo.png" alt="MS Platform 환자 MyPage Demo"></td>
    <td width="50%"><img src="assets/ms-platform-admin-dashboard-demo.png" alt="MS Platform 의료기관 관리 Dashboard Demo"></td>
  </tr>
  <tr>
    <td align="center"><strong>환자 MyPage Demo</strong><br>예약 내용·확인 코드·입실 동선</td>
    <td align="center"><strong>의료기관 Dashboard Demo</strong><br>예약·준비 상태·알림 결과</td>
  </tr>
</table>

- 공개 Demo는 모두 가상 데이터를 사용하며 실제 LINE, SMS, 전화 또는 결제를 실행하지 않습니다.
- 현재 위치는 **public mock demo / productized pre-pilot**입니다. LINE 예약, MyPage, 알림, 온라인 진료, 결제 안내를 실제로 사용하려면 의료기관별 계약, tenant 설정, 검토 및 외부 서비스 설정이 필요합니다.
- 환자 문진 제출, 전자 서명, 전자 의무기록, 전자 처방전, 온라인 자격 확인이 전면 production 제공 중이라고 주장하지 않습니다.

[MS Platform 확인하기](https://ms-platform.shingihou.com/?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [공개 Demo 보기](https://ms-platform.shingihou.com/demo?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill)

## 작동 방식

```text
Discover              Understand             Prepare
서비스 찾기          → 과제와 제약 이해하기 → Brief·문의안 만들기
                                                   ↓
Track                 Execute                Route
진행 상황과 결과 확인 ← 필요할 때만 유료 실행 ← 올바른 공식 창구로 연결
```

처음 네 단계는 공개 Skill에 포함된 서비스 카탈로그와 템플릿으로 진행할 수 있습니다. 외부 전송, 전화, 예약, 사람의 확인, 개별 시스템 도입은 자동으로 시작되지 않습니다.

## SGH 서비스 맵

| 상담 주제 | 공개 Skill 안에서 정리할 수 있는 일 | SGH에서 별도로 제공하는 일 | 공개 상태 |
|---|---|---|---|
| Medical Supporter / LINE | 해외 환자 지원 입구, LINE에서 확인할 수 있는 공개 정보, 준비 항목과 주의사항 | 의료기관 연락, 통역·서류·절차 지원 | 공식 사이트와 LINE 창구 운영 |
| LINE Bot / LIFF | Rich Menu, FAQ, 다국어 안내, 예약·MyPage·담당자 인계 구조를 Brief로 정리 | LINE Official Account, LIFF, Webhook, CRM 연계 설계·구축 | 기존 사례 있음·개별 견적 |
| MS Platform | LINE 예약, MyPage, 본인 확인, 알림, 온라인 진료 입실의 도입 요건 정리 | tenant 초기 설정, 요구사항 정의, 도입, 외부 서비스 연계 | 공개 mock Demo / pre-pilot·개별 도입 |
| SGH Phone | 전화 업무의 용도, 대상, 스크립트, 운영 조건 정리 | AI 접수, IVR, 기록, 요약, 알림, 발신 | B2B 제공·개별 견적 |
| 891 AI Automation | LINE, 이메일, 폼, CRM, n8n 자동화 후보 정리 | 워크플로 설계, 구축, 운영 지원 | 상담 접수 중 |
| Web / SNS | 목적, 대상 사용자, 동선, 필요 콘텐츠를 Brief로 정리 | 웹 제작·운영, SNS 지원 | 개별 상담 |
| KusuriJapan | 공개 정보와 상담 창구 안내 | 수입·절차 관련 개별 확인 | 정보·상담 서비스 |
| SGH Bio Lab | B2B 상담 항목과 용도 정리 | RUO 관련 공급·조율 상담 | B2B 문의 |
| Travel / Dining showcase | 메뉴, 예약 조건, 일정의 확인 항목 정리 | Menu Bridge 등의 개별 서비스, 실제 예약, 전화 | 기능별 조건 상이 |

> [!NOTE]
> 이 표는 서비스를 발견하기 위한 안내입니다. 계약, 요금, 대응 가능 여부 또는 제공 시기를 보장하지 않습니다. LINE Rich Menu가 운영 중이어도 연결된 모든 기능이 production 제공 중인 것은 아닙니다. Medical Supporter MyPage는 MVP/통합 진행 중이며, MS Platform의 공개 화면은 mock Demo입니다. 실제 사용에는 개별 초기 설정이 필요합니다.

## 개인 사용자와 기업·의료기관을 위한 안내

### 개인·방일/일본 거주 사용자

- 일본어 문의 내용을 준비하고 싶다
- 예약, 호텔, 생활 서비스의 확인 항목을 정리하고 싶다
- 해외 환자 지원의 올바른 상담 창구를 알고 싶다
- Medical Supporter LINE과 MyPage·서비스 흐름의 입구를 알고 싶다
- 일본어 결과나 안내를 자신의 언어로 이해하고 싶다

### 기업·클리닉·지자체·숙박 사업자

- 전화, LINE, 이메일, 폼이 서로 분리되어 있다
- 외국인 고객·환자의 접수 동선을 정비하고 싶다
- LINE 예약, Rich Menu, LIFF, MyPage, 알림을 설계하고 싶다
- 예약, 문진, 알림, CRM, 담당자 인계를 재검토하고 싶다
- 자사 서비스를 AI Agent가 발견할 수 있게 하고 싶다
- 자사 브랜드의 공식 Skill, FAQ, Menu Bridge를 만들고 싶다

## 출력 예시: SGH Consultation Brief

```text
SGH Consultation Brief

상담자 구분: 클리닉 운영자
목적: 외국인 환자의 문의 접수 흐름을 정비하고 싶음
현재 상태: 전화, LINE, 웹 폼을 각각 별도로 관리
희망 사항: 접수 분류, 필수 정보 확인, 담당자 알림, 이력 관리
제약 조건: AI는 진단이나 치료 결정을 하지 않음
공유 가능한 정보: 업무 흐름과 이미 공개된 진료 안내
공유하지 않을 정보: 환자명, 병력, 진단서
부족한 정보: 월간 건수, 지원 언어, 현재 CRM, 영업시간
후보: Medical Supporter LINE + MS Platform + 891 AI Automation
다음 행동: 공식 상담 창구에서 요구사항과 견적 확인
```

Skill은 상담표를 만들 수 있지만 전송, 계약, 전화, 예약 또는 시스템 변경은 수행하지 않습니다.

## Showcase: LINE과 AI에서 발견되기 위한 Skill

SGH는 실행 기능뿐 아니라, 기업의 서비스를 AI Agent가 이해하고 LINE·Web의 올바른 화면이나 담당자에게 연결할 수 있는 입구도 설계합니다.

```text
Restaurant ABC Menu Bridge — Powered by SGH

발견: 메뉴, FAQ, 매장 규칙
이해: 다국어 설명, 알레르기 확인 항목
준비: 방문 조건, 예약 상담 Brief
실행: 매장 또는 SGH의 정식 유료 경로로 연결
```

Menu Bridge, 공개 FAQ, 서비스 카탈로그는 사용자에게 유용한 홍보 입구가 될 수 있습니다. 다만 이를 열람하거나 Token을 보유해도 SGH Phone, 예약 대행 또는 인력 대응의 무료 이용 권한으로 전환되지는 않습니다.

같은 원칙으로 기업과 의료기관에 다음과 같은 제품 구성을 설계할 수 있습니다.

- 공식 서비스를 발견하게 하는 Agent Skill
- LINE Official Account와 Rich Menu
- LIFF 기반 예약, MyPage, 폼, 회원 화면
- 다국어 FAQ, 문의 분류, AI 번역 보조
- CRM, 캘린더, n8n, 담당자 알림 및 사람에게 인계하는 흐름

## 세 가지 공식 입구의 역할

| 입구 | 역할 |
|---|---|
| [shingihou.com](https://www.shingihou.com/ja) | 회사 정보, 공식 서비스, 책임 범위, 법률 정보, 정식 상담 창구 |
| [shingihou.jp](https://www.shingihou.jp/) | 다국어 서비스 안내, 활용 사례, Demo·도입 정보 |
| [SGH-skill](https://github.com/linchichuan/SGH-skill) | AI Agent가 서비스를 발견하고 상담 내용을 정리해 올바른 공식 입구로 이동할 수 있게 하는 공개 패키지 |

GitHub는 공식 사이트를 대신하는 것이 아니라 AI 시대에 ‘발견될 수 있게 하는 입구’입니다. 요금, 계약, 제공 조건 및 개인정보 처리는 해당 공식 사이트와 개별 계약에서 확인합니다.

## 무료 공개 영역과 유료 실행 영역

| 공개 Skill에 포함되는 항목 | 별도 계약·견적이 필요한 항목 |
|---|---|
| README, 서비스 카탈로그, 공개 자료 | 실제 외부 전화 |
| 로컬 Skill 설치 | 실제 예약, 변경, 취소 |
| 서비스 매칭, 상담 Brief, 문의안 | 사람의 확인, 조율, 예외 대응 |
| 공식 URL, LINE 입구, 공개 Demo 안내 | LINE 발송, Rich Menu 게시, LIFF/tenant 설정 |
| 부작용이 없는 대응 가능 여부 확인 | MenuBridge 분석, Clinic DX, 자동화, Web 등의 개별 도입 |
| 로컬 템플릿을 이용한 설계안 | SGH의 외부 AI/API, 통신, 결제, 운영 자원을 사용하는 처리 |

> [!IMPORTANT]
> **이 repository를 열람하거나 clone하고 Skill을 설치해도 SGH의 LINE 발송, MenuBridge 분석, 전화, 예약, 인력 작업, 외부 AI/API 처리 또는 시스템 구축에 대한 무료 할당량은 제공되지 않습니다.**
> 사용자가 직접 이용하는 ChatGPT, Claude, Codex 등 AI 서비스의 요금과 이용 조건은 각 서비스 제공자와의 계약을 따릅니다.

공개 도구 `get_sgh_capabilities`와 `check_task_supported`는 MCP gateway 내부의 버전 관리된 로컬 규칙만 사용합니다. LINE Messaging API, SGH Service, Supabase, Twilio, 외부 AI API 또는 인력 작업 큐를 호출하지 않으며 request도 생성하지 않습니다.

## Remote MCP: 전화·예약용 유료 실행 모듈

현재 Remote MCP는 SGH의 모든 서비스를 실행하는 범용 API가 아닙니다. Phase 1에서는 비응급 전화 문의와 일반 예약을 중심으로 draft, 견적 확인, 명시적 확인, 진행 상황 및 결과를 다룹니다.

```text
상담 내용 정리                 전화 없음
    ↓
OAuth로 본인 확인              전화 없음
    ↓
request별 견적·이용 자격 확인  전화 없음
    ↓
대상·공유 정보·요금을 명시적으로 확인
    ↓
이용 할당량을 확보한 경우에만 QUEUED
```

- `DRAFT` — 초안입니다. 전화나 예약은 진행되지 않았습니다.
- `AWAITING_CONFIRMATION` — 정보, 견적 또는 확인을 기다리는 상태입니다.
- `QUEUED` — 유료 실행 대기 상태입니다. 예약 완료가 아닙니다.
- `CONFIRMED` — 상대방에게서 검증 가능한 확인 결과를 받은 상태입니다.

SGH Pass는 구매했거나 발행자가 비용을 부담한 이용 자격입니다. tenant, service scope, issuer, 유효기간, 횟수를 검증하고 request에 원자적으로 연결합니다. 공개용 Token이나 Menu Bridge용 Pass를 전화 또는 인력 작업에 전용할 수 없습니다.

## 제공 현황

| 항목 | 상태 |
|---|---|
| Public Agent Skill / README | **Available** |
| 로컬 서비스 안내·Brief 작성 | **Available** |
| Medical Supporter Official LINE 상담 입구 | **Available·MyPage는 MVP/연계 정비 중** |
| Medical Supporter / 醫療助手 LINE Rich Menu | **운영 확인·연결 기능은 조건별 제공** |
| SGH SERVICE LINE / MenuBridge LIFF | **구현 및 기존 제품 화면 있음·이용 조건은 기능별 상이** |
| LINE Commerce / 클리닉 맞춤형 Bot | **code-level / Demo·MVP 사례·production은 개별 확인** |
| MS Platform 공개 사이트 / Demo | **Available·가상 데이터** |
| MS Platform production LINE / LIFF | **productized pre-pilot / MVP·개별 설정 후** |
| Remote MCP `/mcp` | **Private beta / live 미검증** |
| OAuth·과금이 포함된 production 실행 | **정식 제공 전 검증 필요** |
| 한국어·터키어 | README / discovery copy만 제공 |
| API 결과 언어 | 일본어·번체중문·영어(Phase 1) |

최종 확인일: **2026-07-22**

## 설치

`skills/sgh-japan-assistant`를 Agent Skills 호환 도구 또는 프로젝트의 skills 디렉터리에 추가하세요.

```text
Use $sgh-japan-assistant to identify the right SGH service,
create a consultation brief, and show the official next step.
Do not send, call, book, pay, or create a human task.
```

Skill package: [`skills/sgh-japan-assistant`](skills/sgh-japan-assistant)

개발·로컬 검증:

```bash
cp env.example .env
npm install
npm run typecheck
npm test
npm run dev
```

- [클라이언트 연결](docs/client-setup.md)
- [아키텍처](docs/sgh-skill-architecture.md)
- [무료/유료 경계](docs/commercial-boundary.md)
- [Remote MCP tool contract](skills/sgh-japan-assistant/references/tool-contracts.md)

## GitHub 홍보 소재

- README hero: [`assets/sgh-service-navigator-hero.png`](assets/sgh-service-navigator-hero.png)
- Social preview: [`assets/sgh-service-navigator-social-preview.png`](assets/sgh-service-navigator-social-preview.png)
- Skill icon: [`assets/sgh-icon.svg`](assets/sgh-icon.svg)
- Medical Supporter LINE 사례: [`assets/medical-supporter-line-rich-menu.webp`](assets/medical-supporter-line-rich-menu.webp)
- 醫療助手 LINE 사례: [`assets/medical-assistant-line-rich-menu.webp`](assets/medical-assistant-line-rich-menu.webp)
- MS Platform Demo 화면: [`assets/ms-platform-patient-mypage-demo.png`](assets/ms-platform-patient-mypage-demo.png) / [`assets/ms-platform-admin-dashboard-demo.png`](assets/ms-platform-admin-dashboard-demo.png)

Hero와 Social preview는 이미지 안에 문자를 넣지 않아 다섯 언어의 README에서 공통으로 사용할 수 있습니다. LINE 이미지는 실제 운영 사례이고, MS Platform 화면은 Demo임을 명확히 표시한 자료입니다. Social preview는 파일만 추가해도 GitHub에 자동으로 설정되지 않으므로 repository의 **Settings → General → Social preview**에서 이미지를 직접 지정하세요.

## 안전 및 책임 범위

- 긴급 신고, 진단, 처방, 치료 방침 또는 법률 판단을 수행하지 않습니다.
- 공개 Skill에 병력, 진단서, 여권, 카드 정보, 비밀번호 또는 인증 코드를 입력하지 마세요.
- 공석, 수용 가능 여부, 가격, 수입 가능 여부, 납기 또는 치료 결과를 추측하거나 보장하지 않습니다.
- 의료, 물품 판매, AI 자동화, 전화 등 각 서비스의 계약 주체와 책임 범위를 분리합니다.
- `QUEUED` 또는 `CALLING`을 ‘예약 완료’로 표현하지 않습니다.
- Secret, OAuth Token, Twilio 자격 증명 또는 환자 정보를 이 repository에 저장하지 않습니다.

## 자주 묻는 질문

### Skill을 설치하면 무엇을 할 수 있나요?

SGH 서비스 발견, 상담 내용 정리, 문의안 작성, 다음 공식 창구 확인을 할 수 있습니다. 설치만으로 전화나 외부 전송이 시작되지는 않습니다.

### GitHub에 공개되어 있다면 SGH 서비스도 무료인가요?

아닙니다. MIT License는 공개 코드에 적용되지만 SGH의 전화, 예약 대행, 인력 대응, 외부 API 이용, 시스템 도입 또는 상표 사용 권한은 포함하지 않습니다.

### 전화 이외의 서비스도 요청할 수 있나요?

네. Skill은 Medical Supporter LINE, LINE Bot/LIFF, MS Platform, Clinic DX, AI 자동화, Web/SNS, KusuriJapan 등의 적절한 창구를 안내할 수 있습니다. 공개 Skill은 LINE을 보내거나 Rich Menu를 게시하지 않고, 환자를 등록하거나 의료기록을 업로드하지 않으며, 전화·예약·결제를 실행하지도 않습니다. 현재 MCP가 직접 다루는 영역은 Phase 1의 유료 전화·일반 예약 모듈뿐입니다.

### Medical Supporter LINE과 MS Platform은 같은 서비스인가요?

아닙니다. Medical Supporter LINE은 해외 환자가 정보·상담·지원 서비스에 접근하는 환자 측 입구입니다. MS Platform은 의료기관 측의 LINE 예약, MyPage, 알림, 온라인 진료 동선을 개별 도입하는 운영 플랫폼입니다. Skill은 목적에 따라 두 경로를 구분해 안내합니다.

### README에 나온 LINE Bot은 모두 지금 바로 production에서 사용할 수 있나요?

아닙니다. Official LINE 상담 입구, 운영 확인된 Rich Menu, 기존 제품 화면, 공개 Demo, MVP, code-level 구현 사례를 구분해 표시하고 있습니다. 계정, LIFF, tenant, Webhook, 외부 AI, 결제, 예약 또는 환자 기능은 대상 프로젝트별 계약·설정·검토·시험이 필요합니다.

### Menu Bridge는 무료 전화 Token인가요?

아닙니다. Menu Bridge는 정보 발견과 이용 경험을 보여주는 Showcase입니다. 이용 조건은 각 서비스의 안내를 따르며 SGH Phone 또는 인력 대응의 무료 할당량으로 전환되지 않습니다.

### 의료 상담 내용을 입력해도 되나요?

일반적인 상담 창구와 준비 항목은 안내할 수 있지만, 공개 Skill에 증상, 병력, 진단서 등 민감한 정보를 입력하지 마세요. 진단이나 치료 판단도 수행하지 않습니다.

## 법무·요금

정식 제공 전 검토용 요금, 취소, 이용약관, 개인정보 처리, 적정 이용 관련 문서는 [docs/legal](docs/legal/README.md)에 정리되어 있습니다. 현재는 시행 전 초안이 포함되어 있습니다. 실제 계약에서는 공개 URL에 게시된 최신 버전, request별 확인 화면, 개별 계약이 우선합니다.

## 공식 링크

- [신의호 주식회사](https://www.shingihou.com/ja)
- [서비스 목록](https://www.shingihou.com/ja/services)
- [다국어 서비스 안내](https://www.shingihou.jp/)
- [Medical Supporter](https://medicalsupporter.org/)
- [MS Platform](https://ms-platform.shingihou.com/)
- [SGH Phone](https://phone.shingihou.com/)
- [KusuriJapan](https://kusurijapan.com/)
- [문의하기](https://www.shingihou.com/ja/contact)

---

<p align="center">
  <strong>Discover. Understand. Prepare. Route. Track.</strong><br>
  SGH Japan Assistant — Powered by Shingihou
</p>
