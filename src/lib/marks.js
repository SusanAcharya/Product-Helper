export const KIND = {
  added: "added",
  removed: "removed",
  replaced: "replaced",
};

export function markAdded(text) {
  return `<ins class="ph-added">${escapeHtml(text)}</ins>`;
}

export function markRemoved(text) {
  return `<del class="ph-removed">${escapeHtml(text)}</del>`;
}

export function markReplaced(next, previous) {
  if (previous) {
    return `${markAdded(next)} ${markRemoved(previous)}`;
  }
  return `<mark class="ph-replaced">${escapeHtml(next)}</mark>`;
}

export function markdownConventions(kind, text) {
  if (kind === KIND.added) return `++${text}++`;
  if (kind === KIND.removed) return `~~${text}~~`;
  return `==${text}==`;
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function nowIso() {
  return new Date().toISOString();
}

export function shortDate(iso = nowIso()) {
  return iso.slice(0, 10);
}

export function changeRecord({ kind, section, summary, from = "", to = "" }) {
  return {
    id: `chg-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    at: nowIso(),
    kind,
    section,
    from,
    to,
    summary,
  };
}
