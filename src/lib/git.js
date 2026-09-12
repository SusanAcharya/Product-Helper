import { execFileSync } from "node:child_process";
import { nowIso } from "./marks.js";

export function recentCommits(cwd, limit = 20) {
  try {
    const raw = execFileSync(
      "git",
      ["log", `--max-count=${limit}`, "--pretty=format:%h%x09%s%x09%ad", "--date=iso-strict"],
      { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    );
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [hash, subject, date] = line.split("\t");
        return { hash, subject, date };
      });
  } catch {
    return [];
  }
}

export function inferFromGit(model, commits) {
  const inferences = [];
  const existingTitles = new Set((model.cards || []).map((card) => card.title.toLowerCase()));

  for (const commit of commits) {
    const kind = classify(commit.subject);
    if (!kind) continue;
    const title = humanSubject(commit.subject);
    const already = [...existingTitles].some((item) => titlesOverlap(item, title));
    inferences.push({
      hash: commit.hash,
      subject: commit.subject,
      date: commit.date,
      kind,
      title,
      alreadyTracked: already,
      note: already
        ? "Matches an existing card. Confirm status with the human PM before moving to Done."
        : "Proposed from git history. Do not mark Done unless the human confirms the work shipped.",
    });
  }

  return inferences;
}

export function applyGitInferences(model, inferences) {
  const generatedAt = nowIso();
  model.gitInferences = inferences;
  for (const item of inferences) {
    if (item.alreadyTracked) continue;
    const id = `git-${item.hash}`;
    if (model.cards.some((card) => card.id === id)) continue;
    model.cards.push({
      id,
      title: item.title,
      description: `Inferred from commit ${item.hash}: ${item.subject}. Confirm before treating as complete.`,
      status: "review",
      labels: ["feature", "git-inferred", item.kind],
      feature: item.hash,
      createdAt: generatedAt,
      updatedAt: generatedAt,
      source: "git",
    });
  }
  return model;
}

function classify(subject) {
  const text = subject.toLowerCase();
  if (/\b(wip|tmp|typo|format|lint|bug|hotfix|patch|nit|chore)\b/.test(text)) return null;
  if (/^merge\b/.test(text)) return null;
  if (/^(fix|bug|hotfix|docs|doc|refactor|chore|build|ci)\b/.test(text)) return null;
  if (/^(feat|feature|add|implement)\b/.test(text)) return "feature";
  if (/^(remove|drop|delete|deprecate)\b/.test(text)) return "removed";
  return null;
}

function humanSubject(subject) {
  return subject
    .replace(/^(feat|feature|fix|bug|docs|doc|refactor|chore|build|ci|add|implement)(\(.+\))?:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\.$/, "");
}

function titlesOverlap(a, b) {
  const left = new Set(a.split(/\W+/).filter((word) => word.length > 3));
  const right = b.toLowerCase().split(/\W+/).filter((word) => word.length > 3);
  return right.filter((word) => left.has(word)).length >= 2;
}
