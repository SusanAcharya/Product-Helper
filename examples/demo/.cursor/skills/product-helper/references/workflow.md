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

Session start is a thorough first look. If they gave a live URL, wait for real content (not a white page), write load/wait times, and fill the SEO section. See [seo.md](seo.md).

## Columns

Later → Planned → In progress → Done.

You move cards when work starts, pauses, or ships. The human accepts Done. Do not stack every feature in one column.

Write each card in everyday words. Title = what a person gets. Description = one short sentence. No jargon.

## After a feature

- Move the matching feature card (usually to In progress, then leave Done for the human)
- Update PRODUCT.md
- Append TIMELINE.md
- Tell them: `npx product-helper open`
