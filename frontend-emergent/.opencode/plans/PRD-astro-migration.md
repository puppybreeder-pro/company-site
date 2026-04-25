# PRD: PuppyBreeder.PRO — React to AstroJS Migration

## 1. Problem Statement

PuppyBreeder.PRO is a single-page marketing/landing site currently built on Create React App (CRACO) + React 19. The entire React runtime (~102 KB gzipped) must download and execute before anything renders, yet the vast majority of the page is static content — text, images, cards, and data that never changes after build. This architecture yields poor Core Web Vitals (LCP, INP, CLS) for what is fundamentally a content-static page.

Astro's island architecture renders all static content as pure HTML at build time and ships zero JavaScript unless a component explicitly needs it. Only the interactive "islands" (forms, carousels, accordions, menus, animated counters) hydrate on the client. This migration targets a < 30 KB JS payload for interactive islands versus the current ~102 KB full-React bundle.

## 2. Goals

| Goal | Target |
|------|--------|
| Reduce client-side JS | < 30 KB gzipped (islands only) vs ~102 KB today |
| Improve LCP | < 1.5s (current depends on full React hydration) |
| Visual parity | Pixel-identical to current site — zero design changes |
| Functional parity | All forms, navigation, accordion, carousel, animations, toast notifications work identically |
| No backend changes | Web3Forms stays the form endpoint; no server needed |
| DX parity | Hot reload, Tailwind, path aliases, linting work as before |

## 3. Scope

### In Scope
- Full framework migration from CRA/CRACO/React to Astro with React islands
- Tailwind CSS + design system port (CSS custom properties, component classes, animations)
- Web3Forms integration migration (env var naming, API call, honeypot)
- All 19 section components migrated
- Build configuration (Astro, Vite, Tailwind, PostCSS, path aliases)
- Environment variable renaming (`REACT_APP_*` → `PUBLIC_*`)
- Removal of unused dependencies

### Out of Scope
- Design or content changes
- New features or pages
- Backend/server work
- SEO restructuring (same single-page anchor-nav structure)
- Image optimization (keeping external Unsplash/placehold.co URLs)
- Theme toggle / dark mode (not currently exposed in UI despite CSS vars)

## 4. Architecture Decision Records

### ADR-1: Astro with React islands

**Decision:** Use `@astrojs/react` integration. Components that require client-side state (forms, menus, carousels, accordions, animated counters) remain as `.jsx` files and hydrate with Astro's `client:*` directives. All other components convert to `.astro` and render as zero-JS HTML.

**Rationale:** This is the canonical Astro pattern for incrementally adopting interactivity. Static sections (ProblemSolution, HowItWorks, Testimonials, FounderSection, Footer, Showroom) ship zero JS. Interactive islands load only their own code.

**Hydration strategy:**
- `client:load` — above-fold interactive components that must hydrate immediately (Header, Hero, Pricing, PromoBanner)
- `client:visible` — below-fold interactive components that hydrate when scrolled into view (CTA, LeadMagnet, FAQ, EthicalCommitment, DashboardCarousel, CountUp)

### ADR-2: Icon strategy — astro-icon for static, lucide-react for islands

**Decision:** Install `astro-icon` (powered by Iconify) with `@iconify-json/lucide` for `.astro` components. Keep `lucide-react` for React island components.

**Rationale:** Both use the identical Lucide icon set. `astro-icon` renders inline SVG at build time with zero runtime JS — perfect for static `.astro` components. `lucide-react` works natively inside hydrated React islands.

**Implementation:** Refactor `featuresData.js` to export icon name strings (e.g., `"heart"`, `"shield"`) instead of React component references. In `Features.astro`, map these names to `<Icon name="lucide:heart" />`. In React islands that consume feature data, use a lookup map from string names to `lucide-react` components.

### ADR-3: DashboardCarousel stays as Embla React island

**Decision:** Keep `DashboardCarousel.jsx` as a React component with `embla-carousel-react` and `client:visible`.

**Rationale:** The carousel has slide state (current index), navigation buttons, and dot indicators — all requiring client-side interactivity. Embla is a proven, lightweight carousel library (~8 KB). Rewriting as vanilla JS would be error-prone and time-consuming for marginal savings. `client:visible` ensures it only loads when scrolled into view.

### ADR-4: PostHog analytics removed

**Decision:** Drop the PostHog inline script from `index.html` and the Emergent `emergent-main.js` script.

**Rationale:** The user confirmed these are not needed. They can be re-added later via Astro's `<script>` tag or an integration if analytics are desired.

### ADR-5: Form handling — React island + Web3Forms

**Decision:** All 4 forms (Hero email capture, CTA contact, CTA callback, LeadMagnet download) remain React components with `useFormSubmission` hook calling `submitToWeb3Forms()`.

**Rationale:** Forms require `useState` for field values, submission state, and `sonner` toast notifications — all client-side React concerns. The web3forms helper is framework-agnostic (uses `fetch`). Only the env var name changes: `REACT_APP_WEB3FORMS_ACCESS_KEY` → `PUBLIC_WEB3FORMS_ACCESS_KEY`, accessed via `import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY`.

### ADR-6: Accordion — keep Radix React

**Decision:** FAQ, Pricing, and EthicalCommitment keep `@radix-ui/react-accordion` as React islands with `client:visible`.

**Rationale:** Radix accordion provides accessible, animated, collapsible sections with proper ARIA attributes. Rewriting as custom HTML `<details>` would lose animation and accessibility. `client:visible` ensures the JS only loads when the accordion scrolls into view. All other unused Radix primitives are removed from the bundle.

### ADR-7: Styling — identical Tailwind + CSS custom properties

**Decision:** Port `tailwind.config.mjs` and `src/index.css` (as `src/styles/global.css`) nearly verbatim. Use `@astrojs/tailwind` integration.

**Changes from current:**
- Add `.astro` to Tailwind `content` paths
- Remove `[data-debug-wrapper]` styles (Emergent tooling, no longer present)
- All CSS custom properties (`:root`, `.dark`), `@layer base/components/utilities`, keyframe animations, component classes (`.section-padding`, `.container-custom`, etc.) port unchanged

### ADR-8: Reveal animation → vanilla JS IntersectionObserver

**Decision:** Replace the React `<Reveal>` wrapper component with a vanilla JS IntersectionObserver script in `Layout.astro`. Sections needing reveal animation get a `data-reveal` attribute.

**Rationale:** The current `<Reveal>` component wraps 10+ sections and only does one thing: observe an element and toggle `opacity`/`transform` when it enters the viewport. As a React island, every `<Reveal>` instance costs React hydration. A ~20-line vanilla script achieves the same effect with zero React overhead. This eliminates the `<Reveal>` island entirely and is the single biggest win for reducing client-side JS.

**Implementation in `Layout.astro`:**
```html
<script>
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-revealed', '');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
</script>
```
```css
[data-reveal] {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}
[data-reveal][data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
[data-reveal][data-reveal-delay="1"] { transition-delay: 100ms; }
[data-reveal][data-reveal-delay="2"] { transition-delay: 200ms; }
```

**Reduced-motion:** Also port the `prefers-reduced-motion` check — if the user prefers reduced motion, skip the animation and show content immediately.

### ADR-9: Sonner / Toaster — remove next-themes

**Decision:** Remove `next-themes` dependency. Hardcode `theme="light"` in the `Sonner` Toaster. Place `<Toaster />` in `Layout.astro`.

**Rationale:** The site has no theme toggle UI. The `next-themes` dependency was a shadcn/ui template leftover with no functional purpose here.

### ADR-10: scrollToSection → native anchor links

**Decision:** In `.astro` components, replace all `scrollToSection()` calls with `<a href="#section-id">` native anchor links. The CSS `scroll-behavior: smooth` (already in `global.css`) handles smooth scrolling.

**Rationale:** Astro renders to static HTML — there's no client JS for custom scroll functions. Native anchor links are progressive-enhancement-friendly and work without any JavaScript. The Header island (which needs JS for the mobile menu) can still use `scrollIntoView()` for its button-driven navigation.

### ADR-11: Project location

**Decision:** The Astro project lives in a new `frontend-astro/` directory as a sibling to the existing `frontend/`.

**Rationale:** Keeps the existing working project intact for reference during migration. Can be removed after the migration is verified.

## 5. Component Migration Map

| Component | Becomes | Hydration | Key Changes |
|-----------|---------|-----------|-------------|
| Header | `Header.jsx` | `client:load` | No structural changes; scroll detection + mobile menu need JS |
| Hero | `Hero.jsx` | `client:load` | Form + CountUp need JS; env var rename |
| ProblemSolution | `ProblemSolution.astro` | none | Icons → astro-icon; no JS |
| HowItWorks | `HowItWorks.astro` | none | Icons → astro-icon; Button → `<a href="#cta">`; no JS |
| Features | `Features.astro` | none | Icons via astro-icon; DashboardCarousel is separate island below |
| SiteShowcaseCard | `SiteShowcaseCard.astro` | none | Pure static card |
| Showroom | `Showroom.astro` | none | Static grid of SiteShowcaseCards |
| DashboardCarousel | `DashboardCarousel.jsx` | `client:visible` | Embla carousel state |
| LeadMagnet | `LeadMagnet.jsx` | `client:visible` | Form + toast |
| Pricing | `Pricing.jsx` | `client:load` | Billing toggle + Radix accordion |
| Testimonials | `Testimonials.astro` | none | Star icon → astro-icon; no JS |
| FounderSection | `FounderSection.astro` | none | Pure static |
| FAQ | `FAQ.jsx` | `client:visible` | Radix accordion |
| EthicalCommitment | `EthicalCommitment.jsx` | `client:visible` | Radix accordion + ShieldCheck icon |
| CTA | `CTA.jsx` | `client:visible` | 2 forms + toasts |
| Footer | `Footer.astro` | none | scrollToSection → `<a href="#">`; Heart icon → astro-icon |
| PromoBanner | `PromoBanner.jsx` | `client:load` | Dismiss state |
| Reveal | **Deleted** | — | Replaced by `data-reveal` attr + vanilla JS |
| CountUp | `CountUp.jsx` | `client:visible` | Animated counter (used by Hero) |

**Summary:** 11 React islands, 8 static Astro components, 1 deleted (Reveal → vanilla JS).

## 6. Project Structure

```
frontend-astro/
├── astro.config.mjs
├── tailwind.config.mjs
├── postcss.config.mjs
├── jsconfig.json
├── package.json
├── .env.example
├── .env
├── .gitignore
├── WEB3FORMS.md
│
├── public/
│   ├── favicon.svg
│   └── showroom/
│       └── README.md
│
└── src/
    ├── layouts/
    │   └── Layout.astro          # <html>, <head>, fonts, CSS, Toaster, reveal script
    │
    ├── pages/
    │   └── index.astro           # Composes all sections in order
    │
    ├── components/
    │   │── Header.jsx            # client:load — mobile menu + scroll
    │   │── Hero.jsx              # client:load — form + CountUp
    │   │── ProblemSolution.astro # Static — icons via astro-icon
    │   │── HowItWorks.astro      # Static — icons via astro-icon
    │   │── Features.astro        # Static — icons via astro-icon
    │   │── DashboardCarousel.jsx # client:visible — Embla
    │   │── Showroom.astro        # Static — grid
    │   │── SiteShowcaseCard.astro# Static — card
    │   │── LeadMagnet.jsx        # client:visible — form
    │   │── Pricing.jsx           # client:load — toggle + accordion
    │   │── Testimonials.astro    # Static — cards
    │   │── FounderSection.astro  # Static — content
    │   │── FAQ.jsx               # client:visible — accordion
    │   │── EthicalCommitment.jsx # client:visible — accordion
    │   │── CTA.jsx               # client:visible — 2 forms
    │   │── Footer.astro          # Static — links
    │   │── PromoBanner.jsx       # client:load — dismiss
    │   └── CountUp.jsx           # client:visible — counter
    │
    ├── ui/
    │   ├── accordion.jsx         # Radix — used by FAQ, Pricing, EthicalCommitment
    │   ├── badge.jsx             # CVA — used by Pricing
    │   ├── button.jsx            # CVA — used by many islands
    │   ├── card.jsx              # HTML wrapper — used by many
    │   ├── input.jsx             # HTML wrapper — used by forms
    │   ├── sonner.jsx            # Toast — used by forms
    │   └── textarea.jsx          # HTML wrapper — used by CTA
    │
    ├── data/
    │   ├── navigationData.js
    │   ├── featuresData.js       # REFACTORED: icon components → icon name strings
    │   ├── iconMap.js            # NEW: string name → lucide-react component map
    │   ├── pricingData.js
    │   ├── testimonialsData.js
    │   ├── howItWorksData.js
    │   ├── problemSolutionData.js
    │   ├── faqData.js
    │   ├── showroomData.js
    │   └── footerData.js
    │
    ├── hooks/
    │   ├── useFormSubmission.js
    │   └── useScrollDetection.js
    │
    ├── lib/
    │   ├── utils.js
    │   └── web3forms.js          # UPDATED: process.env → import.meta.env
    │
    ├── constants/
    │   └── index.js
    │
    ├── utils/
    │   └── scrollTo.js           # Kept for Header.jsx mobile menu
    │
    └── styles/
        └── global.css            # Ported from src/index.css
```

## 7. Key Technical Changes

### 7.1 Environment Variables

| Old (CRA Convention) | New (Astro Convention) | Access Pattern |
|----------------------|------------------------|----------------|
| `REACT_APP_WEB3FORMS_ACCESS_KEY` | `PUBLIC_WEB3FORMS_ACCESS_KEY` | `import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY` |
| `process.env.REACT_APP_*` | `import.meta.env.PUBLIC_*` | In `.jsx` islands |
| `.env.local` | `.env` | Astro convention |

**Files changed:** `src/lib/web3forms.js`, `.env.example`, `WEB3FORMS.md`

### 7.2 Path Aliases

- CRA: `@/` via `jsconfig.json` + CRACO webpack alias
- Astro: `@/` via `jsconfig.json` paths + `vite.resolve.alias` in `astro.config.mjs`

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    resolve: {
      alias: { '@': new URL('./src', import.meta.url).pathname },
    },
  },
});
```

### 7.3 Icon Migration for `.astro` Components

**Current state:** `lucide-react` exports React components. Static `.astro` components cannot render React components without hydration.

**Solution:** Use `astro-icon` with `@iconify-json/lucide`:

```astro
---
import { Icon } from 'astro-icon/components';
---
<Icon name="lucide:check" class="w-3 h-3 text-success" />
```

This renders as an inline SVG at build time — zero runtime JS, identical visual output.

**featuresData.js refactor:**

Before (React components):
```js
import { Heart, Shield } from 'lucide-react';
export const publicFeatures = [
  { icon: Heart, title: '...', description: '...' },
];
```

After (icon name strings):
```js
export const publicFeatures = [
  { icon: 'heart', title: '...', description: '...' },
];
```

**iconMap.js** (for React islands that still need lucide-react):
```js
import { Heart, Shield, Image, FileText, Sparkles, Calendar, Star, X, Check, ChevronLeft, ChevronRight, ChevronDown, Phone, Mail, CalendarDays, ArrowRight, ShieldCheck, FileText as FileTextIcon } from 'lucide-react';
export const iconMap = { heart: Heart, shield: Shield, image: Image, filetext: FileText, sparkles: Sparkles, calendar: Calendar, star: Star, x: X, check: Check, chevronleft: ChevronLeft, chevronright: ChevronRight, chevrondown: ChevronDown, phone: Phone, mail: Mail, calendardays: CalendarDays, arrowright: ArrowRight, shieldcheck: ShieldCheck, filetext: FileTextIcon };
```

### 7.4 Removed Dependencies

| Package | Reason |
|---------|--------|
| `react-scripts` | Replaced by Astro/Vite build system |
| `@craco/craco` | Replaced by Astro/Vite build system |
| `react-router-dom` | Unused — single anchor-scroll page |
| `axios` | Already removed from codebase |
| `next-themes` | No theme toggle; Toaster hardcoded to light |
| `react-day-picker` | Calendar component not in active use |
| `date-fns` | Only used by react-day-picker |
| `cmdk` | Unused |
| `input-otp` | Unused |
| `react-resizable-panels` | Unused |
| `recharts` | Unused |
| `vaul` | Unused |
| `zod` | Unused |
| `react-hook-form` | Unused |
| `@hookform/resolvers` | Unused |
| All `@radix-ui/react-*` except `accordion` and `slot` | Unused |
| `@emergentbase/visual-edits` | Dev tooling, not in Astro |
| `cra-template` | CRA-specific |
| `@babel/plugin-proposal-private-property-in-object` | CRA-specific |
| `eslint`, `@eslint/js`, `eslint-plugin-*`, `globals` | Replaced by Astro tooling |

### 7.5 New Dependencies

```json
{
  "dependencies": {
    "astro": "^5.x",
    "@astrojs/react": "^4.x",
    "@astrojs/tailwind": "^6.x",
    "astro-icon": "^1.x",
    "@iconify-json/lucide": "^1.x",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@radix-ui/react-accordion": "^1.2.8",
    "@radix-ui/react-slot": "^1.2.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.2.0",
    "lucide-react": "^1.11.0",
    "sonner": "^2.0.7",
    "embla-carousel-react": "^8.6.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.17",
    "tailwindcss-animate": "^1.0.7",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49"
  }
}
```

**Net dependency change:** ~50 packages removed → ~18 packages. Dramatically smaller `node_modules` and attack surface.

### 7.6 CSS Changes

- Port `src/index.css` → `src/styles/global.css`
- Remove `[data-debug-wrapper]` rules (lines 252–280) — Emergent dev tooling, not present in Astro
- Add `data-reveal` CSS rules (see ADR-8 above)
- `@tailwind` directives unchanged — Astro's Tailwind integration processes them
- Import via `Layout.astro`: `import '../styles/global.css'`
- All `@layer base/components/utilities` blocks, CSS custom properties, keyframes, component classes port unchanged

### 7.7 Layout.astro Structure

```astro
---
import '../styles/global.css';
import { Toaster } from '../components/ui/sonner';
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Professional websites for dog breeders — PuppyBreeder.PRO" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <title>PuppyBreeder.PRO — Professional Websites for Dog Breeders</title>
  </head>
  <body class="bg-background text-foreground">
    <slot />
    <Toaster theme="light" />

    <!-- Reveal animation (vanilla JS) -->
    <script>
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.setAttribute('data-revealed', '');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
        );
        document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
      } else {
        document.querySelectorAll('[data-reveal]').forEach((el) => {
          el.setAttribute('data-revealed', '');
        });
      }
    </script>
  </body>
</html>
```

### 7.8 index.astro Composition

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import ProblemSolution from '../components/ProblemSolution.astro';
import HowItWorks from '../components/HowItWorks.astro';
import Features from '../components/Features.astro';
import DashboardCarousel from '../components/DashboardCarousel.jsx';
import Showroom from '../components/Showroom.astro';
import LeadMagnet from '../components/LeadMagnet.jsx';
import Pricing from '../components/Pricing.jsx';
import Testimonials from '../components/Testimonials.astro';
import FounderSection from '../components/FounderSection.astro';
import FAQ from '../components/FAQ.jsx';
import EthicalCommitment from '../components/EthicalCommitment.jsx';
import CTA from '../components/CTA.jsx';
import Footer from '../components/Footer.astro';
import PromoBanner from '../components/PromoBanner.jsx';
---

<Layout>
  <Header client:load />
  <main>
    <Hero client:load />
    <ProblemSolution data-reveal />
    <HowItWorks data-reveal />
    <Features data-reveal />
    <div data-reveal>
      <DashboardCarousel client:visible />
    </div>
    <Showroom data-reveal />
    <LeadMagnet client:visible data-reveal />
    <Pricing client:load data-reveal />
    <Testimonials data-reveal />
    <FounderSection data-reveal />
    <FAQ client:visible data-reveal />
    <EthicalCommitment client:visible data-reveal />
    <CTA client:visible data-reveal />
  </main>
  <Footer />
  <PromoBanner client:load />
</Layout>
```

**Note on `data-reveal` with islands:** For React islands wrapped in `data-reveal`, the reveal animation applies to the outer wrapper div while the island hydrates independently inside. For islands that need `data-reveal` on their own root, the attribute can be added as a prop and rendered on the component's root element, or a wrapper `<div data-reveal>` can be used in `index.astro`.

## 8. Implementation Phases

### Phase 1: Scaffold & Config (0.5 day)

**Tasks:**
1. Create `frontend-astro/` directory alongside `frontend/`
2. Run `npm create astro@latest` → Empty project
3. Install all dependencies per §7.5
4. Create `astro.config.mjs` with React + Tailwind integrations, `vite.resolve.alias` for `@/`
5. Create `jsconfig.json` with `baseUrl` and `paths` for `@/*`
6. Port `tailwind.config.mjs` — update `content` paths to include `.astro` and `.jsx`
7. Port `postcss.config.mjs`
8. Create `src/styles/global.css` from `src/index.css` (remove debug-wrapper styles, add data-reveal styles)
9. Create `src/layouts/Layout.astro` (HTML shell, fonts, meta, CSS, Toaster, reveal script)
10. Create `.env.example` with `PUBLIC_WEB3FORMS_ACCESS_KEY=your-access-key-here`
11. Update `.gitignore`

**Acceptance:** `astro dev` starts without errors. Blank page renders with fonts and CSS variables.

### Phase 2: Static Data & Helpers (0.25 day)

**Tasks:**
1. Copy all `src/data/*.js` files verbatim except `featuresData.js`
2. Refactor `featuresData.js` — replace icon component imports/exports with icon name strings
3. Create `src/data/iconMap.js` — mapping icon name strings → lucide-react components
4. Copy `src/constants/index.js` verbatim
5. Copy `src/lib/utils.js` verbatim
6. Port `src/lib/web3forms.js` — change `process.env.REACT_APP_WEB3FORMS_ACCESS_KEY` → `import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY`, update placeholder check
7. Copy `src/utils/scrollTo.js` verbatim
8. Copy `src/hooks/useFormSubmission.js` verbatim
9. Copy `src/hooks/useScrollDetection.js` verbatim
10. Copy `src/hooks/use-toast.js` verbatim

**Acceptance:** All data files, utilities, hooks, and lib modules import without errors in both `.astro` and `.jsx` contexts.

### Phase 3: UI Primitives (0.5 day)

**Tasks:**
1. Port `ui/button.jsx` — keep as React (CVA + Radix Slot for asChild)
2. Port `ui/card.jsx` — can be `.astro` but keep as `.jsx` for simplicity (islands import it)
3. Port `ui/input.jsx` — keep as React (form islands)
4. Port `ui/textarea.jsx` — keep as React (CTA form)
5. Port `ui/accordion.jsx` — keep as React (Radix)
6. Port `ui/badge.jsx` — keep as React (CVA)
7. Port `ui/sonner.jsx` — remove `next-themes` import, hardcode `theme="light"`
8. Delete all unused UI components (dialog, sheet, dropdown-menu, tabs, calendar, checkbox, collapsible, command, context-menu, hover-card, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, skeleton, slider, switch, table, toast, toaster, toggle, toggle-group, tooltip, drawer, input-otp, aspect-ratio, avatar)

**Acceptance:** All UI components render correctly in React islands.

### Phase 4: React Island Components (1.5 days)

**Tasks (each component):**
- Copy from `frontend/src/components/` → `frontend-astro/src/components/`
- Update imports (path aliases work automatically)
- Replace lucide-react icon imports with `iconMap` lookups where applicable
- Ensure all env var references use `import.meta.env.PUBLIC_*`

**Components to port as `.jsx`:**

1. **Header.jsx** — No changes needed. Uses `useScrollDetection`, `navItems`, `BRAND_*`, `scrollToSection`. Works as-is.
2. **Hero.jsx** — Uses `useFormSubmission`, `CountUp`, `CALENDLY_URL`, `lucide-react` icons. Update `web3forms` env var access (via lib).
3. **CTA.jsx** — Uses `useFormSubmission`, `CALENDLY_URL`, `lucide-react` icons. Two forms (contact + callback). Port `FormField` as local component or inline.
4. **LeadMagnet.jsx** — Uses `useFormSubmission`. Simple form.
5. **Pricing.jsx** — Uses `useState` for billing toggle, Radix accordion, `scrollToSection`, `lucide-react` icons. Update scrollToSection usage.
6. **DashboardCarousel.jsx** — Uses `embla-carousel-react`, `useState`. Port `Slide` and `NavigationButton` subcomponents.
7. **FAQ.jsx** — Uses Radix accordion, `faqData`. Simple.
8. **EthicalCommitment.jsx** — Uses Radix accordion, `ShieldCheck` icon from lucide-react.
9. **CountUp.jsx** — IntersectionObserver animated counter. No changes.
10. **PromoBanner.jsx** — Uses `useState` for dismiss, `scrollToSection`, `lucide-react` X icon.

**Acceptance:** Each React island renders and hydrates correctly when used with its `client:*` directive in `index.astro`.

### Phase 5: Static Astro Components (1 day)

**Tasks (each component):**
- Rewrite as `.astro` with frontmatter imports and HTML template
- Replace all `lucide-react` icon components → `<Icon name="lucide:xxx" />`
- Replace `scrollToSection(id)` → `<a href="#${id}">` or native anchor links
- Remove `<Reveal>` wrappers — add `data-reveal` attribute on the section element instead
- Remove unused React imports (`useState`, `useEffect`, etc.)

**Components to convert:**

1. **ProblemSolution.astro** — Read `problems`/`solutions` data. Replace X/Check icons with astro-icon. Static two-column cards.
2. **HowItWorks.astro** — Read `steps` data. Icon emojis stay as-is (they're text, not lucide). Replace `Button onClick → <a href="#cta">`. ArrowRight icon → astro-icon.
3. **Features.astro** — Read `publicFeatures`/`adminFeatures` data with icon name strings. Use `astro-icon` to render icons. The `DashboardCarousel` is a separate island rendered inside Features' section.
4. **Showroom.astro** — Read `showroomSites` data. Static grid.
5. **SiteShowcaseCard.astro** — Accepts `site` prop. Static card with faux browser chrome.
6. **Testimonials.astro** — Read `testimonials` data. Star icon → `<Icon name="lucide:star" />`.
7. **FounderSection.astro** — Pure static content. No icons from lucide.
8. **Footer.astro** — Read `footerLinks`/`breeds` data. Heart icon → `<Icon name="lucide:heart" />`. Replace `scrollToSection(id)` buttons → `<a href="#${id}">`.

**Acceptance:** All static components render as pure HTML (verify in DevTools — no `<script>` tags in their output). Visual output matches React originals.

### Phase 6: Page Composition (0.25 day)

**Tasks:**
1. Create `src/pages/index.astro`
2. Import Layout and all components
3. Assemble in section order: PromoBanner → Header → Hero → ProblemSolution → HowItWorks → Features → Showroom → LeadMagnet → Pricing → Testimonials → FounderSection → FAQ → EthicalCommitment → CTA → Footer
4. Apply `client:load` / `client:visible` directives per migration map
5. Add `data-reveal` attributes on sections that previously used `<Reveal>`
6. Handle `data-reveal` wrapping for islands (put attribute on island's root element via prop, or use wrapper div)

**Acceptance:** Full page renders with all sections. Hydrated islands are interactive. Static sections have no JS.

### Phase 7: Polish & Verify (0.5 day)

**Tasks:**
1. Test all 4 form submissions → verify Web3Forms receives data
2. Test accordion open/close in FAQ, Pricing, EthicalCommitment
3. Test carousel navigation in DashboardCarousel
4. Test mobile menu in Header
5. Test billing toggle in Pricing
6. Test PromoBanner dismiss
7. Test CountUp animation in Hero
8. Test reveal animations on all sections
9. Test responsive design (mobile, tablet, desktop)
10. Run Lighthouse audit — target Performance 90+
11. Check bundle size in DevTools — verify < 30 KB JS transferred
12. Update `WEB3FORMS.md` with `PUBLIC_` env var names
13. Create `.env.example` for `PUBLIC_WEB3FORMS_ACCESS_KEY`
14. Clean up: remove old `frontend/` reference if desired, update any docs

**Acceptance:** All functional and visual parity confirmed. Lighthouse Performance 90+. JS bundle < 30 KB gzipped.

## 9. Risk & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Visual regression in `.astro` conversion | Medium | High | Side-by-side screenshot comparison per component; Tailwind classes port identically; test responsive breakpoints |
| Radix accordion hydration flash | Low | Medium | `client:visible` defers hydration until scroll; Radix renders HTML shell first; test on slow 3G |
| Web3Forms env var not resolved | Low | High | Test `import.meta.env.PUBLIC_*` in both `astro dev` and `astro build`; verify `.env` file loading |
| astro-icon/Lucide icon mismatch | Low | Low | Both use the Lucide set — same icon names, same SVGs; verify each icon renders correctly |
| `data-reveal` on React island boundaries | Medium | Low | Use a wrapper `<div data-reveal>` around islands, or pass `data-reveal` as a prop to the island's root element |
| Tailwind `content` path missing new file types | Medium | Medium | Ensure `content: ['./src/**/*.{astro,jsx,tsx,js,ts}']` covers all component files |
| `@radix-ui/react-slot` (used by Button) not loaded | Low | Medium | Keep `@radix-ui/react-slot` in dependencies — required by Button's `asChild` pattern |

## 10. Effort Estimate

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Phase 1: Scaffold & Config | 0.5 day | 0.5 day |
| Phase 2: Data & Helpers | 0.25 day | 0.75 day |
| Phase 3: UI Primitives | 0.5 day | 1.25 days |
| Phase 4: React Islands | 1.5 days | 2.75 days |
| Phase 5: Static Astro Components | 1 day | 3.75 days |
| Phase 6: Page Composition | 0.25 day | 4 days |
| Phase 7: Polish & Verify | 0.5 day | 4.5 days |

**Total: ~4.5 days** (single developer, assuming familiarity with Astro)

## 11. Success Criteria

- [ ] All sections render visually identically to the current React site
- [ ] All 4 forms submit successfully to Web3Forms
- [ ] Accordion components open/close correctly
- [ ] Dashboard carousel navigates between slides
- [ ] Mobile header menu opens and navigates to sections
- [ ] Billing toggle switches between monthly/yearly pricing
- [ ] PromoBanner can be dismissed
- [ ] CountUp animation plays when scrolled into view
- [ ] Reveal animations trigger on scroll
- [ ] Toast notifications appear on form success/error
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Lighthouse Performance score ≥ 90
- [ ] Total JS transferred < 30 KB gzipped
- [ ] No React runtime loaded for static sections