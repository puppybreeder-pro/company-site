# PuppyBreeder.PRO Website

A React landing page and marketing site for PuppyBreeder.PRO — a website platform purpose-built for licensed dog breeders.

## Architecture

```
puppybreederpro-website2/
├── backend/               # FastAPI (Python) service
│   ├── server.py           # Main app + MongoDB status-check endpoints
│   ├── contact.py          # /api/contact and /api/lead endpoints (SendGrid)
│   └── requirements.txt
├── frontend/              # React (CRA + Craco) client
│   ├── src/
│   │   ├── components/    # Page sections (Header, Hero, CTA, …)
│   │   │   └── ui/        # Shadcn/ui primitives (button, card, accordion…)
│   │   ├── constants/     # Brand strings, URLs, thresholds
│   │   ├── data/          # Static content data (nav, features, pricing, FAQ…)
│   │   ├── hooks/         # useScrollDetection, useFormSubmission
│   │   ├── lib/           # cn() utility
│   │   └── utils/         # scrollToSection, scrollToTop
│   ├── tailwind.config.js
│   └── craco.config.js
└── tests/
```

## Frontend

### Stack

- **React 19** with Create React App (customised via Craco)
- **Tailwind CSS 3** for styling (design tokens in `index.css`)
- **Shadcn/ui** component library (Radix primitives)
- **Axios** for API calls, **Sonner** for toasts
- **Lucide React** for icons

### Key Patterns

| Pattern | Details |
|---|---|
| **Scroll utility** | All smooth-scrolling uses `scrollToSection()` / `scrollToTop()` from `utils/scrollTo.js` — no inline reimplementations. |
| **Form submissions** | Centralised in `useFormSubmission` hook (POSTs to backend, shows Sonner toast on success/error). |
| **Constants** | Brand name, Calendly URL, emails etc. live in `constants/index.js` — never hard-coded in components. |
| **Data separation** | Static content (features, pricing, FAQ, testimonials…) lives in `data/*.js` — components are pure presentation. |
| **Reveal animation** | Non-hero sections are wrapped in `<Reveal>` for intersection-observer fade-in; respects `prefers-reduced-motion`. |

### Available Scripts

```bash
cd frontend
yarn start       # Dev server (port 3000)
yarn build       # Production build
yarn test        # Run tests
```

Set `REACT_APP_BACKEND_URL` to point the API client at your backend.

## Backend

A minimal FastAPI service:

- `POST /api/contact` — Full contact form (name, email, breed, message)
- `POST /api/lead` — Lightweight lead capture (hero email, PDF download, callback)
- `GET  /api/status` — Health-check / status list

Emails are sent through SendGrid. When `SENDGRID_API_KEY` is missing or a placeholder, the endpoints log the payload and return success so the form works end-to-end in development.

### Environment Variables

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

## Design System

The colour palette is defined as CSS custom properties in `src/index.css`:

- **Primary** — Blueviolet (`#5E3AE3`) for CTAs and brand elements
- **Accent** — Salmon (`#FC7C7C`) for warm highlights
- **Success** — Dark sea green (`#6DA366`) for positive states
- **Destructive** — Red for errors
- **Pastel variants** — Used in feature backgrounds and lead-magnet cards

Typography uses **Instrument Serif** (headings) and **Instrument Sans** (body), loaded via Google Fonts.