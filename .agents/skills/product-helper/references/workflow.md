# Product-Helper workflow

After `init`, you update the files. The human does not run `sync` as the daily path.

`.product-helper/` is local and gitignored in their repo. Skills/rules/hooks stay in git so agents load automatically.

## File map

```
.product-helper/          # generated, do not commit in consumer repos
  product.json
  PRODUCT.md
  GUARDRAILS.md
  TIMELINE.md
  DECISIONS.md
  CHANGELOG.md
  board/                  # TaskTrack UI
    index.html
    board.css
    board.js
    board.json
    data.js
```

Also installed (keep in git):

- `.cursor/skills/product-helper/`
- `.claude/skills/product-helper/`
- `.agents/skills/product-helper/`
- `.cursor/hooks.json` + hook script
- `AGENTS.md` / `CLAUDE.md` snippets

## After a feature

- [ ] Re-read GUARDRAILS.md
- [ ] Update feature cards only
- [ ] Update PRODUCT.md + marks
- [ ] Append a timeline event
- [ ] Refresh TaskTrack snapshot
- [ ] Give the human TaskTrack, PRODUCT.md, TIMELINE.md

## Timeline event

```json
{
  "id": "tl-001",
  "at": "2026-09-12T15:00:00.000Z",
  "area": "tasktrack",
  "action": "moved",
  "title": "Living PRD moved to Check",
  "detail": "The feature is built. Waiting for the human to mark Done."
}
```

`area` is `tasktrack`, `prd`, or `guardrails`.
