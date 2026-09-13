import { nowIso } from "./marks.js";
import { isFeatureWorthy, slugify } from "./analyze.js";

export const COLUMNS = [
  { id: "later", title: "Later" },
  { id: "planned", title: "Planned" },
  { id: "in-progress", title: "In progress" },
  { id: "done", title: "Done" },
];

export const STATUS_ALIAS = {
  backlog: "later",
  ideas: "later",
  later: "later",
  ready: "planned",
  next: "planned",
  planned: "planned",
  "in-progress": "in-progress",
  doing: "in-progress",
  review: "planned",
  check: "planned",
  done: "done",
};

export function normalizeStatus(status) {
  return STATUS_ALIAS[status] || "later";
}

export function emptyProduct(analysis, generatedBy = "product-helper") {
  const generatedAt = nowIso();
  const cards = seedCards(analysis);
  return normalizeTaskTrack({
    version: 1,
    generatedAt,
    generatedBy,
    product: {
      name: analysis.name,
      slug: analysis.slug,
      tagline: analysis.description,
      users: analysis.users,
      problem: analysis.problem,
      vision: "",
      version: analysis.version,
    },
    milestones: defaultMilestones(analysis),
    columns: COLUMNS,
    cards,
    timeline: [
      {
        id: "tl-bootstrap",
        at: generatedAt,
        area: "tasktrack",
        action: "added",
        title: "TaskTrack started",
        detail: "Created the local workspace from the repository.",
      },
    ],
    changes: [
      {
        id: "chg-bootstrap",
        at: generatedAt,
        kind: "added",
        section: "workspace",
        from: "",
        to: ".product-helper/",
        summary: "Bootstrapped Product-Helper workspace from repository inspection.",
      },
    ],
    decisions: [],
    seo: emptySeo(),
    gitInferences: [],
    analysis: {
      packageName: analysis.packageName,
      scripts: analysis.scripts,
      docsPresent: analysis.docsPresent,
      structure: analysis.structure.map((item) => item.name),
    },
  });
}

export function seedCards(analysis) {
  const generatedAt = nowIso();
  return (analysis.features || [])
    .filter((feature) => isFeatureWorthy(feature.title, feature.description))
    .map((feature, index) => ({
      id: `ph-${String(index + 1).padStart(3, "0")}`,
      title: feature.title,
      description: feature.description,
      status: index < 2 ? "planned" : "later",
      labels: ["feature", ...(feature.labels || []).filter((label) => label !== "feature")],
      feature: slugify(feature.title),
      createdAt: generatedAt,
      updatedAt: generatedAt,
      source: "bootstrap",
    }));
}

export function defaultMilestones(analysis) {
  return [
    {
      id: "now",
      title: "Make the product understandable",
      horizon: "now",
      status: "active",
      summary: `Write down what ${analysis.name} is, put the first features on TaskTrack, and agree what ships first.`,
    },
    {
      id: "next",
      title: "Finish the next features",
      horizon: "next",
      status: "planned",
      summary: "Move Planned features to In progress while you build them. The human marks Done.",
    },
    {
      id: "later",
      title: "Grow later",
      horizon: "later",
      status: "later",
      summary: "Bigger bets after the first slice is real.",
    },
  ];
}

export function boardView(model) {
  return {
    version: model.version,
    generatedAt: model.generatedAt,
    product: model.product,
    columns: model.columns,
    cards: model.cards,
    milestones: model.milestones,
    changes: model.changes.slice(-40),
    timeline: (model.timeline || []).slice(-80),
  };
}

export function mergeModels(existing, next) {
  if (!existing) return normalizeTaskTrack(next);
  const cardsById = new Map(existing.cards.map((card) => [card.id, card]));
  const cardsByTitle = new Map(existing.cards.map((card) => [card.title.toLowerCase(), card]));

  for (const card of next.cards) {
    const match = cardsById.get(card.id) || cardsByTitle.get(card.title.toLowerCase());
    if (!match && isFeatureWorthy(card.title, card.description)) {
      existing.cards.push({ ...card, status: normalizeStatus(card.status), source: card.source || "sync" });
    }
  }

  existing.generatedAt = next.generatedAt;
  existing.product = {
    ...existing.product,
    name: existing.product.name || next.product.name,
    tagline: preferHuman(existing.product.tagline, next.product.tagline),
    users: existing.product.users?.length ? existing.product.users : next.product.users,
    problem: preferHuman(existing.product.problem, next.product.problem),
    version: next.product.version || existing.product.version,
    slug: existing.product.slug || next.product.slug,
  };
  if (!existing.milestones?.length) existing.milestones = next.milestones;
  if (!existing.timeline) existing.timeline = next.timeline || [];
  if (!existing.seo) existing.seo = next.seo || emptySeo();
  existing.analysis = next.analysis;
  return normalizeTaskTrack(existing);
}

export function emptySeo() {
  return {
    url: "",
    title: "",
    metaDescription: "",
    favicon: "",
    appleTouchIcon: "",
    loadMs: null,
    waitMs: null,
    notes: "",
    findings: [],
    lastCheckedAt: "",
  };
}

export function normalizeTaskTrack(model) {
  model.columns = COLUMNS.map((column) => ({ ...column }));
  for (const card of model.cards || []) {
    card.status = normalizeStatus(card.status);
  }
  if (!model.seo) model.seo = emptySeo();
  unstackIfDumped(model);
  return model;
}

function unstackIfDumped(model) {
  const active = (model.cards || []).filter((card) => card.status !== "done");
  if (active.length < 3) return;
  const counts = active.reduce((acc, card) => {
    acc[card.status] = (acc[card.status] || 0) + 1;
    return acc;
  }, {});
  const stacked = Object.entries(counts).find(([, count]) => count === active.length);
  if (!stacked) return;
  if (stacked[0] === "in-progress") return;

  active.forEach((card, index) => {
    card.status = index < 2 ? "planned" : "later";
  });
}

export function appendTimeline(model, event) {
  model.timeline = model.timeline || [];
  model.timeline.push({
    id: event.id || `tl-${Date.now()}`,
    at: event.at || nowIso(),
    area: event.area || "tasktrack",
    action: event.action || "updated",
    title: event.title,
    detail: event.detail || "",
  });
  model.generatedAt = event.at || nowIso();
  return model;
}

function preferHuman(current, inferred) {
  if (!current) return inferred;
  if (current.includes("still being discovered") && inferred) return inferred;
  return current;
}

export function upsertChange(model, change) {
  model.changes = model.changes || [];
  model.changes.push(change);
  model.generatedAt = change.at;
}
