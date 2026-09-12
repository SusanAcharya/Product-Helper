# AGENTS

This repository is **Product-Helper**: an npm CLI, Cursor plugin, and copy-into-repo skill pack that gives any project a living PRD, TaskTrack, and guardrails.

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

This repository uses Product-Helper.

- Before substantial work, read `.product-helper/GUARDRAILS.md` if present, otherwise `templates/workspace/GUARDRAILS.md`.
- Follow `skills/product-helper/SKILL.md`.
- After a feature, update TaskTrack, PRODUCT.md, and TIMELINE.md yourself. Keep examples and templates aligned. Do not ask the human to run `sync`.
- In this repo, `.product-helper/` is the product’s own workspace and stays in git. In consumer repos it is gitignored.
- The human is the PM. Do not invent completed work.
<!-- product-helper:end -->
