---
name: GenMyō
description: Quiet WhatsApp reflection — warm paper, terracotta accent, gold CTAs on dark hero
colors:
  soft-white: "#fbfaf8"
  cream: "#f5f1ea"
  background: "#faf8f5"
  sand: "#e4dbcd"
  border: "#e0dad1"
  secondary: "#e8e2d9"
  muted: "#efebe7"
  muted-foreground: "#847362"
  foreground: "#30261d"
  ink: "#1c1a16"
  deep-brown: "#47301f"
  primary: "#78543a"
  warm-brown: "#78543a"
  accent: "#c07b59"
  terracotta-ui: "#b0703e"
  gold: "#c2a051"
  gold-foreground: "#261f17"
  hero-from: "#342c23"
  hero-to: "#181411"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.875rem, 3vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.65rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "1rem"
  xl: "1.5rem"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section-y: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-foreground}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-foreground}"
  button-accent:
    backgroundColor: "{colors.terracotta-ui}"
    textColor: "{colors.soft-white}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  input-field:
    backgroundColor: "{colors.soft-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "8px 12px"
  card-surface:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "32px"
  nav-link:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.body}"
---

# Design System: GenMyō

## Overview

**Creative North Star: "The Quiet Mirror"**

GenMyō’s interface behaves like a still room with one clear reflection — private, unhurried, and free of wellness noise. The system pairs warm paper surfaces (cream, sand) with deep ink and a restrained terracotta accent for trust and emphasis. Hero moments shift into a dark charcoal field lit by candle-gold CTAs, then return to paper for reading and forms.

Personality is calm and honest: Cormorant Garamond carries serif display with light–medium weight; Inter handles body and UI. Density stays airy (generous section padding, narrow content columns). Motion is soft fade/slide entrance only — never gamified bounce.

**Confirmed rejections (from PRODUCT + incumbent code):** No purple-gradient AI clichés; no loud streak/gamification chrome; no clinical cold white dashboard aesthetic; do not replace the warm earth + gold grading already live on genmyo.ai.

**Key Characteristics:**
- Dual atmosphere: dark/gold hero ↔ cream paper content
- Serif headlines + sans UI
- Pill (full-round) primary CTAs in gold or terracotta
- Soft lift on interactive panels; flat section fields
- Uppercase tracked labels as quiet section eyebrows

## Colors

A warm earthy palette with one hero gold — paper for calm, terracotta for meaning, gold for action.

### Primary
- **Warm Soil** (`#78543a` / `hsl(25 35% 35%)` → `{colors.primary}`): Brand brown for links-on-paper, primary UI chrome, and serif emphasis. Used as `--primary` / `--warm-brown`.

### Secondary
- **Clay Ember** (`#b0703e` UI / `#c07b59` token accent): Trust, eyebrows, italic emphasis, secondary CTAs. Prefer `{colors.terracotta-ui}` in marketing copy accents; token `{colors.accent}` is the CSS variable cousin.

### Tertiary
- **Candle Gold** (`#c2a051` / `{colors.gold}`): Hero and join primary CTAs (`bg-gold`). Paired with `{colors.gold-foreground}` ink. Reserved for decisive actions — scarcity is the point.

### Neutral
- **Rice Paper** (`#faf8f5` / `{colors.background}`): Default page ground.
- **Warm Parchment** (`#f5f1ea` / `{colors.cream}`): Cards, form panels, soft fills (`#F4F0E7` appears as a close sibling in some pages).
- **Desert Sand** (`#e4dbcd` / `{colors.sand}`): Gradients and secondary washes.
- **Ink Charcoal** (`#1c1a16` / `{colors.ink}`): Highest-contrast marketing text on paper (join, privacy).
- **Soft Umber** (`#30261d` / `{colors.foreground}`): Default body ink from tokens.
- **Stone Caption** (`#847362` / `{colors.muted-foreground}`): Helper and meta text.
- **Hairline Clay** (`#e0dad1` / `{colors.border}`): Dividers and field borders.
- **Hero Ember / Embers** (`#342c23` → `#181411`): Dark hero radial only (`bg-hero-dark`).

### Named Rules
**The Two-Atmosphere Rule.** Dark charcoal + gold belongs to hero (and matching dark heroes). Content after the hero returns to paper — do not muddy cream sections with black panels without cause.

**The One Voice Rule.** Gold and terracotta are action/trust accents. Keep accent area small on any screen; body stays ink-on-paper.

## Typography

**Display Font:** Cormorant Garamond (Georgia fallback)  
**Body Font:** Inter (system-ui fallback)

**Character:** Editorial serif for feeling and stillness; quiet sans for forms and navigation. Light–medium serif weights read reflective, not flashy.

### Hierarchy
- **Display** (medium, `heading-display` / clamp ~2.25–4.5rem, ~1.1): Home and campaign heroes.
- **Headline** (medium, `heading-section` / ~1.875–3rem, ~1.2): Section titles.
- **Title** (medium serif, ~1.5–2rem): Card and form titles.
- **Body** (regular Inter, 1rem / 1.625): Default copy; large body via `.text-body-large`.
- **Label** (semibold Inter, ~0.65rem, tracking ~0.18em, uppercase): Eyebrows (“Join The Mirror Project”, “Before you begin”).

### Named Rules
**The Serif Speaks / Sans Serves Rule.** Headlines and reflective lines use Cormorant; controls, helpers, and nav use Inter.

## Layout

Wide shell: `.container-wide` max ~7xl with generous horizontal padding. Reading/forms: `.container-narrow` max ~4xl. Section rhythm: `.section-padding` (~py-16 → py-28). Join uses a ~5xl two-column grid (form left, trust rail right on desktop). Mobile stacks form first. Sticky bottom CTA bar on join (mobile). Spacing favors 8px rhythm with large vertical section gaps.

**The Air Around Clarity Rule.** Prefer one job per viewport band; do not pack stats or promo strips into the first hero.

## Elevation & Depth

Hybrid: section backgrounds stay flat paper or soft warm gradients; interactive panels and cards use soft tonal lift.

### Shadow Vocabulary
- **Soft** (`0 4px 20px -4px hsl(30 25% 15% / 0.08)`): Cards, elevated content (`.card-elevated`, `--shadow-soft`).
- **Elevated** (`0 12px 40px -8px hsl(30 25% 15% / 0.12)`): Occasional stronger panel lift.
- **Form panel** (join): light custom soft shadow on cream panels.

### Named Rules
**The Flat-By-Default Rule.** Body copy sections don’t cast shadows. Lift appears on cards, form shells, and hoverable tiles.

## Shapes

Base radius `--radius: 0.5rem` (8px). Tailwind `rounded-md` / `lg` / `2xl` for panels (~8–22px). Primary CTAs and key actions use **full pill** (`rounded-full`). Inputs stay medium radius (~8px), height 40px for rhythm with comboboxes. Hairline borders in clay/border tokens; avoid heavy multi-layer chrome.

**The Pill Is the Promise Rule.** The main WhatsApp CTA is a full-round gold (or terracotta) pill — not a sharp rectangle.

## Components

### Buttons
- **Shape:** Full pill for primary marketing/join CTAs; medium radius for quieter UI buttons.
- **Primary:** Gold fill (`bg-gold`) + dark ink text; generous vertical padding (~py-4 / `py-6` on join submit).
- **Accent:** Terracotta fill (`#B0703E`) for alternate strong actions.
- **Hover / Focus:** Opacity nudge (~0.9); focus via ring tokens (`--ring` warm brown).
- **Ghost / Outline:** Border in gold/sand at low opacity for secondary paths.

### Cards / Containers
- **Corner:** Large soft radius (`rounded-2xl` / ~22px on some white cards).
- **Background:** White or cream (`bg-card` / parchment).
- **Shadow:** Soft lift; border `border-border/80`.
- **Padding:** Comfortable (p-6 → p-10).

### Inputs / Fields
- **Style:** `h-10`, medium radius, paper background, clay border.
- **Focus:** Ring from `--ring` (warm brown).
- **Error:** Destructive border / text; keep helper in stone caption.
- **Comboboxes / DOB selects:** Match input height (40px).

### Navigation
- Fixed top, transparent over dark heroes; glass cream blur when scrolled (`nav-scrolled` / `html.is-scrolled`).
- Links: Inter medium; underline reveal (`.link-underline`).
- Dark-hero mode uses light link colors until scroll.

### Signature: Join pathway + trust rail
- Step rail with gold progress line and numbered circles.
- Trust bullets as title-only links to FAQ anchors; crisis footer to `/crisis`.
- Form panel cream with sticky mobile submit.

## Do's and Don'ts

### Do:
- **Do** keep cream paper + warm ink for content; dark/gold for hero-grade moments.
- **Do** use Cormorant for headlines and Inter for UI.
- **Do** make the primary CTA a gold pill that points to WhatsApp / join.
- **Do** explain personal data asks briefly (DOB/country) in stone caption text.
- **Do** preserve privacy / non-clinical boundaries in adjacent microcopy.

### Don't:
- **Don't** introduce purple/indigo AI gradients or neon glow.
- **Don't** turn the first viewport into a dashboard of stats and chips.
- **Don't** restyle away from the incumbent warm earth + gold grading without an explicit redesign brief.
- **Don't** use heavy multi-shadow stacks or playful gamification badges.
- **Don't** bury the WhatsApp handoff behind competing equal-weight CTAs on join.
