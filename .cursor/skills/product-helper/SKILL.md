---
name: product-helper
description: Inspects a repository, writes a living PRD, TaskTrack, and guardrails, then keeps them current after major feature work. Use when bootstrapping product docs, opening TaskTrack, updating the PRD, tracking features, after finishing a feature, when scope changes, or when the user mentions product-helper, PRODUCT.md, TaskTrack, timeline, or guardrails.
---

# Product-Helper

The human is the PM. You update the files. Do not ask them to run `sync` or `status`. After `npx product-helper init`, keep working.

Workspace: `.product-helper/` (local, gitignored in their repo). Do not tell them to commit it.

| File | Purpose |
| --- | --- |
| `product.json` | Source of truth |
| `PRODUCT.md` | Living product doc |
| `GUARDRAILS.md` | Rules you must honor |
| `TIMELINE.md` | What changed, and when |
| `DECISIONS.md` | PM tradeoffs |
| `board/index.html` | TaskTrack (open in a browser) |

Skills also live outside this folder so agents can find them: `.cursor/skills/`, `.claude/skills/`, `.agents/skills/`, plus short pointers in `AGENTS.md` / `CLAUDE.md`. Those stay in git. `.product-helper/` does not.

## Always before acting

1. Re-read `.product-helper/GUARDRAILS.md` including **Custom guardrails**.
2. If the workspace is missing, run `npx product-helper init` (or bootstrap the same files).
3. Read `product.json`, `PRODUCT.md`, and `TIMELINE.md`.
4. Do not read, print, or edit `.env`, credentials, or private keys.

## After every major feature

A major change is a **feature** added, finished, or removed — not a typo, lint, or small bug fix.

1. Re-read guardrails.
2. Update **feature** cards only on TaskTrack. Set `updatedAt`. Never add cards for small bug fixes.
3. Update `PRODUCT.md`. Keep the USER-VISION block unless the PM asked to change it.
4. Mark diffs: added `++text++` / `<ins class="ph-added">`, removed `~~text~~` / `<del class="ph-removed">`, replaced `==text==` / `<mark class="ph-replaced">`.
5. Append a **timeline** event (`product.json` `timeline` + `TIMELINE.md`) whenever TaskTrack, the product doc, or the rules change. Include time, area (`tasktrack` / `prd` / `guardrails`), and a short plain-language title.
6. Refresh `board/board.json` and `board/data.js`.
7. Point the human at TaskTrack: `.product-helper/board/index.html` or `npx product-helper serve`.

Human accepts Done. You may move a card to Check when the feature is built. Do not invent completed work.

## TaskTrack rules

- Call it **TaskTrack**. Do not say kanban.
- Columns: Ideas, Next, Doing, Check, Done.
- Cards are features people would ship or cut. Skip chores, typos, and tiny fixes.
- Write cards in short, plain language.
- Empty columns stay visible.

## Bootstrap

Scan README and source (skip secrets). Infer name, users, problem, and **features**. Seed TaskTrack. New cards start in Ideas or Next — never Done. Tell them how to open TaskTrack. Add `.product-helper/` to `.gitignore` if `init` has not.

Full workflow: [workflow.md](references/workflow.md)
