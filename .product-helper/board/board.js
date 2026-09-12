const data = window.__PH__ || { product: {}, cards: [], columns: [], milestones: [], timeline: [], docs: {} };

const $ = (id) => document.getElementById(id);
const views = {
  board: $("view-board"),
  roadmap: $("view-roadmap"),
  timeline: $("view-timeline"),
  product: $("view-product"),
  guardrails: $("view-guardrails"),
};

const STATUS_LABEL = {
  backlog: "Ideas",
  ready: "Next",
  "in-progress": "Doing",
  review: "Check",
  done: "Done",
};

function init() {
  applyTheme(localStorage.getItem("ph-theme") || preferredTheme());
  $("product-name").textContent = data.product?.name || "Untitled product";
  $("product-tagline").textContent = data.product?.tagline || "";
  document.title = `${data.product?.name || "Product"} · TaskTrack`;
  $("generated-at").textContent = data.generatedAt
    ? `Updated ${new Date(data.generatedAt).toLocaleString()}`
    : "";

  renderBoard("");
  renderRoadmap();
  renderTimeline();
  views.product.innerHTML = renderMarkdown(data.docs?.product || "_No product doc yet. Run init._");
  views.guardrails.innerHTML = renderMarkdown(data.docs?.guardrails || "_No rules yet._");

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => showView(tab.dataset.view, tab));
  });
  $("search").addEventListener("input", (event) => renderBoard(event.target.value));
  $("theme-toggle").addEventListener("click", toggleTheme);
  $("drawer-close").addEventListener("click", closeDrawer);
  $("drawer").addEventListener("click", (event) => {
    if (event.target.id === "drawer") closeDrawer();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
  });
}

function preferredTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === "dark";
  $("theme-toggle").textContent = dark ? "Light" : "Dark";
  $("theme-toggle").setAttribute("aria-pressed", String(dark));
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("ph-theme", next);
  applyTheme(next);
}

function showView(name, tab) {
  document.querySelectorAll(".tab").forEach((node) => node.classList.toggle("is-active", node === tab));
  Object.entries(views).forEach(([key, node]) => {
    node.hidden = key !== name;
    node.classList.toggle("is-active", key === name);
  });
}

function renderBoard(query) {
  const q = query.trim().toLowerCase();
  const columns = data.columns?.length
    ? data.columns
    : [
        { id: "backlog", title: "Ideas" },
        { id: "ready", title: "Next" },
        { id: "in-progress", title: "Doing" },
        { id: "review", title: "Check" },
        { id: "done", title: "Done" },
      ];
  views.board.className = "view is-active board";
  views.board.innerHTML = columns
    .map((column) => {
      const cards = (data.cards || []).filter(
        (card) =>
          card.status === column.id &&
          (!q || `${card.title} ${card.description}`.toLowerCase().includes(q)),
      );
      const body = cards.length
        ? cards.map((card) => cardButton(card)).join("")
        : `<p class="empty">No features here yet.</p>`;
      return `<section class="column"><h2>${escapeHtml(column.title)} <span class="count">${cards.length}</span></h2>${body}</section>`;
    })
    .join("");
  views.board.querySelectorAll("[data-card]").forEach((button) => {
    button.addEventListener("click", () => openCard(button.dataset.card));
  });
}

function cardButton(card) {
  return `<button type="button" class="card" data-card="${escapeHtml(card.id)}">
    <h3>${escapeHtml(card.title)}</h3>
    <p>${escapeHtml(truncate(card.description || "", 110))}</p>
  </button>`;
}

function renderRoadmap() {
  views.roadmap.className = "view roadmap";
  const items = data.milestones?.length
    ? data.milestones
    : [{ horizon: "now", title: "Now", summary: "Nothing planned yet." }];
  views.roadmap.innerHTML = items
    .map(
      (item) => `<article class="horizon">
        <p class="eyebrow">${escapeHtml(simpleHorizon(item.horizon))}</p>
        <h2>${escapeHtml(item.title)}</h2>
        <p>${escapeHtml(item.summary || "")}</p>
      </article>`,
    )
    .join("");
}

function renderTimeline() {
  views.timeline.className = "view timeline";
  const events = (data.timeline || []).slice().reverse();
  if (!events.length) {
    views.timeline.innerHTML = `<p class="empty">No events yet. When the product doc, TaskTrack, or rules change, they show up here.</p>`;
    return;
  }
  views.timeline.innerHTML = events
    .map(
      (event) => `<article class="event">
        <time datetime="${escapeHtml(event.at || "")}">${escapeHtml(formatWhen(event.at))}</time>
        <p class="eyebrow">${escapeHtml(areaLabel(event.area))}</p>
        <h3>${escapeHtml(event.title)}</h3>
        <p>${escapeHtml(event.detail || "")}</p>
      </article>`,
    )
    .join("");
}

function simpleHorizon(value) {
  if (value === "now") return "Now";
  if (value === "next") return "Next";
  if (value === "later") return "Later";
  return value || "Now";
}

function areaLabel(area) {
  if (area === "prd") return "Product doc";
  if (area === "guardrails") return "Rules";
  return "TaskTrack";
}

function formatWhen(value) {
  if (!value) return "Unknown time";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function openCard(id) {
  const card = (data.cards || []).find((item) => item.id === id);
  if (!card) return;
  $("drawer-title").textContent = card.title;
  $("drawer-status").textContent = STATUS_LABEL[card.status] || card.status;
  $("drawer-desc").textContent = card.description || "";
  const meta = [
    ["Where", STATUS_LABEL[card.status] || card.status],
    ["Feature", card.feature || card.title],
    ["Updated", card.updatedAt ? new Date(card.updatedAt).toLocaleString() : "—"],
  ];
  $("drawer").querySelector(".meta").innerHTML = meta
    .map(([key, value]) => `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd>`)
    .join("");
  $("drawer").hidden = false;
  $("drawer-close").focus();
}

function closeDrawer() {
  $("drawer").hidden = true;
}

function renderMarkdown(src) {
  const escaped = escapeHtml(src)
    .replace(/&lt;ins class="ph-added"&gt;([\s\S]*?)&lt;\/ins&gt;/g, '<ins class="ph-added">$1</ins>')
    .replace(/&lt;del class="ph-removed"&gt;([\s\S]*?)&lt;\/del&gt;/g, '<del class="ph-removed">$1</del>')
    .replace(/&lt;mark class="ph-replaced"&gt;([\s\S]*?)&lt;\/mark&gt;/g, '<mark class="ph-replaced">$1</mark>')
    .replace(/\+\+(.+?)\+\+/g, '<ins class="ph-added">$1</ins>')
    .replace(/~~(.+?)~~/g, '<del class="ph-removed">$1</del>')
    .replace(/==(.+?)==/g, '<mark class="ph-replaced">$1</mark>');

  const lines = escaped.split(/\n/);
  const out = [];
  let inCode = false;
  let list = [];
  const flushList = () => {
    if (!list.length) return;
    out.push(`<ul>${list.map((item) => `<li>${item}</li>`).join("")}</ul>`);
    list = [];
  };
  for (const line of lines) {
    if (line.startsWith("```")) {
      flushList();
      inCode = !inCode;
      out.push(inCode ? "<pre><code>" : "</code></pre>");
      continue;
    }
    if (inCode) {
      out.push(`${line}\n`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      list.push(inline(line.replace(/^[-*]\s+/, "")));
      continue;
    }
    flushList();
    if (!line.trim()) continue;
    if (line.startsWith("### ")) out.push(`<h3>${inline(line.slice(4))}</h3>`);
    else if (line.startsWith("## ")) out.push(`<h2>${inline(line.slice(3))}</h2>`);
    else if (line.startsWith("# ")) out.push(`<h1>${inline(line.slice(2))}</h1>`);
    else if (line.startsWith("&gt; ")) out.push(`<blockquote>${inline(line.slice(5))}</blockquote>`);
    else out.push(`<p>${inline(line)}</p>`);
  }
  flushList();
  return out.join("\n");
}

function inline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function truncate(text, max) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

init();
