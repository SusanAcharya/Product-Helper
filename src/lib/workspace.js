import fs from "node:fs";
import path from "node:path";
import { PACKAGE_ROOT, SKILL_SRC, TEMPLATES, workspacePaths } from "./paths.js";
import {
  copyFile,
  exists,
  readText,
  readTextIf,
  readJsonIf,
  writeJson,
  writeText,
  ensureDir,
} from "./fs.js";
import { analyzeRepo } from "./analyze.js";
import { boardView, emptyProduct, mergeModels } from "./model.js";
import {
  preserveCustomGuardrails,
  preserveUserVision,
  renderChangelog,
  renderDataJs,
  renderDecisions,
  renderProductMarkdown,
  renderTimeline,
} from "./render.js";
import { applyGitInferences, inferFromGit, recentCommits } from "./git.js";

const AGENTS_SNIPPET_MARK = "<!-- product-helper:start -->";

export function initWorkspace(cwd, options = {}) {
  const paths = workspacePaths(cwd);
  const analysis = analyzeRepo(cwd);
  const existing = readJsonIf(paths.productJson);
  const model = mergeModels(existing, emptyProduct(analysis));

  writeWorkspaceFiles(cwd, model, { forceBoard: true });
  ensureGitignore(cwd);
  writeTasktrackPointer(cwd);
  installSkills(cwd, options);
  if (options.hooks !== false) installHooks(cwd);
  if (options.agentsMd !== false) appendAgentsSnippet(cwd);
  if (options.chatgpt !== false) installChatgptDoc(cwd);
  if (options.claudeMd !== false) appendClaudeSnippet(cwd);

  return { paths, model, analysis, created: !existing };
}

export function syncWorkspace(cwd, options = {}) {
  const paths = workspacePaths(cwd);
  if (!exists(paths.root)) {
    return initWorkspace(cwd, options);
  }

  const analysis = analyzeRepo(cwd);
  const existing = readJsonIf(paths.productJson) || emptyProduct(analysis);
  let model = mergeModels(existing, emptyProduct(analysis, "product-helper-sync"));

  if (options.fromGit) {
    const inferences = inferFromGit(model, recentCommits(cwd));
    model = applyGitInferences(model, inferences);
  }

  if (!options.dryRun) {
    writeWorkspaceFiles(cwd, model, { forceBoard: false });
  }

  return { paths, model, analysis, created: false, dryRun: Boolean(options.dryRun) };
}

export function writeWorkspaceFiles(cwd, model, { forceBoard = false } = {}) {
  const paths = workspacePaths(cwd);
  ensureDir(paths.boardDir);

  const existingProduct = readTextIf(paths.productMd);
  const userVision = preserveUserVision(existingProduct);
  if (userVision) {
    model.product.vision = userVision.trim();
  }

  writeJson(paths.productJson, model);
  writeJson(paths.boardJson, boardView(model));
  writeText(paths.productMd, renderProductMarkdown(model, { userVision }));
  writeText(paths.changelogMd, renderChangelog(model));
  writeText(paths.timelineMd, renderTimeline(model));
  writeText(paths.decisionsMd, renderDecisions(model, readTextIf(paths.decisionsMd)));

  const guardTemplate = readText(path.join(TEMPLATES, "workspace", "GUARDRAILS.md"));
  writeText(paths.guardrailsMd, preserveCustomGuardrails(guardTemplate, readTextIf(paths.guardrailsMd)));

  copyBoardAssets(paths, true);
  writeText(
    paths.dataJs,
    renderDataJs(model, {
      product: readText(paths.productMd),
      guardrails: readText(paths.guardrailsMd),
      decisions: readText(paths.decisionsMd),
      changelog: readText(paths.changelogMd),
      timeline: readText(paths.timelineMd),
    }),
  );
}

export function ensureGitignore(cwd) {
  const dest = path.join(cwd, ".gitignore");
  const existing = readTextIf(dest) || "";
  if (/(^|\n)\.product-helper\/?(\n|$)/.test(existing)) return false;
  const block = "# Product-Helper local workspace (generated)\n.product-helper/\n";
  const next = existing.trimEnd() ? `${existing.trimEnd()}\n\n${block}` : block;
  writeText(dest, next);
  return true;
}

function copyBoardAssets(paths, forceBoard) {
  for (const [srcName, dest] of [
    ["index.html", paths.boardHtml],
    ["board.css", paths.boardCss],
    ["board.js", paths.boardJs],
  ]) {
    if (forceBoard || !exists(dest)) {
      copyFile(path.join(TEMPLATES, "board", srcName), dest);
    }
  }
  if (forceBoard || !exists(paths.boardHtml)) {
    copyFile(path.join(TEMPLATES, "board", "index.html"), paths.boardHtml);
  }
}

export function installSkills(cwd) {
  const targets = [
    path.join(cwd, ".cursor", "skills", "product-helper"),
    path.join(cwd, ".claude", "skills", "product-helper"),
    path.join(cwd, ".agents", "skills", "product-helper"),
  ];
  for (const dest of targets) {
    copySkillTree(SKILL_SRC, dest);
  }
  copyFile(
    path.join(TEMPLATES, "rules", "product-helper.mdc"),
    path.join(cwd, ".cursor", "rules", "product-helper.mdc"),
  );
}

function copySkillTree(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copySkillTree(from, to);
    else copyFile(from, to);
  }
}

export function installHooks(cwd) {
  copyFile(path.join(TEMPLATES, "hooks", "hooks.json"), path.join(cwd, ".cursor", "hooks.json"));
  copyFile(
    path.join(TEMPLATES, "hooks", "product-helper-stop.js"),
    path.join(cwd, ".cursor", "hooks", "product-helper-stop.js"),
  );
  try {
    fs.chmodSync(path.join(cwd, ".cursor", "hooks", "product-helper-stop.js"), 0o755);
  } catch {
    /* best-effort on Windows */
  }
}

export function appendAgentsSnippet(cwd) {
  const dest = path.join(cwd, "AGENTS.md");
  const snippet = readText(path.join(TEMPLATES, "agents", "AGENTS.snippet.md"));
  const existing = readTextIf(dest) || "";
  if (existing.includes(AGENTS_SNIPPET_MARK)) return;
  writeText(dest, existing ? `${existing.trimEnd()}\n\n${snippet}` : snippet);
}

export function appendClaudeSnippet(cwd) {
  const dest = path.join(cwd, "CLAUDE.md");
  const snippet = readText(path.join(TEMPLATES, "claude", "CLAUDE.snippet.md"));
  const existing = readTextIf(dest) || "";
  if (existing.includes(AGENTS_SNIPPET_MARK)) return;
  writeText(dest, existing ? `${existing.trimEnd()}\n\n${snippet}` : snippet);
}

export function writeTasktrackPointer(cwd) {
  const dest = path.join(cwd, "TASKTRACK.md");
  const next = readText(path.join(TEMPLATES, "workspace", "TASKTRACK.md"));
  const existing = readTextIf(dest) || "";
  if (existing && !existing.includes("npx product-helper open") && !existing.includes("TaskTrack")) {
    return false;
  }
  writeText(dest, next);
  return true;
}

export function installChatgptDoc(cwd) {
  const dest = path.join(cwd, "CHATGPT.md");
  if (exists(dest)) return;
  copyFile(path.join(PACKAGE_ROOT, "CHATGPT.md"), dest);
}

export function workspaceStatus(cwd) {
  const paths = workspacePaths(cwd);
  const model = readJsonIf(paths.productJson);
  return {
    initialized: exists(paths.root),
    paths,
    product: model?.product || null,
    cards: model?.cards?.length || 0,
    generatedAt: model?.generatedAt || null,
  };
}
