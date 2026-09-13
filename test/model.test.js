import test from "node:test";
import assert from "node:assert/strict";
import { emptyProduct, mergeModels, normalizeStatus, normalizeTaskTrack } from "../src/lib/model.js";
import { applyGitInferences } from "../src/lib/git.js";
import { renderProductMarkdown, renderTimeline } from "../src/lib/render.js";

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

test("seeded cards skip tiny bug-fix work", () => {
  const model = emptyProduct({
    ...analysis,
    features: [
      { title: "Editor", description: "Write notes", labels: ["feature"] },
      { title: "Fix typo", description: "Tiny lint patch", labels: ["fix"] },
    ],
  });
  assert.ok(model.cards.every((card) => card.title !== "Fix typo"));
  assert.ok(model.timeline.some((event) => event.area === "tasktrack"));
});

test("old column ids map onto Later / Planned / In progress / Done", () => {
  assert.equal(normalizeStatus("backlog"), "later");
  assert.equal(normalizeStatus("ready"), "planned");
  assert.equal(normalizeStatus("review"), "planned");
  assert.equal(normalizeStatus("check"), "planned");
  assert.equal(normalizeStatus("doing"), "in-progress");
  assert.equal(normalizeStatus("done"), "done");
});

test("seeded cards start Planned then Later, never stacked in Check", () => {
  const model = emptyProduct({
    ...analysis,
    features: [
      { title: "Editor", description: "Write notes", labels: ["feature"] },
      { title: "Share", description: "Public URLs", labels: ["feature"] },
      { title: "Search", description: "Find notes", labels: ["feature"] },
      { title: "Export", description: "Download notes", labels: ["feature"] },
    ],
  });
  assert.deepEqual(
    model.cards.map((card) => card.status),
    ["planned", "planned", "later", "later"],
  );
  assert.deepEqual(
    model.columns.map((column) => column.id),
    ["later", "planned", "in-progress", "done"],
  );
});

test("dumped Check cards spread into Planned and Later", () => {
  const model = normalizeTaskTrack({
    columns: [{ id: "review", title: "Check" }],
    cards: [
      { id: "a", title: "One", status: "review" },
      { id: "b", title: "Two", status: "review" },
      { id: "c", title: "Three", status: "review" },
      { id: "d", title: "Four", status: "review" },
    ],
  });
  assert.equal(model.cards.filter((card) => card.status === "planned").length, 2);
  assert.equal(model.cards.filter((card) => card.status === "later").length, 2);
  assert.ok(model.cards.every((card) => card.status !== "review"));
});

test("a mixed board is left alone", () => {
  const model = normalizeTaskTrack({
    cards: [
      { id: "a", title: "One", status: "in-progress" },
      { id: "b", title: "Two", status: "planned" },
      { id: "c", title: "Three", status: "later" },
    ],
  });
  assert.equal(model.cards[0].status, "in-progress");
  assert.equal(model.cards[1].status, "planned");
  assert.equal(model.cards[2].status, "later");
});

test("git inferences land in Planned, not Check", () => {
  const model = emptyProduct(analysis);
  applyGitInferences(model, [
    {
      hash: "abc1234",
      subject: "feat: Voice profiles",
      title: "Voice profiles",
      alreadyTracked: false,
      kind: "feature",
    },
  ]);
  const card = model.cards.find((item) => item.id === "git-abc1234");
  assert.equal(card.status, "planned");
});

test("product doc always has an SEO section", () => {
  const model = emptyProduct(analysis);
  const md = renderProductMarkdown(model);
  assert.match(md, /## SEO/);
  assert.match(md, /Meta description/);
  assert.match(md, /Browser favicon/);
  assert.match(md, /Phone home-screen icon/);
});

test("timeline markdown is readable", () => {
  const md = renderTimeline({
    generatedAt: "2026-09-12T15:00:00.000Z",
    timeline: [
      {
        at: "2026-09-12T15:00:00.000Z",
        area: "prd",
        title: "Product doc updated",
        detail: "Wrote the problem in plain language.",
      },
    ],
  });
  assert.match(md, /Product doc/);
  assert.match(md, /Product doc updated/);
});
