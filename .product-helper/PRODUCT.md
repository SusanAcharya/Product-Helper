# Product-Helper

> One command installs living PRD, TaskTrack, and guardrail skills for Cursor, Claude, Codex, and ChatGPT.

**Status:** living PRD · **Generated:** 2026-09-12T15:10:00.000Z · **Product version:** 1.1.0

<!-- USER-VISION:START -->
## Vision

Product-Helper makes the plan obvious: a living product doc, TaskTrack the human PM owns, and guardrails every coding agent must honor. One command installs the skills. The generated workspace stays local.
<!-- USER-VISION:END -->

## Users

- Software teams and coding agents working in a repository
- Human product managers who own priorities and accept work

## Problem

Teams and coding agents lose the plan: the product doc goes stale, the work list lives elsewhere, and each agent forgets the rules. Product-Helper keeps one living product doc, TaskTrack the human owns, and rules every agent must re-read.

## Core features

- **Living PRD** — PRODUCT.md with users, problem, features, and change marks. Agents update it after major work. _(TaskTrack: review)_
- **TaskTrack** — A simple, phone-friendly plan of features. Not for small bug fixes. _(TaskTrack: review)_
- **Guardrails** — Built-in safety rules plus a Custom section agents re-read before acting. _(TaskTrack: review)_
- **Multi-agent skills** — Same workflow as Cursor, Claude Code, and ChatGPT/Codex skills. _(TaskTrack: review)_
- **CLI** — init installs the workspace and gitignores it. serve opens TaskTrack. _(TaskTrack: review)_
- **Agent-first usage story** — One npx command copies skills. Agents then update the product doc, TaskTrack, and timeline. _(TaskTrack: review)_
- **Timeline** — A dated list of changes to TaskTrack, the product doc, and the rules. _(TaskTrack: review)_

## Deliverables

- Open work: **7** cards
- Completed (confirmed): **0** cards
- Human PM owns acceptance. Agents must not invent completed work.

## Current status

- **Ideas:** 0
- **Next:** 0
- **Doing:** 0
- **Check:** 7
- **Done:** 0

## Now / next / later

- **now — Agent-first TaskTrack:** Install once. Agents keep the product doc, TaskTrack, and timeline current. .product-helper stays local.
- **next — Confirm the shipped slice:** Human accepts Check cards for 1.1.0.
- **later — Grow later:** Cursor marketplace and other optional distribution.

## Change tracking

Marks show on GitHub and in TaskTrack:

- <ins class="ph-added">added</ins>
- <del class="ph-removed">removed</del>
- <mark class="ph-replaced">replaced</mark>

- 2026-09-12 · <mark class="ph-replaced">Replaced the kanban name with TaskTrack, added a timeline, and gitignored the generated workspace in consumer repos.</mark>
- 2026-09-12 · <ins class="ph-added">Published product-helper@1.0.2 so npm leads with npx product-helper init.</ins>
- 2026-09-12 · <mark class="ph-replaced">Replaced the README lead so one npx command is the product.</mark>
- 2026-09-12 · <ins class="ph-added">Published product-helper@1.0.1 so npm matches the agent-first docs.</ins>
- 2026-09-12 · <ins class="ph-added">Published product-helper@1.0.0 to the npm registry.</ins>
- 2026-09-12 · <mark class="ph-replaced">Replaced CLI-first docs with an agent-first loop.</mark>
- 2026-09-12 · <mark class="ph-replaced">Replaced the truncated README intro with the real product problem.</mark>
- 2026-09-12 · <ins class="ph-added">Bootstrapped Product-Helper workspace from repository inspection.</ins>

---

_Do not delete the `USER-VISION` markers. Agents update the rest of this file after major work._
