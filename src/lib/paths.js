import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export const PACKAGE_ROOT = path.resolve(here, "../..");
export const TEMPLATES = path.join(PACKAGE_ROOT, "templates");
export const SKILL_SRC = path.join(PACKAGE_ROOT, "skills", "product-helper");

export const WORKSPACE_DIR = ".product-helper";
export const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  ".next",
  "coverage",
  ".cache",
  ".turbo",
  "vendor",
  ".venv",
  "venv",
  "__pycache__",
  ".product-helper",
]);

export const SECRET_NAMES = new Set([
  ".env",
  ".env.local",
  ".env.development",
  ".env.production",
  ".env.test",
  "credentials.json",
  "service-account.json",
]);

export function workspaceRoot(cwd = process.cwd()) {
  return path.resolve(cwd, WORKSPACE_DIR);
}

export function workspacePaths(cwd = process.cwd()) {
  const root = workspaceRoot(cwd);
  const board = path.join(root, "board");
  return {
    root,
    productJson: path.join(root, "product.json"),
    productMd: path.join(root, "PRODUCT.md"),
    guardrailsMd: path.join(root, "GUARDRAILS.md"),
    decisionsMd: path.join(root, "DECISIONS.md"),
    changelogMd: path.join(root, "CHANGELOG.md"),
    timelineMd: path.join(root, "TIMELINE.md"),
    boardDir: board,
    boardHtml: path.join(board, "index.html"),
    boardCss: path.join(board, "board.css"),
    boardJs: path.join(board, "board.js"),
    boardJson: path.join(board, "board.json"),
    dataJs: path.join(board, "data.js"),
    faviconSvg: path.join(board, "favicon.svg"),
    appleTouchIcon: path.join(board, "apple-touch-icon.svg"),
  };
}

export function findRepoRoot(start = process.cwd()) {
  let dir = path.resolve(start);
  while (true) {
    if (fs.existsSync(path.join(dir, ".git")) || fs.existsSync(path.join(dir, "package.json"))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) return path.resolve(start);
    dir = parent;
  }
}

export function isSecretPath(filePath) {
  const base = path.basename(filePath);
  if (SECRET_NAMES.has(base)) return true;
  if (base.startsWith(".env.")) return true;
  if (/\.(pem|p12|pfx|key)$/i.test(base)) return true;
  if (/id_rsa|id_ed25519|private.?key/i.test(base)) return true;
  return false;
}
