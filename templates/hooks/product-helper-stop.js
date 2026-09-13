#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const workspace = path.join(cwd, ".product-helper");
const hasWorkspace = fs.existsSync(workspace);
const sessionStart = process.argv.includes("--session-start");

const reminder = hasWorkspace
  ? "This repo uses Product-Helper. Session start is a thorough first look, not a race. Do not end it early. If they shared a live URL, open it and wait until real content is visible — a white page or spinner is not done (Streamlit and similar hosts are slow). Time the load and the wait. Fill PRODUCT.md SEO: title, meta description, browser favicon, phone home-screen icon, load times. People forget meta description and favicons; remind the agent and add them on websites. You manage TaskTrack. After a feature, update product.json, PRODUCT.md, TaskTrack, and TIMELINE.md. Tell them: npx product-helper open."
  : "Product-Helper is not set up. Run `npx product-helper init` or `npx product-helper init <github-url>`. If they gave a live site, still do a thorough look: wait for real content, then write SEO (title, meta description, favicons, load times).";

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
