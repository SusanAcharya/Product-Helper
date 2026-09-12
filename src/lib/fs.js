import fs from "node:fs";
import path from "node:path";

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

export function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

export function readTextIf(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

export function writeText(filePath, contents) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, contents, "utf8");
}

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function readJsonIf(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

export function writeJson(filePath, value) {
  writeText(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

export function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

export function exists(filePath) {
  return fs.existsSync(filePath);
}

export function listDir(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

export function extractRegion(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker);
  if (start === -1 || end === -1 || end <= start) return null;
  return text.slice(start + startMarker.length, end);
}

export function replaceRegion(text, startMarker, endMarker, inner) {
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker);
  if (start === -1 || end === -1 || end <= start) {
    return `${text.trimEnd()}\n\n${startMarker}${inner}${endMarker}\n`;
  }
  return text.slice(0, start + startMarker.length) + inner + text.slice(end);
}

export const CUSTOM_GUARDRAILS_START = "<!-- CUSTOM-GUARDRAILS:START -->";
export const CUSTOM_GUARDRAILS_END = "<!-- CUSTOM-GUARDRAILS:END -->";
export const USER_VISION_START = "<!-- USER-VISION:START -->";
export const USER_VISION_END = "<!-- USER-VISION:END -->";
