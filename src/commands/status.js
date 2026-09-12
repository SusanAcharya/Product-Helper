import path from "node:path";
import { workspaceStatus } from "../lib/workspace.js";

export function statusCommand(cwd) {
  const status = workspaceStatus(path.resolve(cwd));
  if (!status.initialized) {
    console.log("Product-Helper is not initialized in this directory.");
    console.log("Run: npx product-helper init");
    return 1;
  }

  console.log(status.product?.name || "Product-Helper");
  console.log(`  Generated:  ${status.generatedAt}`);
  console.log(`  Cards:      ${status.cards}`);
  console.log(`  TaskTrack:  ${status.paths.boardHtml}`);
  console.log(`  Serve:      npx product-helper serve   → http://127.0.0.1:4173/`);
  console.log(`  PRODUCT:    ${status.paths.productMd}`);
  console.log(`  Timeline:   ${status.paths.timelineMd}`);
  console.log(`  Guardrails: ${status.paths.guardrailsMd}`);
  console.log(`  Decisions:  ${status.paths.decisionsMd}`);
  console.log(`  Store:      ${status.paths.productJson}`);
  return 0;
}
