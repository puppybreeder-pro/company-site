# PuppyBreeder.PRO Website

Marketing site and related tooling for **PuppyBreeder.PRO** — a website platform purpose-built for licensed dog breeders.

## Architecture

```
puppybreederpro-website2/
├── frontend-astro/        # Current marketing site (Astro + React + Tailwind)
├── backend/               # FastAPI service (MongoDB + SendGrid contact/lead APIs)
├── docs/                  # PRD, lead-magnet Markdown, PDF build instructions, selling docs
├── frontend-emergent/     # Deprecated — kept for reference only; do not extend
└── WEB3FORMS.md           # How client-side forms reach your inbox (used by frontend-astro)
```

## Marketing site (`frontend-astro`)

### Stack

- **Astro 5** with **React 19** islands (`@astrojs/react`)
- **Tailwind CSS 4** (tokens in `src/styles/global.css`)
- **Radix UI** primitives, **Shadcn-style** patterns (`src/ui/`)
- **Sonner** toasts, **Lucide** / **astro-icon** for icons
- **Sitemap** integration (`@astrojs/sitemap`)

### Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — feature-focused, original marketing copy |
| `/offer` | Offer page — outcome-focused, all selling improvements applied (see docs below) |

### Patterns

| Pattern | Details |
|---|---|
| **Forms** | `useFormSubmission` posts to **Web3Forms** (`src/lib/web3forms.js`). Configure `PUBLIC_WEB3FORMS_ACCESS_KEY` (see `WEB3FORMS.md` and `frontend-astro/.env.example`). |
| **Content** | Section copy and nav data live in `src/data/*.js`; Astro/React components focus on layout and behavior. |
| **Layout** | Global shell, fonts, and meta live in `src/layouts/Layout.astro`. Accepts `title`, `description`, `ogImage`, `includeFaqSchema`, and `includeOfferSchema` props for per-page SEO. |
| **Pages** | Each page (`/`, `/offer`) passes its own props to `Layout.astro` for custom titles, descriptions, and JSON-LD schemas. |

### Key directories

```
frontend-astro/src/
├── components/             # Homepage components (Hero, CTA, Pricing, etc.)
├── components/offer/      # Offer page components (OfferHero, OfferPricing, etc.)
├── data/                   # Homepage content data
├── data/offer*.js          # Offer page content data (outcome-reframed copy)
├── hooks/                  # useFormSubmission, useScrollDetection
├── layouts/Layout.astro    # Shared page shell (SEO, fonts, scroll-reveal)
├── pages/                  # index.astro (homepage), offer.astro (offer page)
├── styles/global.css       # Tailwind v4 theme tokens, utilities, animations
└── ui/                     # Shadcn-style primitives (button, card, input, etc.)
```

### Scripts

```bash
cd frontend-astro
npm install
npm run dev              # local dev
npm run build            # production build
npm run preview          # preview production build
npm run build:leadmagnet-pdf   # Markdown → PDF (see below)
```

## Backend (`backend`)

FastAPI app with MongoDB and optional SendGrid email:

- `POST /api/contact` — full contact form payload
- `POST /api/lead` — lightweight lead capture
- `POST /api/status`, `GET /api/status` — example status checks stored in MongoDB

The **live Astro site** does not call this backend for the main marketing forms (those use Web3Forms). The backend is still useful for API-style flows, experiments, or future integrations.

Emails use SendGrid. If `SENDGRID_API_KEY` is missing or a placeholder, contact routes can still succeed in development while logging payloads (see `backend/contact.py`).

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `MONGO_URL` | Yes | MongoDB connection string |
| `DB_NAME` | Yes | MongoDB database name |
| `SENDGRID_API_KEY` | No | SendGrid API key (placeholder mode if absent) |
| `SENDER_EMAIL` | No | From address (default: `hello@puppybreeder.pro`) |
| `CONTACT_RECIPIENT_EMAIL` | No | To address (default: `hello@puppybreeder.pro`) |
| `CORS_ORIGINS` | No | Comma-separated origins (default: `*`) |

### Running

```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

## Design system

Colours, radii, and gradients are defined as CSS custom properties in **`frontend-astro/src/styles/global.css`** (Tailwind `@theme` and `@layer base`).

- **Primary** — purple brand (`hsl(253 75% 56%)`) for CTAs and focus
- **Accent** — warm coral (`hsl(0 96% 74%)`) for highlights
- **Success**, **destructive**, **pastel** tokens — used in cards, lead magnet, and UI states

Typography: **Instrument Serif** (headings) and **Instrument Sans** (body), loaded in `Layout.astro` via Google Fonts.

All interactive elements (`button`, `a`, `input`, `textarea`, `select`) have `cursor: pointer` set globally.

## Offer page strategy (`/offer`)

The `/offer` page implements the selling improvements documented in `docs/SITE_IMPROVEMENTS_FOR_SELLING.md`. Key differences from the homepage:

| Aspect | Homepage (`/`) | Offer page (`/offer`) |
|---|---|---|
| **Hero** | "Deserves a professional website" + email form + Calendly link | Pain-first: "Spending Your Weekend Updating Your Website?" + single Calendly CTA |
| **Features** | What the product *does* | What the breeder *gets* (outcomes) |
| **Problem/Solution** | ❌/✅ confrontational framing | Empathy: "You've probably tried…" / "What if it just worked?" |
| **Pricing** | $79/mo + à la carte add-ons | $99/mo with everything bundled, cost-of-inaction line |
| **CTAs** | 6+ different labels | One: "Book a Free 30-Minute Call" |
| **FAQ** | Standard answers | Sharper answers including "who this isn't for" |
| **Header** | Full nav with section links | Minimal: logo + single CTA button |

The offer page shares `Layout.astro`, UI primitives (`src/ui/`), `DashboardCarousel`, `Testimonials`, and `Footer` with the homepage. All other components and data files are separate (`src/components/offer/`, `src/data/offer*.js`).

## Lead magnet PDF (document generator)

Lead magnet copy lives as Markdown under `docs/lead-magnets/`. From **`frontend-astro`**, generate a branded PDF (and HTML preview) with Playwright:

```bash
cd frontend-astro
npm install
npx playwright install chromium   # once per machine
npm run build:leadmagnet-pdf      # default file, or pass a path: -- ../docs/lead-magnets/your-file.md
```

Outputs go to `docs/lead-magnets/dist/` (same base name as the `.md` file). Full setup, styling tips, and troubleshooting: [`docs/lead-magnets/README.md`](docs/lead-magnets/README.md).

## Deprecated

**`frontend-emergent/`** — legacy frontend; **do not use** for new development. All active work belongs in **`frontend-astro/`**.
