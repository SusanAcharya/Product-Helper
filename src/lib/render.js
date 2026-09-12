import { markAdded, markRemoved, markReplaced, shortDate } from "./marks.js";
import {
  CUSTOM_GUARDRAILS_END,
  CUSTOM_GUARDRAILS_START,
  USER_VISION_END,
  USER_VISION_START,
  extractRegion,
} from "./fs.js";

export function renderProductMarkdown(model, { userVision } = {}) {
  const vision = userVision?.trim() || model.product.vision?.trim() || defaultVision(model);
  const changes = (model.changes || []).slice().reverse().slice(0, 20);
  return `# ${model.product.name}

> ${model.product.tagline}

**Status:** living PRD · **Generated:** ${model.generatedAt} · **Product version:** ${model.product.version || "unversioned"}

${USER_VISION_START}
${vision}
${USER_VISION_END}

## Users

${(model.product.users || []).map((user) => `- ${user}`).join("\n") || "- To be confirmed by the human PM"}

## Problem

${model.product.problem}

## Core features

${renderFeatures(model)}

## Deliverables

${renderDeliverables(model)}

## Current status

${statusSummary(model)}

## Now / next / later

${(model.milestones || [])
  .map((item) => `- **${item.horizon} — ${item.title}:** ${item.summary}`)
  .join("\n")}

## Change tracking

Marks render on GitHub and in the Product-Helper board:

- ${markAdded("added")}
- ${markRemoved("removed")}
- ${markReplaced("replaced")}

${changes.map((change) => renderChangeLine(change)).join("\n") || "_No changes recorded yet._"}

---

_Do not delete the \`USER-VISION\` markers. Agents update the rest of this file after major work._
`;
}

function defaultVision(model) {
  return `## Vision

${model.product.name} should make the product plan obvious to humans and agents: what we are building, what is in flight, and what is out of scope.

Edit this vision freely. Agents will keep it when they regenerate the rest of the PRD.`;
}

function renderFeatures(model) {
  const cards = model.cards || [];
  if (!cards.length) return "- _No features inferred yet._";
  return cards
    .filter((card) => card.status !== "done" || card.labels?.includes("feature"))
    .slice(0, 16)
    .map((card) => {
      const label = card.labels?.includes("removed")
        ? markRemoved(card.title)
        : card.labels?.includes("replaced")
          ? markReplaced(card.title)
          : card.source === "sync" || card.source === "bootstrap"
            ? `${card.title} ${card.source === "sync" ? markAdded("added") : ""}`
            : card.title;
      return `- **${String(label).trim()}** — ${card.description} _(board: ${card.status})_`;
    })
    .join("\n");
}

function renderDeliverables(model) {
  const done = (model.cards || []).filter((card) => card.status === "done");
  const open = (model.cards || []).filter((card) => card.status !== "done");
  return [
    `- Open work: **${open.length}** cards`,
    `- Completed (confirmed): **${done.length}** cards`,
    `- Human PM owns acceptance. Agents must not invent completed work.`,
  ].join("\n");
}

function statusSummary(model) {
  const counts = Object.fromEntries((model.columns || []).map((col) => [col.id, 0]));
  for (const card of model.cards || []) {
    counts[card.status] = (counts[card.status] || 0) + 1;
  }
  return (model.columns || [])
    .map((col) => `- **${col.title}:** ${counts[col.id] || 0}`)
    .join("\n");
}

function renderChangeLine(change) {
  const stamp = shortDate(change.at);
  if (change.kind === "added") {
    return `- ${stamp} · ${markAdded(change.summary)}`;
  }
  if (change.kind === "removed") {
    return `- ${stamp} · ${markRemoved(change.summary)}`;
  }
  return `- ${stamp} · ${markReplaced(change.summary)}`;
}

export function renderChangelog(model) {
  const lines = (model.changes || [])
    .slice()
    .reverse()
    .map((change) => `- ${change.at} · **${change.kind}** · ${change.section}: ${change.summary}`);
  return `# Changelog

Generated: ${model.generatedAt}

${lines.join("\n") || "_No changes yet._"}
`;
}

export function renderDecisions(model, existing) {
  const custom = existing ? extractRegion(existing, "<!-- USER-DECISIONS:START -->", "<!-- USER-DECISIONS:END -->") : null;
  const logged = (model.decisions || [])
    .map((item) => `### ${item.title}\n\n${item.body}\n`)
    .join("\n");
  const placeholder = "_No decisions recorded yet. Add accepted tradeoffs below._";
  const customTrim = custom?.trim();
  const inner = customTrim && customTrim !== placeholder ? customTrim : logged || placeholder;
  return `# Decision log

Product-Helper records PM tradeoffs here. The human is the PM.

<!-- USER-DECISIONS:START -->
${inner}
<!-- USER-DECISIONS:END -->
`;
}

export function preserveCustomGuardrails(template, existing) {
  if (!existing) return template;
  const custom = extractRegion(existing, CUSTOM_GUARDRAILS_START, CUSTOM_GUARDRAILS_END);
  if (custom == null) return template;
  const start = template.indexOf(CUSTOM_GUARDRAILS_START);
  const end = template.indexOf(CUSTOM_GUARDRAILS_END);
  if (start === -1 || end === -1) return template;
  return template.slice(0, start + CUSTOM_GUARDRAILS_START.length) + custom + template.slice(end);
}

export function preserveUserVision(existing) {
  if (!existing) return null;
  return extractRegion(existing, USER_VISION_START, USER_VISION_END);
}

export function renderDataJs(model, docs) {
  const payload = {
    generatedAt: model.generatedAt,
    product: model.product,
    columns: model.columns,
    cards: model.cards,
    milestones: model.milestones,
    changes: model.changes,
    decisions: model.decisions,
    docs,
  };
  return `window.__PH__ = ${JSON.stringify(payload, null, 2)};\n`;
}

export { CUSTOM_GUARDRAILS_START, CUSTOM_GUARDRAILS_END, USER_VISION_START, USER_VISION_END };
