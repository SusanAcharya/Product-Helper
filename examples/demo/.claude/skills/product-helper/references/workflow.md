# Product-Helper workflow

Humans read. You write.

## Setup

```bash
npx product-helper
npx product-helper init
npx product-helper init https://github.com/them/their-repo
npx product-helper open
```

`.product-helper/` is gitignored. `TASKTRACK.md` stays in git so they remember how to open the plan.

## After a feature

- Update feature cards on TaskTrack
- Update PRODUCT.md
- Append TIMELINE.md
- Tell them: `npx product-helper open`
