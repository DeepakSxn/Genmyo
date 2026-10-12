# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are busy, stuck, or overwhelmed adults who want private clarity and self-awareness without downloading another wellness app or entering therapy. They arrive in a moment of quiet friction — mental noise, disconnection, or “something’s off” — and need a low-friction way to pause and see what’s going on.

Secondary audiences exist (teams / business enquiries) but are not the primary job of the consumer marketing site.

## Product Purpose

GenMyō is an inner wellness platform delivered through WhatsApp. Its introductory experience, The Mirror Project, is a short guided reflection: honest questions, at the user’s pace, to support self-awareness and reconnection with oneself.

Success for the near term: **1,000 users in the next month** (registrations / people who join the Mirror pathway). Longer-term product value is quieter clarity and continued reflection, but the current operating target is that growth number.

## Positioning

Guided reflection that lives inside WhatsApp — not a journaling app, meditation library, feed, streak game, or clinical service. The mechanism is conversational questions that help people find their own answers, grounded in behavioural science and neuroscience language the brand already uses (Inner Wellness Intelligence™), without claiming diagnosis or treatment.

## Operating Context

- Discovery on genmyo.ai (marketing site), often via CTAs to `/join`.
- Registration on `/join` (name, email, DOB, country, WhatsApp), then handoff to WhatsApp to say hello and start reflecting.
- Optional quiz path can feed context into join.
- Product conversation runs in WhatsApp via The Mirror (backend / Mirror agent), not in the website UI.
- Crisis-flagged join submissions must not route into Mirror engagement; helpline resources instead (`/crisis`).

## Capabilities and Constraints

**Confirmed**

- Free to start; no app download; WhatsApp-native reflection.
- Join captures details needed for personalisation (including DOB and country for generation / locale).
- Website → WhatsApp funnel is instrumented (GA4 client events; conversation-started depends on Mirror Measurement Protocol).
- Individual join is primary; business is a separate enquiry path.

**Must never contradict in design or copy**

- Not therapy, not a diagnostic tool, not a crisis service.
- Privacy by default; reflections not used to train foundation models; humans don’t read reflections unless support/safety is raised.
- Lives in WhatsApp; free to start.
- Do not invent clinical claims, guaranteed outcomes, or crisis-monitoring capabilities.

**Open / undecided**

- Exact definition of “user” for the 1,000 target (join submit vs WhatsApp conversation started) — treat join + WhatsApp start as the meaningful chain; confirm measurement definition with the team if needed.
- Primary markets and languages beyond English-first site copy — not confirmed.

## Brand Commitments

- Product name: **GenMyō** (ō macron in brand display); **GenMyo** acceptable in ASCII / technical contexts (URLs, code, some SEO titles).
- Core experience name: **The Mirror Project** (by GenMyō).
- Voice: calm, honest, non-pushy; no gamification pressure.
- **Binding visual constraint (user-confirmed):** keep the incumbent website direction — existing warm earthy palette and black/gold hero grading already on genmyo.ai. Do not invent a replacement visual world unless explicitly briefed for a redesign. Missing DESIGN.md is a documentation gap, not permission to restyle.

## Evidence on Hand

- Live site: https://genmyo.ai
- Marketing and FAQ copy in `src/pages/` and shared sections.
- Founders story and privacy/terms pages.
- Member-style quotes used on the homepage — treat as marketing content already on site; do not fabricate new testimonials.
- Do not invent customer counts, clinical studies, or press beyond what the repo/site already states.

## Product Principles

1. **Clarity without noise** — one job per surface; reduce competing CTAs and dual paths at the moment of joining.
2. **Trust before intimacy** — privacy, non-clinical boundaries, and WhatsApp familiarity must be obvious before asking for personal details.
3. **Handoff is the product** — the website’s job is to get someone into WhatsApp reflection, not to recreate the Mirror experience on-web.
4. **Personalisation with purpose** — ask only for data that shapes the experience (e.g. DOB, country), and say why.
5. **Safety over engagement** — crisis signals divert to helplines; never optimize Mirror engagement against that boundary.

## Accessibility & Inclusion

No product-specific WCAG target was set in this interview. Default to inclusive web practice (readable type, keyboard access, clear errors) consistent with the existing React site. Crisis and helpline content must remain easy to find and use.
