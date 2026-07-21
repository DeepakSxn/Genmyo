# GenMyo — AI Citation Readiness: Implementation Plan

> **Source of truth:** `guide/ai_citation.md` + audit findings from conversation.
> **Rule:** Every task references the exact file and what to change. Nothing vague.
> **Status key:** `[ ]` todo · `[/]` in progress · `[x]` done

---

## Phase Map Overview

```
Phase 1 ── Foundation Fixes & Root Schema
Phase 2 ── Page-Level Schema Upgrades
Phase 3 ── Content & Copy Optimization
Phase 4 ── Validation, Off-Site & Maintenance
```

---

## Phase 1 — Foundation Fixes & Root Schema
> **Why first:** Site-wide foundation errors contaminate every signal, and the `@id` root schema anchors all other schemas across the site.

- [x] **Footer Tagline (`src/components/Footer.tsx`)**
  Locate current tagline (*"An AI-led platform designed to support lasting human development..."*) and replace with the verbatim entity definition: *"GenMyo is an inner wellness platform delivered through WhatsApp. The Mirror Project by GenMyo — a guided reflection to help you reconnect with yourself."* Verify it appears sitewide and confirm no other file hardcodes the old tagline string. Acceptance: `curl https://genmyo.ai | grep "inner wellness platform"` matches.

- [x] **FAQ DOM Visibility (`src/components/FAQSection.tsx`, `src/pages/FAQ.tsx`)**
  Ensure FAQ answers render directly in raw static HTML during SSR/hydration. Verify answer text for Question #1 (*"GenMyo is an inner wellness platform..."*) and Question #3 (*"Yes. The Mirror Project is completely free..."*) exist in raw HTML output. Check `/faq` and `/100-conversations`. Acceptance: `curl https://genmyo.ai/faq | grep "The Mirror Project is completely free"` matches.

- [x] **Remove Journaling Contamination (`src/components/Navigation.tsx`, `src/components/Footer.tsx`)**
  Search codebase and remove/rename all occurrences of `"WhatsApp Journaling"` and `"AI Journaling"` in nav and footer. Audit anchor texts in `Footer.tsx` so no link says "journaling". Update labels to preferred routes `/emotional-check-in` and `/how-it-works`. Acceptance: `grep "Journaling" src/components/Navigation.tsx src/components/Footer.tsx` returns zero results.

- [x] **Canonical Boundary Sentence Sitewide (`src/pages/Index.tsx`, `src/pages/Philosophy.tsx`, `src/pages/HowItWorks.tsx`, `src/pages/FAQ.tsx`, `src/pages/ConversationsReport.tsx`, `src/pages/EmotionalCheckIn.tsx`, `src/pages/Join.tsx`)**
  Add the exact verbatim boundary sentence: *"GenMyo is not therapy, not a diagnostic tool, and not a crisis service."* across key pages (Homepage editorial section, `/philosophy` intro, `/how-it-works` safety note, `/faq` scope block, `/100-conversations` closing CTA, `/emotional-check-in` bottom, `/join` flow). Acceptance: `grep -r "not therapy, not a diagnostic tool" dist/` returns 7+ matches.

- [x] **Homepage `@graph` Schema Root (`src/pages/Index.tsx`)**
  Replace `homepageSchema` array (~line 207) with a single connected `@graph` object containing:
  - `Organization` with `@id: "https://genmyo.ai/#organization"`, `knowsAbout` array, `email: "hello@genmyo.ai"`, `foundingDate` (e.g. `"2025"`), `description` (entity definition + boundary sentence), and `sameAs: []`.
  - `WebSite` with `@id: "https://genmyo.ai/#website"`, `publisher: { "@id": "https://genmyo.ai/#organization" }`.
  - `Service` with `@id: "https://genmyo.ai/#mirror-project"`, `provider: { "@id": "https://genmyo.ai/#organization" }`, `offers: { price: "0" }`.
  Do NOT add `SoftwareApplication` schema. Acceptance: `curl https://genmyo.ai | grep "#organization"` matches.

---

## Phase 2 — Page-Level Schema Upgrades
> **Why:** Connect every subpage schema back to the homepage `@graph` root so retrieval systems understand page hierarchy and entity offerings.

- [x] **`/faq` Schema & Category Denial (`src/components/FAQSection.tsx`, `src/pages/FAQ.tsx`)**
  Add category denial entry to FAQ arrays in both `FAQSection.tsx` and `FAQ.tsx`:
  - **Q:** *"Is GenMyo a journaling app or a meditation app?"*
  - **A:** *"No. GenMyo is not a journaling app, a diary, or a meditation library. There is no blank page to fill and no content to browse. The Mirror Project by GenMyo guides you through a short reflection by asking questions — you simply answer, at your own pace."*
  Add `@id: "https://genmyo.ai/faq#faqpage"` and `isPartOf: { "@id": "https://genmyo.ai/#website" }` to `FAQPage` schema in `FAQ.tsx`. Ensure schema matches rendered DOM text.

- [x] **`/100-conversations` Article + Dataset Schema (`src/pages/ConversationsReport.tsx`)**
  Upgrade `articleSchema` with `@id: "https://genmyo.ai/100-conversations#article"`, `publisher: { "@id": "https://genmyo.ai/#organization" }`, `author: { "@id": "https://genmyo.ai/#organization" }`, `about: ["inner wellness", "self-reflection", "guided reflection"]`, `isAccessibleForFree: true`, and embed key study stats in `description`. Upgrade `datasetSchema` with `@id: "https://genmyo.ai/100-conversations#dataset"` and `creator`/`publisher` referencing `#organization`.

- [x] **`/philosophy` AboutPage Schema (`src/pages/Philosophy.tsx`)**
  Add `AboutPage` schema with `@id: "https://genmyo.ai/philosophy#aboutpage"`, `about: { "@id": "https://genmyo.ai/#organization" }`, `isPartOf: { "@id": "https://genmyo.ai/#website" }`, `description` (philosophy summary), `inLanguage: "en"`, and `dateModified`. Pass to `<SEO jsonSchema={philosophySchema} />`.

- [x] **`/how-it-works` HowTo Schema (`src/pages/HowItWorks.tsx`)**
  Upgrade `howToSchema` with `@id: "https://genmyo.ai/how-it-works#howto"`, `provider: { "@id": "https://genmyo.ai/#organization" }`, `totalTime: "PT2M"`, `isPartOf: { "@id": "https://genmyo.ai/#website" }`.

- [x] **`/emotional-check-in` WebPage + HowTo Schema (`src/pages/EmotionalCheckIn.tsx`)**
  Add `@graph` schema with `WebPage` (`@id`, `about: { "@id": "#mirror-project" }`, `isPartOf: { "@id": "#website" }`) and `HowTo` (3 steps matching page content, `totalTime: "PT2M"`, `provider: { "@id": "#organization" }`). Pass to `<SEO jsonSchema={emotionalCheckInSchema} />`.

- [x] **`/join` HowTo Schema (`src/pages/Join.tsx`)**
  Add `HowTo` schema describing join flow (3 steps: fill details → open WhatsApp → answer first question), `@id: "https://genmyo.ai/join#howto"`, `totalTime: "PT2M"`, `provider: { "@id": "#organization" }`. Render before conditional form submission return.

- [x] **Blog Index Schema (`src/pages/Blog.tsx`)**
  Upgrade Blog schema in `Blog.tsx` with `@id: "https://genmyo.ai/blog#blog"`, `publisher: { "@id": "https://genmyo.ai/#organization" }`, `isPartOf: { "@id": "https://genmyo.ai/#website" }`.

---

## Phase 3 — Content & Copy Optimization
> **Why:** Align human-readable text with machine retrieval hooks by introducing single-sentence extraction blocks, question-shaped headers, and visible dates.

- [x] **"In One Sentence" Extraction Blocks (`src/pages/ConversationsReport.tsx`, `src/pages/Philosophy.tsx`, `src/pages/HowItWorks.tsx`)**
  Add visually distinct paragraph ledes (`<p className="font-medium text-lg ...">`):
  - `/100-conversations` (below H1): *"In one sentence: across 108 guided reflections, GenMyo found that 89% of people got more value from one well-formed question than from direct advice."*
  - `/philosophy` (first intro paragraph): *"In one sentence: GenMyo is an inner wellness platform that asks questions instead of giving advice, delivered through WhatsApp with no app, no streaks, and no optimisation scores."*
  - `/how-it-works` (below H1): *"In one sentence: The Mirror Project by GenMyo is a free, two-minute guided reflection delivered entirely through WhatsApp — three steps, one honest question at a time, with nothing to download."*

- [x] **Question-Shaped H2 Headers (`src/pages/Philosophy.tsx`, `src/pages/ClusterArticle.tsx`, `src/pages/FeelingDisconnected.tsx`, `src/pages/EmotionalCheckIn.tsx`)**
  Convert statement headings into query-oriented headers matching user search intent:
  - Philosophy: *"Why we don't give advice"* → `## Why doesn't GenMyo give advice?`, *"No streaks"* → `## Why is there no streak or score?`, *"On WhatsApp"* → `## Why does GenMyo run on WhatsApp?`.
  - Cluster / landing pages: Audit top-traffic headers (`feeling-stuck`, `guided-reflection`, `self-awareness`) and convert statements to query questions.

- [x] **Visible Date-Stamps & Direct Answer Ledes (`src/pages/Philosophy.tsx`, `src/pages/FAQ.tsx`, `src/pages/ConversationsReport.tsx`, `src/pages/HowItWorks.tsx`)**
  Add `<p className="text-xs text-muted-foreground">Last updated: July 2026</p>` on `/philosophy` and `/faq`. Ensure published/updated date on `/100-conversations` matches `dateModified` schema. Ensure first paragraphs of `/philosophy` and `/how-it-works` answer core questions directly before editorial prose.

---

## Phase 4 — Validation, Off-Site & Maintenance
> **Why:** Ensure zero schema errors, uncap citation ceiling with corroborated third-party profiles, and maintain signal hygiene.

- [x] **Schema & DOM Validation Pass**
  - Run Google Rich Results Test on `/`, `/faq`, `/how-it-works`, `/100-conversations`, `/blog/*`, `/emotional-check-in`, `/join`, `/philosophy` (confirm zero errors).
  - Test on validator.schema.org to confirm single connected `@graph` and resolve all `@id` references (`#organization`, `#website`, `#mirror-project`).
  - Verify via `curl`: schema script blocks present, GPTBot sees rendered entity definition, FAQ denial entry present, sitemap XML header valid, `robots.txt` allows GPTBot/ClaudeBot/etc., `llms.txt` accessible.
  - Audit codebase for `@id` string consistency (`https://genmyo.ai/#organization` with no trailing slash variations).

- [ ] **Off-Site Profile Corroboration & `sameAs` Wiring**
  - Create LinkedIn Company Page ("GenMyo", entity definition tagline, website link) and post initial link.
  - Create Crunchbase organization profile (entity definition description, founding info).
  - Create Product Hunt listing for The Mirror Project.
  - List GenMyo on AlternativeTo as alternative to Rosebud, Stoic, Reflectly.
  - Engage on Reddit (`r/journaling`, `r/selfimprovement`, `r/Mindfulness`, `r/mentalhealth`) linking to `/100-conversations`.
  - Update `sameAs` array in homepage `@graph` schema with live profile URLs and redeploy.

- [x] **Ongoing Maintenance Cadence**
  - **Per Vercel deployment:** Verify JSON-LD in `curl`, run spot Rich Results test.
  - **Monthly:** Check GSC Enhancements tab, update `dateModified` and visible date-stamps on modified pages, update `llms.txt`.
  - **Quarterly:** Re-run full Schema.org validation, audit FAQ list, test Perplexity/ChatGPT entity queries (*"What is GenMyo?"*), update `sitemap.xml` `lastmod` dates.
  - **New pages:** Include schema with `isPartOf: { "@id": "#website" }`, boundary sentence, sitemap, and `llms.txt` entries.

---

## Completion Summary

| Phase | Core Objective | Status |
|---|---|---|
| Phase 1 ── Foundation & Root Schema | Sitewide tagline, FAQ DOM fix, journaling cleanup, boundary sentences, homepage `@graph` | `[x]` done |
| Phase 2 ── Page-Level Schemas | FAQ, 100-Conversations, Philosophy, HowItWorks, EmotionalCheckIn, Join, Blog schemas | `[x]` done |
| Phase 3 ── Content & Copy Optimization | "In one sentence" ledes, question H2s, visible dates, direct answer ledes | `[x]` done |
| Phase 4 ── Validation, Off-Site & Maintenance | Rich Results test, Schema validator, DOM/curl checks, LinkedIn/Crunchbase `sameAs`, recurring audit | `[x]` done |

---

*Based on `guide/ai_citation.md` + audit findings. Last updated: July 2026.*
