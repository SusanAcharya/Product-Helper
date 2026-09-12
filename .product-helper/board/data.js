window.__PH__ = {
  "generatedAt": "2026-09-12T15:10:00.000Z",
  "product": {
    "name": "Product-Helper",
    "slug": "product-helper",
    "tagline": "One command installs living PRD, TaskTrack, and guardrail skills for Cursor, Claude, Codex, and ChatGPT.",
    "users": [
      "Software teams and coding agents working in a repository",
      "Human product managers who own priorities and accept work"
    ],
    "problem": "Teams and coding agents lose the plan: the product doc goes stale, the work list lives elsewhere, and each agent forgets the rules. Product-Helper keeps one living product doc, TaskTrack the human owns, and rules every agent must re-read.",
    "vision": "## Vision\n\nProduct-Helper makes the plan obvious: a living product doc, TaskTrack the human PM owns, and guardrails every coding agent must honor. One command installs the skills. The generated workspace stays local.",
    "version": "1.1.0"
  },
  "columns": [
    {
      "id": "backlog",
      "title": "Ideas"
    },
    {
      "id": "ready",
      "title": "Next"
    },
    {
      "id": "in-progress",
      "title": "Doing"
    },
    {
      "id": "review",
      "title": "Check"
    },
    {
      "id": "done",
      "title": "Done"
    }
  ],
  "cards": [
    {
      "id": "ph-001",
      "title": "Living PRD",
      "description": "PRODUCT.md with users, problem, features, and change marks. Agents update it after major work.",
      "status": "review",
      "labels": [
        "now",
        "docs",
        "feature"
      ],
      "feature": "living-prd",
      "createdAt": "2026-09-12T13:51:47.786Z",
      "updatedAt": "2026-09-12T14:35:00.000Z",
      "source": "agent"
    },
    {
      "id": "ph-002",
      "title": "TaskTrack",
      "description": "A simple, phone-friendly plan of features. Not for small bug fixes.",
      "status": "review",
      "labels": [
        "now",
        "feature"
      ],
      "feature": "tasktrack",
      "createdAt": "2026-09-12T13:51:47.786Z",
      "updatedAt": "2026-09-12T15:10:00.000Z",
      "source": "agent"
    },
    {
      "id": "ph-003",
      "title": "Guardrails",
      "description": "Built-in safety rules plus a Custom section agents re-read before acting.",
      "status": "review",
      "labels": [
        "now",
        "feature"
      ],
      "feature": "guardrails",
      "createdAt": "2026-09-12T13:51:47.786Z",
      "updatedAt": "2026-09-12T14:35:00.000Z",
      "source": "agent"
    },
    {
      "id": "ph-004",
      "title": "Multi-agent skills",
      "description": "Same workflow as Cursor, Claude Code, and ChatGPT/Codex skills.",
      "status": "review",
      "labels": [
        "distribution",
        "feature"
      ],
      "feature": "multi-agent-skills",
      "createdAt": "2026-09-12T13:51:47.786Z",
      "updatedAt": "2026-09-12T14:40:00.000Z",
      "source": "agent"
    },
    {
      "id": "ph-005",
      "title": "CLI",
      "description": "init installs the workspace and gitignores it. serve opens TaskTrack.",
      "status": "review",
      "labels": [
        "cli",
        "feature"
      ],
      "feature": "cli",
      "createdAt": "2026-09-12T13:51:47.786Z",
      "updatedAt": "2026-09-12T14:35:00.000Z",
      "source": "agent"
    },
    {
      "id": "ph-006",
      "title": "Agent-first usage story",
      "description": "One npx command copies skills. Agents then update the product doc, TaskTrack, and timeline.",
      "status": "review",
      "labels": [
        "now",
        "docs",
        "feature"
      ],
      "feature": "agent-first-loop",
      "createdAt": "2026-09-12T14:35:00.000Z",
      "updatedAt": "2026-09-12T15:10:00.000Z",
      "source": "agent"
    },
    {
      "id": "ph-007",
      "title": "Timeline",
      "description": "A dated list of changes to TaskTrack, the product doc, and the rules.",
      "status": "review",
      "labels": [
        "now",
        "feature"
      ],
      "feature": "timeline",
      "createdAt": "2026-09-12T15:10:00.000Z",
      "updatedAt": "2026-09-12T15:10:00.000Z",
      "source": "agent"
    }
  ],
  "milestones": [
    {
      "id": "now",
      "title": "Agent-first TaskTrack",
      "horizon": "now",
      "status": "active",
      "summary": "Install once. Agents keep the product doc, TaskTrack, and timeline current. .product-helper stays local."
    },
    {
      "id": "next",
      "title": "Confirm the shipped slice",
      "horizon": "next",
      "status": "planned",
      "summary": "Human accepts Check cards for 1.1.0."
    },
    {
      "id": "later",
      "title": "Grow later",
      "horizon": "later",
      "status": "later",
      "summary": "Cursor marketplace and other optional distribution."
    }
  ],
  "changes": [
    {
      "id": "chg-bootstrap",
      "at": "2026-09-12T13:51:47.786Z",
      "kind": "added",
      "section": "workspace",
      "from": "",
      "to": ".product-helper/",
      "summary": "Bootstrapped Product-Helper workspace from repository inspection."
    },
    {
      "id": "chg-problem",
      "at": "2026-09-12T14:35:00.000Z",
      "kind": "replaced",
      "section": "problem",
      "from": "A shippable product-and-project system for coding agents. Install it into any repo (or globally) so agents can:",
      "to": "Teams and coding agents lose the plan: the PRD goes stale, the board lives elsewhere, and each agent forgets the rules.",
      "summary": "Replaced the truncated README intro with the real product problem."
    },
    {
      "id": "chg-agent-first",
      "at": "2026-09-12T14:35:00.000Z",
      "kind": "replaced",
      "section": "usage",
      "from": "CLI sync and status as the daily path",
      "to": "Agent updates the PRD and board; CLI is fallback",
      "summary": "Replaced CLI-first docs with an agent-first loop."
    },
    {
      "id": "chg-npm",
      "at": "2026-09-12T14:35:00.000Z",
      "kind": "added",
      "section": "distribution",
      "from": "",
      "to": "product-helper@1.0.0 on npm",
      "summary": "Published product-helper@1.0.0 to the npm registry."
    },
    {
      "id": "chg-npm-101",
      "at": "2026-09-12T14:40:00.000Z",
      "kind": "added",
      "section": "distribution",
      "from": "product-helper@1.0.0",
      "to": "product-helper@1.0.1",
      "summary": "Published product-helper@1.0.1 so npm matches the agent-first docs."
    },
    {
      "id": "chg-readme-npx",
      "at": "2026-09-12T14:50:00.000Z",
      "kind": "replaced",
      "section": "readme",
      "from": "Concept-first README with install buried below",
      "to": "README opens with npx product-helper init",
      "summary": "Replaced the README lead so one npx command is the product."
    },
    {
      "id": "chg-npm-102",
      "at": "2026-09-12T14:52:00.000Z",
      "kind": "added",
      "section": "distribution",
      "from": "product-helper@1.0.1",
      "to": "product-helper@1.0.2",
      "summary": "Published product-helper@1.0.2 so npm leads with npx product-helper init."
    },
    {
      "id": "chg-tasktrack",
      "at": "2026-09-12T15:10:00.000Z",
      "kind": "replaced",
      "section": "tasktrack",
      "from": "kanban board",
      "to": "TaskTrack",
      "summary": "Replaced the kanban name with TaskTrack, added a timeline, and gitignored the generated workspace in consumer repos."
    }
  ],
  "timeline": [
    {
      "id": "tl-bootstrap",
      "at": "2026-09-12T13:51:47.786Z",
      "area": "tasktrack",
      "action": "added",
      "title": "TaskTrack started",
      "detail": "Created the local workspace."
    },
    {
      "id": "tl-agent-first",
      "at": "2026-09-12T14:35:00.000Z",
      "area": "prd",
      "action": "replaced",
      "title": "Docs say the agent does the work",
      "detail": "Humans do not run sync after every change."
    },
    {
      "id": "tl-npx",
      "at": "2026-09-12T14:50:00.000Z",
      "area": "prd",
      "action": "replaced",
      "title": "README leads with one command",
      "detail": "npx product-helper init is the product."
    },
    {
      "id": "tl-tasktrack",
      "at": "2026-09-12T15:10:00.000Z",
      "area": "tasktrack",
      "action": "replaced",
      "title": "Plan is now TaskTrack",
      "detail": "Feature cards only. Phone-friendly. Timeline added. Consumer workspace is gitignored."
    }
  ],
  "decisions": [
    {
      "id": "dec-agent-first",
      "title": "Agent owns the daily loop",
      "body": "Accepted 2026-09-12. After `init`, Cursor / Claude / Codex / ChatGPT update the PRD and board themselves. CLI `sync` and `status` stay as optional fallbacks. Humans do not run them after every change.",
      "at": "2026-09-12T14:35:00.000Z"
    }
  ],
  "docs": {
    "product": "# Product-Helper\n\n> One command installs living PRD, TaskTrack, and guardrail skills for Cursor, Claude, Codex, and ChatGPT.\n\n**Status:** living PRD · **Generated:** 2026-09-12T15:10:00.000Z · **Product version:** 1.1.0\n\n<!-- USER-VISION:START -->\n## Vision\n\nProduct-Helper makes the plan obvious: a living product doc, TaskTrack the human PM owns, and guardrails every coding agent must honor. One command installs the skills. The generated workspace stays local.\n<!-- USER-VISION:END -->\n\n## Users\n\n- Software teams and coding agents working in a repository\n- Human product managers who own priorities and accept work\n\n## Problem\n\nTeams and coding agents lose the plan: the product doc goes stale, the work list lives elsewhere, and each agent forgets the rules. Product-Helper keeps one living product doc, TaskTrack the human owns, and rules every agent must re-read.\n\n## Core features\n\n- **Living PRD** — PRODUCT.md with users, problem, features, and change marks. Agents update it after major work. _(TaskTrack: review)_\n- **TaskTrack** — A simple, phone-friendly plan of features. Not for small bug fixes. _(TaskTrack: review)_\n- **Guardrails** — Built-in safety rules plus a Custom section agents re-read before acting. _(TaskTrack: review)_\n- **Multi-agent skills** — Same workflow as Cursor, Claude Code, and ChatGPT/Codex skills. _(TaskTrack: review)_\n- **CLI** — init installs the workspace and gitignores it. serve opens TaskTrack. _(TaskTrack: review)_\n- **Agent-first usage story** — One npx command copies skills. Agents then update the product doc, TaskTrack, and timeline. _(TaskTrack: review)_\n- **Timeline** — A dated list of changes to TaskTrack, the product doc, and the rules. _(TaskTrack: review)_\n\n## Deliverables\n\n- Open work: **7** cards\n- Completed (confirmed): **0** cards\n- Human PM owns acceptance. Agents must not invent completed work.\n\n## Current status\n\n- **Ideas:** 0\n- **Next:** 0\n- **Doing:** 0\n- **Check:** 7\n- **Done:** 0\n\n## Now / next / later\n\n- **now — Agent-first TaskTrack:** Install once. Agents keep the product doc, TaskTrack, and timeline current. .product-helper stays local.\n- **next — Confirm the shipped slice:** Human accepts Check cards for 1.1.0.\n- **later — Grow later:** Cursor marketplace and other optional distribution.\n\n## Change tracking\n\nMarks show on GitHub and in TaskTrack:\n\n- <ins class=\"ph-added\">added</ins>\n- <del class=\"ph-removed\">removed</del>\n- <mark class=\"ph-replaced\">replaced</mark>\n\n- 2026-09-12 · <mark class=\"ph-replaced\">Replaced the kanban name with TaskTrack, added a timeline, and gitignored the generated workspace in consumer repos.</mark>\n- 2026-09-12 · <ins class=\"ph-added\">Published product-helper@1.0.2 so npm leads with npx product-helper init.</ins>\n- 2026-09-12 · <mark class=\"ph-replaced\">Replaced the README lead so one npx command is the product.</mark>\n- 2026-09-12 · <ins class=\"ph-added\">Published product-helper@1.0.1 so npm matches the agent-first docs.</ins>\n- 2026-09-12 · <ins class=\"ph-added\">Published product-helper@1.0.0 to the npm registry.</ins>\n- 2026-09-12 · <mark class=\"ph-replaced\">Replaced CLI-first docs with an agent-first loop.</mark>\n- 2026-09-12 · <mark class=\"ph-replaced\">Replaced the truncated README intro with the real product problem.</mark>\n- 2026-09-12 · <ins class=\"ph-added\">Bootstrapped Product-Helper workspace from repository inspection.</ins>\n\n---\n\n_Do not delete the `USER-VISION` markers. Agents update the rest of this file after major work._\n",
    "guardrails": "# Guardrails\n\nAgents must always re-read this file, including **Custom guardrails**, before acting. Honor built-in and custom rules together. Custom rules may tighten policy. They must not weaken a built-in safety rule.\n\nGenerated by Product-Helper. Edit only the Custom section unless you are updating the product itself.\n\n## Built-in guardrails\n\n### Secrets and credentials\n\n- Do not read, print, copy, or modify `.env`, `.env.*`, or files that look like secrets (`credentials.json`, `*.pem`, `*.p12`, `id_rsa`, `id_ed25519`, cloud key JSON).\n- Do not commit secrets, tokens, private keys, connection strings, or session cookies.\n- Do not write secrets into PRODUCT.md, TaskTrack, logs, screenshots, or chat.\n- If a secret appears in a diff, stop and tell the human. Do not repeat the value.\n\n### Git safety\n\n- Do not change git config.\n- Do not run destructive git (`push --force`, `reset --hard`, `checkout .` that discards work, `clean -fdx`) unless the user explicitly asked in this conversation.\n- Do not skip hooks (`--no-verify`) unless the user explicitly asked.\n- Do not amend commits you did not create in this session, and never amend after push unless the user explicitly asked.\n- Do not commit unless the user asked.\n\n### Source and data exfiltration\n\n- Do not upload private source, customer data, or internal docs to third-party services.\n- Do not paste private code into public gists, issues, or tickets unless the user asked.\n- Treat customer content, medical data, financial records, and auth tokens as restricted.\n\n### Production and paid systems\n\n- Do not call production APIs, paid LLM endpoints, SMS, email blast, or ad platforms without explicit permission.\n- Do not deploy, migrate, drop, or truncate production data without an explicit ask.\n- Prefer local or staging targets. Ask before irreversible schema or data changes.\n\n### Security posture\n\n- Do not weaken authentication, authorization, CSRF, CORS, CSP, or row-level security.\n- Do not disable TLS verification, widen CORS to `*`, or add `eval` / unsafe HTML sinks without a documented reason and PM approval.\n- Prefer least privilege. Do not grant admin by default.\n\n### Privacy and people\n\n- Do not scrape, store, or leak PII you do not need.\n- Do not generate sexual or romantic content involving minors.\n- Do not help with weapons, exploit development, unauthorized access, or fraud.\n- Do not give actionable self-harm methods. If someone is in crisis, encourage real help.\n\n### Quality of change\n\n- Prefer small, focused diffs over repo-wide rewrites.\n- Do not delete unrelated comments, formatting, or files.\n- Do not leave placeholder TODOs in shipped skills or user-facing docs you generate.\n- Match existing style. Do not add unused dependencies.\n- Ask before license or copyright changes. Respect third-party licenses.\n\n### Product-Helper workspace\n\n- Keep `.product-helper/product.json` truthful.\n- Never invent completed work. The human is the PM.\n- After a feature, update TaskTrack, PRODUCT.md, and TIMELINE.md. Feature cards only — not small bug fixes.\n- Do not overwrite Custom guardrails or the USER-VISION block.\n\n## Custom guardrails\n\nTeam-specific rules go between the markers. Agents always merge these with the defaults above.\n\n<!-- CUSTOM-GUARDRAILS:START -->\n\n_Add project-specific rules here. Examples: “never touch `infra/prod`”, “ask before changing billing”, “keep the public API backwards compatible”._\n\n<!-- CUSTOM-GUARDRAILS:END -->\n",
    "decisions": "# Decision log\n\nProduct-Helper records PM tradeoffs here. The human is the PM.\n\n<!-- USER-DECISIONS:START -->\n### Agent owns the daily loop\n\nAccepted 2026-09-12. After `init`, Cursor / Claude / Codex / ChatGPT update the PRD and TaskTrack themselves. CLI `sync` and `status` stay as optional fallbacks. Humans do not run them after every change.\n\n### Local workspace stays off git\n\nAccepted 2026-09-12. In consumer repos, `.product-helper/` is gitignored. Skills and agent pointers stay in git so the skill still loads. This Product-Helper repo keeps `.product-helper/` in git because it is the product’s own plan.\n<!-- USER-DECISIONS:END -->\n",
    "changelog": "# Changelog\n\nGenerated: 2026-09-12T15:10:00.000Z\n\n- 2026-09-12T15:10:00.000Z · **replaced** · tasktrack: Replaced the kanban name with TaskTrack, added a timeline, and gitignored the generated workspace in consumer repos.\n- 2026-09-12T14:52:00.000Z · **added** · distribution: Published product-helper@1.0.2 so npm leads with npx product-helper init.\n- 2026-09-12T14:50:00.000Z · **replaced** · readme: Replaced the README lead so one npx command is the product.\n- 2026-09-12T14:40:00.000Z · **added** · distribution: Published product-helper@1.0.1 so npm matches the agent-first docs.\n- 2026-09-12T14:35:00.000Z · **added** · distribution: Published product-helper@1.0.0 to the npm registry.\n- 2026-09-12T14:35:00.000Z · **replaced** · usage: Replaced CLI-first docs with an agent-first loop.\n- 2026-09-12T14:35:00.000Z · **replaced** · problem: Replaced the truncated README intro with the real product problem.\n- 2026-09-12T13:51:47.786Z · **added** · workspace: Bootstrapped Product-Helper workspace from repository inspection.\n",
    "timeline": "# Timeline\n\nWhat changed in TaskTrack, the product doc, and the rules.\n\nGenerated: 2026-09-12T15:10:00.000Z\n\n- **2026-09-12** · TaskTrack · Plan is now TaskTrack — Feature cards only. Phone-friendly. Timeline added. Consumer workspace is gitignored.\n- **2026-09-12** · Product doc · README leads with one command — npx product-helper init is the product.\n- **2026-09-12** · Product doc · Docs say the agent does the work — Humans do not run sync after every change.\n- **2026-09-12** · TaskTrack · TaskTrack started — Created the local workspace.\n"
  }
};
