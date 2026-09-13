import { exists } from "./lib/fs.js";
import { workspacePaths } from "./lib/paths.js";
import { isGitUrl } from "./lib/repo-url.js";
import { initCommand } from "./commands/init.js";
import { openCommand } from "./commands/open.js";
import { syncCommand } from "./commands/sync.js";
import { serveCommand } from "./commands/serve.js";
import { statusCommand } from "./commands/status.js";
import { guardrailsCommand } from "./commands/guardrails.js";

const VERSION = "1.2.0";

const HELP = `Product-Helper ${VERSION}

One command sets everything up. After that you only read TaskTrack.
Your coding agent writes the cards, product doc, and rules.

Usage:
  npx product-helper
  npx product-helper init
  npx product-helper init https://github.com/you/your-repo
  npx product-helper open

Commands:
  init          Set up skills + TaskTrack (clone a GitHub URL if given)
  open          Open TaskTrack in your browser
  serve         Same as open, but keep a local http:// URL
  sync          Optional fallback refresh
  status        Print paths
  guardrails    Print or validate rules

Options:
  -h, --help       Show help
  -v, --version    Show version
  --dir <path>     Target folder
  --no-open        Do not open the browser
  --http           open/serve over http://127.0.0.1:4173/
  --force          Refresh TaskTrack HTML assets
  --no-hooks       Skip Cursor hook install
  --no-agents-md   Do not append AGENTS.md
  --from-git       Propose feature cards from recent commits
  --dry-run        Analyze without writing
  --port <n>       Port for serve (default: 4173)
  --validate       Check GUARDRAILS.md
`;

export async function main(argv = process.argv.slice(2)) {
  const { command, flags } = parseArgs(argv);
  if (flags.help || command === "help") {
    console.log(HELP);
    return 0;
  }
  if (flags.version || command === "version") {
    console.log(VERSION);
    return 0;
  }

  const cwd = flags.dir && !flags.repo ? flags.dir : process.cwd();

  switch (command) {
    case "auto":
      return autoCommand(cwd, flags);
    case "init":
      return initCommand(cwd, flags);
    case "open":
      return openCommand(cwd, flags);
    case "sync":
      return syncCommand(cwd, flags);
    case "serve":
      return serveCommand(cwd, { ...flags, open: flags.open !== false });
    case "status":
      return statusCommand(cwd);
    case "guardrails":
      return guardrailsCommand(cwd, flags);
    default:
      console.error(`Unknown command: ${command}\n`);
      console.log(HELP);
      return 1;
  }
}

function autoCommand(cwd, flags) {
  const paths = workspacePaths(cwd);
  if (!exists(paths.root)) return initCommand(cwd, flags);
  return openCommand(cwd, flags);
}

export function parseArgs(argv) {
  const flags = {};
  const rest = [];
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--help" || token === "-h") flags.help = true;
    else if (token === "--version" || token === "-v") flags.version = true;
    else if (token === "--force") flags.force = true;
    else if (token === "--no-hooks") flags.hooks = false;
    else if (token === "--no-agents-md") flags.agentsMd = false;
    else if (token === "--from-git") flags.fromGit = true;
    else if (token === "--dry-run") flags.dryRun = true;
    else if (token === "--validate") flags.validate = true;
    else if (token === "--no-open") flags.open = false;
    else if (token === "--http") flags.http = true;
    else if (token === "--port") flags.port = Number(argv[++i]);
    else if (token === "--dir") flags.dir = argv[++i];
    else if (token.startsWith("--port=")) flags.port = Number(token.slice(7));
    else if (token.startsWith("--dir=")) flags.dir = token.slice(6);
    else rest.push(token);
  }

  let command = rest[0];
  const extra = rest.slice(1);
  if (isGitUrl(command)) {
    flags.repo = command;
    command = "init";
  } else if (isGitUrl(extra[0])) {
    flags.repo = extra[0];
  }
  if (flags.repo && flags.dir) flags.cloneDir = flags.dir;
  if (!command) command = "auto";
  return { command, flags };
}
