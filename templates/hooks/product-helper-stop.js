#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const workspace = path.join(cwd, ".product-helper");
const hasWorkspace = fs.existsSync(workspace);
const sessionStart = process.argv.includes("--session-start");

const reminder = hasWorkspace
  ? "This repo uses Product-Helper. Re-read .product-helper/GUARDRAILS.md before acting. After a feature, update product.json, PRODUCT.md, TaskTrack, and TIMELINE.md. Feature cards only. The human is the PM."
  : "Product-Helper is not initialized. If this is a product repository, propose `npx product-helper init`.";

if (sessionStart) {
  process.stdout.write(
    JSON.stringify({
      additional_context: reminder,
    }),
  );
  process.exit(0);
}

process.stdout.write(
  JSON.stringify({
    additional_context: reminder,
  }),
);
process.exit(0);
