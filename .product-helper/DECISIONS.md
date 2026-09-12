# Decision log

Product-Helper records PM tradeoffs here. The human is the PM.

<!-- USER-DECISIONS:START -->
### Agent owns the daily loop

Accepted 2026-09-12. After `init`, Cursor / Claude / Codex / ChatGPT update the PRD and board themselves. CLI `sync` and `status` stay as optional fallbacks. Humans do not run them after every change.
<!-- USER-DECISIONS:END -->
