# Product-Helper — ChatGPT / Codex instructions

The human only reads TaskTrack. You write the cards, product doc, and timeline.

## Setup

If `.product-helper/` is missing:

```
npx product-helper init
```

If they gave a GitHub URL:

```
npx product-helper init https://github.com/them/their-repo
```

Then tell them:

```
npx product-helper open
```

## After a feature

Update TaskTrack yourself. Feature cards only. Do not ask them to move cards or run `sync`. They accept Done.

Always end with: run `npx product-helper open`.
