import test from "node:test";
import assert from "node:assert/strict";
import { analyzeRepo } from "../src/lib/analyze.js";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

test("inferProblem skips a truncated README list intro", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "ph-analyze-"));
  writeFileSync(
    path.join(dir, "README.md"),
    `# Harbor

A shippable notes system. Install it into any repo so agents can:

1. Capture quotes
2. Draft chapters
`,
  );
  writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify({
      name: "harbor",
      description: "Notes for teams who lose research between tools.",
    }),
  );
  const analysis = analyzeRepo(dir);
  assert.equal(analysis.problem, "Notes for teams who lose research between tools.");
  assert.ok(!analysis.problem.endsWith("can:"));
});
