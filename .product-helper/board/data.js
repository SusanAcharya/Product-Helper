window.__PH__ = {
  "generatedAt": "2026-09-12T13:51:47.786Z",
  "product": {
    "name": "Product-Helper",
    "slug": "product-helper",
    "tagline": "Living PRD, kanban PM board, and guardrails for coding agents. Install as an npm CLI, Cursor plugin, or copy-into-repo skills for Cursor, Claude Code, and ChatGPT/Codex.",
    "users": [
      "Software teams and coding agents working in a repository",
      "Human product managers who own priorities and accept work"
    ],
    "problem": "A shippable product-and-project system for coding agents. Install it into any repo (or globally) so agents can:",
    "vision": "## Vision\n\nProduct-Helper makes the plan obvious: a living PRD, a kanban board the human PM owns, and guardrails every coding agent must honor. Distribution is the product — npm CLI, Cursor plugin, and copy-into-repo skills for Cursor, Claude, and ChatGPT/Codex.",
    "version": "1.0.0"
  },
  "columns": [
    {
      "id": "backlog",
      "title": "Backlog"
    },
    {
      "id": "ready",
      "title": "Ready"
    },
    {
      "id": "in-progress",
      "title": "In Progress"
    },
    {
      "id": "review",
      "title": "Review"
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
      "description": "Documented in the project README as “Living PRD”.",
      "status": "in-progress",
      "labels": [
        "now",
        "docs"
      ],
      "feature": "living-prd",
      "createdAt": "2026-09-12T13:51:47.786Z",
      "updatedAt": "2026-09-12T13:51:47.786Z",
      "source": "bootstrap"
    },
    {
      "id": "ph-002",
      "title": "Kanban PM board",
      "description": "Documented in the project README as “Kanban PM board”.",
      "status": "in-progress",
      "labels": [
        "now",
        "board"
      ],
      "feature": "kanban-pm-board",
      "createdAt": "2026-09-12T13:51:47.786Z",
      "updatedAt": "2026-09-12T13:51:47.786Z",
      "source": "bootstrap"
    },
    {
      "id": "ph-003",
      "title": "Guardrails",
      "description": "Documented in the project README as “Guardrails”.",
      "status": "ready",
      "labels": [
        "now"
      ],
      "feature": "guardrails",
      "createdAt": "2026-09-12T13:51:47.786Z",
      "updatedAt": "2026-09-12T13:51:47.786Z",
      "source": "bootstrap"
    },
    {
      "id": "ph-004",
      "title": "Multi-agent skills",
      "description": "Documented in the project README as “Multi-agent skills”.",
      "status": "review",
      "labels": [
        "distribution"
      ],
      "feature": "multi-agent-skills",
      "createdAt": "2026-09-12T13:51:47.786Z",
      "updatedAt": "2026-09-12T13:51:47.786Z",
      "source": "bootstrap"
    },
    {
      "id": "ph-005",
      "title": "CLI sync",
      "description": "Documented in the project README as “CLI sync”.",
      "status": "ready",
      "labels": [
        "cli"
      ],
      "feature": "cli-sync",
      "createdAt": "2026-09-12T13:51:47.786Z",
      "updatedAt": "2026-09-12T13:51:47.786Z",
      "source": "bootstrap"
    }
  ],
  "milestones": [
    {
      "id": "now",
      "title": "Make the product understandable",
      "horizon": "now",
      "status": "active",
      "summary": "Document Product-Helper, seed the board, and confirm the first shippable slice."
    },
    {
      "id": "next",
      "title": "Close the highest-value gaps",
      "horizon": "next",
      "status": "planned",
      "summary": "Turn inferred features into confirmed deliverables and move Ready work through Review."
    },
    {
      "id": "later",
      "title": "Harden and scale the system",
      "horizon": "later",
      "status": "later",
      "summary": "Polish distribution, automation, and long-horizon product bets."
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
    }
  ],
  "decisions": [],
  "docs": {
    "product": "# Product-Helper\n\n> Living PRD, kanban PM board, and guardrails for coding agents. Install as an npm CLI, Cursor plugin, or copy-into-repo skills for Cursor, Claude Code, and ChatGPT/Codex.\n\n**Status:** living PRD · **Generated:** 2026-09-12T13:51:47.786Z · **Product version:** 1.0.0\n\n<!-- USER-VISION:START -->\n## Vision\n\nProduct-Helper makes the plan obvious: a living PRD, a kanban board the human PM owns, and guardrails every coding agent must honor. Distribution is the product — npm CLI, Cursor plugin, and copy-into-repo skills for Cursor, Claude, and ChatGPT/Codex.\n<!-- USER-VISION:END -->\n\n## Users\n\n- Software teams and coding agents working in a repository\n- Human product managers who own priorities and accept work\n\n## Problem\n\nA shippable product-and-project system for coding agents. Install it into any repo (or globally) so agents can:\n\n## Core features\n\n- **Living PRD** — Documented in the project README as “Living PRD”. _(board: in-progress)_\n- **Kanban PM board** — Documented in the project README as “Kanban PM board”. _(board: in-progress)_\n- **Guardrails** — Documented in the project README as “Guardrails”. _(board: ready)_\n- **Multi-agent skills** — Documented in the project README as “Multi-agent skills”. _(board: review)_\n- **CLI sync** — Documented in the project README as “CLI sync”. _(board: ready)_\n\n## Deliverables\n\n- Open work: **5** cards\n- Completed (confirmed): **0** cards\n- Human PM owns acceptance. Agents must not invent completed work.\n\n## Current status\n\n- **Backlog:** 0\n- **Ready:** 2\n- **In Progress:** 2\n- **Review:** 1\n- **Done:** 0\n\n## Now / next / later\n\n- **now — Make the product understandable:** Document Product-Helper, seed the board, and confirm the first shippable slice.\n- **next — Close the highest-value gaps:** Turn inferred features into confirmed deliverables and move Ready work through Review.\n- **later — Harden and scale the system:** Polish distribution, automation, and long-horizon product bets.\n\n## Change tracking\n\nMarks render on GitHub and in the Product-Helper board:\n\n- <ins class=\"ph-added\">added</ins>\n- <del class=\"ph-removed\">removed</del>\n- <mark class=\"ph-replaced\">replaced</mark>\n\n- 2026-09-12 · <ins class=\"ph-added\">Bootstrapped Product-Helper workspace from repository inspection.</ins>\n\n---\n\n_Do not delete the `USER-VISION` markers. Agents update the rest of this file after major work._\n",
    "guardrails": "# Guardrails\n\nAgents must always re-read this file, including **Custom guardrails**, before acting. Honor built-in and custom rules together. Custom rules may tighten policy. They must not weaken a built-in safety rule.\n\nGenerated by Product-Helper. Edit only the Custom section unless you are updating the product itself.\n\n## Built-in guardrails\n\n### Secrets and credentials\n\n- Do not read, print, copy, or modify `.env`, `.env.*`, or files that look like secrets (`credentials.json`, `*.pem`, `*.p12`, `id_rsa`, `id_ed25519`, cloud key JSON).\n- Do not commit secrets, tokens, private keys, connection strings, or session cookies.\n- Do not write secrets into PRODUCT.md, the board, logs, screenshots, or chat.\n- If a secret appears in a diff, stop and tell the human. Do not repeat the value.\n\n### Git safety\n\n- Do not change git config.\n- Do not run destructive git (`push --force`, `reset --hard`, `checkout .` that discards work, `clean -fdx`) unless the user explicitly asked in this conversation.\n- Do not skip hooks (`--no-verify`) unless the user explicitly asked.\n- Do not amend commits you did not create in this session, and never amend after push unless the user explicitly asked.\n- Do not commit unless the user asked.\n\n### Source and data exfiltration\n\n- Do not upload private source, customer data, or internal docs to third-party services.\n- Do not paste private code into public gists, issues, or tickets unless the user asked.\n- Treat customer content, medical data, financial records, and auth tokens as restricted.\n\n### Production and paid systems\n\n- Do not call production APIs, paid LLM endpoints, SMS, email blast, or ad platforms without explicit permission.\n- Do not deploy, migrate, drop, or truncate production data without an explicit ask.\n- Prefer local or staging targets. Ask before irreversible schema or data changes.\n\n### Security posture\n\n- Do not weaken authentication, authorization, CSRF, CORS, CSP, or row-level security.\n- Do not disable TLS verification, widen CORS to `*`, or add `eval` / unsafe HTML sinks without a documented reason and PM approval.\n- Prefer least privilege. Do not grant admin by default.\n\n### Privacy and people\n\n- Do not scrape, store, or leak PII you do not need.\n- Do not generate sexual or romantic content involving minors.\n- Do not help with weapons, exploit development, unauthorized access, or fraud.\n- Do not give actionable self-harm methods. If someone is in crisis, encourage real help.\n\n### Quality of change\n\n- Prefer small, focused diffs over repo-wide rewrites.\n- Do not delete unrelated comments, formatting, or files.\n- Do not leave placeholder TODOs in shipped skills or user-facing docs you generate.\n- Match existing style. Do not add unused dependencies.\n- Ask before license or copyright changes. Respect third-party licenses.\n\n### Product-Helper workspace\n\n- Keep `.product-helper/product.json` truthful.\n- Never invent completed work. The human is the PM.\n- After major work, update the board and PRODUCT.md with add/remove/replace marks.\n- Do not overwrite Custom guardrails or the USER-VISION block.\n\n## Custom guardrails\n\nTeam-specific rules go between the markers. Agents always merge these with the defaults above.\n\n<!-- CUSTOM-GUARDRAILS:START -->\n\n_Add project-specific rules here. Examples: “never touch `infra/prod`”, “ask before changing billing”, “keep the public API backwards compatible”._\n\n<!-- CUSTOM-GUARDRAILS:END -->\n",
    "decisions": "# Decision log\n\nProduct-Helper records PM tradeoffs here. The human is the PM.\n\n<!-- USER-DECISIONS:START -->\n_No decisions recorded yet. Add accepted tradeoffs below._\n<!-- USER-DECISIONS:END -->\n",
    "changelog": "# Changelog\n\nGenerated: 2026-09-12T13:51:47.786Z\n\n- 2026-09-12T13:51:47.786Z · **added** · workspace: Bootstrapped Product-Helper workspace from repository inspection.\n"
  }
};
