# ERD: PuppyBreeder.PRO — AstroJS Implementation Entity Relationship Diagram

## Logical Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            astro.config.mjs                                      │
│                                                                                   │
│  ┌──────────────────┐   ┌──────────────────┐   ┌───────────────────────────┐     │
│  │  @astrojs/react   │   │  @astrojs/tailwind│   │  vite.resolve.alias       │     │
│  │  integration      │   │  integration      │   │  @/ → ./src               │     │
│  └────────┬─────────┘   └────────┬─────────┘   └───────────────────────────┘     │
│           │                       │                                                │
└───────────┼───────────────────────┼────────────────────────────────────────────────┘
            │                       │
            ▼                       ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           Layout.astro                                            │
│                                                                                   │
│   ┌────────────────┐  ┌────────────────┐  ┌───────────────────┐                  │
│   │  <html> <head> │  │  global.css    │  │  <Toaster />      │                  │
│   │  meta, fonts   │──│  Tailwind +    │  │  (sonner, light)  │                  │
│   │  (no PostHog)  │  │  CSS vars +    │  └─────────┬─────────┘                  │
│   └───────┬────────┘  │  data-reveal   │             │                              │
│           │           │  styles        │             │                              │
│           │           └────────────────┘             │                              │
│           │                                          │                              │
│           │    ┌─────────────────────────────────────┘                              │
│           │    │                                                                    │
│   <slot />    │   <script> Reveal IntersectionObserver (vanilla JS)                 │
│           │    │   ─ observes [data-reveal] elements                                │
│           │    │   ─ adds [data-revealed] on intersection                            │
│           │    │   ─ respects prefers-reduced-motion                                │
└───────────┼────┼────────────────────────────────────────────────────────────────────┘
            │    │
            ▼    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         index.astro (single page)                                 │
│                                                                                   │
│  ┌──────────────────────────────────────────────────────────────────────────┐    │
│  │                    ABOVE THE FOLD (client:load)                         │    │
│  │                                                                          │    │
│  │  ┌──────────────────────────────┐  ┌──────────────────────────────┐     │    │
│  │  │  PromoBanner.jsx             │  │  Header.jsx                  │     │    │
│  │  │  client:load                 │  │  client:load                 │     │    │
│  │  │                              │  │                              │     │    │
│  │  │  ┌────────────────────────┐  │  │  ┌────────────────────────┐  │     │    │
│  │  │  │ useState(isVisible)    │  │  │  │ useState(mobileMenu)   │  │     │    │
│  │  │  │ X icon (lucide-react)  │  │  │  │ useScrollDetection()  │  │     │    │
│  │  │  │ scrollToSection(#cta) │  │  │  │ navItems (data)        │  │     │    │
│  │  │  └────────────────────────┘  │  │  │ BRAND_* (constants)   │  │     │    │
│  │  └──────────────────────────────┘  │  │ scrollToSection()      │  │     │    │
│  │                                     │  │ Menu/X (lucide-react)  │  │     │    │
│  │  ┌──────────────────────────────┐  │  └────────────────────────┘  │     │    │
│  │  │  Hero.jsx                    │  └──────────────────────────────┘     │    │
│  │  │  client:load                 │                                       │    │
│  │  │                              │  ┌──────────────────────────────┐     │    │
│  │  │  ┌────────────────────────┐  │  │  Pricing.jsx                │     │    │
│  │  │  │ useFormSubmission()    │  │  │  client:load                 │     │    │
│  │  │  │ CountUp.jsx │  │  │                              │     │    │
│  │  │  │   (client:visible)    │  │  │  ┌────────────────────────┐  │     │    │
│  │  │  │ Sparkles/ArrowRight  │  │  │  │ useState(billing)     │  │     │    │
│  │  │  │   (lucide-react)     │  │  │  │ BillingToggle          │  │     │    │
│  │  │  │ CALENDLY_URL         │  │  │  │ Accordion (Radix)      │  │     │    │
│  │  │  └────────────────────────┘  │  │ Badge (CVA)           │  │     │    │
│  │  └──────────────────────────────┘  │  │ pricingData / faqData │  │     │    │
│  │                                     │  │ Accordion (Radix)      │  │     │    │
│  └──────────────────────────────────────┘  └────────────────────────┘  │     │    │
│                                             └──────────────────────────────┘     │    │
│  ┌──────────────────────────────────────────────────────────────────────────┐    │
│  │              BELOW THE FOLD — STATIC (zero JS)                          │    │
│  │                                                                          │    │
│  │  ┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐ │    │
│  │  │ ProblemSolution    │  │ HowItWorks         │  │ Features           │ │    │
│  │  │ .astro             │  │ .astro             │  │ .astro             │ │    │
│  │  │                    │  │                    │  │                    │ │    │
│  │  │ X/Check icons      │  │ ArrowRight icon    │  │ Icon name strings  │ │    │
│  │  │ → astro-icon       │  │ → astro-icon       │  │ → astro-icon       │ │    │
│  │  │ problemSolution    │  │ steps              │  │ featuresData       │ │    │
│  │  │ Data               │  │ howItWorksData     │  │ (refactored)       │ │    │
│  │  │ data-reveal        │  │ data-reveal        │  │ data-reveal        │ │    │
│  │  └────────────────────┘  └────────────────────┘  └────────────────────┘ │    │
│  │                                                                          │    │
│  │  ┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐ │    │
│  │  │ Showroom           │  │ SiteShowcaseCard   │  │ Testimonials       │ │    │
│  │  │ .astro             │  │ .astro             │  │ .astro             │ │    │
│  │  │                    │  │                    │  │                    │ │    │
│  │  │ showroomData       │  │ site prop          │  │ Star icon          │ │    │
│  │  │ data-reveal        │  │ Image + link       │  │ → astro-icon       │ │    │
│  │  └────────────────────┘  └────────────────────┘  │ testimonialsData   │ │    │
│  │                                                    │ data-reveal        │ │    │
│  │  ┌────────────────────┐  ┌────────────────────┐  └────────────────────┘ │    │
│  │  │ FounderSection     │  │ Footer              │                         │    │
│  │  │ .astro             │  │ .astro              │                         │    │
│  │  │                    │  │                      │                         │    │
│  │  │ Unsplash image     │  │ Heart icon          │                         │    │
│  │  │ Pure static        │  │ → astro-icon         │                         │    │
│  │  │ data-reveal        │  │ scrollToSection     │                         │    │
│  │  └────────────────────┘  │ → <a href="#">       │                         │    │
│  │                            │ footerData / BRAND  │                         │    │
│  │  ┌────────────────────┐  └────────────────────┘                          │    │
│  │  │ (empty)            │                                                  │    │
│  │  └────────────────────┘                                                  │    │
│  └──────────────────────────────────────────────────────────────────────────┘    │
│                                                                                   │
│  ┌──────────────────────────────────────────────────────────────────────────┐    │
│  │       BELOW THE FOLD — REACT ISLANDS (client:visible)                   │    │
│  │                                                                          │    │
│  │  ┌──────────────────────────┐  ┌──────────────────────────┐            │    │
│  │  │ DashboardCarousel.jsx     │  │ LeadMagnet.jsx           │            │    │
│  │  │ client:visible            │  │ client:visible           │            │    │
│  │  │                          │  │                          │            │    │
│  │  │ useState(currentSlide)   │  │ useFormSubmission()      │            │    │
│  │  │ ChevronLeft/Right        │  │ Input / Button           │            │    │
│  │  │   (lucide-react)         │  │ FileText icon            │            │    │
│  │  │ embla-carousel-react     │  │   (lucide-react)         │            │    │
│  │  │ dashboardSlides          │  │ Card wrapper             │            │    │
│  │  │   (featuresData)         │  │ data-reveal (wrapper)    │            │    │
│  │  └──────────────────────────┘  └──────────────────────────┘            │    │
│  │                                                                          │    │
│  │  ┌──────────────────────────┐  ┌──────────────────────────┐            │    │
│  │  │ FAQ.jsx                  │  │ EthicalCommitment.jsx     │            │    │
│  │  │ client:visible           │  │ client:visible            │            │    │
│  │  │                          │  │                          │            │    │
│  │  │ Accordion (Radix)        │  │ Accordion (Radix)         │            │    │
│  │  │ faqData                  │  │ ShieldCheck icon          │            │    │
│  │  │ data-reveal (wrapper)    │  │   (lucide-react)         │            │    │
│  │  └──────────────────────────┘  │ data-reveal (wrapper)    │            │    │
│  │                                 └──────────────────────────┘            │    │
│  │  ┌──────────────────────────┐                                           │    │
│  │  │ CTA.jsx                  │                                           │    │
│  │  │ client:visible           │                                           │    │
│  │  │                          │                                           │    │
│  │  │ 2 forms:                 │                                           │    │
│  │  │  ┌─ Contact Form ──────┐ │                                           │    │
│  │  │  │ useFormSubmission() │ │                                           │    │
│  │  │  │ Input/Textarea/Btn  │ │                                           │    │
│  │  │  │ Mail/Calendar icons │ │                                           │    │
│  │  │  └─────────────────────┘ │                                           │    │
│  │  │  ┌─ Callback Form ─────┐ │                                           │    │
│  │  │  │ useFormSubmission() │ │                                           │    │
│  │  │  │ Input/Btn           │ │                                           │    │
│  │  │  │ Phone icon          │ │                                           │    │
│  │  │  └─────────────────────┘ │                                           │    │
│  │  │ data-reveal (wrapper)    │                                           │    │
│  │  └──────────────────────────┘                                           │    │
│  └──────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Shared Modules (Framework-Agnostic)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     DATA LAYER (pure JS, no framework deps)                  │
│                                                                              │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────────┐            │
│  │ navigationData.js│ │ faqData.js       │ │ pricingData.js      │            │
│  │ navItems[]       │ │ faqData[]        │ │ PRICING, planFeats, │            │
│  └────────┬────────┘ └────────┬────────┘ │ addOns, comparison   │            │
│           │                   │          └──────────┬──────────┘            │
│  ┌────────┴────────┐ ┌───────┴─────────┐            │                        │
│  │ featuresData.js  │ │ howItWorksData  │ ┌─────────┴──────────┐            │
│  │ ⚠ REFACTORED    │ │ steps[]         │ │ testimonialsData   │            │
│  │ icon: 'heart'   │ └────────┬────────┘ │ testimonials[]     │            │
│  │ (was React comp)│          │          └─────────┬──────────┘            │
│  └───────┬─────────┘          │                    │                        │
│          │                    │          ┌─────────┴──────────┐            │
│  ┌───────┴─────────┐ ┌───────┴─────────┐ │ showroomData.js   │            │
│  │ iconMap.js       │ │ problemSolution │ │ showroomSites[]   │            │
│  │ NEW: string →   │ │ Data            │ └─────────┬──────────┘            │
│  │ lucide-react     │ │ problems[],     │           │                        │
│  │ component        │ │ solutions[]     │ ┌─────────┴──────────┐            │
│  └─────────────────┘ └─────────────────┘ │ footerData.js       │            │
│                                           │ footerLinks, breeds │            │
│  ┌─────────────────┐                      └────────────────────┘            │
│  │ constants/      │                                                        │
│  │ index.js        │  Consumed by BOTH .astro pages and .jsx islands        │
│  │ BRAND_*,        │  ─────────────────────────────────────────────         │
│  │ CALENDLY_URL,   │  .astro: import at top-level in frontmatter           │
│  │ TRUST_SIGNALS   │  .jsx:  import at top-level in module                  │
│  └─────────────────┘                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     UTILITY LAYER (framework-agnostic)                       │
│                                                                              │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐ │
│  │ lib/utils.js         │  │ lib/web3forms.js     │  │ utils/scrollTo.js   │ │
│  │ cn() — class merger  │  │ ⚠ UPDATED            │  │ scrollToSection()   │ │
│  │ (clsx + twMerge)    │  │                      │  │ scrollToTop()       │ │
│  │                      │  │ process.env.REACT_   │  │                     │ │
│  │ Used by: .astro +   │  │   → import.meta.env  │  │ Used by: Header.jsx │ │
│  │             .jsx     │  │   .PUBLIC_*          │  │ (island only)       │ │
│  │                      │  │                      │  │                     │ │
│  │                      │  │ fetch to             │  │ .astro uses         │ │
│  │                      │  │ api.web3forms.com    │  │ <a href="#id">      │ │
│  │                      │  │                      │  │ instead             │ │
│  └─────────────────────┘  └──────────┬──────────┘  └─────────────────────┘ │
│                                       │                                      │
│                                       ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐     │
│  │                    HOOKS (React-only, used by islands)              │     │
│  │                                                                      │     │
│  │  ┌───────────────────────────┐  ┌─────────────────────────────────┐ │     │
│  │  │ useFormSubmission.js      │  │ useScrollDetection.js            │ │     │
│  │  │                           │  │                                   │ │     │
│  │  │ Calls submitToWeb3Forms() │  │ useState(isScrolled)            │ │     │
│  │  │ Manages form values       │  │ useEffect scroll listener        │ │     │
│  │  │ Toasts on success/error   │  │ Returns boolean                  │ │     │
│  │  │                           │  │                                   │ │     │
│  │  │ Used by:                   │  │ Used by:                          │ │     │
│  │  │  Hero, CTA (×2),          │  │  Header.jsx                       │ │     │
│  │  │  LeadMagnet, PromoBanner  │  │                                   │ │     │
│  │  └───────────────────────────┘  └─────────────────────────────────┘ │     │
│  └─────────────────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────────┘
```

## UI Component Library (React-only, used by islands)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ui/ (React components)                               │
│                                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐                 │
│  │ button.jsx      │  │ card.jsx        │  │ input.jsx      │                 │
│  │                 │  │                 │  │                 │                 │
│  │ CVA variants:   │  │ HTML wrappers:  │  │ HTML wrapper:  │                 │
│  │  default        │  │  Card           │  │  <input>        │                 │
│  │  secondary      │  │  CardHeader     │  │                 │                 │
│  │  accent         │  │  CardTitle      │  │ Used by:        │                 │
│  │  outline        │  │  CardDesc       │  │  Hero, CTA,    │                 │
│  │  ghost          │  │  CardContent    │  │  LeadMagnet    │                 │
│  │  link           │  │  CardFooter     │  │                 │                 │
│  │  destructive    │  │                 │  └────────────────┘                 │
│  │                 │  │ Used by: Almost │  ┌────────────────┐                 │
│  │ CVA sizes:      │  │  all sections   │  │ textarea.jsx   │                 │
│  │  sm/default/lg/ │  │                 │  │                 │                 │
│  │  xl/icon        │  └────────────────┘  │ HTML wrapper:  │                 │
│  │                 │                      │  <textarea>     │                 │
│  │ asChild via     │  ┌────────────────┐  │                 │                 │
│  │ Radix Slot      │  │ accordion.jsx   │  │ Used by: CTA   │                 │
│  │                 │  │                 │  └────────────────┘                 │
│  │ Used by: Header,│  │ @radix-ui/react │  ┌────────────────┐                 │
│  │  Hero, CTA,     │  │ Accordion       │  │ badge.jsx      │                 │
│  │  Pricing, etc.  │  │ AccordionItem   │  │                 │                 │
│  └────────────────┘  │ AccordionTrigger│  │ CVA variants: │                 │
│                      │ AccordionContent│  │  default       │                 │
│  ┌────────────────┐  │                 │  │  secondary     │                 │
│  │ sonner.jsx      │  │ Used by: FAQ,  │  │  destructive   │                 │
│  │                 │  │  Pricing,       │  │  outline       │                 │
│  │ ⚠ UPDATED:     │  │  EthicalCommt  │  │                 │                 │
│  │  removed        │  └────────────────┘  │ Used by:        │                 │
│  │  next-themes    │                      │  Pricing        │                 │
│  │  theme="light"  │                      └────────────────┘                 │
│  │                 │                                                         │
│  │ Used by: All    │  DELETED (not ported):                                   │
│  │  forms via      │  dialog, sheet, dropdown-menu, tabs, calendar,           │
│  │  Layout.astro   │  checkbox, collapsible, command, context-menu,           │
│  └────────────────┘  hover-card, label, menubar, navigation-menu,            │
│                       pagination, popover, progress, radio-group,             │
│                       resizable, scroll-area, select, separator,             │
│                       skeleton, slider, switch, table, toast/toaster,         │
│                       toggle/toggle-group, tooltip, drawer, input-otp,        │
│                       aspect-ratio, avatar, carousel (embla wrapper)         │
└─────────────────────────────────────────────────────────────────────────────┘
```

## External Service Interactions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     WEB3FORMS API (serverless email)                         │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐     │
│  │                    Form Submission Flow                              │     │
│  │                                                                      │     │
│  │  User fills form ──► useFormSubmission() ──► submitToWeb3Forms()    │     │
│  │     in island         (React hook)           (lib/web3forms.js)     │     │
│  │                                                                      │     │
│  │  Payload:                                                            │     │
│  │  ┌──────────────────────────────────────────────────────────────┐   │     │
│  │  │ {                                                            │   │     │
│  │  │   access_key: import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY, │   │     │
│  │  │   name: "John Smith",                                        │   │     │
│  │  │   email: "john@example.com",                                │   │     │
│  │  │   breed: "Golden Retrievers",                               │   │     │
│  │  │   message: "...",                                            │   │     │
│  │  │   subject: "New contact — Puppy Breeder Pro website",       │   │     │
│  │  │   from_name: "John Smith",                                  │   │     │
│  │  │   // botcheck is STRIPPED before sending                    │   │     │
│  │  │ }                                                            │   │     │
│  │  └──────────────────────────────────────────────────────────────┘   │     │
│  │                           │                                          │     │
│  │                           ▼                                          │     │
│  │  POST https://api.web3forms.com/submit                              │     │
│  │  Content-Type: application/json                                     │     │
│  │                           │                                          │     │
│  │              ┌────────────┴────────────┐                              │     │
│  │              ▼                         ▼                              │     │
│  │        { success: true }        { success: false }                   │     │
│  │              │                         │                              │     │
│  │              ▼                         ▼                              │     │
│  │        toast.success()          toast.error()                        │     │
│  │        (Sonner)                 (Sonner)                            │     │
│  │        Reset form values      Show error message                    │     │
│  └─────────────────────────────────────────────────────────────────────┘     │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────┐             │
│  │  Spam Protection (client-side, no server)                   │             │
│  │                                                              │             │
│  │  ┌──────────────────────┐  ┌──────────────────────────────┐ │             │
│  │  │ Honeypot             │  │ Bot Detection                │ │             │
│  │  │                      │  │                              │ │             │
│  │  │ Hidden checkbox       │  │ If botcheck has a value,    │ │             │
│  │  │ display:none         │  │ submitToWeb3Forms() returns │ │             │
│  │  │ name="botcheck"      │  │ { success: false }          │ │             │
│  │  │ tabIndex=-1          │  │ WITHOUT calling the API     │ │             │
│  │  │ autoComplete=off     │  │                              │ │             │
│  │  │ Bots fill it →       │  │ Silently dropped             │ │             │
│  │  │ Humans leave empty   │  │                              │ │             │
│  │  └──────────────────────┘  └──────────────────────────────┘ │             │
│  └─────────────────────────────────────────────────────────────┘             │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────┐             │
│  │  Forms → Subject Lines                                     │             │
│  │                                                              │             │
│  │  Hero form:         "New lead — Puppy Breeder Pro website"   │             │
│  │  CTA contact:       "New contact — Puppy Breeder Pro website"│             │
│  │  CTA callback:      "New callback request — Puppy Breeder   │             │
│  │                       Pro website"                           │             │
│  │  LeadMagnet:        "New lead magnet download — Puppy        │             │
│  │                       Breeder Pro website"                  │             │
│  │  PromoBanner:       (uses scrollToSection, no form)          │             │
│  └─────────────────────────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Environment Variables

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     ENV VARIABLE FLOW                                        │
│                                                                              │
│  ┌───────────────────────────┐     ┌───────────────────────────────┐         │
│  │ .env (gitignored)         │     │ .env.example (committed)      │         │
│  │                           │     │                               │         │
│  │ PUBLIC_WEB3FORMS_ACCESS   │     │ PUBLIC_WEB3FORMS_ACCESS_KEY   │         │
│  │   _KEY=abc123-def456-...  │     │   =your-access-key-here       │         │
│  └───────────┬───────────────┘     └───────────────────────────────┘         │
│              │                                                              │
│              │  Astro automatically exposes PUBLIC_* vars to client           │
│              │                                                              │
│              ▼                                                              │
│  ┌───────────────────────────────────────────────────────────┐               │
│  │  Access patterns                                          │               │
│  │                                                            │               │
│  │  In .jsx React islands:                                   │               │
│  │    import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY           │               │
│  │    ↳ Used by: lib/web3forms.js                            │               │
│  │    ↳ Called by: useFormSubmission hook                    │               │
│  │    ↳ Called by: Hero, CTA, LeadMagnet forms               │               │
│  │                                                            │               │
│  │  In .astro components:                                    │               │
│  │    import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY           │               │
│  │    (available but not used — forms are React islands)     │               │
│  └───────────────────────────────────────────────────────────┘               │
│                                                                              │
│  ⚠  Migration note:                                                         │
│  OLD: process.env.REACT_APP_WEB3FORMS_ACCESS_KEY (CRA convention)         │
│  NEW: import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY (Astro convention)       │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Client-Side JavaScript Budget

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     HYDRATED ISLANDS — JS COST ESTIMATE                     │
│                                                                              │
│  client:load islands (eager, above fold):                                  │
│  ┌───────────────────────┬──────────────┬──────────────────────┐             │
│  │ Island                 │ Est. JS KB   │ Dependencies          │             │
│  ├───────────────────────┼──────────────┼──────────────────────┤             │
│  │ Header.jsx            │ ~2 KB       │ lucide-react (2 icons)│             │
│  │ Hero.jsx              │ ~3 KB       │ CountUp, form hook    │             │
│  │ Pricing.jsx            │ ~4 KB       │ Radix accordion, CVA  │             │
│  │ PromoBanner.jsx       │ ~1 KB       │ lucide-react (1 icon) │             │
│  ├───────────────────────┼──────────────┼──────────────────────┤             │
│  │ Subtotal: ~10 KB      │              │                        │             │
│  └───────────────────────┴──────────────┴──────────────────────┘             │
│                                                                              │
│  client:visible islands (lazy, on scroll):                                  │
│  ┌───────────────────────┬──────────────┬──────────────────────┐             │
│  │ Island                 │ Est. JS KB   │ Dependencies          │             │
│  ├───────────────────────┼──────────────┼──────────────────────┤             │
│  │ CTA.jsx               │ ~3 KB       │ form hook, 6 icons   │             │
│  │ LeadMagnet.jsx        │ ~2 KB       │ form hook, 1 icon    │             │
│  │ FAQ.jsx                │ ~3 KB       │ Radix accordion      │             │
│  │ EthicalCommitment.jsx  │ ~3 KB       │ Radix accordion      │             │
│  │ DashboardCarousel.jsx │ ~8 KB       │ embla-carousel        │             │
│  │ CountUp.jsx            │ ~1 KB       │ IntersectionObserver │             │
│  ├───────────────────────┼──────────────┼──────────────────────┤             │
│  │ Subtotal: ~20 KB      │              │                        │             │
│  └───────────────────────┴──────────────┴──────────────────────┘             │
│                                                                              │
│  Shared React runtime (loaded once):              ~7 KB                      │
│  Shared UI components (button, card, etc.):       ~3 KB                      │
│  Sonner toast library:                            ~4 KB                      │
│  Vanilla reveal script (not React):                ~0.5 KB                    │
│                                                                              │
│  ─────────────────────────────────────────                                   │
│  TOTAL ESTIMATED:                          ~25–30 KB gzipped                │
│                                                                              │
│  vs. Current CRA build:                    ~102 KB gzipped                  │
│                                                                              │
│  REDUCTION:                                ~70–75% less JS                   │
│                                                                              │
│  Note: client:visible islands only load when scrolled into view,             │
│  so initial page load only ships ~17 KB (client:load + runtime +            │
│  reveal script). The remaining ~13 KB loads progressively.                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Build Output Mapping

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     ASTRO BUILD OUTPUT                                       │
│                                                                              │
│  dist/                                                                       │
│  ├── index.html                     ← All static HTML inlined              │
│  ├── _astro/                                                                  │
│  │   ├── global.CSS-hash.css        ← Tailwind + custom CSS                │
│  │   ├── Header-hash.js             ← client:load island                   │
│  │   ├── Hero-hash.js               ← client:load island                  │
│  │   ├── Pricing-hash.js            ← client:load island                   │
│  │   ├── PromoBanner-hash.js        ← client:load island                   │
│  │   ├── CTA-hash.js                ← client:visible island                │
│  │   ├── LeadMagnet-hash.js         ← client:visible island                │
│  │   ├── FAQ-hash.js                ← client:visible island               │
│  │   ├── EthicalCommitment-hash.js  ← client:visible island               │
│  │   ├── DashboardCarousel-hash.js  ← client:visible island               │
│  │   ├── CountUp-hash.js            ← client:visible island               │
│  │   ├── react-vendor-hash.js       ← Shared React runtime                │
│  │   └── reveal-hash.js            ← Vanilla IntersectionObserver          │
│  ├── fonts/                                                                   │
│  │   └── (Google Fonts cache, optional)                                     │
│  └── showroom/                                                                │
│      └── (local images if any)                                                │
│                                                                              │
│  Key difference from CRA:                                                    │
│  ──────────────────────                                                      │
│  CRA: dist/static/js/main.HASH.js   ← ONE 102 KB file (everything)         │
│  Astro: dist/_astro/*.HASH.js       ← MANY small files (islands only)      │
│  CRA: HTML is empty (<div id="root">)                                       │
│  Astro: HTML has all static content baked in (SEO, fast FCP)                │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Dependency Comparison

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CURRENT (CRA/CRACO)                  │  NEW (Astro)                         │
│  ─────────────────────                 │  ─────────────────                   │
│  57 production deps                   │  18 production deps                  │
│  14 dev deps                          │  4 dev deps                          │
│  ─────────────────────                 │  ─────────────────                   │
│                                         │                                      │
│  react 19                 ✅ KEEP       │  astro 5                             │
│  react-dom 19             ✅ KEEP       │  @astrojs/react 4                    │
│  react-scripts 5          ❌ DROP       │  @astrojs/tailwind 6                │
│  @craco/craco 7           ❌ DROP       │  astro-icon 1                        │
│  react-router-dom 7       ❌ DROP       │  @iconify-json/lucide 1             │
│  @radix-ui/react-acc 1.2 ✅ KEEP       │  react 19                            │
│  @radix-ui/react-slot 1.2✅ KEEP       │  react-dom 19                        │
│  @radix-ui (14 others)   ❌ DROP ALL   │  @radix-ui/react-accordion 1.2       │
│  axios 1.8                ❌ DROP       │  @radix-ui/react-slot 1.2            │
│  next-themes 0.4          ❌ DROP       │  class-variance-authority 0.7        │
│  react-day-picker 9       ❌ DROP       │  clsx 2.1                            │
│  date-fns 4               ❌ DROP       │  tailwind-merge 3.2                  │
│  cmdk 1.1                 ❌ DROP       │  lucide-react 1.11                   │
│  input-otp 1.4            ❌ DROP       │  sonner 2.0                          │
│  react-resizable-panels 3  ❌ DROP       │  embla-carousel-react 8.6            │
│  recharts 3                ❌ DROP       │                                      │
│  vaul 1.1                  ❌ DROP       │  ── dev deps ──                      │
│  react-hook-form 7        ❌ DROP       │  tailwindcss 3.4                     │
│  @hookform/resolvers 5    ❌ DROP       │  tailwindcss-animate 1.0             │
│  zod 3                     ❌ DROP       │  autoprefixer 10.4                   │
│  cra-template 1.2         ❌ DROP       │  postcss 8.4                         │
│  class-variance-auth 0.7  ✅ KEEP       │                                      │
│  clsx 2.1                  ✅ KEEP       │                                      │
│  tailwind-merge 3.2       ✅ KEEP       │                                      │
│  lucide-react 1.11        ✅ KEEP       │                                      │
│  sonner 2.0               ✅ KEEP       │                                      │
│  embla-carousel 8.6      ✅ KEEP       │                                      │
│  @emergentbase/visual     ❌ DROP       │                                      │
│  @babel/plugin            ❌ DROP       │                                      │
│  eslint + 5 plugins       ❌ DROP ALL   │                                      │
│  globals 15               ❌ DROP       │                                      │
│                                         │                                      │
│  node_modules: ~350 MB     │  node_modules: ~120 MB (est.)                   │
│  Build output: 120 KB     │  Build output: ~30 KB JS + full HTML            │
└─────────────────────────────────────────────────────────────────────────────┘
```

## File-by-File Change Inventory

```
┌──────────────────────────────────┬──────────┬───────────────────────────────────┐
│ Source File (frontend/)          │ Action   │ Target (frontend-astro/)           │
├──────────────────────────────────┼──────────┼───────────────────────────────────┤
│ src/App.js                       │ DELETE   │ (replaced by index.astro)          │
│ src/App.css                      │ MERGE    │ src/styles/global.css (4 lines)    │
│ src/index.js                     │ DELETE   │ (Astro handles rendering)          │
│ src/index.css                    │ PORT     │ src/styles/global.css              │
│ src/components/Header.jsx        │ PORT     │ src/components/Header.jsx          │
│ src/components/Hero.jsx          │ PORT     │ src/components/Hero.jsx            │
│ src/components/ProblemSolution   │ REWRITE  │ src/components/ProblemSolution.astro│
│ src/components/HowItWorks.jsx    │ REWRITE  │ src/components/HowItWorks.astro    │
│ src/components/Features.jsx      │ REWRITE  │ src/components/Features.astro      │
│ src/components/DashboardCarousel │ PORT     │ src/components/DashboardCarousel.jsx│
│ src/components/Showroom.jsx      │ REWRITE  │ src/components/Showroom.astro      │
│ src/components/SiteShowcaseCard  │ REWRITE  │ src/components/SiteShowcaseCard.astro│
│ src/components/LeadMagnet.jsx    │ PORT     │ src/components/LeadMagnet.jsx      │
│ src/components/Pricing.jsx       │ PORT     │ src/components/Pricing.jsx          │
│ src/components/Testimonials.jsx  │ REWRITE  │ src/components/Testimonials.astro  │
│ src/components/FounderSection.jsx│ REWRITE  │ src/components/FounderSection.astro│
│ src/components/FAQ.jsx            │ PORT     │ src/components/FAQ.jsx              │
│ src/components/EthicalCommitment  │ PORT     │ src/components/EthicalCommitment.jsx│
│ src/components/CTA.jsx            │ PORT     │ src/components/CTA.jsx              │
│ src/components/Footer.jsx        │ REWRITE  │ src/components/Footer.astro        │
│ src/components/PromoBanner.jsx   │ PORT     │ src/components/PromoBanner.jsx     │
│ src/components/Reveal.jsx        │ DELETE   │ (replaced by vanilla JS + CSS)    │
│ src/components/CountUp.jsx       │ PORT     │ src/components/CountUp.jsx          │
│ src/components/ui/button.jsx     │ PORT     │ src/ui/button.jsx                  │
│ src/components/ui/card.jsx       │ PORT     │ src/ui/card.jsx                    │
│ src/components/ui/input.jsx      │ PORT     │ src/ui/input.jsx                   │
│ src/components/ui/textarea.jsx   │ PORT     │ src/ui/textarea.jsx                │
│ src/components/ui/accordion.jsx  │ PORT     │ src/ui/accordion.jsx              │
│ src/components/ui/badge.jsx      │ PORT     │ src/ui/badge.jsx                   │
│ src/components/ui/sonner.jsx     │ PORT+UPD │ src/ui/sonner.jsx (rm next-themes) │
│ src/components/ui/(30 others)    │ DELETE   │ (unused, not ported)               │
│ src/data/navigationData.js       │ PORT     │ src/data/navigationData.js         │
│ src/data/featuresData.js        │ REFACTOR │ src/data/featuresData.js (icon strs)│
│ (new)                            │ CREATE   │ src/data/iconMap.js                │
│ src/data/pricingData.js         │ PORT     │ src/data/pricingData.js            │
│ src/data/testimonialsData.js    │ PORT     │ src/data/testimonialsData.js       │
│ src/data/howItWorksData.js      │ PORT     │ src/data/howItWorksData.js         │
│ src/data/problemSolutionData.js │ PORT     │ src/data/problemSolutionData.js    │
│ src/data/faqData.js             │ PORT     │ src/data/faqData.js                │
│ src/data/showroomData.js        │ PORT     │ src/data/showroomData.js           │
│ src/data/footerData.js          │ PORT     │ src/data/footerData.js             │
│ src/hooks/useFormSubmission.js  │ PORT     │ src/hooks/useFormSubmission.js     │
│ src/hooks/useScrollDetection.js │ PORT     │ src/hooks/useScrollDetection.js   │
│ src/hooks/use-toast.js          │ PORT     │ src/hooks/use-toast.js             │
│ src/lib/utils.js                │ PORT     │ src/lib/utils.js                   │
│ src/lib/web3forms.js            │ PORT+UPD │ src/lib/web3forms.js (env var)    │
│ src/constants/index.js          │ PORT     │ src/constants/index.js             │
│ src/utils/scrollTo.js           │ PORT     │ src/utils/scrollTo.js              │
│ tailwind.config.js              │ PORT+UPD │ tailwind.config.mjs (paths)        │
│ postcss.config.js               │ PORT     │ postcss.config.mjs                 │
│ craco.config.js                 │ DELETE   │ (replaced by astro.config.mjs)     │
│ jsconfig.json                   │ PORT+UPD │ jsconfig.json (paths)              │
│ .env.example                    │ PORT+UPD │ .env.example (PUBLIC_ prefix)      │
│ .gitignore                      │ PORT+UPD │ .gitignore (Astro entries)         │
│ WEB3FORMS.md                    │ PORT+UPD │ WEB3FORMS.md (env var names)       │
│ public/index.html               │ DELETE   │ (Astro generates HTML)             │
│ public/showroom/README.md       │ PORT     │ public/showroom/README.md          │
│ plugins/                        │ DELETE   │ (Astro has its own dev server)     │
├──────────────────────────────────┼──────────┼───────────────────────────────────┤
│ TOTALS:                          │          │                                    │
│   19 components → 11 .jsx + 8 .astro                                   │
│   Delete Reveal.jsx (vanilla JS replacement)                            │
│   Delete 30 unused UI components                                        │
│   Create iconMap.js, Layout.astro, index.astro                         │
│   Port 9 data files (1 refactored)                                      │
│   Port 3 hooks, 2 libs, 1 constants, 1 utility                         │
│   Port 7 UI components (1 updated)                                      │
└──────────────────────────────────┴──────────┴───────────────────────────────────┘
```

## Page Section Flow (User's View)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│   ┌─────────────────────────────────────── ──────────────────────────┐       │
│   │  PromoBanner.jsx          client:load                             │       │
│   │  [🎉 Limited Offer: First month 50% off...     ✕]               │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                               │
│   ┌─────────────────────────────────────────────────────────────────┐       │
│   │  Header.jsx                client:load                          │       │
│   │  [🐾 PuppyBreeder.PRO  Features  How It Works  Pricing  ...]   │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                               │
│   ┌─────────────────────────────────────────────────────────────────┐       │
│   │  Hero.jsx                  client:load                          │       │
│   │  [Your Breeding Program Deserves a Professional Website]       │       │
│   │  [your@email.com  ▶  Book Free Demo]     ← FORM ISLAND         │       │
│   │  [48hrs  28+  100%]                     ← CountUp ISLAND       │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                               │
│   ┌─ data-reveal ──────────────────────────────────────────────────┐       │
│   │  ProblemSolution.astro     ZERO JS                             │       │
│   │  [We Get It. Website Builders Weren't Made for Breeders.]       │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                               │
│   ┌─ data-reveal ──────────────────────────────────────────────────┐       │
│   │  HowItWorks.astro          ZERO JS                             │       │
│   │  [Schedule → Build → Control]  [Start Your Journey Today →]     │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                               │
│   ┌─ data-reveal ──────────────────────────────────────────────────┐       │
│   │  Features.astro            ZERO JS                             │       │
│   │  [Beautiful Puppy Profiles  Health Certification  ...]         │       │
│   │  ┌─────────────────────────────────────────────────────────┐    │       │
│   │  │  DashboardCarousel.jsx   client:visible                │    │       │
│   │  │  [◀ Admin Dashboard slide 1 ▶]  [● ○ ○ dots]           │    │       │
│   │  └─────────────────────────────────────────────────────────┘    │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                               │
│   ┌─ data-reveal ──────────────────────────────────────────────────┐       │
│   │  Showroom.astro            ZERO JS                             │       │
│   │  [Sunrise Goldens] [Northwood Cavaliers] [Silverpaw] [Evergreen]│      │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                               │
│   ┌─ data-reveal ──────────────────────────────────────────────────┐       │
│   │  LeadMagnet.jsx            client:visible                      │       │
│   │  [Free Guide · 7 Must-Haves...  your@email.com  Send PDF]     │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                               │
│   ┌─────────────────────────────────────────────────────────────────┐       │
│   │  Pricing.jsx               client:load                          │       │
│   │  [Monthly ○─● Yearly]  $79/mo  [Get Started]                  │       │
│   │  [Common Questions ▾ accordion]                                  │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                               │
│   ┌─ data-reveal ──────────────────────────────────────────────────┐       │
│   │  Testimonials.astro        ZERO JS                             │       │
│   │  [★★★★★ "My PuppyBreeder.PRO website has been..."]              │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                               │
│   ┌─ data-reveal ──────────────────────────────────────────────────┐       │
│   │  FounderSection.astro      ZERO JS                             │       │
│   │  [Photo] [From a Fellow Dog Lover — Steven Olsen]              │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                               │
│   ┌─ data-reveal ──────────────────────────────────────────────────┐       │
│   │  FAQ.jsx                   client:visible                       │       │
│   │  [▸ How long does it take to launch?]                           │       │
│   │  [▸ Do I need technical skills?]                                │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                               │
│   ┌─ data-reveal ──────────────────────────────────────────────────┐       │
│   │  EthicalCommitment.jsx     client:visible                       │       │
│   │  [🛡 Our Ethical Commitment (click to read) ▾]                  │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                               │
│   ┌─ data-reveal ──────────────────────────────────────────────────┐       │
│   │  CTA.jsx                   client:visible                       │       │
│   │  ┌─ Contact Form ─────────────────────────────────────────┐    │       │
│   │  │ [Name] [Email] [Breed] [Message] [Start Your Journey →]│    │       │
│   │  └────────────────────────────────────────────────────────┘    │       │
│   │  ┌─ Callback Form ────────────────────────────────────────┐    │       │
│   │  │ [Name] [Phone] [Time] [Request a Callback]             │    │       │
│   │  └─────────────────────────────────────────────────────────-┘    │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                               │
│   ┌─────────────────────────────────────────────────────────────────┐       │
│   │  Footer.astro              ZERO JS                              │       │
│   │  [🐾 PuppyBreeder.PRO  Product  Support  © 2026]               │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                               │
│   LEGEND:                                                                     │
│     client:load  = JS loads immediately (above fold / critical)             │
│     client:visible = JS loads when scrolled into view (below fold)          │
│     data-reveal = CSS-only animation via vanilla IntersectionObserver        │
│     ZERO JS = Pure HTML, no JavaScript shipped for this section             │
└──────────────────────────────────────────────────────────────────────────────┘
```