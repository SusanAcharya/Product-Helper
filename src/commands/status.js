import path from "node:path";
import { workspaceStatus } from "../lib/workspace.js";

export function statusCommand(cwd) {
  const status = workspaceStatus(path.resolve(cwd));
  if (!status.initialized) {
    console.log("TaskTrack is not set up yet.");
    console.log("Run: npx product-helper init");
    console.log("Or:  npx product-helper init https://github.com/you/your-repo");
    return 1;
  }

  console.log(status.product?.name || "Product-Helper");
  console.log(`  Generated:  ${status.generatedAt}`);
  console.log(`  Cards:      ${status.cards}`);
  console.log(`  Open:       npx product-helper open`);
  console.log(`  TaskTrack:  ${status.paths.boardHtml}`);
  console.log(`  PRODUCT:    ${status.paths.productMd}`);
  console.log(`  Timeline:   ${status.paths.timelineMd}`);
  console.log(`  Guardrails: ${status.paths.guardrailsMd}`);
  console.log(`  Decisions:  ${status.paths.decisionsMd}`);
  console.log(`  Store:      ${status.paths.productJson}`);
  return 0;
}
