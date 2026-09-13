# Product-Helper

Give it a folder or a GitHub URL. That is the whole setup. After that you only **read** TaskTrack. Your coding agent writes the cards, the product doc, and the rules.

```bash
npx product-helper
```

In a repo, that command sets it up (if needed) and opens TaskTrack in your browser.

From a GitHub repo:

```bash
npx product-helper init https://github.com/you/your-repo
```

Come back to the plan anytime:

```bash
npx product-helper open
```

Bookmark the page. `TASKTRACK.md` in the repo is the reminder.

You do not move cards. You do not run `sync`. After a feature, Cursor, Claude, Codex, or ChatGPT updates TaskTrack. You mark Done when you accept the work.

## What you get

- Skills for Cursor, Claude, and ChatGPT/Codex — loaded on their own
- A living product doc
- TaskTrack — the plan, opened in the browser
- A timeline of changes
- Rules the agent re-reads

`.product-helper/` is local and gitignored. Skills and `TASKTRACK.md` stay in git.

## License

MIT
