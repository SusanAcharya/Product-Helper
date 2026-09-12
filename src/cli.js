import { initCommand } from "./commands/init.js";
import { syncCommand } from "./commands/sync.js";
import { serveCommand } from "./commands/serve.js";
import { statusCommand } from "./commands/status.js";
import { guardrailsCommand } from "./commands/guardrails.js";

const VERSION = "1.0.1";

const HELP = `Product-Helper ${VERSION}

Living PRD, kanban PM board, and guardrails for coding agents.

Usage:
  product-helper <command> [options]

Commands:
  init          Scaffold skills, templates, and the PM workspace
  sync          Optional fallback — re-analyze the repo and refresh PRD + board
  serve         Local static server for the board
  status        Optional — print paths and links
  guardrails    Print or validate GUARDRAILS.md

Options:
  -h, --help       Show help
  -v, --version    Show version

init options:
  --force          Refresh board HTML/CSS/JS assets
  --no-hooks       Skip Cursor hook install
  --no-agents-md   Do not append the AGENTS.md snippet
  --dir <path>     Target repository (default: cwd)

sync options:
  --from-git       Propose cards from recent commits (never auto-Done)
  --dry-run        Analyze without writing
  --dir <path>     Target repository (default: cwd)

serve options:
  --port <n>       Port (default: 4173)
  --dir <path>     Target repository (default: cwd)

guardrails options:
  --validate       Check required sections and markers
  --dir <path>     Target repository (default: cwd)
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

  const cwd = flags.dir ? flags.dir : process.cwd();

  switch (command) {
    case "init":
      return initCommand(cwd, flags);
    case "sync":
      return syncCommand(cwd, flags);
    case "serve":
      return serveCommand(cwd, flags);
    case "status":
      return statusCommand(cwd);
    case "guardrails":
      return guardrailsCommand(cwd, flags);
    case undefined:
    case "":
      console.log(HELP);
      return 0;
    default:
      console.error(`Unknown command: ${command}\n`);
      console.log(HELP);
      return 1;
  }
}

function parseArgs(argv) {
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
    else if (token === "--port") flags.port = Number(argv[++i]);
    else if (token === "--dir") flags.dir = argv[++i];
    else if (token.startsWith("--port=")) flags.port = Number(token.slice(7));
    else if (token.startsWith("--dir=")) flags.dir = token.slice(6);
    else rest.push(token);
  }
  return { command: rest[0], flags };
}
