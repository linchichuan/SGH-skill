# SGH Japan Assistant Skill package

This folder contains the installable public Agent Skill for discovering Shingihou services, comparing verified LINE / LIFF entry points, preparing No-PHI LINE and MS Platform briefs, assessing business workflows, and safely entering an eligible paid SGH Phone request flow.

The Skill follows `Discover → Understand → Prepare → Route → Track`. Actual calls, reservations, human work, implementation, and external processing are separate services and never start merely because this folder is installed.

- `SKILL.md`: routing, output, safety, and paid-execution instructions
- `skill.json`: package metadata and optional Remote MCP declaration
- `agents/openai.yaml`: client-facing display metadata
- `references/service-catalog.md`: verified SGH service routes and public status
- `references/line-and-platform.md`: verified LINE / LIFF examples and MS Platform boundaries
- `references/brief-templates.md`: reusable no-side-effect output formats
- `references/tool-contracts.md`: Phase 1 phone/reservation MCP contracts
- `references/safety-rules.md`: consent, data, commercial, and status safeguards
- `references/authentication.md`: OAuth scopes and client setup

Installing this folder grants no LINE messaging or publication scope, LIFF / tenant access, MenuBridge or external-AI allowance, SGH Phone credit, human-service credit, external API usage, or implementation service.
