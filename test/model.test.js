import test from "node:test";
import assert from "node:assert/strict";
import { emptyProduct, mergeModels } from "../src/lib/model.js";

const analysis = {
  name: "Harbor",
  slug: "harbor",
  description: "Notes for teams",
  version: "1.2.0",
  users: ["Writers"],
  problem: "Notes get lost",
  features: [{ title: "Editor", description: "Write notes", labels: ["core"] }],
  packageName: "harbor",
  scripts: ["test"],
  docsPresent: ["README.md"],
  structure: [{ name: "src" }],
};

test("empty product seeds cards outside Done", () => {
  const model = emptyProduct(analysis);
  assert.equal(model.product.name, "Harbor");
  assert.ok(model.cards.length >= 1);
  assert.ok(model.cards.every((card) => card.status !== "done"));
});

test("merge keeps human vision and existing cards", () => {
  const existing = emptyProduct(analysis);
  existing.product.tagline = "Human tagline";
  existing.cards[0].status = "in-progress";
  const next = emptyProduct({
    ...analysis,
    features: [
      ...analysis.features,
      { title: "Share links", description: "Public URLs", labels: ["new"] },
    ],
  });
  const merged = mergeModels(existing, next);
  assert.equal(merged.product.tagline, "Human tagline");
  assert.equal(merged.cards[0].status, "in-progress");
  assert.ok(merged.cards.some((card) => card.title === "Share links"));
});
