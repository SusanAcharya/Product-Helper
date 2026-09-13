import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";

export function toOpenTarget(fileOrUrl) {
  if (/^https?:\/\//i.test(fileOrUrl)) return fileOrUrl;
  return pathToFileURL(fileOrUrl).href;
}

export function openInBrowser(fileOrUrl) {
  const target = toOpenTarget(fileOrUrl);
  const platform = process.platform;
  if (platform === "darwin") {
    spawn("open", [target], { detached: true, stdio: "ignore" }).unref();
    return target;
  }
  if (platform === "win32") {
    spawn("cmd", ["/c", "start", "", target], { detached: true, stdio: "ignore" }).unref();
    return target;
  }
  spawn("xdg-open", [target], { detached: true, stdio: "ignore" }).unref();
  return target;
}
