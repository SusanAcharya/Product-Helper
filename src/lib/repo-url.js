export function isGitUrl(value) {
  if (!value || typeof value !== "string") return false;
  const text = value.trim();
  if (/^git@[\w.-]+:[\w./-]+(\.git)?$/i.test(text)) return true;
  if (!/^https?:\/\//i.test(text)) return false;
  return /github\.com|gitlab\.com|bitbucket\.org|\.git(\/|$)/i.test(text);
}

export function repoNameFromUrl(value) {
  const cleaned = String(value)
    .trim()
    .replace(/\.git$/i, "")
    .replace(/\/+$/, "");
  const parts = cleaned.split(/[:/]/).filter(Boolean);
  return parts.at(-1) || "repo";
}
