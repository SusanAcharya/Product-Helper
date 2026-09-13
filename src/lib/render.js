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

## SEO

${renderSeo(model)}

## Now / next / later

${(model.milestones || [])
  .map((item) => `- **${item.horizon} — ${item.title}:** ${item.summary}`)
  .join("\n")}

## Change tracking

Marks show on GitHub and in TaskTrack:

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
      return `- **${String(label).trim()}** — ${card.description} _(TaskTrack: ${statusLabel(card.status)})_`;
    })
    .join("\n");
}

function renderSeo(model) {
  const seo = model.seo || {};
  const findings = Array.isArray(seo.findings) ? seo.findings : [];
  const lines = [
    `- **Live URL:** ${seo.url || "_Not checked yet._"}`,
    `- **Last checked:** ${seo.lastCheckedAt || "_—_"}`,
    `- **Title:** ${seo.title || "_missing_"}`,
    `- **Meta description:** ${seo.metaDescription || "_missing — add one (~150–160 characters). People forget this._"}`,
    `- **Browser favicon:** ${seo.favicon || "_missing — add favicon.svg or favicon.ico_"}`,
    `- **Phone home-screen icon:** ${seo.appleTouchIcon || "_missing — add apple-touch-icon.png (180×180)_"}`,
    `- **Load / wait:** ${formatLoad(seo)}`,
  ];
  if (seo.notes) lines.push(`- **Notes:** ${seo.notes}`);
  if (findings.length) {
    lines.push("", "Findings:", ...findings.map((item) => `- ${item}`));
  } else if (!seo.url) {
    lines.push(
      "",
      "_If this product has a website or a live URL, open it, wait until real content is visible (not a white page), and fill this section. Record how long you waited._",
    );
  }
  return lines.join("\n");
}

function formatLoad(seo) {
  if (seo.loadMs == null && seo.waitMs == null) {
    return "_Not timed. If you opened a live page, write seconds to useful content and how long you waited._";
  }
  const parts = [];
  if (seo.loadMs != null) parts.push(`useful content at ~${Math.round(seo.loadMs / 1000)}s`);
  if (seo.waitMs != null) parts.push(`waited ~${Math.round(seo.waitMs / 1000)}s`);
  return parts.join(", ");
}

function statusLabel(status) {
  if (status === "later") return "Later";
  if (status === "planned") return "Planned";
  if (status === "in-progress") return "In progress";
  if (status === "done") return "Done";
  return status;
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

export function renderTimeline(model) {
  const events = (model.timeline || []).slice().reverse();
  const lines = events.map((event) => {
    const when = shortDate(event.at);
    const area = areaLabel(event.area);
    return `- **${when}** · ${area} · ${event.title}${event.detail ? ` — ${event.detail}` : ""}`;
  });
  return `# Timeline

What changed in TaskTrack, the product doc, and the rules.

Generated: ${model.generatedAt}

${lines.join("\n") || "_Nothing recorded yet._"}
`;
}

function areaLabel(area) {
  if (area === "prd") return "Product doc";
  if (area === "guardrails") return "Rules";
  return "TaskTrack";
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
    timeline: model.timeline,
    decisions: model.decisions,
    docs,
  };
  return `window.__PH__ = ${JSON.stringify(payload, null, 2)};\n`;
}

export { CUSTOM_GUARDRAILS_START, CUSTOM_GUARDRAILS_END, USER_VISION_START, USER_VISION_END };
