const data = window.__PH__ || { product: {}, cards: [], columns: [], milestones: [], docs: {} };

const $ = (id) => document.getElementById(id);
const views = {
  board: $("view-board"),
  roadmap: $("view-roadmap"),
  product: $("view-product"),
  guardrails: $("view-guardrails"),
  decisions: $("view-decisions"),
};

function init() {
  applyTheme(localStorage.getItem("ph-theme") || preferredTheme());
  $("product-name").textContent = data.product?.name || "Untitled product";
  $("product-tagline").textContent = data.product?.tagline || "";
  document.title = `${data.product?.name || "Product"} · Product-Helper`;
  $("generated-at").textContent = data.generatedAt
    ? `Generated ${new Date(data.generatedAt).toLocaleString()}`
    : "";

  renderBoard("");
  renderRoadmap();
  views.product.innerHTML = renderMarkdown(data.docs?.product || "_Run sync to load PRODUCT.md._");
  views.guardrails.innerHTML = renderMarkdown(data.docs?.guardrails || "_Guardrails not loaded._");
  views.decisions.innerHTML = renderMarkdown(data.docs?.decisions || "_No decisions yet._");

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
        { id: "backlog", title: "Backlog" },
        { id: "ready", title: "Ready" },
        { id: "in-progress", title: "In Progress" },
        { id: "review", title: "Review" },
        { id: "done", title: "Done" },
      ];
  views.board.className = "view is-active board";
  views.board.innerHTML = columns
    .map((column) => {
      const cards = (data.cards || []).filter(
        (card) =>
          card.status === column.id &&
          (!q || `${card.title} ${card.description} ${(card.labels || []).join(" ")}`.toLowerCase().includes(q)),
      );
      const body = cards.length
        ? cards.map((card) => cardButton(card)).join("")
        : `<p class="empty">Nothing here yet.</p>`;
      return `<section class="column"><h2>${escapeHtml(column.title)} <span class="count">${cards.length}</span></h2>${body}</section>`;
    })
    .join("");
  views.board.querySelectorAll("[data-card]").forEach((button) => {
    button.addEventListener("click", () => openCard(button.dataset.card));
  });
}

function cardButton(card) {
  const labels = (card.labels || []).map((label) => `<span class="chip">${escapeHtml(label)}</span>`).join("");
  return `<button type="button" class="card" data-card="${escapeHtml(card.id)}">
    <h3>${escapeHtml(card.title)}</h3>
    <p>${escapeHtml(truncate(card.description || "", 110))}</p>
    <div class="labels">${labels}</div>
  </button>`;
}

function renderRoadmap() {
  views.roadmap.className = "view roadmap";
  const items = data.milestones?.length
    ? data.milestones
    : [{ horizon: "now", title: "Now", summary: "No milestones yet." }];
  views.roadmap.innerHTML = items
    .map(
      (item) => `<article class="horizon">
        <p class="eyebrow">${escapeHtml(item.horizon)}</p>
        <h2>${escapeHtml(item.title)}</h2>
        <p>${escapeHtml(item.summary || "")}</p>
      </article>`,
    )
    .join("");
}

function openCard(id) {
  const card = (data.cards || []).find((item) => item.id === id);
  if (!card) return;
  $("drawer-title").textContent = card.title;
  $("drawer-status").textContent = card.status;
  $("drawer-desc").textContent = card.description || "";
  const meta = [
    ["ID", card.id],
    ["Feature", card.feature || "—"],
    ["Labels", (card.labels || []).join(", ") || "—"],
    ["Updated", card.updatedAt ? new Date(card.updatedAt).toLocaleString() : "—"],
    ["Source", card.source || "—"],
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
