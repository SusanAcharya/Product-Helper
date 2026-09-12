import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateGuardrails } from "../src/lib/validate.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("shipped guardrails template validates", () => {
  const result = validateGuardrails(path.join(root, "templates/workspace/GUARDRAILS.md"));
  assert.equal(result.ok, true, result.errors.join("; "));
});

test("missing file fails validation", () => {
  const result = validateGuardrails(path.join(root, "does-not-exist.md"));
  assert.equal(result.ok, false);
});
