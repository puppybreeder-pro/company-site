# PuppyBreeder.PRO — Product Requirements

## Original Problem Statement
Landing page for "PuppyBreeder.PRO", a SaaS website company for dog breeders. Must be professional, trustworthy, simple for non-tech-savvy users. Needs Hero, Problem/Solution, Features (Command Center dashboard previews), Benefits (For Breeders/Families), Pricing ($79/mo or $790/yr, $150 setup fee), and FAQs.

## Current Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI
- **Backend**: FastAPI + MongoDB
- **Fonts**: Instrument Serif (headings) + Instrument Sans (body)
- **Email**: SendGrid (placeholder-key mode until real key added)

### Design System — "Violet-led, Sage-for-Trust, Salmon-Reserved" (Feb 2026)
| Role | Color | Uses |
|---|---|---|
| Primary (brand) | Blueviolet `#5E3AE3` | Logo, `.PRO`, primary CTAs, "Professional Website", nav, toggles, pricing card border, add-on prices |
| Secondary | Slateblue `#7870E8` | Gradient partner |
| Success (trust) | Darkseagreen `#6DA366` | All checkmarks (Problem/Solution, Benefits, Pricing), "What Families See" feature icons |
| Accent (reserved) | Salmon `#FC7C7C` | Hero pill, Pricing "Simple Pricing" badge + `$79` anchor, Footer heart, Testimonial stars |
| Pastel Purple | Thistle `#DBC5EF` | "For You (Breeders)" benefits tab |
| Pastel Salmon | Blush | "For Them (Families)" benefits tab |
| Neutrals | ghostwhite, whitesmoke, dimgray, ink | Backgrounds + body copy |

### File Structure
```
/app/frontend/src/
├── components/   (Header, Hero, ProblemSolution, HowItWorks, Features,
│                  DashboardCarousel, BenefitsSection, Pricing, Testimonials,
│                  FounderSection, FAQ, CTA, Footer + ui/)
├── data/         (faqData, pricingData, featuresData, navigationData)
├── hooks/        (useScrollDetection)
├── utils/        (scrollTo)
└── constants/
/app/backend/
├── server.py     (main FastAPI app)
└── contact.py    (POST /api/contact → SendGrid)
```

## Implemented Features (CHANGELOG)
- [Earlier] Landing page prototype (Hero, Problem/Solution, How It Works, 3-slide Dashboard Carousel, Benefits tabs, Pricing w/ monthly-yearly toggle, FAQ, CTA form, Footer)
- [Earlier] Typography system (Instrument Serif + Sans), custom HSL tokens, pricing polish, FAQ/cancellation copy, clean-code refactor (data/hooks/utils extracted)
- **[Feb 2026]** `POST /api/contact` endpoint wired to CTA form; sends email to `hello@puppybreeder.pro` via SendGrid; placeholder-key mode logs payload and returns success until a real key is provided.
- **[Feb 2026]** Full palette overhaul → violet-led brand with sage-for-trust checkmarks and salmon reserved for 4 high-value moments. Added `pastel-salmon` token.
- **[Feb 2026]** Benefits tab BG: Breeders = pastel-purple, Families = pastel-salmon (matches hero duality).

## Environment Variables
**backend/.env**
- `SENDGRID_API_KEY` — placeholder until real key provided
- `SENDER_EMAIL=hello@puppybreeder.pro`
- `CONTACT_RECIPIENT_EMAIL=hello@puppybreeder.pro`

## Key API Endpoints
- `POST /api/contact` — `{name, email, breed, message}` → email via SendGrid

## Backlog / Next Tasks
### P1
- Replace Hero background + Dashboard carousel mockups with real screenshots (waiting on user assets)
- Provide real SendGrid API key to go out of placeholder mode

### P2
- Replace Founder section placeholder with actual photo (user asset)
- Wire "Schedule Demo Call" button (Calendly or mailto)
- Add live breeder site visual mockups/examples section
- Stripe checkout for $79/$790 plans
- Newsletter / lead-magnet signup
- Real testimonials carousel + customer logo strip

## Testing
- Backend `/api/contact` — validated via curl (success + 422 validation); placeholder mode logs + returns success.
- Frontend smoke-tested via screenshots after palette remap and benefits-tab color swap.

## Notes for Future Sessions
- **All design tokens live in `/app/frontend/src/index.css`** — one edit cascades site-wide.
- **Tailwind raw hex palette** also available in `tailwind.config.js`: `bg-blueviolet`, `bg-salmon`, `bg-darkseagreen`, `bg-thistle`, `bg-ghostwhite`, etc.
- Salmon is reserved. Don't reintroduce it to secondary elements without a reason.
- Checkmarks across the site use `text-success` → stays sage-green by contract.
