# AEO content: evidence page & FAQ

Summary of work added to support **answer-engine-oriented** discovery (clear Q&A, citations, structured data) while keeping the **main landing page** conversion-focused.

## Goals

- Publish **one static, linkable page** with research-backed, honest copy (peer-reviewed adoption/listing studies framed as adjacent evidence; breeder case studies labeled as vendor-reported).
- Add **query-shaped FAQ** entries on the homepage so visible answers and `FAQPage` JSON-LD stay aligned.
- Improve **internal navigation** (footer) and **machine-readable context** (Article + BreadcrumbList on the evidence page only—no duplicate FAQ schema there).

## What shipped

### 1. `/breeder-website-evidence`

- **Route:** `https://www.puppybreeder.pro/breeder-website-evidence` (Astro static output: `breeder-website-evidence/index.html`).
- **Page file:** `frontend-astro/src/pages/breeder-website-evidence.astro`
  - Custom `title`, `description`, `ogImage`.
  - `Layout` with `includeFaqSchema={false}` and `includeOfferSchema={false}` so this URL does not duplicate homepage product FAQ / offer schema.
  - **JSON-LD:** `Article` (headline, dates, author/publisher, `mainEntityOfPage`, `citation` URLs) + `BreadcrumbList`.
- **UI blocks:**
  - `frontend-astro/src/components/evidence/EvidenceHeader.astro` — sticky header, home logo, optional Ethics link (sm+), “Back to Home”.
  - `frontend-astro/src/components/evidence/EvidenceHero.astro` — H1, intro, contact email, **Last updated** line.
  - `frontend-astro/src/components/evidence/BreederWebsiteEvidenceContent.astro` — TL;DR, peer-reviewed section (with caveats), agency case studies, practical takeaways, how PuppyBreeder.PRO maps, numbered sources with outbound links.

Tone: **research-backed sales assist**—cited and careful, but each section ties back to breeder outcomes and product capabilities.

### 2. Footer

- **File:** `frontend-astro/src/data/footerData.js`
- **Support link:** “Website Research” → `/breeder-website-evidence`.

### 3. Homepage FAQ + schema

- **Data:** `frontend-astro/src/data/offerFaqData.js`
  - Five AEO-oriented questions, placed **immediately above** “Do you offer support?”
  - Optional **`moreLink`** `{ href, label }` on entries that should deep-link (e.g. research brief, ethics).
- **UI:** `frontend-astro/src/components/offer/OfferFAQ.jsx` — renders `faq.answer` as a paragraph; if `moreLink` exists, renders a second line with a styled `<a>`.
- **Structured data:** `frontend-astro/src/pages/index.astro` — `FAQPage` `Answer.text` appends `More: https://www.puppybreeder.pro{href}` when `moreLink` is set, so JSON-LD reflects the same destinations as the UI.

### 4. Sitemap

- `@astrojs/sitemap` picks up the new page automatically; no manual sitemap edit required.

## Source material (on-page)

The evidence page cites only:

- **Lampe & Witte** — Petfinder photo traits vs. time to adoption (PubMed).
- **Nakamura et al.** — PetRescue photo attributes vs. length of stay (DOI, open access).
- **Noble Digital** — Catskill Mountain Labradors case study (agency).
- **WD Strategies** — Golden Puppies project page (agency).

Copy avoids implying peer-reviewed adoption studies **prove** commercial breeder revenue; it states scope and uses case studies as **directional** vendor reports.

## Maintenance

- When you materially change the evidence page, update:
  - **“Last updated”** in `EvidenceHero.astro`
  - **`dateModified`** (and optionally `datePublished`) in `breeder-website-evidence.astro` Article JSON-LD
- If FAQ answers change, edit **`offerFaqData.js`** only; homepage FAQ UI and FAQ schema both derive from it.
- Re-run **`npm run build`** in `frontend-astro` before release; optionally validate JSON-LD with Google’s Rich Results Test.

## Related docs / context

- Original intent aligned with an **AEO audit** recommendation: fact-dense, query-aligned content + structured data, without turning the homepage into a long article.
