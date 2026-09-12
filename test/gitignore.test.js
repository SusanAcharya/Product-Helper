import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { ensureGitignore } from "../src/lib/workspace.js";

test("init adds .product-helper/ to gitignore once", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "ph-ignore-"));
  assert.equal(ensureGitignore(dir), true);
  assert.equal(ensureGitignore(dir), false);
  const body = readFileSync(path.join(dir, ".gitignore"), "utf8");
  assert.match(body, /\.product-helper\//);
});
