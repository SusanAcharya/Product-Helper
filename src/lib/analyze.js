import fs from "node:fs";
import path from "node:path";
import { SKIP_DIRS, isSecretPath } from "./paths.js";
import { readJsonIf, readTextIf, listDir } from "./fs.js";

const DOC_CANDIDATES = [
  "README.md",
  "README",
  "package.json",
  "pyproject.toml",
  "Cargo.toml",
  "go.mod",
  "composer.json",
  "Gemfile",
];

export function analyzeRepo(cwd) {
  const pkg = readJsonIf(path.join(cwd, "package.json")) || {};
  const readme = firstReadme(cwd);
  const top = listDir(cwd)
    .filter((entry) => !entry.name.startsWith(".") && !SKIP_DIRS.has(entry.name) && !isSecretPath(entry.name))
    .map((entry) => ({ name: entry.name, type: entry.isDirectory() ? "dir" : "file" }));

  const sourceHints = collectSourceHints(cwd, top);
  const headings = extractHeadings(readme.body);
  const name = extractTitle(readme.body) || humanize(pkg.name || path.basename(cwd));
  const features = inferFeatures(pkg, headings, sourceHints, top, { name, slug: slugify(pkg.name || path.basename(cwd)) });

  return {
    name,
    slug: slugify(pkg.name || path.basename(cwd)),
    description: pkg.description || firstParagraph(readme.body) || `${name} is a software project.`,
    version: pkg.version || "0.0.0",
    packageName: pkg.name || null,
    scripts: Object.keys(pkg.scripts || {}),
    dependencies: Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }),
    structure: top,
    headings,
    sourceHints,
    features,
    users: inferUsers(readme.body, pkg.description),
    problem: inferProblem(readme.body, pkg.description, name),
    readmePath: readme.path,
    docsPresent: DOC_CANDIDATES.filter((file) => fs.existsSync(path.join(cwd, file))),
  };
}

function firstReadme(cwd) {
  for (const file of ["README.md", "readme.md", "README"]) {
    const full = path.join(cwd, file);
    const body = readTextIf(full);
    if (body) return { path: file, body: body.slice(0, 20_000) };
  }
  return { path: null, body: "" };
}

function collectSourceHints(cwd, top) {
  const hints = new Set();
  const sourceRoots = ["src", "app", "lib", "apps", "packages", "server", "client", "web"];
  for (const entry of top) {
    if (entry.type === "dir" && sourceRoots.includes(entry.name)) {
      for (const child of listDir(path.join(cwd, entry.name)).slice(0, 40)) {
        if (isSecretPath(child.name) || SKIP_DIRS.has(child.name)) continue;
        hints.add(`${entry.name}/${child.name}`);
      }
    }
  }
  return [...hints];
}

function extractHeadings(markdown) {
  return (markdown.match(/^#{1,3}\s+.+$/gm) || [])
    .map((line) => line.replace(/^#+\s+/, "").replace(/\s+$/, "").trim())
    .filter((title) => !/^table of contents$/i.test(title))
    .slice(0, 24);
}

const SKIP_HEADINGS = /^(users?|problem|features?|vision|capabilities|install(?:ation)?|usage|getting started|license|contributing|changelog|example|examples|workspace|core features|deliverables|current status|when to use|role|always|open|working here|commands|options|faq|docs|documentation|table of contents|overview|about|cli)$/i;

function inferFeatures(pkg, headings, sourceHints, top, identity = {}) {
  const found = [];
  const seen = new Set();
  const add = (title, description, labels = []) => {
    const key = title.toLowerCase();
    if (seen.has(key) || title.length < 3) return;
    if (SKIP_HEADINGS.test(title)) return;
    if (/^[A-H]\.\s/.test(title)) return;
    if (slugify(title) === identity.slug || slugify(title) === slugify(identity.name || "")) return;
    seen.add(key);
    found.push({ title, description, labels });
  };

  for (const heading of headings) {
    add(heading, `Documented in the project README as “${heading}”.`, ["docs"]);
  }

  const skipLeaves = new Set([
    "index", "main", "app", "utils", "helpers", "types", "lib", "commands",
    "src", "test", "tests", "bin", "assets", "templates", "hooks", "rules",
  ]);
  for (const hint of sourceHints) {
    const leaf = hint.split("/").pop().replace(/\.[a-z0-9]+$/i, "");
    if (skipLeaves.has(leaf.toLowerCase())) continue;
    add(humanize(leaf), `Inferred from source path \`${hint}\`.`, ["inferred"]);
  }

  if (top.some((entry) => entry.name === "cli" || entry.name === "bin")) {
    if (![...seen].some((key) => key.includes("cli") || key.includes("command-line"))) {
      add("Command-line interface", "Repository contains a CLI entrypoint.", ["cli"]);
    }
  }

  if (found.length === 0) {
    add("Core product", pkg.description || "Primary product capability still being discovered.", ["seed"]);
  }

  return found.slice(0, 12);
}

function extractTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function inferUsers(readme, description) {
  const blob = `${description || ""}\n${readme}`.toLowerCase();
  const users = [];
  if (blob.includes("developer") || blob.includes("agent") || blob.includes("cli")) {
    users.push("Software teams and coding agents working in a repository");
  }
  if (blob.includes("product") || blob.includes("pm") || blob.includes("kanban")) {
    users.push("Human product managers who own priorities and accept work");
  }
  if (users.length === 0) {
    users.push("People who use or build this repository");
  }
  return users;
}

function inferProblem(readme, description, name) {
  const paragraph = firstParagraph(readme);
  if (paragraph && paragraph.length > 40) return paragraph;
  if (description) return description;
  return `${name} needs a living product document and a visible board so humans and agents share one plan.`;
}

function firstParagraph(markdown) {
  const lines = markdown.split(/\r?\n/);
  const parts = [];
  for (const line of lines) {
    if (line.startsWith("#") || line.startsWith("```") || line.startsWith("[")) continue;
    if (!line.trim()) {
      if (parts.length) break;
      continue;
    }
    parts.push(line.trim());
    if (parts.join(" ").length > 80) break;
  }
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

export function humanize(value) {
  return String(value)
    .replace(/^@[^/]+\//, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase())
    .trim();
}

export function slugify(value) {
  return String(value)
    .replace(/^@[^/]+\//, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}
