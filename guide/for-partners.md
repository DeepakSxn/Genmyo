# For partners

**Page document for the live partners route**
Written 12 October 2026 | Live URL: `https://genmyo.ai/partners` | Source: `src/pages/Partners.tsx`

The nav label is **For partners**. The route is `/partners`, not `/for-partners`. Footer label is **Partners**. The page is included in `scripts/prerender.js`.

This note describes the page as it is built. It is not a rewrite brief.

---

## 1. What the page is for

The page recruits people into GenMyō’s human side, and invites anyone who wants to widen access. It is not the employer sales page. Buyers who want a pilot go to `/for-business`.

There are two paths, and the page keeps them separate:

| Path | Who it is for | What they do | Status on the page |
|---|---|---|---|
| **Human Layer** | Mindfulness Guides and Mentors | Paid, independent, matched 1:1 or small circles. Online, on their own schedule. | Open to apply by email |
| **Pay it forward** | Organisations, practitioners, and anyone who wants to widen access | Sponsored seats, buy-one-give-one, or an access fund | Model in development. Structure not confirmed |

Primary actions:

- **Join as a Guide or Mentor** jumps to `#roles`.
- **Pay it forward** jumps to `#giving`.
- Every application is a `mailto:hello@genmyo.ai`. There is no on-page form.

---

## 2. Who should land here

- A mindfulness, meditation, or somatic practitioner who might become a **Guide**.
- Someone with lived experience (career, relationships, transitions, identity) who might become a **Mentor**.
- A former GenMyō user who wants to give that experience back as a Mentor.
- An organisation or person who wants to **sponsor access**, give mentor time, or help shape the giving model.
- Later, and only as a coming-soon strip: content partners, pilot employers, community leaders.

Employers looking for a workforce pilot are pointed here from `/for-business` under “Consultancies, brokers, EAP providers” (“Partner with us”). The partners page itself does not sell the pilot. Pilot employers are named only as a future partner type.

---

## 3. Boundaries the page states

These lines are on the page and should stay consistent with `/for-business`, Terms, and crisis copy.

- **Non-clinical.** Not therapy, not diagnosis, not clinical treatment. Guides hold a calm space and do not provide or arrange clinical care.
- **Non-religious.** Mindfulness and mentorship, not a faith practice.
- **Not employment.** The Human Layer is a marketplace. People stay independent. Rates, scheduling, and session mechanics are explained in a conversation, not on the page.
- **Not a job platform, recruitment service, or professional network.** Mentors do not offer placements, referrals, or career services. Mentorship is about the inner life: clarity, resilience, and direction.
- **Personas are illustrative.** Mei Lin, Arjun, Sarah, and Marcus are examples of who is welcome. The page says they are not actual GenMyo partners. Do not treat the quotes as testimonials.
- **Giving-back economics are not live.** The page labels that block “Model in development · structure to be confirmed.” Do not describe sponsored seats, buy-one-give-one, or the access fund as an operating programme.

---

## 4. Page map

Dark hero, then a dark giving section, then light sections. `Layout` is rendered with `showFAQ={false}`, so the site-wide FAQ block is hidden. The page has its own FAQ.

| Order | Anchor | Heading | Background |
|---|---|---|---|
| 1 | — | Do work that matters. | Dark hero, gold rings |
| 2 | `#giving` | Growth and good, compounding together. | Dark, gold glow |
| 3 | `#why` | Meaningful work, on your terms. | Page background |
| 4 | `#roles` | Find where you belong. | `#F4F0E7` |
| 5 | `#personas` | People like these. | Page background |
| 6 | — | Many of our Mentors began as users. | Sage band inside the background |
| 7 | `#look` | Qualities, not just credentials. | Page background |
| 8 | `#apply` | Introduce yourself. We'd love to meet you. | Ink card |
| 9 | — | More ways to partner with GenMyō are coming. | Dashed cream card |
| 10 | — | A few common questions. | `#F4F0E7` |

In-hero jump links: Why join (`#why`), The roles (`#roles`), What we look for (`#look`), How to apply (`#apply`), Pay it forward (`#giving`).

The hero sits under a transparent nav (`-mt-20`). `/partners` is in the dark-hero list in `Navigation.tsx`, so the nav starts light and switches after scroll.

---

## 5. Section by section

### Hero

Eyebrow: “Partners · Value creation · Giving back.”

H1: “Do work that matters.” The word “matters” is gold.

Subhead: GenMyō starts as a calm, AI-guided space on WhatsApp. People reflect, think clearly, and take a first step inward. When they are ready, it connects them to a real human. Two ways in: the paid Human Layer, or the giving-back model.

Trust line under the buttons: “Non-clinical, non-religious · mindfulness & mentorship · independent, flexible, online.”

A plaque in the hero previews pay-it-forward and links to `#giving`: “Wellbeing that pays itself forward.” Copy: commercial success should widen access rather than gate it.

### Pay it forward (`#giving`)

H2: “Growth and good, compounding together.”

Body: no app and no cost barrier is the reach. As the platform grows, a give-forward layer grows with it. This block is separate from the paid Human Layer. It is for anyone, including practitioners, who wants to widen access.

Three model cards:

| Card | Claim |
|---|---|
| Sponsored seats | Organisations sponsor access for non-employees or underserved groups. |
| Buy one, give one | Each paying member helps fund free access for someone who cannot pay. |
| Access fund | A share of revenue opens the platform in lower-income communities. |

CTA: **I want to be part of this** → mailto with subject `Giving Back · I want to be part of this`. The body asks how they would contribute (sponsor access, mentor or practitioner time, or help shape the model) and asks for name, organisation, and how they would like to help.

Footer line of the section: write to **hello@genmyo.ai**.

### Why this is different (`#why`)

H2: “Meaningful work, on your terms.”

| Card | Point |
|---|---|
| Matched, not assigned | Connected only to people they are suited to help, by focus, generation, and need. |
| Work that fits your life | Online. They set availability. They stay independent. |
| Grow with a movement | Early joiners help shape access for people who could not otherwise afford to join. |

### The roles (`#roles`)

Eyebrow: “The first way · Join the Human Layer.”

Intro: a paid marketplace of independent Guides and Mentors. Both roles are non-clinical. The difference is focus and rhythm.

**Mindfulness Guide** (sage card)

For experienced mindfulness, meditation, and somatic practitioners who can guide people through GenMyō’s approach.

What they would do:

- Lead 1:1 sessions and small group circles.
- Help people move from noticing to practice.
- Bring their own tradition to a shared standard of care.
- Hold a non-clinical space. Guide toward wellbeing. Never diagnosis or therapy.

Ask them to email a CV or résumé, certifications or training, a line on their practice, and a LinkedIn link if they have one.

Button: **Apply as a Guide →**
Subject: `Mindfulness Guide · GenMyō Partners`

**Mentor** (terracotta card)

For people with lived experience: careers, relationships, transitions, identity. They have been where others are going.

What they would do:

- 1:1 mentorship on life and work.
- Draw on their own journey. Matching is by who they can actually help.
- Perspective and encouragement, one chapter ahead.
- Flexible, online, on their schedule.

Ask them to email LinkedIn or a short profile, a few lines on the experience they would mentor from, and a CV if they have one.

Button: **Apply as a Mentor →**
Subject: `Mentor · GenMyō Partners`

### Personas (`#personas`)

H2: “People like these.”

The intro says these are illustrative, not actual partners.

| Name on the card | Presented as | Focus tags |
|---|---|---|
| Mei Lin, 45 | Singapore · Mindfulness Guide | Mindfulness, Breathwork, Group circles |
| Arjun, 52 | Bengaluru, India · Mentor | Career transitions, Leadership, Burnout recovery |
| Sarah, 34 | Singapore · Mentor | Early career, Identity, Direction |
| Marcus, 56 | Singapore · Mentor · Gen X | Mid-life reinvention, Purpose, Identity beyond work |

Closing line: GenMyo is not a job platform, recruitment service, or professional network.

### The user-to-mentor loop

H2: “Many of our Mentors began as users.”

Path shown as pills: Reflect → Grow → Give back → Mentor.

The distinction on the page: returning users more often come back as Mentors, where lived experience matters most, rather than as Guides, which asks for formal training. The same care and boundaries apply however someone arrived.

### What we look for (`#look`)

H2: “Qualities, not just credentials.”

| Quality | What the page says |
|---|---|
| Genuine presence | Listen more than fix. |
| Clarity on what we are not | Not religion, therapy, or clinical treatment. |
| Cross-generational range | Meet a 24-year-old and a 54-year-old each where they are. |
| Reliability & care | Show up prepared. |
| True believers | Drawn to value creation and giving back, not purely commercial work. |
| Boundaries & confidentiality | Uphold GenMyō’s privacy standards without exception. |

### How to apply (`#apply`)

H2: “Introduce yourself. We'd love to meet you.”

There is no long form. Three steps on the card:

1. Email hello@genmyo.ai
2. Send a CV, profile, or LinkedIn
3. We'll be in touch to talk

The mail link uses subject `Joining the GenMyō Partners`. The line under it asks them to say Guide or Mentor and attach whatever best represents them.

### Future partners

Dashed card: “More ways to partner with GenMyō are coming.”

Tags only, no detail pages: Content partners, Pilot employers, Community leaders. Same inbox: hello@genmyo.ai.

### FAQ

Native `<details>` accordion. Six questions. Answers are the on-page copy, shortened here only by topic:

| Question | Answer in short |
|---|---|
| Is this employment or freelance? | Marketplace. They set availability and are matched. Session, scheduling, and rate detail comes in the conversation. They stay independent. |
| Do I need formal certifications? | Guides: mindfulness, meditation, or somatic training matters. Mentors: lived experience matters most. Send what represents them. |
| How does matching work? | GenMyō connects people to Guides and Mentors suited to their needs. The walkthrough happens in the conversation. |
| Is GenMyō a job or networking platform? | No. No placements, referrals, or career services. |
| Is GenMyō religious or clinical? | No. Non-clinical, non-religious inner wellness. |
| Where do sessions happen? | Online. |

---

## 6. Emails the page opens

All of them go to **hello@genmyo.ai**.

| Button | Subject |
|---|---|
| I want to be part of this | Giving Back · I want to be part of this |
| Apply as a Guide | Mindfulness Guide · GenMyō Partners |
| Apply as a Mentor | Mentor · GenMyō Partners |
| hello@genmyo.ai on the apply band | Joining the GenMyō Partners |
| Future-partners line | none (plain mailto) |

Nothing is posted to a CRM. Nothing is tracked as a form submit on this page. GA4 events used on `/for-business` (`business_form_start`, `business_form_submit`) do not fire here.

---

## 7. SEO and GEO as implemented

From `SEO` in `src/components/SEO.tsx` plus the props on this page:

| Tag | Value the page passes | What the component emits |
|---|---|---|
| Title prop | `Partners & Collaborators \| GenMyo` | The component appends another ` \| GenMyo`, so the document title is `Partners & Collaborators \| GenMyo \| GenMyo`. |
| Meta description | The coaches, practitioners, and organisations we build The Mirror Project alongside — and how to partner with us. | Used as-is. |
| Canonical | not passed | `https://genmyo.ai/partners` |
| Open Graph image | not passed | `https://genmyo.ai/og-image.jpg` |
| JSON-LD | none | No `FAQPage`, `WebPage`, or `Service` schema on this route. |

The FAQ answers are in the initial React tree (native `details`, not unmounted), so a prerender includes them. They are not marked up as FAQ schema.

H1 is the only top-level title: “Do work that matters.” Later sections use H2. Role cards and persona names use H3 and H4.

Internal links today:

- Nav and footer → `/partners`
- `/for-business` “Consultancies, brokers, EAP providers” → `/partners` with anchor text “Partner with us”
- This page does not link back to `/for-business`, `/join`, or `/how-it-works`

---

## 8. Visual system on this page

Same family as the rest of the site, with a darker opening than `/for-business`.

- Ink `#1C1A16`, gold `#C2A053`, terracotta `#B0703E`, sage `#5C7060` (role and loop bands), paper `#F4F0E7`.
- Headlines are Cormorant (`font-serif`). UI labels are small, tracked, uppercase.
- Hero: gold sun mark, concentric gold rings, radial glow. The sun spins slowly (`70s`).
- Guide card header is a sage gradient. Mentor card header is a terracotta gradient.
- The user-to-mentor loop is a sage rounded panel. The apply band is an ink rounded panel with a gold glow.

---

## 9. Things to keep in mind when editing

- Do not add rates, revenue shares, or “live” language to the three giving cards until the model is confirmed. The dashed “in development” chip is the guardrail.
- Do not add logos, quotes, or headshots of real Guides or Mentors on the persona grid without replacing the illustrative label.
- Do not describe the Human Layer as a job, a network, therapy, or a religious community. The FAQ and the “what we look for” list repeat that on purpose.
- Guide applications should keep asking for training. Mentor applications should keep asking for lived experience. The loop section depends on that split.
- If this page starts to recruit employers, send them to `/for-business` instead of growing a second pilot pitch here. “Pilot employers” is only a future-partner tag.
- If the title tag is cleaned up, pass a title without a trailing `| GenMyo`, because `SEO.tsx` adds that suffix itself.
