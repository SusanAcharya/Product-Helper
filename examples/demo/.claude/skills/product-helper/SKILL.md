---
name: product-helper
description: Inspects a repository, generates a living PRD and kanban PM board, then keeps PRODUCT.md, GUARDRAILS.md, and the board in sync after major work. Use when bootstrapping product docs, opening the PM board, updating the PRD, tracking features or deliverables, after completing a feature or task, when scope is added removed or replaced, or when the user mentions product-helper, PRODUCT.md, kanban, guardrails, or the project board.
---

# Product-Helper

The human is the PM. You propose cards, update status from real work, and never invent completed work.

Workspace (target repo): `.product-helper/`

| File | Purpose |
| --- | --- |
| `product.json` | Single source of truth |
| `PRODUCT.md` | Living PRD |
| `GUARDRAILS.md` | Default + custom rules you must honor |
| `DECISIONS.md` | PM tradeoffs |
| `CHANGELOG.md` | Change history |
| `board/board.json` | Board projection |
| `board/index.html` | Offline kanban + doc viewer |

Prefer `npx product-helper init` / `sync` when the CLI is available. If it is not, create and update the same files yourself.

## Always before acting

1. Re-read `.product-helper/GUARDRAILS.md` including **Custom guardrails**. Honor defaults and custom together. Custom never weakens a default safety rule.
2. If the workspace is missing, run bootstrap.
3. Read `product.json`, `PRODUCT.md`, and `board/board.json`.
4. Do not read, print, or edit `.env`, `.env.*`, credentials, or private keys.

## Bootstrap (first use)

1. Scan the repo: README, package manifests, top-level layout, key source names. Skip secrets, `node_modules`, and build output.
2. Infer product name, users, problem, features, deliverables, and current status. Label inferences as inferred until the PM confirms.
3. Create `.product-helper/` if missing. Do not overwrite Custom guardrails or the `<!-- USER-VISION -->` block.
4. Seed kanban columns: Backlog, Ready, In Progress, Review, Done.
5. Seed cards from inferred work. New work starts in Backlog or Ready — never Done.
6. Tell the human how to open the board: `.product-helper/board/index.html` or `npx product-helper serve`.

If `npx product-helper` works, run `init` instead of hand-writing templates.

## After every major change

A major change is a new feature, a refinement, a completed task, or removed/replaced scope.

1. Re-read guardrails (defaults + custom).
2. Update `product.json` cards: add, move, close, or relabel. Set `updatedAt`.
3. Update `PRODUCT.md` sections that changed. Keep the USER-VISION block intact unless the PM asked to change vision.
4. Mark PRD diffs (see [change-marks.md](references/change-marks.md)):
   - added = green (`++text++` or `<ins class="ph-added">`)
   - removed = red (`~~text~~` or `<del class="ph-removed">`)
   - replaced = yellow (`==text==` or `<mark class="ph-replaced">`)
5. Append a change record and a CHANGELOG line.
6. If the PM accepted a tradeoff, add it to `DECISIONS.md`.
7. Refresh `board/board.json` and `board/data.js` so the HTML board matches reality.
8. Report links: board, PRODUCT.md, GUARDRAILS.md.

If the CLI is available, `npx product-helper sync` (optional `--from-git`) then apply any remaining precise PRD marks yourself.

## Board and PM rules

- Human accepts Done. You may move a card to Review when implementation finished.
- `--from-git` only proposes cards (Review + `git-inferred`). Do not auto-complete.
- Cards need title, description, status, labels, feature link, and updated-at.
- Empty columns stay visible with an empty state.

## Guardrail reminders

Never: read/write `.env` or secrets; commit credentials; change git config; force-push or hard-reset unless the user explicitly asked; exfiltrate private source; hit production or paid APIs without permission; weaken auth/RLS; skip irreversible migration consent.

Prefer small diffs. Ask before destructive or irreversible actions.

Full workflow: [workflow.md](references/workflow.md)
