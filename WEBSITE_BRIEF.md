# GenMyo Website — End-to-End Brief

> Context document for AI assistants. Describes what the site is, who it's for, how it's built, and what each page does.

---

## What Is GenMyo?

**GenMyo** is an AI-led platform for inner wellness and human development. It offers a calmer alternative to noisy wellness culture — helping people pause, reflect, and grow at their own pace without pressure, hype, or judgement.

The **live product** today is **The Mirror Project**: a guided WhatsApp experience where users receive short reflection prompts and gentle AI responses. Sessions take ~2 minutes. No app download required.

GenMyo is building toward a fuller platform in three phases:

| Phase | Name | Status | Description |
|-------|------|--------|-------------|
| 01 | **The Mirror Project** | Live | WhatsApp-based guided reflection; build clarity and daily habits |
| 02 | **Personalised Growth** | Coming Soon | AI adapts to user patterns; tailored prompts and progress |
| 03 | **The Full Platform** | On the Horizon | Expert content, structured pathways, community spaces |

**Primary conversion goal:** Get users to register on `/join`, then open WhatsApp and send "Hello" or "Mirror" to activate The Mirror.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 (dev on port 8080) |
| Routing | react-router-dom v6 (client-side SPA) |
| Styling | Tailwind CSS + custom design tokens (`src/index.css`) |
| UI components | shadcn/ui (Radix primitives) — only Join page uses form components |
| Validation | Zod (Join page only) |
| Deployment | Vercel (SPA rewrites + API proxy) |

**Content:** 100% hardcoded in page components. No CMS, no API for page content, no i18n.

**Path alias:** `@/` → `src/`

---

## Site Architecture

```
index.html
  └── src/main.tsx
        └── src/App.tsx
              ├── QueryClientProvider (unused for data fetching)
              ├── TooltipProvider
              ├── Toasters (Radix + Sonner)
              └── BrowserRouter
                    ├── ScrollToTop (resets scroll on route change)
                    └── Routes → Page components
                          └── Layout (most pages)
                                ├── Navigation (fixed header)
                                ├── <main> page content
                                └── Footer
```

**Layout** (`src/components/Layout.tsx`): Wraps every page except 404 with fixed nav + footer. Main content has `pt-20` to clear the fixed header.

**Navigation links:** Home, Our Philosophy, The Plan, Team — plus a "Join Now" CTA button.

**Footer:** Brand blurb, nav links, `admin@genmyo.ai`, LinkedIn, Facebook, copyright, link to Terms.

---

## Routes & Pages

### `/` — Homepage (`src/pages/Index.tsx`)

Marketing landing page. Six sections:

1. **Hero** — "Your AI-powered guide for clarity, resilience and better daily decisions." CTAs: Start your first session (`/join`), Learn about the Mirror Project (`/plan`).
2. **About GenMyo** — Brand positioning; Mirror Project as the first step inward.
3. **3-Phase Product Cards** — Live (Mirror), Coming Soon (Personalised Growth), On The Horizon (Full Platform).
4. **Early Voices (Testimonials)** — Three hardcoded quotes from Sarah A. (Singapore), Marcus K. (London), Nadia R. (Dubai).
5. **Why We Built This** — Stats grid: 2 min sessions, 89% return rate, 0 apps to download.
6. **Final CTA** — "Ready to pause and reflect?" → Join on WhatsApp.

---

### `/philosophy` — Our Philosophy (`src/pages/Philosophy.tsx`)

Brand story and values page.

- **Origin story** — Born from personal experience; addresses a crisis existing tools fail to solve.
- **User personas** — Aisha (22, Gen Z, career uncertainty) and David (43, Millennial, burnout & transition), with photos.
- **Pain points** — Three problems GenMyo addresses.
- **Four principles:**
  - Capacities, Not Content
  - AI Supports, Never Replaces
  - Personalized Pathways
  - Integrated, Not Fragmented
- CTAs to `/plan` and `/join`.

---

### `/plan` — The Plan (`src/pages/Plan.tsx`)

Detailed product roadmap with visual timeline.

- Three phases with images (`phase-crawl.jpg`, `phase-walk.jpg`, `phase-run.jpg`).
- Circular timeline with status badges: active / upcoming / future.
- Alternating two-column layout per phase (description + outcome card).
- CTA to `/join`.

---

### `/team` — Team (`src/pages/Team.tsx`)

Founding team and advisory network.

- **Rajit Punshi** — Founder. 25+ years global leadership; governance, risk, systems design. Built GenMyo as AI-first, human-enabled architecture for inner capability.
- **Sid Punshi** — Product & Growth. Background in product, growth, and community building.
- **Advisory Network** — Brief section on expert advisors.
- Photos: `Rajit.png`, `sid.png`.

---

### `/join` — Registration (`src/pages/Join.tsx`)

**The only page with live backend integration.** Registration form that onboards users to The Mirror Project via WhatsApp.

**Form fields:**
- First name, surname (required)
- Email (required)
- Date of birth — format `dd/mm/yy` (required)
- WhatsApp number — country code dropdown + local number (required)
- Country, city (required)
- "What made you interested in GenMyo?" (optional, max 500 chars)

**Submission flow:**

```
User submits form
  → Zod validation
  → POST /api/register (AWS API Gateway)
      → 409: show "phone already registered" error
      → OK or network error: continue anyway
  → POST to Google Form (hidden iframe, parallel backup)
  → Open WhatsApp deep link in new tab
  → Show success screen ("Send Hello or Mirror to activate")
```

**External endpoints (hardcoded):**
- Registration API: `/api/register` → `https://hb4ngs4y66.execute-api.ap-south-1.amazonaws.com/register`
- Google Form: `https://docs.google.com/forms/u/0/d/e/1FAIpQLSdYB479pboOh2TO8dgUFSObYR5Kd7P0qOhw30kgJ0A33-jzqw/formResponse`
- WhatsApp: `https://wa.me/message/Y4GOKBIGBWUUM1?text=HI`

**Proxy config:**
- Dev: `vite.config.ts` proxies `/api/register` to AWS
- Prod: `vercel.json` rewrites `/api/register` to AWS

**Google Form field mapping (entry IDs):**
- `entry.1907368519` — first name
- `entry.1208177102` — surname
- `entry.44984313` — email
- `entry.1640555608` — DOB
- `entry.1030588086` — WhatsApp (full number with country code)
- `entry.1418652324` — country
- `entry.142785906` — city
- `entry.79544609` — context (optional)

---

### `/terms` — Terms & Conditions (`src/pages/Terms.tsx`)

Full legal document — **Terms & Conditions v3.2 (February 2026)**.

18 sections covering: acceptance, service description, eligibility, user conduct, IP, disclaimers, liability, termination, governing law, etc.

**Section 17** is WhatsApp-specific: opt-in consent, message frequency, data use, opt-out instructions.

Footer links here as "Privacy & Terms" (no separate privacy page).

Contact emails referenced: `admin@genmyo.ai`, `privacy@genmyo.ai`, `legal@genmyo.ai`.

---

### `*` — 404 Not Found (`src/pages/NotFound.tsx`)

Minimal 404 page. No Layout (no nav/footer). Logs path to console. Link back to home.

---

## Design System

**Fonts:** Cormorant Garamond (serif headings), Inter (sans body) — loaded from Google Fonts.

**Palette (warm earthy):**
- Primary: warm brown (`hsl(25 35% 35%)`)
- Accent: terracotta (`hsl(20 45% 55%)`)
- Background: cream/off-white
- Custom tokens: `--cream`, `--sand`, `--terracotta`, etc.

**Reusable CSS classes** (in `src/index.css`):
- `.heading-display`, `.heading-section` — serif headings
- `.section-padding` — consistent vertical spacing
- `.container-wide`, `.container-narrow` — max-width containers
- `.bg-gradient-hero` — hero section gradient
- `.text-gradient` — accent gradient text
- `.animate-fade-up`, `.animate-fade-in` — entrance animations
- `.card-elevated` — elevated card shadow

**CTA pattern:** Pill-shaped buttons (`rounded-full`), primary brown or terracotta accent.

Dark mode CSS variables exist but no theme toggle is wired up.

---

## Assets

| File | Used by |
|------|---------|
| `src/assets/genmyo-logo.png` | Header logo (`Logo.tsx`) |
| `src/assets/gemmo-white.png` | Footer logo (`FooterLogo.tsx`) |
| `src/assets/phase-crawl.jpg` | Plan page — Phase 1 |
| `src/assets/phase-walk.jpg` | Plan page — Phase 2 |
| `src/assets/phase-run.jpg` | Plan page — Phase 3 |
| `src/assets/persona-aisha.jpg` | Philosophy page |
| `src/assets/persona-david.jpg` | Philosophy page |
| `src/assets/Rajit.png` | Team page |
| `src/assets/sid.png` | Team page |
| `public/favicon.ico` | Site favicon |
| `public/robots.txt` | Allows all crawlers |

**Unused:** `genmyo-task.png`, `ResourcesSection.tsx` (built but never imported).

---

## External Integrations

| Integration | Purpose | Where |
|-------------|---------|-------|
| AWS API Gateway | Registration + duplicate phone check | `/join` via `/api/register` proxy |
| Google Forms | Backup/parallel registration data collection | `/join` hidden iframe POST |
| WhatsApp Business | Primary product channel + post-signup redirect | CTAs site-wide, `/join` success |
| LinkedIn | Social link | Footer |
| Facebook | Social link | Footer |
| Google Apps Script | Alternate registration when form submitted directly | `scripts/google_form_register_apps_script.*.js` |

---

## Key Conventions

- Every page (except 404) wraps content in `<Layout>`.
- Pages are built from semantic `<section>` blocks with shared layout classes.
- Navigation uses plain `react-router-dom` `Link` with manual `isActive` check.
- Join form uses manual `useState` + Zod `safeParse` (not react-hook-form).
- All marketing copy, testimonials, personas, team bios, and legal text are inline in page files.
- Brand naming varies: "GenMyo", "Genmyo", "GENMYŌ" appear in different places.
- `index.html` meta title/description still say "Genmyo Path" (placeholder).

---

## npm Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server on port 8080 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest (placeholder test only) |

---

## What This Site Is NOT

- Not a logged-in app or dashboard
- Not a content management system
- Not the WhatsApp product itself (that lives on WhatsApp after signup)
- Not using react-query, react-hook-form, or most shadcn components in practice (template leftovers)

---

## Quick Reference for AI Tasks

| Task type | Start here |
|-----------|------------|
| Change homepage copy | `src/pages/Index.tsx` |
| Update roadmap/phases | `src/pages/Plan.tsx` + `src/pages/Index.tsx` (phase cards) |
| Edit brand story | `src/pages/Philosophy.tsx` |
| Modify registration flow | `src/pages/Join.tsx` + `vite.config.ts` + `vercel.json` |
| Update legal text | `src/pages/Terms.tsx` |
| Change nav/footer links | `src/components/Navigation.tsx`, `src/components/Footer.tsx` |
| Adjust design tokens/colors | `src/index.css`, `tailwind.config.ts` |
| Add a new route | `src/App.tsx` + new file in `src/pages/` |
| Fix SEO/meta tags | `index.html` |
