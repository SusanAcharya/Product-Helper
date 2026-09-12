import test from "node:test";
import assert from "node:assert/strict";
import { markAdded, markRemoved, markReplaced, markdownConventions } from "../src/lib/marks.js";

test("marks wrap added, removed, and replaced text", () => {
  assert.match(markAdded("CLI"), /ph-added/);
  assert.match(markRemoved("CSV export"), /ph-removed/);
  assert.match(markReplaced("v2", "v1"), /ph-added[\s\S]*ph-removed/);
});

test("markdown conventions match the skill", () => {
  assert.equal(markdownConventions("added", "x"), "++x++");
  assert.equal(markdownConventions("removed", "x"), "~~x~~");
  assert.equal(markdownConventions("replaced", "x"), "==x==");
});
