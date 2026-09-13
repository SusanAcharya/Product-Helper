import path from "node:path";
import { syncWorkspace } from "../lib/workspace.js";

export function syncCommand(cwd, flags) {
  const result = syncWorkspace(path.resolve(cwd), {
    fromGit: flags.fromGit,
    dryRun: flags.dryRun,
  });

  if (result.dryRun) {
    console.log("Dry run — no files written.");
  } else {
    console.log(`Synced ${result.model.product.name}`);
  }
  console.log(`  Generated:  ${result.model.generatedAt}`);
  console.log(`  Cards:      ${result.model.cards.length}`);
  if (flags.fromGit) {
    const inferred = result.model.gitInferences || [];
    console.log(`  Git hints:  ${inferred.length} (planned only — not marked Done)`);
  }
  console.log(`  PRD:        ${result.paths.productMd}`);
  console.log(`  Board:      ${result.paths.boardHtml}`);
  return 0;
}
