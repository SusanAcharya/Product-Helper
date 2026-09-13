# Product-Helper

> One command (or a GitHub URL) sets up TaskTrack. You read. Your coding agent writes the plan.

**Status:** living PRD · **Generated:** 2026-09-13T12:49:58.445Z · **Product version:** 1.3.0

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

- **A living product doc** — A short note of who it is for, the problem, and what you are building. The agent keeps it current. _(TaskTrack: Later)_
- **The plan you can read** — Cards sit in Later, Planned, and In progress. You accept Done when a feature is good enough. _(TaskTrack: In progress)_
- **Rules the agent must follow** — Safety rules plus a Custom section the agent re-reads before it acts. _(TaskTrack: Later)_
- **Works with your coding agent** — The same plan and rules in Cursor, Claude, and ChatGPT. _(TaskTrack: Later)_
- **One command to start** — Run npx product-helper in a folder, or pass a GitHub URL. It sets up the plan and opens it. _(TaskTrack: Planned)_
- **You read. The agent writes.** — After setup you only read TaskTrack. Your coding agent writes the cards and the product doc. _(TaskTrack: Planned)_
- **What changed, and when** — A dated list of changes to the plan, the product doc, and the rules. _(TaskTrack: Later)_
- **A page you can bookmark** — Setup opens the plan in your browser. Come back anytime with npx product-helper open. _(TaskTrack: In progress)_
- **SEO on the first look** — When there is a website, wait for the real page, then write title, meta description, favicons, and load time. _(TaskTrack: In progress)_

## Deliverables

- Open work: **9** cards
- Completed (confirmed): **0** cards
- Human PM owns acceptance. Agents must not invent completed work.

## Current status

- **Later:** 4
- **Planned:** 2
- **In progress:** 3
- **Done:** 0

## SEO

- **Live URL:** local TaskTrack (.product-helper/board/index.html)
- **Last checked:** 2026-09-13T12:49:58.445Z
- **Title:** Product-Helper · TaskTrack
- **Meta description:** One command (or a GitHub URL) sets up TaskTrack. You read. Your coding agent writes the plan.
- **Browser favicon:** ok — favicon.svg
- **Phone home-screen icon:** svg shipped; add apple-touch-icon.png (180×180) if this is ever a public site
- **Load / wait:** useful content at ~0s, waited ~0s
- **Notes:** TaskTrack is a local page. Title and meta description now come from the product name and tagline.

Findings:
- Added a meta description and browser favicon to TaskTrack.
- Phone icon is SVG. Public sites should also ship a 180×180 PNG.

## Now / next / later

- **now — Open TaskTrack, not hide it:** Init or a GitHub URL sets everything up and opens TaskTrack. Humans read. Agents write.
- **next — Confirm the shipped slice:** Human accepts Done when a shipped feature is good enough.
- **later — Grow later:** Cursor marketplace and other optional distribution.

## Change tracking

Marks show on GitHub and in TaskTrack:

- <ins class="ph-added">added</ins>
- <del class="ph-removed">removed</del>
- <mark class="ph-replaced">replaced</mark>

- 2026-09-13 · <ins class="ph-added">Added an SEO section, favicons on TaskTrack, and a first-look rule: wait for the real page, not a white screen.</ins>
- 2026-09-13 · <mark class="ph-replaced">Replaced jargon on TaskTrack cards and made the empty Done column explain itself.</mark>
- 2026-09-13 · <mark class="ph-replaced">Replaced the Check pile-up with four columns that cards actually move through.</mark>
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
