# Product-Helper

One command installs the skills. Cursor, Claude, Codex, and ChatGPT pick them up and keep a living PRD, kanban board, and guardrails in your repo.

```bash
npx product-helper init
```

That copies agent skills into `.cursor/`, `.claude/`, and `.agents/`, adds `AGENTS.md` / `CLAUDE.md` pointers, and seeds `.product-helper/`. After that, work as usual. The agent updates the plan. You do not run `sync` or `status` after every change.

```bash
npx product-helper serve          # optional: open the board at http://127.0.0.1:4173/
```

You are the PM. Agents propose cards. They do not invent completed work.

## What you get

- **Skills** for Cursor, Claude Code, and ChatGPT/Codex — installed by `init`, loaded automatically
- **Living PRD** (`PRODUCT.md`) with green / yellow / red change marks
- **Kanban board** (offline HTML) the human owns
- **Guardrails** agents must re-read (built-in + your Custom section)

`init` is idempotent. Re-run it anytime. It will not overwrite Custom guardrails or the `USER-VISION` block.

## After init

1. Open the repo in Cursor, Claude, Codex, or ChatGPT.
2. The agent loads the skill (or type `/product-helper`).
3. After a feature, fix, or scope change, the agent updates `.product-helper/`.

Prefer a local install? Same command after `npm i -D product-helper`, or `npm i -g product-helper` then `product-helper init`.

## Files `init` writes

| Destination | What |
| --- | --- |
| `.cursor/skills/product-helper/` | Cursor Agent Skill |
| `.claude/skills/product-helper/` | Claude Code skill |
| `.agents/skills/product-helper/` | ChatGPT / Codex skill |
| `.cursor/hooks.json` + `.cursor/hooks/` | Reminds the agent after major work |
| `.cursor/rules/product-helper.mdc` | Always-on reminder |
| `.product-helper/` | PRD, guardrails, board, `product.json` |
| `AGENTS.md` / `CLAUDE.md` / `CHATGPT.md` | Pointers so agents load the skill |

## Other install paths

**Cursor plugin (this repo):** symlink for local develop, or publish later at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish).

```bash
mkdir -p ~/.cursor/plugins/local
ln -s "/absolute/path/to/Product-Helper" ~/.cursor/plugins/local/product-helper
```

Reload Cursor. You still run `npx product-helper init` in each repo so that repo gets its own `.product-helper/` workspace.

**Claude, personal:** `cp -R skills/product-helper ~/.claude/skills/product-helper`

**ChatGPT Custom GPT:** paste `CHATGPT.md` into the GPT instructions.

## CLI (optional)

`init` is the product. `serve` opens the board. Everything else is a fallback.

```
product-helper init [--force] [--no-hooks] [--no-agents-md] [--dir <path>]
product-helper serve [--port 4173] [--dir <path>]
product-helper sync [--from-git] [--dry-run] [--dir <path>]
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

Change marks (GitHub + board):

- Added: `++text++` or `<ins class="ph-added">`
- Removed: `~~text~~` or `<del class="ph-removed">`
- Replaced: `==text==` or `<mark class="ph-replaced">`

## Guardrails

Agents must re-read `GUARDRAILS.md` (built-in **and** Custom) before acting. Put team rules between:

```html
<!-- CUSTOM-GUARDRAILS:START -->
<!-- CUSTOM-GUARDRAILS:END -->
```

## Example

See [`examples/demo/`](examples/demo/) for a generated workspace you can open locally.

## License

MIT
