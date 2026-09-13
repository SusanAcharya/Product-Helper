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

## First look (session start)

The start of a session is a **thorough first look**, not a race. Do not end it early. Unbalanced, thin results usually mean you stopped too soon.

If they shared a **live site** (including Streamlit, other slow hosts, or a GitHub Pages URL):

1. Open it in a browser.
2. Wait until **real content** is visible. A white page, spinner, or empty viewport is not done.
3. Time the load and how long you waited. Write those times in the **SEO** section.
4. Check title, meta description, favicon (browser + phone), and the rest of [seo.md](references/seo.md).

People often forget **meta description** and other **SEO basics**, and they forget **favicons** for the browser tab and the phone home screen. Remind the agent. Add them when the product is a website.

## SEO

Keep a **SEO** section in `PRODUCT.md`. Fill it from the live page, not from memory. Full checklist: [seo.md](references/seo.md).

## After every feature

A feature added, finished, or removed — not a typo or small bug fix.

1. Update **feature** cards on TaskTrack. Set `updatedAt`. You move the cards. They only accept Done.
2. Update `PRODUCT.md`. Keep USER-VISION unless they asked to change it.
3. Mark diffs: added / removed / replaced.
4. Append a timeline event when TaskTrack, the product doc, or the rules change.
5. Refresh `board/board.json` and `board/data.js`.
6. Tell them to run `npx product-helper open`.

Do not invent completed work.

## TaskTrack rules

- Call it **TaskTrack**.
- Columns, in order: **Later → Planned → In progress → Done**.
- Features only.
- You own the cards. The human reads the site and accepts Done.
- Write cards a non-engineer can read. Title = what a person gets (a few words). Description = one short sentence. No jargon, file names, model names, or implementation notes. Do not write “Documented in the README”.
- Done is not a dump. It stays empty until the human accepts a feature. Never invent Done.

### Move cards as work happens

Never dump every card in one column. A living plan looks spread out.

| When | Move the card |
| --- | --- |
| New idea, not next | **Later** |
| Next up, not started | **Planned** |
| You are building it now | **In progress** |
| Human accepted the shipped work | **Done** (they say so) |

- Starting a feature: Later or Planned → **In progress**.
- Pausing: In progress → **Planned**.
- Parking: Planned → **Later**.
- Keep **In progress** to the features you are actually building this turn (usually one, rarely more than two).
- When you add a new feature card, put it in **Later** or **Planned**, never Done.
- Old names (`backlog`, `ready`, `review`, `check`, Ideas, Next, Check) are aliases. Rewrite them to the four columns above. Do not park work in Check.

Full workflow: [workflow.md](references/workflow.md)
