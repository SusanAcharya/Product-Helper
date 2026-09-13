---
name: product-helper
description: Inspects a repository, writes a living PRD, TaskTrack, and guardrails, then keeps them current after feature work. Use when bootstrapping, when the user shares a GitHub URL, when opening TaskTrack, after finishing a feature, or when they mention product-helper, PRODUCT.md, TaskTrack, timeline, or guardrails.
---

# Product-Helper

After setup, **the human only reads**. You write TaskTrack, the product doc, the timeline, and the rules (except Custom guardrails and USER-VISION). Do not ask them to run `sync`, move cards, or remember a hidden file path.

If the workspace is missing, set it up yourself:

```bash
npx product-helper init
```

If they gave a GitHub URL:

```bash
npx product-helper init https://github.com/them/their-repo
```

Then open TaskTrack:

```bash
npx product-helper open
```

End every turn that touched the plan with this, in plain language:

**TaskTrack** — run `npx product-helper open` (bookmark the page). You read. I write the cards.

Workspace: `.product-helper/` (local, gitignored). `TASKTRACK.md` at the repo root is the reminder they keep in git.

| File | Purpose |
| --- | --- |
| `TASKTRACK.md` | How humans open the plan |
| `.product-helper/product.json` | Source of truth |
| `PRODUCT.md` | Living product doc |
| `GUARDRAILS.md` | Rules you must honor |
| `TIMELINE.md` | What changed, and when |
| `board/index.html` | TaskTrack |

## Always before acting

1. Re-read `.product-helper/GUARDRAILS.md` including **Custom guardrails**.
2. If missing, run init (clone first if they gave a GitHub URL).
3. Read `product.json`, `PRODUCT.md`, and `TIMELINE.md`.
4. Do not read, print, or edit `.env`, credentials, or private keys.

## After every feature

A feature added, finished, or removed — not a typo or small bug fix.

1. Update **feature** cards on TaskTrack. Set `updatedAt`. You manage columns. They only accept Done.
2. Update `PRODUCT.md`. Keep USER-VISION unless they asked to change it.
3. Mark diffs: added / removed / replaced.
4. Append a timeline event when TaskTrack, the product doc, or the rules change.
5. Refresh `board/board.json` and `board/data.js`.
6. Tell them to run `npx product-helper open`.

Do not invent completed work.

## TaskTrack rules

- Call it **TaskTrack**.
- Columns: Ideas, Next, Doing, Check, Done.
- Features only. Short, plain language.
- You own the cards. The human reads the site.

Full workflow: [workflow.md](references/workflow.md)
