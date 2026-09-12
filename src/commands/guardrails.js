import path from "node:path";
import { workspacePaths } from "../lib/paths.js";
import { readTextIf } from "../lib/fs.js";
import { validateGuardrails } from "../lib/validate.js";

export function guardrailsCommand(cwd, flags) {
  const filePath = workspacePaths(path.resolve(cwd)).guardrailsMd;
  if (flags.validate) {
    const result = validateGuardrails(filePath);
    if (result.ok) {
      console.log("GUARDRAILS.md is valid.");
    } else {
      console.error("GUARDRAILS.md failed validation:");
      for (const error of result.errors) console.error(`  - ${error}`);
    }
    for (const warning of result.warnings) console.log(`  warning: ${warning}`);
    return result.ok ? 0 : 1;
  }

  const text = readTextIf(filePath);
  if (!text) {
    console.error("GUARDRAILS.md not found. Run `npx product-helper init` first.");
    return 1;
  }
  console.log(text);
  return 0;
}
