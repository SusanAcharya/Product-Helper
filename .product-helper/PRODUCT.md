# Product-Helper

> One command installs living PRD, kanban, and guardrail skills for Cursor, Claude, Codex, and ChatGPT.

**Status:** living PRD · **Generated:** 2026-09-12T14:52:00.000Z · **Product version:** 1.0.2

<!-- USER-VISION:START -->
## Vision

Product-Helper makes the plan obvious: a living PRD, a kanban board the human PM owns, and guardrails every coding agent must honor. Distribution is the product — npm CLI, Cursor plugin, and copy-into-repo skills for Cursor, Claude, and ChatGPT/Codex.
<!-- USER-VISION:END -->

## Users

- Software teams and coding agents working in a repository
- Human product managers who own priorities and accept work

## Problem

Teams and coding agents lose the plan: the PRD goes stale, the board lives elsewhere, and each agent forgets the rules. Product-Helper keeps one living PRD, one kanban the human PM owns, and guardrails every agent must re-read.

## Core features

- **Living PRD** — PRODUCT.md with users, problem, features, and change marks. Agents update it after major work. _(board: review)_
- **Kanban PM board** — Offline HTML board with card drawer, now/next/later, and a highlighted product-doc viewer. _(board: review)_
- **Guardrails** — Built-in safety rules plus a Custom section agents re-read before acting. _(board: review)_
- **Multi-agent skills** — Same workflow as Cursor, Claude Code, and ChatGPT/Codex skills, published on npm as product-helper@1.0.2. _(board: review)_
- **CLI** — init installs the workspace. serve opens the board. sync and status are optional fallbacks, not the daily loop. _(board: review)_
- **Agent-first usage story** — README leads with `npx product-helper init`. That one command copies skills; agents then update the PRD and board. Humans do not run sync after every change. _(board: review)_

## Deliverables

- Open work: **6** cards
- Completed (confirmed): **0** cards
- Human PM owns acceptance. Agents must not invent completed work.

## Current status

- **Backlog:** 0
- **Ready:** 0
- **In Progress:** 0
- **Review:** 6
- **Done:** 0

## Now / next / later

- **now — Agent-first loop:** Install once; agents keep the PRD and board current. CLI is a fallback.
- **next — Confirm the shipped slice:** Human PM accepts Review cards for the 1.0.2 npm release.
- **later — Harden distribution:** Cursor marketplace and other optional distribution, not new daily-loop commands.

## Change tracking

Marks render on GitHub and in the Product-Helper board:

- <ins class="ph-added">added</ins>
- <del class="ph-removed">removed</del>
- <mark class="ph-replaced">replaced</mark>

- 2026-09-12 · <ins class="ph-added">Published product-helper@1.0.2 so npm leads with npx product-helper init.</ins>
- 2026-09-12 · <mark class="ph-replaced">Replaced the README lead so one npx command is the product.</mark>
- 2026-09-12 · <ins class="ph-added">Published product-helper@1.0.1 so npm matches the agent-first docs.</ins>
- 2026-09-12 · <ins class="ph-added">Published product-helper@1.0.0 to the npm registry.</ins>
- 2026-09-12 · <mark class="ph-replaced">Replaced CLI-first docs with an agent-first loop.</mark>
- 2026-09-12 · <mark class="ph-replaced">Replaced the truncated README intro with the real product problem.</mark>
- 2026-09-12 · <ins class="ph-added">Bootstrapped Product-Helper workspace from repository inspection.</ins>

---

_Do not delete the `USER-VISION` markers. Agents update the rest of this file after major work._
