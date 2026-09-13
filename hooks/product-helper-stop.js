#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const workspace = path.join(cwd, ".product-helper");
const hasWorkspace = fs.existsSync(workspace);
const sessionStart = process.argv.includes("--session-start");

const reminder = hasWorkspace
  ? "This repo uses Product-Helper. You manage TaskTrack. The human only reads it. After a feature, update product.json, PRODUCT.md, TaskTrack, and TIMELINE.md. Tell them: npx product-helper open."
  : "Product-Helper is not set up. Run `npx product-helper init` or `npx product-helper init <github-url>`.";

process.stdout.write(JSON.stringify({ additional_context: reminder }));
if (!sessionStart) {
  /* stop/session share the same payload */
}
process.exit(0);
