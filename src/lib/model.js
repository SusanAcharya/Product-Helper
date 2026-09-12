import { nowIso } from "./marks.js";
import { slugify } from "./analyze.js";

export const COLUMNS = [
  { id: "backlog", title: "Backlog" },
  { id: "ready", title: "Ready" },
  { id: "in-progress", title: "In Progress" },
  { id: "review", title: "Review" },
  { id: "done", title: "Done" },
];

export function emptyProduct(analysis, generatedBy = "product-helper") {
  const generatedAt = nowIso();
  const cards = seedCards(analysis);
  return {
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
    gitInferences: [],
    analysis: {
      packageName: analysis.packageName,
      scripts: analysis.scripts,
      docsPresent: analysis.docsPresent,
      structure: analysis.structure.map((item) => item.name),
    },
  };
}

export function seedCards(analysis) {
  const generatedAt = nowIso();
  return analysis.features.map((feature, index) => ({
    id: `ph-${String(index + 1).padStart(3, "0")}`,
    title: feature.title,
    description: feature.description,
    status: index === 0 ? "ready" : "backlog",
    labels: feature.labels || [],
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
      summary: `Document ${analysis.name}, seed the board, and confirm the first shippable slice.`,
    },
    {
      id: "next",
      title: "Close the highest-value gaps",
      horizon: "next",
      status: "planned",
      summary: "Turn inferred features into confirmed deliverables and move Ready work through Review.",
    },
    {
      id: "later",
      title: "Harden and scale the system",
      horizon: "later",
      status: "later",
      summary: "Polish distribution, automation, and long-horizon product bets.",
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
  };
}

export function mergeModels(existing, next) {
  if (!existing) return next;
  const cardsById = new Map(existing.cards.map((card) => [card.id, card]));
  const cardsByTitle = new Map(existing.cards.map((card) => [card.title.toLowerCase(), card]));

  for (const card of next.cards) {
    const match = cardsById.get(card.id) || cardsByTitle.get(card.title.toLowerCase());
    if (!match) {
      existing.cards.push({ ...card, source: card.source || "sync" });
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
  existing.analysis = next.analysis;
  return existing;
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
