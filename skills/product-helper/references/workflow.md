# Product-Helper workflow

## File map

```
.product-helper/
  product.json          # source of truth
  PRODUCT.md
  GUARDRAILS.md
  DECISIONS.md
  CHANGELOG.md
  board/
    index.html
    board.css
    board.js
    board.json
    data.js             # inlined snapshot so the board works via file://
```

Skills installed by `product-helper init`:

- `.cursor/skills/product-helper/`
- `.claude/skills/product-helper/`
- `.agents/skills/product-helper/`
- `.cursor/hooks.json` + `.cursor/hooks/product-helper-stop.js`
- `AGENTS.md` snippet, optional `CLAUDE.md` snippet, `CHATGPT.md`

## Bootstrap checklist

- [ ] Inspect README + manifests + source layout (no secrets)
- [ ] Create workspace if missing
- [ ] Preserve Custom guardrails and USER-VISION
- [ ] Seed columns and inferred cards
- [ ] Write product.json, markdown, board snapshot
- [ ] Point the human at the board URL / file

## Sync checklist (after major work)

- [ ] Re-read GUARDRAILS.md (defaults + custom)
- [ ] Update matching cards; do not fabricate Done
- [ ] Update PRD sections + change marks
- [ ] Append CHANGELOG + optional DECISIONS
- [ ] Regenerate board.json and data.js
- [ ] Give the human the three links

## product.json card shape

```json
{
  "id": "ph-001",
  "title": "CLI init",
  "description": "Scaffold skills and workspace into the target repo.",
  "status": "in-progress",
  "labels": ["feature"],
  "feature": "cli-init",
  "createdAt": "2026-09-12T00:00:00.000Z",
  "updatedAt": "2026-09-12T00:00:00.000Z",
  "source": "bootstrap"
}
```

Statuses: `backlog` | `ready` | `in-progress` | `review` | `done`

## Idempotent edits

- Never replace text between `<!-- CUSTOM-GUARDRAILS:START -->` and `<!-- CUSTOM-GUARDRAILS:END -->`
- Never replace text between `<!-- USER-VISION:START -->` and `<!-- USER-VISION:END -->` unless the PM asked
- Merge cards by `id` or title; keep human status changes
- Refresh board HTML/CSS only when missing or when the user asks to reset assets
