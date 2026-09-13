import path from "node:path";
import { exists } from "../lib/fs.js";
import { cloneRepo } from "../lib/clone.js";
import { openInBrowser } from "../lib/open.js";
import { isGitUrl, repoNameFromUrl } from "../lib/repo-url.js";
import { initWorkspace, writeWorkspaceFiles } from "../lib/workspace.js";
import { printOpenBanner } from "./open.js";

export function initCommand(cwd, flags = {}) {
  const target = resolveTarget(cwd, flags);
  const result = initWorkspace(path.resolve(target), {
    hooks: flags.hooks,
    agentsMd: flags.agentsMd,
  });

  if (flags.force) {
    writeWorkspaceFiles(path.resolve(target), result.model, { forceBoard: true });
  }

  const label = result.created ? "Ready" : "Updated";
  console.log(`${label}. ${result.model.product.name} is set up.`);
  console.log(`  Folder:     ${path.resolve(target)}`);
  console.log(`  Features:   ${result.model.cards.length}`);
  console.log("");
  console.log("Your agent now owns TaskTrack, the product doc, and the rules.");
  console.log("You only read. Open the plan anytime:");
  console.log("  npx product-helper open");

  if (flags.open !== false) {
    const opened = openInBrowser(result.paths.boardHtml);
    printOpenBanner(opened);
  } else {
    printOpenBanner(result.paths.boardHtml);
  }
  return 0;
}

function resolveTarget(cwd, flags) {
  const repo = flags.repo;
  if (!repo || !isGitUrl(repo)) return cwd;
  const dest = flags.cloneDir
    ? path.resolve(flags.cloneDir)
    : path.resolve(cwd, repoNameFromUrl(repo));
  if (exists(dest) && exists(path.join(dest, ".git"))) {
    console.log(`Using existing clone at ${dest}`);
    return dest;
  }
  console.log(`Cloning ${repo}`);
  cloneRepo(repo, dest);
  return dest;
}
