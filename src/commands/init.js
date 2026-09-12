import path from "node:path";
import { initWorkspace, writeWorkspaceFiles } from "../lib/workspace.js";

export function initCommand(cwd, flags) {
  const result = initWorkspace(path.resolve(cwd), {
    hooks: flags.hooks,
    agentsMd: flags.agentsMd,
  });

  if (flags.force) {
    writeWorkspaceFiles(path.resolve(cwd), result.model, { forceBoard: true });
  }

  const label = result.created ? "Created" : "Updated (idempotent merge)";
  console.log(`${label} Product-Helper workspace in ${result.paths.root}`);
  console.log(`  Product:    ${result.model.product.name}`);
  console.log(`  Cards:      ${result.model.cards.length}`);
  console.log(`  Board:      ${result.paths.boardHtml}`);
  console.log(`  PRD:        ${result.paths.productMd}`);
  console.log(`  Guardrails: ${result.paths.guardrailsMd}`);
  console.log("");
  console.log("Open the board:");
  console.log("  npx product-helper serve");
  console.log("  or open .product-helper/board/index.html");
  return 0;
}
