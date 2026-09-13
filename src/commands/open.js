import path from "node:path";
import { workspacePaths } from "../lib/paths.js";
import { exists } from "../lib/fs.js";
import { openInBrowser } from "../lib/open.js";
import { serveCommand } from "./serve.js";

export function openCommand(cwd, flags = {}) {
  const root = path.resolve(cwd);
  const paths = workspacePaths(root);
  if (!exists(paths.boardHtml)) {
    console.error("TaskTrack is not set up yet.");
    console.error("Run: npx product-helper init");
    return 1;
  }

  if (flags.http) {
    return serveCommand(root, { ...flags, open: flags.open !== false });
  }

  const opened = flags.open === false ? null : openInBrowser(paths.boardHtml);
  printOpenBanner(opened || paths.boardHtml);
  return 0;
}

export function printOpenBanner(where) {
  console.log("");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  TaskTrack");
  console.log(`  ${where}`);
  console.log("");
  console.log("  Come back anytime:");
  console.log("    npx product-helper open");
  console.log("");
  console.log("  You read. Your agent writes the cards.");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");
}
