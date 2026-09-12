---
name: product-helper-sync
description: Optional fallback — re-analyze the repo and refresh the Product-Helper PRD and board when no agent update is available.
---

# Sync Product-Helper

Optional fallback. Prefer updating `.product-helper/` yourself after major work.

1. Re-read `.product-helper/GUARDRAILS.md` including Custom.
2. If you need a mechanical refresh, run `npx product-helper sync`. Add `--from-git` only to propose review cards from recent commits.
3. Apply any remaining PRD change marks (added / replaced / removed).
4. Do not mark work Done unless the human PM confirmed it.
