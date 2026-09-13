# Product-Helper

> One command (or a GitHub URL) sets up TaskTrack. You read. Your coding agent writes the plan.

**Status:** living PRD · **Generated:** 2026-09-13T08:45:00.000Z · **Product version:** 1.2.0

<!-- USER-VISION:START -->
## Vision

Product-Helper makes the plan obvious: a living product doc, TaskTrack the human PM owns, and guardrails every coding agent must honor. One command installs the skills. The generated workspace stays local.
<!-- USER-VISION:END -->

## Users

- Software teams and coding agents working in a repository
- Human product managers who own priorities and accept work

## Problem

People forget the plan and cannot find the board. Product-Helper sets itself up from a command or a GitHub URL, opens TaskTrack, and lets the agent write the cards. Humans only read.

## Core features

- **Living PRD** — PRODUCT.md with users, problem, features, and change marks. Agents update it after major work. _(TaskTrack: review)_
- **TaskTrack** — The plan opens in the browser. Bookmark it. Run npx product-helper open anytime. _(TaskTrack: review)_
- **Guardrails** — Built-in safety rules plus a Custom section agents re-read before acting. _(TaskTrack: review)_
- **Multi-agent skills** — Same workflow as Cursor, Claude Code, and ChatGPT/Codex skills. _(TaskTrack: review)_
- **CLI** — init installs the workspace and gitignores it. serve opens TaskTrack. _(TaskTrack: review)_
- **Agent-first usage story** — npx product-helper, or init with a GitHub URL, sets everything up and opens TaskTrack. _(TaskTrack: review)_
- **Timeline** — A dated list of changes to TaskTrack, the product doc, and the rules. _(TaskTrack: review)_
- **Visible TaskTrack** — Setup opens the plan. TASKTRACK.md stays in git. The agent writes; people only read. _(TaskTrack: review)_

## Deliverables

- Open work: **8** cards
- Completed (confirmed): **0** cards
- Human PM owns acceptance. Agents must not invent completed work.

## Current status

- **Ideas:** 0
- **Next:** 0
- **Doing:** 0
- **Check:** 8
- **Done:** 0

## Now / next / later

- **now — Open TaskTrack, not hide it:** Init or a GitHub URL sets everything up and opens TaskTrack. Humans read. Agents write.
- **next — Confirm the shipped slice:** Human accepts Check cards for 1.2.0.
- **later — Grow later:** Cursor marketplace and other optional distribution.

## Change tracking

Marks show on GitHub and in TaskTrack:

- <ins class="ph-added">added</ins>
- <del class="ph-removed">removed</del>
- <mark class="ph-replaced">replaced</mark>

- 2026-09-13 · <ins class="ph-added">Added one-command setup from a folder or GitHub URL, and a visible way to open TaskTrack.</ins>
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
