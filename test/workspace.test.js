import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { healWorkspace, writeWorkspaceFiles } from "../src/lib/workspace.js";

test("heal remaps a dumped Check board onto Later and Planned", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "ph-heal-"));
  const root = path.join(dir, ".product-helper");
  mkdirSync(path.join(root, "board"), { recursive: true });
  writeFileSync(
    path.join(root, "product.json"),
    JSON.stringify({
      version: 1,
      generatedAt: "2026-09-13T00:00:00.000Z",
      product: { name: "Harbor", tagline: "Notes", users: [], problem: "Lost notes" },
      columns: [{ id: "review", title: "Check" }],
      cards: [
        { id: "a", title: "Editor", status: "review", description: "Write" },
        { id: "b", title: "Share", status: "review", description: "Send" },
        { id: "c", title: "Search", status: "review", description: "Find" },
        { id: "d", title: "Export", status: "review", description: "Download" },
      ],
      milestones: [],
      changes: [],
      timeline: [],
      decisions: [],
    }),
  );

  const { model } = healWorkspace(dir);
  assert.equal(model.cards.filter((card) => card.status === "planned").length, 2);
  assert.equal(model.cards.filter((card) => card.status === "later").length, 2);
  assert.deepEqual(
    model.columns.map((column) => column.id),
    ["later", "planned", "in-progress", "done"],
  );

  const dataJs = readFileSync(path.join(root, "board", "data.js"), "utf8");
  assert.match(dataJs, /"id": "later"/);
  assert.match(dataJs, /"title": "Planned"/);
  assert.doesNotMatch(dataJs, /"title": "Check"/);
});

test("writeWorkspaceFiles keeps a mixed board in place", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "ph-write-"));
  const model = {
    version: 1,
    generatedAt: "2026-09-13T00:00:00.000Z",
    product: { name: "Harbor", tagline: "Notes", users: [], problem: "Lost notes" },
    columns: [],
    cards: [
      { id: "a", title: "Editor", status: "in-progress", description: "Write" },
      { id: "b", title: "Share", status: "planned", description: "Send" },
      { id: "c", title: "Search", status: "later", description: "Find" },
    ],
    milestones: [],
    changes: [],
    timeline: [],
    decisions: [],
  };
  writeWorkspaceFiles(dir, model);
  assert.equal(model.cards[0].status, "in-progress");
  assert.equal(model.cards[1].status, "planned");
  assert.equal(model.cards[2].status, "later");
});
