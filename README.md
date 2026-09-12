# Product-Helper

One command installs the skills. Cursor, Claude, Codex, and ChatGPT pick them up and keep a living product doc, TaskTrack, and rules in the repo.

```bash
npx product-helper init
```

That copies the skills, writes a local `.product-helper/` workspace, and adds `.product-helper/` to `.gitignore`. After that, work as usual. The agent updates the plan, TaskTrack, and the timeline. You do not run `sync` after every change. You do not commit `.product-helper/`.

```bash
npx product-helper serve          # open TaskTrack at http://127.0.0.1:4173/
```

You are the PM. Agents propose **feature** cards. They do not invent completed work. Small bug fixes stay off TaskTrack.

## What you get

- **Skills** for Cursor, Claude Code, and ChatGPT/Codex — loaded automatically
- **Living product doc** (`PRODUCT.md`)
- **TaskTrack** — a simple, phone-friendly plan of features
- **Timeline** — a dated list of changes to TaskTrack, the product doc, and the rules
- **Guardrails** agents re-read before acting

`init` is safe to re-run. It will not overwrite Custom guardrails or the `USER-VISION` block.

## What gets committed

| Keep in git | Why |
| --- | --- |
| `.cursor/skills/`, `.claude/skills/`, `.agents/skills/` | So every agent finds the skill |
| `.cursor/rules/` and hooks | So the agent is reminded after work |
| `AGENTS.md` / `CLAUDE.md` snippets | So Codex and Claude load the skill |

| Leave local (gitignored) | Why |
| --- | --- |
| `.product-helper/` | Generated workspace: product doc, TaskTrack, timeline, rules |

## After init

1. Open the repo in your coding agent.
2. The skill loads on its own (or type `/product-helper`).
3. After a **feature** lands, the agent updates TaskTrack, the product doc, and the timeline.

## CLI (optional)

`init` is the product. `serve` opens TaskTrack. Everything else is a fallback.

```
product-helper init [--force] [--no-hooks] [--no-agents-md] [--dir <path>]
product-helper serve [--port 4173] [--dir <path>]
product-helper sync [--from-git] [--dry-run] [--dir <path>]
product-helper status [--dir <path>]
product-helper guardrails [--validate] [--dir <path>]
```

## License

MIT
