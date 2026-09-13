# SEO

Write this into `PRODUCT.md` under **SEO**. The first look is a thorough check, not a race.

People often forget the basics. Remind the agent, and add them if the product is a website (or has a live URL):

- A unique **page title**
- A **meta description** (about 150–160 characters, written for a person)
- A **browser favicon** (`favicon.ico` or `favicon.svg`)
- A **phone home-screen icon** (`apple-touch-icon.png` at 180×180, plus Android 192/512 if they have an app-like site)

## First look (do not end early)

Session start and any live-URL inspect are for a **balanced, thorough analysis**. Finishing quickly is a failure.

1. Open the live URL in a real browser.
2. Time the first request and how long you wait.
3. If the viewport is white, blank, or a loading spinner (Streamlit, other slow hosts), **keep waiting**. Poll until real content is visible, or until you have waited long enough to say the site is stuck (often 20–45 seconds, longer if it is still loading).
4. Do not write the report from a white screenshot.
5. Record load and wait times in the SEO section.

Example line:

`Load: useful content at ~18s. Waited 22s after a white Streamlit boot screen.`

## Checklist

Fill every row. Write `missing`, `ok`, or a short note.

| Item | What good looks like |
| --- | --- |
| Live URL | The public address you actually opened |
| Title | Unique, readable, includes the product name |
| Meta description | Present, unique, ~150–160 characters, no keyword stuffing |
| Favicon (browser) | Linked `rel="icon"` that loads |
| Favicon (phone) | `apple-touch-icon` 180×180 (PNG). SVG-only is not enough for iOS |
| Language | `html lang` set |
| One H1 | The page says what it is |
| Canonical | Set if the site is public and indexable |
| Robots | Intentional (`index` vs `noindex`) |
| Open Graph | `og:title`, `og:description`, `og:image` if the site is shared |
| Headings / copy | Readable; not only a blank app shell |
| Load / wait | Seconds to first useful paint, plus how long you waited |

## Also check (when it applies)

- `robots.txt` and a sitemap on a public marketing site
- Descriptive URLs
- Image `alt` on meaningful images
- HTTPS
- No leaked secrets in the page or in meta tags

## What not to do

- Do not invent a meta description in the report if the page does not have one. Mark it **missing** and remind the agent to add it.
- Do not skip favicons.
- Do not stop because the first viewport is white.
