# AGENTS

This repository is **Product-Helper**: an npm CLI, Cursor plugin, and copy-into-repo skill pack that gives any project a living PRD, kanban board, and guardrails.

## Working here

- Node 18+. Zero runtime dependencies. ESM (`"type": "module"`).
- CLI entry: `bin/product-helper.js` → `src/cli.js`.
- Shared skill source: `skills/product-helper/SKILL.md`.
- Templates copied into target repos: `templates/`.
- Do not read or write `.env` or credentials. Do not change git config.

## Commands

```bash
node bin/product-helper.js --help
node bin/product-helper.js init --dir /path/to/repo
node --test test/*.test.js
```

<!-- product-helper:start -->
## Product-Helper

This repository uses Product-Helper for the living PRD, PM board, and guardrails.

- Before substantial work, read `.product-helper/GUARDRAILS.md` (built-in + Custom) if present, otherwise `templates/workspace/GUARDRAILS.md`.
- Follow `skills/product-helper/SKILL.md`.
- After a major feature, refinement, completed task, or scope change, keep examples and templates aligned.
- The human is the PM. Do not invent completed work.
<!-- product-helper:end -->
