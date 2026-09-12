---
name: product-helper-sync
description: Re-analyze the repo and update the Product-Helper PRD, board, and change marks after major work.
---

# Sync Product-Helper

1. Re-read `.product-helper/GUARDRAILS.md` including Custom.
2. Run `npx product-helper sync`. Add `--from-git` only to propose review cards from recent commits.
3. Apply any remaining PRD change marks (added / replaced / removed).
4. Do not mark work Done unless the human PM confirmed it.
