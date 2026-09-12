# Change marks

Use all three so GitHub and the HTML board agree.

## Added (green)

```markdown
++New onboarding checklist++
<ins class="ph-added">New onboarding checklist</ins>
```

## Removed (red)

```markdown
~~Legacy CSV export~~
<del class="ph-removed">Legacy CSV export</del>
```

## Replaced (yellow)

```markdown
==Billing v2==
<mark class="ph-replaced">Billing v2</mark>
```

When you know the previous wording, show both:

```markdown
<ins class="ph-added">Billing v2</ins> <del class="ph-removed">Stripe invoices v1</del>
```

## Changes section

Every PRD update appends a dated line under **Change tracking** and a matching `product.json` `changes[]` item:

```json
{
  "kind": "replaced",
  "section": "core-features",
  "from": "Stripe invoices v1",
  "to": "Billing v2",
  "summary": "Replaced invoice exporter with Billing v2."
}
```

Do not mark cosmetic copyedits. Mark scope adds, removals, and replacements.
