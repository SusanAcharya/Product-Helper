import { readTextIf } from "./fs.js";
import { CUSTOM_GUARDRAILS_END, CUSTOM_GUARDRAILS_START } from "./render.js";

const REQUIRED_HEADINGS = [
  "## Built-in guardrails",
  "## Custom guardrails",
  "Secrets and credentials",
  "Git safety",
];

export function validateGuardrails(filePath) {
  const text = readTextIf(filePath);
  const errors = [];
  const warnings = [];
  if (!text) {
    return { ok: false, errors: ["GUARDRAILS.md is missing."], warnings };
  }
  for (const heading of REQUIRED_HEADINGS) {
    if (!text.includes(heading)) errors.push(`Missing expected section: ${heading}`);
  }
  if (!text.includes(CUSTOM_GUARDRAILS_START) || !text.includes(CUSTOM_GUARDRAILS_END)) {
    errors.push("Custom guardrails markers are missing. Agents cannot preserve user edits.");
  }
  if (/sk-[a-zA-Z0-9]{20,}/.test(text) || /BEGIN (RSA|OPENSSH) PRIVATE KEY/.test(text)) {
    errors.push("Possible secret material detected in GUARDRAILS.md. Remove it.");
  }
  if (!/always re-read|must\s+\*?\*?re-read/i.test(text)) {
    warnings.push("File should tell agents to re-read defaults and custom guardrails before acting.");
  }
  return { ok: errors.length === 0, errors, warnings };
}
