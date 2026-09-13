import { execFileSync } from "node:child_process";
import { exists } from "./fs.js";

export function cloneRepo(url, dest) {
  if (exists(dest)) return dest;
  execFileSync("git", ["clone", url, dest], { stdio: "inherit" });
  return dest;
}
