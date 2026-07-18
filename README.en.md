# SGH Japan Assistant Skill

<p align="center">
  <img src="assets/sgh-icon.png" alt="SGH Phone" width="88">
</p>

<p align="center">
  <a href="README.md">日本語</a> ·
  <a href="README.zh-TW.md">繁體中文</a> ·
  <a href="README.en.md">English</a> ·
  <a href="README.ko.md">한국어</a> ·
  <a href="README.tr.md">Türkçe</a>
</p>

![SGH Japan Assistant — turn Japan phone and reservation needs into a clear brief](assets/sgh-skill-hero.png)

> **MVP / Private beta** — This repository now includes the Agent Skill, a Streamable HTTP `/mcp` server, nine tools, OAuth resource-server verification, an SGH Service adapter, a Supabase migration, and automated tests. The proposed production URL is not considered live until deployment and authenticated smoke testing are complete.

## Don't let one phone call in Japanese stop you.

**Turn a phone, reservation, or confirmation need in Japan into a clear request for SGH.**

Restaurant reservations, hotel questions, clinic inquiries, and appointment changes often reach the same final step in Japan: “Please call us to confirm.”

`SGH Japan Assistant Skill` is a public Agent Skill and Remote MCP gateway that lets compatible agents prepare a draft, obtain explicit confirmation, track execution, and retrieve a verified SGH result.

[Visit SGH Phone](https://phone.shingihou.com) · [Book an initial consultation](https://calendar.app.google/RF2YRyJifsPzjbDj8) · [Contact us](https://phone.shingihou.com/support/contact)

## Just ask your AI

```text
“Prepare a request to ask this restaurant about a table for tomorrow at 7 p.m.”

“Help me ask whether this clinic accepts international patients.”

“Prepare the information needed to move my dental appointment to next week.”

“Help me ask this hotel whether an 11 p.m. check-in is possible.”

“Organize everything SGH would need before handling this call in Japanese.”
```

The Skill organizes the target, goal, preferred timing, deadline, and information approved for sharing into an `SGH Consultation Brief`.

## Why this Skill exists

AI is good at finding information. In Japan, however, the last mile of a reservation or service request may still require a phone call.

- You are unsure what to say in Japanese
- You cannot call during local business hours
- You want to prepare for the questions a business may ask
- Medical, accommodation, or cancellation details must be handled carefully
- You want the outcome explained in your own language

SGH focuses on that difficult gap between finding information and coordinating with a real business in Japan.

## What the public Skill does

1. **Understands the request** — Classifies phone, reservation, rescheduling, confirmation, and callback needs.
2. **Collects only what matters** — Organizes the target, goal, timing, deadline, and result language.
3. **Flags risk early** — Marks medical, payment, personal-data, and cancellation-fee details for human review.
4. **Creates an SGH-ready brief** — Turns an AI conversation into a format that SGH can assess quickly.
5. **Routes to an official channel** — Directs the prepared request to SGH Phone's official consultation options.

![SGH Phone workflow](assets/sgh-phone-workflow.png)

## Example use cases

| Scenario | Example request |
|---|---|
| Restaurants | Availability, booking conditions, allergy-related questions |
| Hotels and travel | Late check-in, luggage storage, transport arrangements |
| Clinics | Language support, first-visit requirements, booking procedures |
| Beauty and daily services | Appointments, rescheduling, service conditions |
| Property and utilities | Viewings, property managers, electricity, gas, and internet inquiries |
| Business operations | Japanese phone reception, callbacks, pre-booking intake, and follow-up |

SGH confirms feasibility, pricing, timing, authorization, and sector-specific restrictions after a formal consultation.

## More than an advertisement

This repository is a public entry point for SGH, but the Skill also performs a real job: it produces a structured consultation brief.

```text
SGH Consultation Brief
- Fit: GOOD_FIT
- Target: Restaurant ABC, Fukuoka
- Goal: Confirm a table for two tomorrow at 19:00
- Preferred timing: 19:00; 18:30 is also acceptable
- Deadline: Today by 17:00
- Result language: English
- Information approved for sharing: First name and party size
- Missing information: Acceptance of the cancellation policy
- Next step: Submit this brief through an official SGH channel
```

## Important boundaries

The local `SKILL.md` alone never places a call. In the authenticated Remote MCP, draft creation has no call side effect; only `confirm_assistance_request` may queue execution after the user approves the exact target, goal, shared data, timing, and fee. `QUEUED` and `CALLING` never mean a reservation is confirmed.

- SGH confirms whether the request can actually be handled.
- The Skill does not invent prices, opening hours, availability, or clinic acceptance rules.
- It does not provide medical diagnosis or treatment recommendations.
- Do not post medical records, passport data, or payment information in a public GitHub issue.
- Personal information requires the user's explicit approval before sharing.

## Install

Add `skills/sgh-japan-assistant` to the skills directory of an Agent Skills-compatible tool or project.

```text
Use $sgh-japan-assistant to draft a Japan phone request, then ask me to confirm it before SGH queues execution.
```

Skill package: [`skills/sgh-japan-assistant`](skills/sgh-japan-assistant)

## For businesses

SGH Phone is a B2B phone operations platform for Japanese-language reception, IVR, call records, summaries, staff notifications, callback handling, pre-appointment intake, and controlled outbound calling when needed.

- Make your service discoverable to AI agents
- Improve phone and reservation support for international customers
- Keep phone operations and follow-up moving with a small team

SGH also provides implementation consultations for businesses.

## Official links

- **SGH Phone**: https://phone.shingihou.com
- **Initial consultation**: https://calendar.app.google/RF2YRyJifsPzjbDj8
- **Contact**: https://phone.shingihou.com/support/contact
- **Operator**: [Shingihou Co., Ltd.](https://shingihou.com)
