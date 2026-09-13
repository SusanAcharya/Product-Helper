import test from "node:test";
import assert from "node:assert/strict";
import { isGitUrl, repoNameFromUrl } from "../src/lib/repo-url.js";
import { parseArgs } from "../src/cli.js";

test("detects GitHub URLs", () => {
  assert.equal(isGitUrl("https://github.com/you/app"), true);
  assert.equal(isGitUrl("git@github.com:you/app.git"), true);
  assert.equal(isGitUrl("init"), false);
});

test("names a folder from the repo URL", () => {
  assert.equal(repoNameFromUrl("https://github.com/you/app.git"), "app");
});

test("bare command means auto, URL means init", () => {
  assert.equal(parseArgs([]).command, "auto");
  const fromUrl = parseArgs(["https://github.com/you/app"]);
  assert.equal(fromUrl.command, "init");
  assert.equal(fromUrl.flags.repo, "https://github.com/you/app");
});
