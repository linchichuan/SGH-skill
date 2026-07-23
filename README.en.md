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

![SGH Japan Assistant — the official AI gateway to Shingihou services](assets/sgh-service-navigator-hero.png)

> **Public Skill available / Remote execution in private beta**
>
> The public Skill helps people discover SGH services, structure a request, and continue through the right LINE, web, workflow, or human-assisted channel. Phone calls, reservations, and human-operated work are paid execution adapters. They require valid entitlement and explicit confirmation and are never activated merely by installing the Skill.

## Let LINE receive the request. Let AI find the next step.

**LINE receives. AI structures. SGH connects the right screen, person, or workflow. Paid execution only when needed.**

`SGH Japan Assistant` is the official Agent Skill for helping ChatGPT, Codex, Claude Code, and other AI agents understand and route users to Shingihou's existing LINE Bot / LIFF experiences, Medical Supporter, MS Platform, healthcare and cross-border support, Clinic DX, AI automation, web, and Japanese-language assistance services.

This is not a phone-call-only Skill. A user can begin through a familiar LINE entry point. AI then turns an unclear request into an actionable brief and identifies whether the next step is a MyPage, booking screen, Rich Menu, existing workflow, or responsible team member. Only tasks that truly require an external call, booking coordination, or human work continue to a paid flow with a quote, entitlement check, and explicit confirmation.

[Explore SGH services](https://www.shingihou.com/ja/services?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [See AI and workflow automation](https://www.shingihou.jp/ai-automation?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [Contact SGH for business inquiries](https://www.shingihou.com/ja/contact?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill)

## What you can do in 60 seconds

- Identify the SGH service and LINE entry point that best fit your situation
- Understand the roles of Medical Supporter Official LINE, the Medical Assistant LINE account, SGH SERVICE, and MS Platform
- Structure a request as an `SGH Consultation Brief`
- Draft a natural Japanese inquiry suitable for a Japanese organization
- Map requirements for LINE booking, Rich Menus, LIFF, MyPage, notifications, and human handoff
- Map manual work across phone, email, forms, CRM, and n8n
- Confirm missing information, pricing category, service status, and the next official contact point before execution

For example, ask your AI:

```text
"I am visiting a doctor in Japan for the first time.
 Which Medical Supporter LINE entry point should I start with?
 Do not collect my medical history—show only public entry points and preparation steps."

"What is the difference between Medical Supporter Official LINE and MS Platform?"

"Our clinic wants LINE booking and a patient MyPage.
 Create a No-PHI MS Platform implementation brief."

"Design a journey from a Rich Menu to booking, AI-assisted translation,
 and a human consultation. Do not publish the Rich Menu or send a LINE message."

"Map the manual work across phone, LINE, email, and CRM,
 and suggest three automation opportunities."

"Create a one-page brief I can give to SGH. Do not send it yet."

"I need to confirm something with a restaurant. Do not call—
 just organize the information I will need."
```

## SGH already has service entry points people can use from LINE

LINE is more than a notification channel. SGH already has LINE Official Account, Rich Menu, and LIFF product surfaces for international patients, healthcare support, service guidance, AI-assisted translation, booking, and MyPage journeys.

| LINE / LIFF entry point | What users can discover | Current positioning |
|---|---|---|
| Medical Supporter Official LINE | Medical providers in Japan, the service journey, inquiry channels, the MyPage concept, and routes to booking and case information | Formal consultation and LINE Login routes exist, and the Rich Menu is in operation; MyPage is an MVP under integration; never enter medical records into the public Skill |
| Medical Assistant LINE | Medical-provider guidance, the service flow, an AI real-time translation entry point, pricing and services, and SGH SERVICE | LINE Official Account / Rich Menu operating example available; translation assists communication and does not replace medical judgment |
| SGH SERVICE LINE / LIFF | AI structures a request, then passes it to web-based confirmation, membership, and service-request journeys | Implementation examples exist; real messaging, external AI, reservations, and phone calls require authentication, contract, and pricing checks |
| MenuBridge LIFF | Use a camera to read a menu and understand its contents and ordering conditions in multiple languages | Existing product surface; AI usage and service conditions follow the applicable service display |
| Clinic-specific LINE / LIFF | Clinic-configured LINE booking, MyPage, notifications, and online-consultation entry | MS Platform public mock demo / productized pre-pilot; production use requires an individual implementation, tenant configuration, and LINE setup |
| LINE Commerce | Product search, account linking, Rich Menus, webhooks, and CRM / n8n integrations | Code and review examples exist; production activation requires external configuration and individual verification |
| Custom clinic LINE Bot | Combine text, voice, images, multilingual guidance, booking intent, and human handoff | Demo / MVP implementation examples; not represented as live at every healthcare provider |

<table>
  <tr>
    <td width="50%"><img src="assets/medical-supporter-line-rich-menu.webp" alt="Medical Supporter LINE Rich Menu"></td>
    <td width="50%"><img src="assets/medical-assistant-line-rich-menu.webp" alt="Medical Assistant LINE Rich Menu"></td>
  </tr>
  <tr>
    <td align="center"><strong>MEDICAL SUPPORTER</strong><br>MyPage, inquiry progress, booking history, and document journey</td>
    <td align="center"><strong>MEDICAL ASSISTANT</strong><br>Service flow, AI translation entry, and SGH SERVICE</td>
  </tr>
</table>

These are Rich Menu examples confirmed as saved in existing LINE Official Accounts on July 22, 2026. They do not mean that every downstream feature shown is fully live, nor do they grant free access to SGH calls, human operations, or other paid services when the GitHub Skill is installed.

[Explore Medical Supporter](https://medicalsupporter.org/?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [Open Medical Supporter Official LINE](https://line.me/R/ti/p/%40acl1165c)

## Not one universal Bot—a reusable LINE implementation portfolio

The value SGH can provide to an organization goes beyond automated chat replies. We design the full path: receive an inquiry, structure the required information, obtain confirmation from the user, pass the request to an authorized screen, person, or system, and retain the resulting operational history.

```text
Discover          LINE intake        Prepare
Find a service → Receive inquiries → AI classifies and identifies missing details
                                             ↓
Track             Human / System     Confirm & Route
Track history  ←  Staff / CRM / Ops ← The user confirms content and conditions
and progress
```

Reusable implementation components include:

- LINE Official Account, LINE Login, LIFF, and Rich Menus
- FAQs / RAG, multilingual guidance, and text, voice, or image intake
- Booking, MyPage, notifications, product search, and online-consultation entry
- Supabase, CRM, calendars, n8n, payments, and human handoff

The public Skill only explains this architecture and creates a brief without confidential or patient information. Real LINE messages, Rich Menu publishing, patient creation, reservations, external AI use, payments, phone calls, and human operations can occur only inside the relevant production system after authentication, authorization, pricing, and explicit-confirmation requirements are satisfied.

## MS Platform is the clinic operations layer behind the LINE Bot

Medical Supporter Official LINE creates an entry point between international patients and support services. MS Platform is the clinic-side layer for progressively organizing LINE booking, MyPage, pre-visit status, notifications, online-consultation entry, and administration. They serve different roles but can form one connected patient journey.

<table>
  <tr>
    <td width="50%"><img src="assets/ms-platform-patient-mypage-demo.png" alt="MS Platform patient MyPage demo"></td>
    <td width="50%"><img src="assets/ms-platform-admin-dashboard-demo.png" alt="MS Platform clinic administration dashboard demo"></td>
  </tr>
  <tr>
    <td align="center"><strong>Patient MyPage Demo</strong><br>Appointment details, confirmation code, and consultation entry</td>
    <td align="center"><strong>Clinic Dashboard Demo</strong><br>Appointments, readiness status, and notification results</td>
  </tr>
</table>

- The public demo uses fictional data and sends no real LINE message, SMS, phone call, or payment.
- The current positioning is a presentable mock demo and productized pre-pilot. LINE booking, MyPage, notifications, online consultation, and payment guidance can be enabled as MVP / Pilot capabilities only after a clinic-specific agreement, tenant setup, review, and third-party configuration.
- SGH does not claim that patient questionnaire submission, electronic signatures, electronic medical records, e-prescriptions, or online insurance eligibility checks are generally available in production.

[Explore MS Platform](https://ms-platform.shingihou.com/?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill) ・ [Open the public demo](https://ms-platform.shingihou.com/demo?utm_source=github&utm_medium=referral&utm_campaign=sgh_skill)

## How it works

```text
LINE / Web            AI                     Route
Receive the request → Structure intent    → Connect a screen, person, or workflow
                       and constraints             ↓
Track                 Execute                Confirm
Check progress     ←  Paid execution only ← Verify entitlement, scope, and price
and results            when needed
```

The public Skill supports discovery, structuring, and routing. It does not send LINE messages, publish Rich Menus, create patients, upload medical records, submit bookings, place calls, make payments, or create human work items.

## SGH product and service matrix

| Service area | What the public Skill can do | What SGH handles separately | Public status |
|---|---|---|---|
| Medical Supporter / LINE | Organize the international-patient support entry point, information visible on LINE, preparation items, and precautions | Communication with medical providers; interpretation, document, and procedural support | Official site and LINE channel available; MyPage is an MVP under integration |
| LINE Bot / LIFF | Turn Rich Menu, FAQ, multilingual guidance, booking, MyPage, and human handoff requirements into a brief | Design and implementation of a LINE Official Account, LIFF, webhooks, and CRM integrations | Existing product examples; custom quote |
| MenuBridge | Organize menu, service, multilingual content, and routing requirements | Branded pages, LINE / LIFF integration, and operational setup | Promotional and product-showcase entry point; conditions vary by feature |
| LINE Commerce / custom clinic Bot | Structure product search, multimodal intake, booking intent, and human-handoff requirements | Account linking, webhooks, external AI, CRM / n8n, and production configuration | Code / demo / MVP examples; production requires individual verification |
| MS Platform | Structure requirements for LINE booking, MyPage, identity checks, notifications, and online-consultation entry | Tenant setup, requirements definition, implementation, and third-party integrations | Public mock demo / productized pre-pilot; individual implementation required for production |
| SGH Phone | Define the call purpose, target, script, shared information, and operating conditions | AI reception, IVR, records, summaries, notifications, and outbound calls | Paid B2B execution adapter; custom quote |
| 891 AI Automation | Identify automation opportunities across LINE, email, forms, CRM, and n8n | Workflow design, implementation, and operational support | Inquiries open |
| Web / SNS | Turn objectives, audiences, journeys, and content needs into a brief | Website production, operations, and social media support | By consultation |
| KusuriJapan | Direct users to public information and the formal inquiry channel | Individual confirmation regarding import procedures | Information and consultation service |
| SGH Bio Lab | Structure intended use and topics for a B2B inquiry | Consultation on RUO-related supply and coordination | B2B inquiries |
| Travel / Dining showcase | Organize menus, booking conditions, itineraries, and confirmation items | Individual services such as MenuBridge, actual reservations, and calls | Conditions vary by feature |

> [!NOTE]
> This matrix supports service discovery and positioning. It does not guarantee contract availability, price, eligibility, or delivery timing. An operating Rich Menu does not establish that every downstream page is fully live. Demo, MVP, and Pilot capabilities are not available to a healthcare provider before the required implementation and configuration are complete.

## For individuals, businesses, and healthcare providers

### Individuals, visitors, and international residents in Japan

- Find the appropriate Medical Supporter or Medical Assistant LINE entry point
- Prepare a Japanese-language inquiry and pre-booking checklist
- Understand MyPage, the service journey, and international-patient support channels
- Understand Japanese-language guidance in your own language
- Review pricing and shared information before any paid execution

### Businesses, clinics, municipalities, and hospitality operators

- Phone, LINE, email, forms, and CRM are fragmented
- You want a better intake journey for international customers or patients
- You need to design LINE booking, Rich Menus, LIFF, MyPage, notifications, and human handoff
- You want to turn MS Platform requirements into a No-PHI brief
- You want AI agents to discover your services
- You want an official branded Skill, FAQ, LINE Bot, or MenuBridge

## Example output: SGH Consultation Brief

```text
SGH Consultation Brief

Requester type: Clinic operator
Objective: Improve LINE inquiries and pre-booking for international patients
Current state: LINE, phone, and web forms are managed separately
Desired outcome: Inquiry classification, required-information checks,
                 MyPage routing, staff notifications, and history tracking
Constraint: AI must not diagnose or make treatment decisions
Safe to share: Operational workflow and published clinical information
Do not share: Patient names, medical history, or medical certificates
Missing information: Monthly volume, supported languages, current CRM,
                     LINE configuration, and opening hours
Potential fit: Medical Supporter LINE + MS Platform + 891 AI Automation
Next step: Confirm scope, implementation conditions, and pricing
           through the official inquiry channel
```

The Skill can create this brief. It does not send a LINE message, publish a Rich Menu, create a patient, upload a medical record, submit a form, enter into a contract, place a call, create a reservation, make a payment, or change a system.

## Showcase: helping customers find a service through LINE and AI

SGH designs not only execution workflows, but also product experiences that AI agents can understand and route to the right LINE or web entry point.

```text
Restaurant ABC MenuBridge — Powered by SGH

Discover: Menu, FAQs, and restaurant policies
Understand: Multilingual explanations and allergy-related questions
Prepare: Visit requirements and a reservation consultation brief
Connect: Rich Menu, LIFF, form, or restaurant staff
Execute: Only through the restaurant's or SGH's formal paid flow
```

MenuBridge, public FAQs, and service catalogs can become useful, attention-grabbing promotional entry points. However, viewing the content, scanning a QR code, or receiving a related token does not grant free SGH Phone calls, reservation assistance, human work, or any other SGH service.

The same approach can be used to design:

- An official Agent Skill that AI agents can discover
- A LINE Official Account and Rich Menu
- LIFF booking, MyPage, forms, and membership screens
- Multilingual FAQs, inquiry classification, and AI-assisted translation
- CRM, calendar, n8n, staff notifications, and human handoff

## The roles of our three official entry points

| Entry point | Role |
|---|---|
| [shingihou.com](https://www.shingihou.com/ja) | Company information, official services, scope of responsibility, legal information, and the formal inquiry channel |
| [shingihou.jp](https://www.shingihou.jp/) | Multilingual service guidance, use cases, demos, and implementation information |
| [SGH-skill](https://github.com/linchichuan/SGH-skill) | A public package through which AI agents discover services, structure a request, and continue to the right LINE, web, or human-assisted entry point |

GitHub does not replace the official websites. It is a discovery entry point that helps SGH services get found in the AI era. Pricing, contracts, service conditions, and personal-information handling must be confirmed on the relevant official website and in the applicable individual agreement.

## Public content and paid execution

| Included in the public Skill | Requires a separate contract or quote |
|---|---|
| README, service catalog, and public materials | Sending real LINE messages or placing outbound calls |
| Local Skill installation | Actual reservations, changes, cancellations, or patient operations |
| Service matching, consultation briefs, and inquiry drafts | Rich Menu publishing and custom LIFF / MS Platform implementation |
| Official URLs and guidance to the next contact point | Human verification, coordination, and exception handling |
| Side-effect-free support eligibility checks | Any process using SGH APIs, communications, AI, or operational resources |

> [!IMPORTANT]
> **Viewing or cloning this repository, or installing the Skill, does not grant any free allowance for SGH calls, LINE messaging, reservations, human work, AI API processing, or system implementation.**
> Fees and usage terms for ChatGPT, Claude, Codex, or any other AI service used by the user are governed by the user's agreement with that provider.

The public `get_sgh_capabilities` and `check_task_supported` tools use only versioned local rules inside the MCP gateway. They do not call SGH Service, Supabase, Twilio, the LINE Messaging API, an external AI API, or a human queue, and they create no request.

## The public Skill's no-side-effect boundary

The public Skill can read public information, compare services, create briefs, and provide official links. It does not:

- Send a LINE message or broadcast
- Create or publish a Rich Menu
- Sign into LIFF and submit data on a user's behalf
- Create a patient, reservation, or clinical record
- Upload medical records, medical certificates, or identity documents
- Start an online-consultation or notification workflow
- Place a call, make a charge, or create a human work item

## Remote MCP: the paid execution adapter for calls and ordinary reservations

The current Remote MCP is not a universal API for executing every SGH service. In Phase 1, it focuses on non-emergency phone inquiries and ordinary reservations, covering draft creation, a quote bound to one request, entitlement validation, explicit confirmation, status tracking, and results.

```text
Structure the request                    No call
    ↓
Verify the user through OAuth            No call
    ↓
Verify the request-specific quote
and execution entitlement                No call
    ↓
Explicitly confirm the target,
shared information, and price
    ↓
Move to QUEUED only after capacity is successfully reserved
```

- `DRAFT` — A draft only. No call has been placed and no reservation has been made.
- `AWAITING_CONFIRMATION` — Waiting for information, a quote, or confirmation.
- `QUEUED` — Waiting for paid execution. This does not mean the reservation is complete.
- `CONFIRMED` — A verifiable confirmation has been received from the other party.

An SGH Pass represents an entitlement that has already been purchased or is funded by its issuer. The system validates its tenant, service scope, issuer, expiry, and usage count, then binds it atomically to a single request. Public tokens and MenuBridge passes cannot be repurposed for phone calls or human-operated work.

## Availability

| Item | Status |
|---|---|
| Public Agent Skill / README | **Available** |
| Local service guidance, comparison, and brief creation | **Available** |
| Medical Supporter / Medical Assistant LINE Rich Menus | **Operating examples available; downstream conditions vary** |
| Medical Supporter MyPage | **MVP under integration; not represented as fully live** |
| SGH SERVICE LINE / MenuBridge LIFF | **Implementations and existing product surfaces available; conditions vary by feature** |
| LINE Commerce / custom clinic Bot | **Code-level / demo / MVP examples; production requires individual verification** |
| MS Platform public site / mock demo | **Available; fictional data** |
| MS Platform production LINE / LIFF capabilities | **Productized pre-pilot / MVP / Pilot; available after individual setup** |
| Remote MCP `/mcp` | **Private beta / live environment not yet verified** |
| Production execution with OAuth and billing | **Requires validation before general availability** |
| Korean and Turkish | README / discovery copy |
| API result languages | Japanese, Traditional Chinese, and English (Phase 1) |

Last reviewed: **2026-07-22**

## Installation

Add `skills/sgh-japan-assistant` to a tool that supports Agent Skills or to your project's skills directory.

```text
Use $sgh-japan-assistant to identify the right SGH LINE, web,
platform, or paid execution service; create a consultation brief;
and show the official next step.
Do not send, publish, create a patient, upload, call, book, or pay.
```

Skill package: [`skills/sgh-japan-assistant`](skills/sgh-japan-assistant)

For development and local verification:

```bash
cp env.example .env
npm install
npm run typecheck
npm test
npm run dev
```

- [Client setup](docs/client-setup.md)
- [Architecture](docs/sgh-skill-architecture.md)
- [Free / paid boundary](docs/commercial-boundary.md)
- [Remote MCP tool contract](skills/sgh-japan-assistant/references/tool-contracts.md)

## GitHub promotional assets

- README hero: [`assets/sgh-service-navigator-hero.png`](assets/sgh-service-navigator-hero.png)
- Social preview: [`assets/sgh-service-navigator-social-preview.png`](assets/sgh-service-navigator-social-preview.png)
- Skill icon: [`assets/sgh-icon.svg`](assets/sgh-icon.svg)
- Medical Supporter LINE example: [`assets/medical-supporter-line-rich-menu.webp`](assets/medical-supporter-line-rich-menu.webp)
- Medical Assistant LINE example: [`assets/medical-assistant-line-rich-menu.webp`](assets/medical-assistant-line-rich-menu.webp)
- MS Platform demos: [`assets/ms-platform-patient-mypage-demo.png`](assets/ms-platform-patient-mypage-demo.png) / [`assets/ms-platform-admin-dashboard-demo.png`](assets/ms-platform-admin-dashboard-demo.png)

The hero and social-preview images contain no text and can be shared across all five README languages. The LINE images are existing Rich Menu examples. The MS Platform images are visibly marked as demos and use fictional data. Adding the social-preview file to the repository does not configure it automatically on GitHub; select it manually under **Settings → General → Social preview**.

## Safety and scope

- The Skill does not handle emergency calls, diagnoses, prescriptions, treatment decisions, or legal judgments.
- Do not enter symptoms, medical histories, medical certificates, passport details, payment card information, passwords, or verification codes into the public Skill.
- It does not infer or guarantee availability, acceptance, pricing, import eligibility, delivery times, or treatment outcomes.
- Contracting parties and responsibilities remain separate across medical, retail, AI automation, LINE, platform, phone, and other services.
- It never describes `QUEUED` or `CALLING` as “reservation confirmed.”
- This repository does not store secrets, OAuth tokens, LINE or Twilio credentials, or patient information.

## Frequently asked questions

### What can I do after installing the Skill?

You can discover SGH services, compare Medical Supporter LINE with MS Platform, structure a request, create a No-PHI implementation brief, and identify the right LINE, web, or human-assisted channel. Installing the Skill alone does not send, publish, or execute anything externally.

### The repository is public on GitHub. Does that make SGH services free?

No. The MIT License applies to the published code. It does not include SGH phone services, LINE messaging, reservation assistance, human operations, third-party API usage, system implementation, or trademark rights.

### Is phone service the main product of this Skill?

No. The primary experience is for LINE to receive the request, AI to structure it, and SGH to connect the relevant screen, person, or workflow. Phone is a paid execution adapter used only for tasks that actually require it.

### Are Medical Supporter Official LINE and MS Platform the same product?

No. Medical Supporter Official LINE is the patient-facing entry point for information, general inquiries, and international-patient support; its MyPage is currently an MVP under integration. MS Platform is the clinic-side platform for progressively implementing LINE booking, MyPage, notifications, online-consultation entry, and administration. A public mock demo is available, but production use requires an individual implementation and configuration.

### Are all LINE Bots in this README ready for immediate production use?

No single status applies to all of them. This README distinguishes formal consultation entry points, verified operating Rich Menus, existing product surfaces, public mock demos, MVPs, and code-level implementation examples. Accounts, LIFF, tenants, webhooks, external AI, payments, reservations, and patient-related features still require project-specific contracting, configuration, review, and testing.

### Is MenuBridge a token for free phone calls?

No. MenuBridge is a product entry point for information discovery, service presentation, and routing. Its conditions vary by implementation, and it never converts into free SGH Phone or human-work entitlement.

### Can I paste patient information into the Skill and ask it to book directly?

No. The public Skill does not create patients or upload medical records, and it does not submit healthcare or booking data on a user's behalf. Use an officially configured service entry point for any required personal information.

## Legal and pricing

Pre-launch review documents covering pricing, cancellations, terms of service, privacy, and acceptable use are collected in [docs/legal](docs/legal/README.md). Some are pre-effective drafts. In an actual engagement, the latest version published at the official URL, the confirmation screen for the individual request, and any individual agreement take precedence.

## Official links

- [Shingihou Co., Ltd.](https://www.shingihou.com/ja)
- [Services](https://www.shingihou.com/ja/services)
- [Multilingual service guide](https://www.shingihou.jp/)
- [Medical Supporter](https://medicalsupporter.org/)
- [MS Platform](https://ms-platform.shingihou.com/)
- [SGH Phone](https://phone.shingihou.com/)
- [KusuriJapan](https://kusurijapan.com/)
- [Contact](https://www.shingihou.com/ja/contact)

---

<p align="center">
  <strong>LINE receives. AI structures. SGH routes.</strong><br>
  SGH Japan Assistant — Powered by Shingihou
</p>
