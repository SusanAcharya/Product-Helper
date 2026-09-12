window.__PH__ = {
  "generatedAt": "2026-09-12T13:51:47.822Z",
  "product": {
    "name": "Lumen Desk",
    "slug": "lumen-desk",
    "tagline": "A calm workspace for writers who want research, drafts, and publishing in one place.",
    "users": [
      "Independent writers shipping essays and newsletters",
      "Small editorial teams that need a single review lane"
    ],
    "problem": "A calm workspace for writers who want research, drafts, and publishing in one place.",
    "vision": "## Vision\n\nLumen Desk is a calm writing studio: research stays next to the draft, editors leave decisions instead of comment spaghetti, and nothing publishes without a shared checklist.",
    "version": "0.4.0"
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
      "title": "Research inbox",
      "description": "Documented in the project README as “Research inbox”.",
      "status": "in-progress",
      "labels": [
        "now",
        "feature"
      ],
      "feature": "research-inbox",
      "createdAt": "2026-09-12T13:51:47.822Z",
      "updatedAt": "2026-09-12T13:51:47.822Z",
      "source": "bootstrap"
    },
    {
      "id": "ph-002",
      "title": "Focus editor",
      "description": "Documented in the project README as “Focus editor”.",
      "status": "ready",
      "labels": [
        "now",
        "feature"
      ],
      "feature": "focus-editor",
      "createdAt": "2026-09-12T13:51:47.822Z",
      "updatedAt": "2026-09-12T13:51:47.822Z",
      "source": "bootstrap"
    },
    {
      "id": "ph-003",
      "title": "Publish checklist",
      "description": "Documented in the project README as “Publish checklist”.",
      "status": "backlog",
      "labels": [
        "next"
      ],
      "feature": "publish-checklist",
      "createdAt": "2026-09-12T13:51:47.822Z",
      "updatedAt": "2026-09-12T13:51:47.822Z",
      "source": "bootstrap"
    },
    {
      "id": "ph-004",
      "title": "Review lane",
      "description": "Documented in the project README as “Review lane”.",
      "status": "review",
      "labels": [
        "next",
        "pm"
      ],
      "feature": "review-lane",
      "createdAt": "2026-09-12T13:51:47.822Z",
      "updatedAt": "2026-09-12T13:51:47.822Z",
      "source": "bootstrap"
    },
    {
      "id": "ph-demo-done",
      "title": "Project home screen",
      "description": "Accepted by the human PM: a quiet home that lists drafts without a dashboard wall of metrics.",
      "status": "done",
      "labels": [
        "feature",
        "accepted"
      ],
      "feature": "home-screen",
      "createdAt": "2026-09-12T13:51:47.822Z",
      "updatedAt": "2026-09-12T13:51:47.822Z",
      "source": "pm"
    }
  ],
  "milestones": [
    {
      "id": "now",
      "title": "Make the product understandable",
      "horizon": "now",
      "status": "active",
      "summary": "Document Lumen Desk, seed the board, and confirm the first shippable slice."
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
      "at": "2026-09-12T13:51:47.822Z",
      "kind": "added",
      "section": "workspace",
      "from": "",
      "to": ".product-helper/",
      "summary": "Bootstrapped Product-Helper workspace from repository inspection."
    },
    {
      "id": "chg-mtyg1uh5-qafi",
      "at": "2026-09-12T13:51:47.849Z",
      "kind": "replaced",
      "section": "core-features",
      "from": "Metrics dashboard",
      "to": "Project home screen",
      "summary": "Replaced the metrics dashboard with a quiet project home."
    },
    {
      "id": "chg-mtyg1uh6-pbk4",
      "at": "2026-09-12T13:51:47.850Z",
      "kind": "removed",
      "section": "core-features",
      "from": "Social clip exporter",
      "to": "",
      "summary": "Removed social clip exporter from v1 scope."
    }
  ],
  "decisions": [
    {
      "title": "No growth dashboard in v1",
      "body": "The PM chose a quiet home screen over vanity metrics so writers stay in the draft."
    }
  ],
  "docs": {
    "product": "# Lumen Desk\n\n> A calm workspace for writers who want research, drafts, and publishing in one place.\n\n**Status:** living PRD · **Generated:** 2026-09-12T13:51:47.822Z · **Product version:** 0.4.0\n\n<!-- USER-VISION:START -->\n## Vision\n\nLumen Desk is a calm writing studio: research stays next to the draft, editors leave decisions instead of comment spaghetti, and nothing publishes without a shared checklist.\n<!-- USER-VISION:END -->\n\n## Users\n\n- Independent writers shipping essays and newsletters\n- Small editorial teams that need a single review lane\n\n## Problem\n\nA calm workspace for writers who want research, drafts, and publishing in one place.\n\n## Core features\n\n- **Research inbox** — Documented in the project README as “Research inbox”. _(board: in-progress)_\n- **Focus editor** — Documented in the project README as “Focus editor”. _(board: ready)_\n- **Publish checklist** — Documented in the project README as “Publish checklist”. _(board: backlog)_\n- **Review lane** — Documented in the project README as “Review lane”. _(board: review)_\n- **Project home screen** — Accepted by the human PM: a quiet home that lists drafts without a dashboard wall of metrics. _(board: done)_\n\n## Deliverables\n\n- Open work: **4** cards\n- Completed (confirmed): **1** cards\n- Human PM owns acceptance. Agents must not invent completed work.\n\n## Current status\n\n- **Backlog:** 1\n- **Ready:** 1\n- **In Progress:** 1\n- **Review:** 1\n- **Done:** 1\n\n## Now / next / later\n\n- **now — Make the product understandable:** Document Lumen Desk, seed the board, and confirm the first shippable slice.\n- **next — Close the highest-value gaps:** Turn inferred features into confirmed deliverables and move Ready work through Review.\n- **later — Harden and scale the system:** Polish distribution, automation, and long-horizon product bets.\n\n## Change tracking\n\nMarks render on GitHub and in the Product-Helper board:\n\n- <ins class=\"ph-added\">added</ins>\n- <del class=\"ph-removed\">removed</del>\n- <mark class=\"ph-replaced\">replaced</mark>\n\n- 2026-09-12 · <del class=\"ph-removed\">Removed social clip exporter from v1 scope.</del>\n- 2026-09-12 · <mark class=\"ph-replaced\">Replaced the metrics dashboard with a quiet project home.</mark>\n- 2026-09-12 · <ins class=\"ph-added\">Bootstrapped Product-Helper workspace from repository inspection.</ins>\n\n---\n\n_Do not delete the `USER-VISION` markers. Agents update the rest of this file after major work._\n",
    "guardrails": "# Guardrails\n\nAgents must always re-read this file, including **Custom guardrails**, before acting. Honor built-in and custom rules together. Custom rules may tighten policy. They must not weaken a built-in safety rule.\n\nGenerated by Product-Helper. Edit only the Custom section unless you are updating the product itself.\n\n## Built-in guardrails\n\n### Secrets and credentials\n\n- Do not read, print, copy, or modify `.env`, `.env.*`, or files that look like secrets (`credentials.json`, `*.pem`, `*.p12`, `id_rsa`, `id_ed25519`, cloud key JSON).\n- Do not commit secrets, tokens, private keys, connection strings, or session cookies.\n- Do not write secrets into PRODUCT.md, the board, logs, screenshots, or chat.\n- If a secret appears in a diff, stop and tell the human. Do not repeat the value.\n\n### Git safety\n\n- Do not change git config.\n- Do not run destructive git (`push --force`, `reset --hard`, `checkout .` that discards work, `clean -fdx`) unless the user explicitly asked in this conversation.\n- Do not skip hooks (`--no-verify`) unless the user explicitly asked.\n- Do not amend commits you did not create in this session, and never amend after push unless the user explicitly asked.\n- Do not commit unless the user asked.\n\n### Source and data exfiltration\n\n- Do not upload private source, customer data, or internal docs to third-party services.\n- Do not paste private code into public gists, issues, or tickets unless the user asked.\n- Treat customer content, medical data, financial records, and auth tokens as restricted.\n\n### Production and paid systems\n\n- Do not call production APIs, paid LLM endpoints, SMS, email blast, or ad platforms without explicit permission.\n- Do not deploy, migrate, drop, or truncate production data without an explicit ask.\n- Prefer local or staging targets. Ask before irreversible schema or data changes.\n\n### Security posture\n\n- Do not weaken authentication, authorization, CSRF, CORS, CSP, or row-level security.\n- Do not disable TLS verification, widen CORS to `*`, or add `eval` / unsafe HTML sinks without a documented reason and PM approval.\n- Prefer least privilege. Do not grant admin by default.\n\n### Privacy and people\n\n- Do not scrape, store, or leak PII you do not need.\n- Do not generate sexual or romantic content involving minors.\n- Do not help with weapons, exploit development, unauthorized access, or fraud.\n- Do not give actionable self-harm methods. If someone is in crisis, encourage real help.\n\n### Quality of change\n\n- Prefer small, focused diffs over repo-wide rewrites.\n- Do not delete unrelated comments, formatting, or files.\n- Do not leave placeholder TODOs in shipped skills or user-facing docs you generate.\n- Match existing style. Do not add unused dependencies.\n- Ask before license or copyright changes. Respect third-party licenses.\n\n### Product-Helper workspace\n\n- Keep `.product-helper/product.json` truthful.\n- Never invent completed work. The human is the PM.\n- After major work, update the board and PRODUCT.md with add/remove/replace marks.\n- Do not overwrite Custom guardrails or the USER-VISION block.\n\n## Custom guardrails\n\nTeam-specific rules go between the markers. Agents always merge these with the defaults above.\n\n<!-- CUSTOM-GUARDRAILS:START -->\n\n_Add project-specific rules here. Examples: “never touch `infra/prod`”, “ask before changing billing”, “keep the public API backwards compatible”._\n\n<!-- CUSTOM-GUARDRAILS:END -->\n",
    "decisions": "# Decision log\n\nProduct-Helper records PM tradeoffs here. The human is the PM.\n\n<!-- USER-DECISIONS:START -->\n### No growth dashboard in v1\n\nThe PM chose a quiet home screen over vanity metrics so writers stay in the draft.\n\n<!-- USER-DECISIONS:END -->\n",
    "changelog": "# Changelog\n\nGenerated: 2026-09-12T13:51:47.822Z\n\n- 2026-09-12T13:51:47.850Z · **removed** · core-features: Removed social clip exporter from v1 scope.\n- 2026-09-12T13:51:47.849Z · **replaced** · core-features: Replaced the metrics dashboard with a quiet project home.\n- 2026-09-12T13:51:47.822Z · **added** · workspace: Bootstrapped Product-Helper workspace from repository inspection.\n"
  }
};
