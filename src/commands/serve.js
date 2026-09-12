import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { workspacePaths } from "../lib/paths.js";
import { exists } from "../lib/fs.js";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
};

export function serveCommand(cwd, flags) {
  const root = path.resolve(cwd);
  const paths = workspacePaths(root);
  if (!exists(paths.boardHtml)) {
    console.error("No board found. Run `npx product-helper init` first.");
    return 1;
  }

  const port = Number(flags.port) || 4173;
  const server = http.createServer((req, res) => {
    const url = new URL(req.url || "/", `http://127.0.0.1:${port}`);
    const filePath = resolvePublic(paths, url.pathname);
    if (!filePath) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    try {
      const body = fs.readFileSync(filePath);
      res.writeHead(200, { "Content-Type": TYPES[path.extname(filePath)] || "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
    }
  });

  server.listen(port, "127.0.0.1", () => {
    const url = `http://127.0.0.1:${port}/`;
    console.log(`Product-Helper board`);
    console.log(`  ${url}`);
    console.log(`  PRD:        ${url}PRODUCT.md`);
    console.log(`  Guardrails: ${url}GUARDRAILS.md`);
    console.log("Press Ctrl+C to stop.");
  });

  return new Promise((resolve) => {
    server.on("close", () => resolve(0));
  });
}

function resolvePublic(paths, pathname) {
  if (pathname === "/" || pathname === "/index.html") return paths.boardHtml;
  const clean = decodeURIComponent(pathname).replace(/^\/+/, "");
  const map = {
    "board.css": paths.boardCss,
    "board.js": paths.boardJs,
    "board.json": paths.boardJson,
    "data.js": paths.dataJs,
    "PRODUCT.md": paths.productMd,
    "GUARDRAILS.md": paths.guardrailsMd,
    "DECISIONS.md": paths.decisionsMd,
    "CHANGELOG.md": paths.changelogMd,
    "product.json": paths.productJson,
  };
  if (map[clean]) return map[clean];
  const candidate = path.resolve(paths.root, clean);
  if (!candidate.startsWith(paths.root)) return null;
  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  return null;
}
