# Product-Helper

A living PRD, a kanban board the human PM owns, and guardrails every coding agent must honor.

Install once. Then Cursor, Claude, Codex, or ChatGPT keep the plan current after real work. You do not run `sync` or `status` after every change.

1. Inspect the repository and generate a living **product document (PRD)**
2. Keep a **kanban PM board** the human owns (open as local HTML)
3. After every major change, **the agent updates the board and the PRD**
4. Mark PRD diffs **green (added)**, **yellow (replaced)**, and **red (removed)**
5. Honor **GUARDRAILS.md** — built-in safety rules plus a Custom section you edit

The human is the PM. Agents propose cards and update status from real work. They do not invent completed work.

## How it works

1. Run `npx product-helper init` once in a repo.
2. Work with your coding agent as usual.
3. After a feature, fix, or scope change, the agent updates `.product-helper/` (PRD, board, guardrails).

You accept Done, edit Custom guardrails, and own the vision.

Open the board when you want to look at it:

```bash
npx product-helper serve          # http://127.0.0.1:4173/
# or open .product-helper/board/index.html
```

## Capabilities

### Living PRD
A generated `PRODUCT.md` that stays current: users, problem, features, deliverables, and change tracking.

### Kanban PM board
Offline HTML board with light/dark theme, card drawer, now/next/later, and a highlighted product-doc viewer.

### Guardrails
Built-in safety rules plus a Custom section agents must re-read before every major action.

### Multi-agent skills
The same workflow ships as Cursor, Claude Code, and ChatGPT/Codex skills.

### CLI (optional)
`init` installs the workspace. `serve` opens the board. `sync`, `status`, and `guardrails` are fallbacks when no agent is available — not the daily loop.

## Install

### A. Copy into a repo (recommended)

```bash
npx product-helper init
```

This copies:

| Destination | What |
| --- | --- |
| `.cursor/skills/product-helper/` | Cursor Agent Skill (`SKILL.md`) |
| `.claude/skills/product-helper/` | Claude Code skill |
| `.agents/skills/product-helper/` | ChatGPT / Codex skill |
| `.cursor/hooks.json` + `.cursor/hooks/` | Cursor hook: remind the agent after major work |
| `.cursor/rules/product-helper.mdc` | Always-on reminder rule |
| `.product-helper/` | PRD, guardrails, board, `product.json` |
| `AGENTS.md` | Snippet so agents load the skill |
| `CLAUDE.md` | Claude Code pointer |
| `CHATGPT.md` | Custom GPT / Codex instructions |

`init` is idempotent. It merges new inferred cards, refreshes generated sections, and **does not overwrite** Custom guardrails or the `USER-VISION` block.

Local or global install:

```bash
npm install -D product-helper
npm install -g product-helper
product-helper init
```

### B. Cursor plugin pack

This repository is a Cursor plugin (`/.cursor-plugin/plugin.json`) and an Agent Plugin (`/plugin.json`).

**From this Git repo**

1. Open Cursor → **Customize**
2. Install the plugin from the marketplace once published, or develop locally:

```bash
mkdir -p ~/.cursor/plugins/local
ln -s "/absolute/path/to/Product-Helper" ~/.cursor/plugins/local/product-helper
```

3. Reload the window. Confirm the `product-helper` skill, rule, commands, and hooks.

**Publish later:** [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish) with this repository URL.

Trigger the skill implicitly (description match) or explicitly with `/product-helper`. Commands: `/product-helper-init`, `/product-helper-sync`, `/product-helper-status`.

### C. Claude Code

After `npx product-helper init`, Claude loads `.claude/skills/product-helper/SKILL.md` automatically when the task matches the description, or via `/product-helper`.

Personal install (any repo):

```bash
mkdir -p ~/.claude/skills
cp -R skills/product-helper ~/.claude/skills/product-helper
```

### D. ChatGPT / Codex

- **Codex / ChatGPT agent skills:** `.agents/skills/product-helper/SKILL.md` (official location). Invoke with `$product-helper` or `@product-helper`. Optional UI metadata: `agents/openai.yaml`.
- **Custom GPT:** paste `CHATGPT.md` into the GPT instructions.
- **Always-on project notes:** `AGENTS.md` (Codex reads this at session start).

## CLI

Optional. Use `init` once, `serve` to view the board. Everything else is a fallback.

```
product-helper init [--force] [--no-hooks] [--no-agents-md] [--dir <path>]
product-helper sync [--from-git] [--dry-run] [--dir <path>]
product-helper serve [--port 4173] [--dir <path>]
product-helper status [--dir <path>]
product-helper guardrails [--validate] [--dir <path>]
```

`--from-git` only **proposes** Review cards labeled `git-inferred`. Nothing is marked Done automatically.

## Workspace

```
.product-helper/
  product.json       # single source of truth
  PRODUCT.md         # living PRD
  GUARDRAILS.md      # defaults + Custom
  DECISIONS.md       # PM tradeoffs
  CHANGELOG.md
  board/
    index.html       # offline kanban + doc viewer
    board.json
    data.js          # snapshot so file:// works
```

Open `.product-helper/board/index.html` without a server, or use `serve` for a stable URL.

Change marks (GitHub + board):

- Added: `++text++` or `<ins class="ph-added">`
- Removed: `~~text~~` or `<del class="ph-removed">`
- Replaced: `==text==` or `<mark class="ph-replaced">`

## Guardrails

Agents must re-read `GUARDRAILS.md` (built-in **and** Custom) before acting. Built-ins cover secrets, git safety, exfiltration, production/paid APIs, auth/RLS, PII, licenses, and small diffs. Put team rules between:

```html
<!-- CUSTOM-GUARDRAILS:START -->
<!-- CUSTOM-GUARDRAILS:END -->
```

## Example

See [`examples/demo/`](examples/demo/) for a generated workspace you can open locally.

## License

MIT
