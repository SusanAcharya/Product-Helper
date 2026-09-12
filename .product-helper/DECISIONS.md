# Decision log

Product-Helper records PM tradeoffs here. The human is the PM.

<!-- USER-DECISIONS:START -->
### Agent owns the daily loop

Accepted 2026-09-12. After `init`, Cursor / Claude / Codex / ChatGPT update the PRD and TaskTrack themselves. CLI `sync` and `status` stay as optional fallbacks. Humans do not run them after every change.

### Local workspace stays off git

Accepted 2026-09-12. In consumer repos, `.product-helper/` is gitignored. Skills and agent pointers stay in git so the skill still loads. This Product-Helper repo keeps `.product-helper/` in git because it is the product’s own plan.
<!-- USER-DECISIONS:END -->
