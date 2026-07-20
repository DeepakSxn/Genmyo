# GenMyo — AI Citation Readiness: Implementation Plan

> **Source of truth:** `guide/ai_citation.md` + audit findings from conversation.
> **Rule:** Every task references the exact file and what to change. Nothing vague.
> **Status key:** `[ ]` todo · `[/]` in progress · `[x]` done

---

## Phase Map Overview

```
Phase 1 ── Foundation fixes          (blocker — do first, unblocks everything)
Phase 2 ── Homepage @graph schema    (knowledge graph root)
Phase 3 ── Page-level schema         (citation yield per page)
Phase 4 ── Content copy              (extraction hooks)
Phase 5 ── Validation pass           (quality gate before outreach)
Phase 6 ── Off-site corroboration    (uncaps the citation ceiling)
Phase 7 ── Maintenance cadence       (keeps it working after launch)
```

---

## Phase 1 — Foundation Fixes
> **Why first:** These are site-wide errors that contaminate every other signal. Schema built on top of them is built on sand.

### 1A · Footer tagline (sitewide, every page)
**File:** `src/components/Footer.tsx`

- [ ] **1A-1** Locate the current tagline text:
  > *"An AI-led platform designed to support lasting human development through personalized reflection, guidance, and growth."*
- [ ] **1A-2** Replace with the verbatim entity definition:
  > *"GenMyo is an inner wellness platform delivered through WhatsApp. The Mirror Project by GenMyo — a guided reflection to help you reconnect with yourself."*
- [ ] **1A-3** Verify the new text appears on every page (it's in the shared `Footer` component — one change covers all).
- [ ] **1A-4** Confirm no other file hardcodes the old tagline string (search: `AI-led platform`).

**Acceptance:** `curl https://genmyo.ai | grep "inner wellness platform"` returns a match.

---

### 1B · FAQ answers visible in DOM (SSR/hydration check)
**Files:** `src/components/FAQSection.tsx`, `src/pages/FAQ.tsx`

- [ ] **1B-1** Build the site locally (`npm run build`) and open `dist/faq/index.html` in a text editor.
- [ ] **1B-2** Search for the text of FAQ answer #1 (*"GenMyo is an inner wellness platform..."*) — it must appear in raw HTML, not just as a JS expression.
- [ ] **1B-3** Search for FAQ answer #3 (*"Yes. The Mirror Project is completely free..."*) — same check.
- [ ] **1B-4** If answers are absent: ensure `AccordionContent` renders its children unconditionally during SSR. The `suppressHydrationWarning` fix helps hydration — but confirm content is in the static HTML.
- [ ] **1B-5** Repeat the check for the `/100-conversations` page — verify FAQ answers there are also in the DOM.
- [ ] **1B-6** Run `curl https://genmyo.ai/faq | grep "The Mirror Project is completely free"` on the deployed site. Must return a match.

**Acceptance:** Every FAQ answer is present in the static HTML source of `/faq` and `/100-conversations`.

---

### 1C · Remove journaling contamination from nav/footer
**Files:** `src/components/Navigation.tsx`, `src/components/Footer.tsx`

- [ ] **1C-1** Search entire codebase for the string `WhatsApp Journaling` — remove or rename every instance in nav/footer (redirect URLs in `vercel.json` are fine to keep for SEO).
- [ ] **1C-2** Search for `AI Journaling` in nav/footer — same removal.
- [ ] **1C-3** Audit anchor text in `Footer.tsx` — no link should say "journaling" if it points to a GenMyo page.
- [ ] **1C-4** Verify `/emotional-check-in` and `/how-it-works` are the preferred labels in the nav for those formerly-named pages.

**Acceptance:** `grep "Journaling" src/components/Navigation.tsx src/components/Footer.tsx` returns zero results.

---

### 1D · Boundary sentence on every key page
**Target pages:** Homepage, `/philosophy`, `/how-it-works`, `/faq`, `/100-conversations`, `/emotional-check-in`, `/join`

- [ ] **1D-1** Write the canonical boundary sentence once and copy it verbatim:
  > *"GenMyo is not therapy, not a diagnostic tool, and not a crisis service."*
- [ ] **1D-2** Add to **Homepage** (`src/pages/Index.tsx`) — place in the "About GenMyo" editorial section, as a standalone `<p>`.
- [ ] **1D-3** Add to **`/philosophy`** (`src/pages/Philosophy.tsx`) — place near the end of the intro section.
- [ ] **1D-4** Add to **`/how-it-works`** (`src/pages/HowItWorks.tsx`) — place in the existing Safety Boundary note, replacing its current verbose form with the canonical sentence + the existing legal disclaimer.
- [ ] **1D-5** Add to **`/faq`** (`src/pages/FAQ.tsx`) — place in the Scope & Safety Boundary block at the bottom, prepended to the existing text.
- [ ] **1D-6** Add to **`/100-conversations`** (`src/pages/ConversationsReport.tsx`) — place in the closing CTA section.
- [ ] **1D-7** Add to **`/emotional-check-in`** (`src/pages/EmotionalCheckIn.tsx`) — near the bottom.
- [ ] **1D-8** Confirm every instance uses **identical wording** — no paraphrasing.

**Acceptance:** `grep -r "not therapy, not a diagnostic tool" dist/` returns 7+ matches across different page directories.

---

## Phase 2 — Homepage `@graph` Schema (Knowledge Graph Root)
> **Why:** The `@id` anchors (`#organization`, `#website`, `#mirror-project`) defined here are referenced by every other schema on the site. Without them, all other schema floats unanchored.

**File:** `src/pages/Index.tsx`

### 2A · Replace current homepage schema with `@graph` structure

- [ ] **2A-1** Locate the current `homepageSchema` array in `Index.tsx` (~line 207). It currently has three separate objects: `Organization`, `WebSite`, `Service`.
- [ ] **2A-2** Replace the entire `homepageSchema` array with a single `@graph` object:
  - `Organization` with `@id: "https://genmyo.ai/#organization"`, `knowsAbout` array, `email`, `foundingDate`
  - `WebSite` with `@id: "https://genmyo.ai/#website"`, `publisher` referencing the org anchor
  - `Service` with `@id: "https://genmyo.ai/#mirror-project"`, `provider` referencing org anchor, `offers` with `price: "0"`
- [ ] **2A-3** Verify the `SEO` component's `jsonSchema` prop accepts a plain object (not just array) — it does.
- [ ] **2A-4** Pass the new single `@graph` object to `<SEO jsonSchema={homepageSchema} />`.
- [ ] **2A-5** Set `sameAs` to `[]` for now — **never add a URL that doesn't exist**. Populate in Phase 6.
- [ ] **2A-6** Fill `foundingDate` with the true year (e.g. `"2025"`) — must be accurate.
- [ ] **2A-7** Add `"description"` to Organization using the verbatim entity definition + boundary sentence.
- [ ] **2A-8** Add `"email": "hello@genmyo.ai"` to Organization.

**Acceptance:** `curl https://genmyo.ai | grep "#organization"` returns a match. Schema renders in page source as a single `@graph` block.

---

### 2B · SoftwareApplication schema — deliberately excluded
- [ ] **2B-1** Do **NOT** add `SoftwareApplication` schema. Per the guide: this re-files GenMyo in app-category results and invites YMYL scrutiny. *(Noted to prevent future addition.)*

---

## Phase 3 — Page-Level Schema Upgrades

### 3A · `/faq` — Add category denial FAQ entry
**Files:** `src/components/FAQSection.tsx`, `src/pages/FAQ.tsx`

- [ ] **3A-1** Open `FAQSection.tsx`. Locate the `faqs` array.
- [ ] **3A-2** Add a new FAQ entry after "What is The Mirror Project?" and before "Is it free?":
  - **Q:** *"Is GenMyo a journaling app or a meditation app?"*
  - **A:** *"No. GenMyo is not a journaling app, a diary, or a meditation library. There is no blank page to fill and no content to browse. The Mirror Project by GenMyo guides you through a short reflection by asking questions — you simply answer, at your own pace."*
- [ ] **3A-3** Do the same in `FAQ.tsx`'s own `faqs` array — both files must stay in sync.
- [ ] **3A-4** Verify the new entry appears in the `faqSchema` JSON-LD generated from the `faqs` array.
- [ ] **3A-5** Confirm the answer text is **identical** to what appears visibly on the page (schema must match DOM exactly).

**Acceptance:** View-source on `/faq` shows the "Is GenMyo a journaling app" Q&A in both rendered HTML and in the JSON-LD block.

---

### 3B · `/faq` — Add `@id` anchor and graph link
**File:** `src/pages/FAQ.tsx`

- [ ] **3B-1** Locate `faqSchema` in `FAQ.tsx`.
- [ ] **3B-2** Add `"@id": "https://genmyo.ai/faq#faqpage"` to the FAQPage object.
- [ ] **3B-3** Add `"isPartOf": { "@id": "https://genmyo.ai/#website" }` to link back to the homepage graph.

---

### 3C · `/100-conversations` — Upgrade Article + Dataset schema
**File:** `src/pages/ConversationsReport.tsx`

- [ ] **3C-1** Locate `articleSchema`. Add `"@id": "https://genmyo.ai/100-conversations#article"`.
- [ ] **3C-2** Change `"publisher"` from an inline object to `{ "@id": "https://genmyo.ai/#organization" }`.
- [ ] **3C-3** Add `"author": { "@id": "https://genmyo.ai/#organization" }`.
- [ ] **3C-4** Add `"about": ["inner wellness", "self-reflection", "guided reflection"]`.
- [ ] **3C-5** Add `"isAccessibleForFree": true`.
- [ ] **3C-6** Add key stats to schema `description`: *"108 anonymized guided reflections; 89% found a well-formed question more valuable than direct advice; 74% reported a drop in physical tension after externalising their primary dilemma."*
- [ ] **3C-7** Locate `datasetSchema`. Add `"@id": "https://genmyo.ai/100-conversations#dataset"`.
- [ ] **3C-8** Change `"creator"` and `"publisher"` in datasetSchema to `{ "@id": "https://genmyo.ai/#organization" }`.

---

### 3D · `/philosophy` — Add `AboutPage` schema
**File:** `src/pages/Philosophy.tsx`

- [ ] **3D-1** Check if `Philosophy.tsx` currently passes any `jsonSchema` to `<SEO>` — if not, create one.
- [ ] **3D-2** Add `AboutPage` schema with:
  - `@id: "https://genmyo.ai/philosophy#aboutpage"`
  - `about: { "@id": "https://genmyo.ai/#organization" }`
  - `isPartOf: { "@id": "https://genmyo.ai/#website" }`
  - `description`: GenMyo's philosophy summary (no advice, no streaks, questions instead of content)
  - `inLanguage: "en"`
  - `dateModified`: true last-edited date
- [ ] **3D-3** Pass to `<SEO jsonSchema={philosophySchema} />`.

---

### 3E · `/how-it-works` — Upgrade HowTo schema
**File:** `src/pages/HowItWorks.tsx`

- [ ] **3E-1** Locate the existing `howToSchema` object.
- [ ] **3E-2** Add `"@id": "https://genmyo.ai/how-it-works#howto"`.
- [ ] **3E-3** Add `"provider": { "@id": "https://genmyo.ai/#organization" }`.
- [ ] **3E-4** Add `"totalTime": "PT6M"` (6 minutes).
- [ ] **3E-5** Add `"isPartOf": { "@id": "https://genmyo.ai/#website" }`.

---

### 3F · `/emotional-check-in` — Add WebPage + HowTo `@graph` schema
**File:** `src/pages/EmotionalCheckIn.tsx`

- [ ] **3F-1** Check if this page currently has any schema — add a `@graph` with `WebPage` + `HowTo`.
- [ ] **3F-2** `WebPage` node: `@id` anchor, `about: { "@id": "#mirror-project" }`, `isPartOf: { "@id": "#website" }`.
- [ ] **3F-3** `HowTo` node: 3 named steps matching the visible page content, `totalTime: "PT6M"`, `provider: { "@id": "#organization" }`.
- [ ] **3F-4** Pass to `<SEO jsonSchema={emotionalCheckInSchema} />`.

---

### 3G · `/join` — Add HowTo schema
**File:** `src/pages/Join.tsx`

- [ ] **3G-1** Add `HowTo` schema describing the join flow (3 steps: fill details → open WhatsApp → answer first question).
- [ ] **3G-2** Set `totalTime: "PT2M"`, `provider: { "@id": "#organization" }`.
- [ ] **3G-3** Add `@id: "https://genmyo.ai/join#howto"`.
- [ ] **3G-4** Pass to `<SEO jsonSchema={joinSchema} />` — place before the `submitted` conditional return so it always renders.

---

### 3H · Blog index — Upgrade Blog schema
**File:** `src/pages/Blog.tsx`

- [ ] **3H-1** Locate `jsonLd` in `Blog.tsx`.
- [ ] **3H-2** Add `"@id": "https://genmyo.ai/blog#blog"` to the Blog object.
- [ ] **3H-3** Change `"publisher"` to `{ "@id": "https://genmyo.ai/#organization" }`.
- [ ] **3H-4** Add `"isPartOf": { "@id": "https://genmyo.ai/#website" }`.

---

## Phase 4 — Content Copy Changes

### 4A · "In one sentence" blocks on key pages

- [ ] **4A-1** **`/100-conversations`** — Add immediately after the `<h1>`, before the description paragraph:
  > *In one sentence: across 108 guided reflections, GenMyo found that 89% of people got more value from one well-formed question than from direct advice.*
  Style: `<p className="font-medium text-lg ...">` — visually distinct, semantically a paragraph.

- [ ] **4A-2** **`/philosophy`** — Add as the first paragraph of the intro section:
  > *In one sentence: GenMyo is an inner wellness platform that asks questions instead of giving advice, delivered through WhatsApp with no app, no streaks, and no optimisation scores.*

- [ ] **4A-3** **`/how-it-works`** — Add below the `<h1>` and above the body copy:
  > *In one sentence: The Mirror Project by GenMyo is a free, six-minute guided reflection delivered entirely through WhatsApp — three steps, one honest question at a time, with nothing to download.*

- [ ] **4A-4** Style all three consistently — same class, same visual weight.
- [ ] **4A-5** Ensure the "In one sentence" text matches (or can be derived from) the page's schema `description` field — both must tell the same story.

---

### 4B · Question-shaped H2 headers on `/philosophy`
**File:** `src/pages/Philosophy.tsx`

- [ ] **4B-1** Audit every H2 and H3 on the page — list them all before changing any.
- [ ] **4B-2** Convert editorial headers to question form:
  - *"Why we don't give advice"* → `## Why doesn't GenMyo give advice?`
  - *"No streaks"* → `## Why is there no streak or score?`
  - *"On WhatsApp"* → `## Why does GenMyo run on WhatsApp?`
  - Any other declarative header that maps to a plausible user query.
- [ ] **4B-3** Keep answer prose beneath each header unchanged — only the header text changes.
- [ ] **4B-4** Phrasing should feel like how someone would type it into ChatGPT or Perplexity.

---

### 4C · Question-shaped H2 headers on cluster pages
**Files:** `src/pages/ClusterArticle.tsx`, `src/pages/FeelingDisconnected.tsx`, `src/pages/EmotionalCheckIn.tsx`

- [ ] **4C-1** Open `ClusterArticle.tsx` — find where article H2s are defined/rendered.
- [ ] **4C-2** Audit headings across highest-traffic clusters: `feeling-stuck`, `guided-reflection`, `self-awareness`.
- [ ] **4C-3** Rewrite any H2 that is a statement into a question, where it maps to a user query.
- [ ] **4C-4** Repeat for `FeelingDisconnected.tsx` and `EmotionalCheckIn.tsx`.

---

### 4D · Visible date-stamps on key pages

- [ ] **4D-1** **`/philosophy`** — Add `<p className="text-xs text-muted-foreground">Last updated: July 2026</p>` below the kicker, above or after the H1.
- [ ] **4D-2** **`/faq`** — Same treatment.
- [ ] **4D-3** **`/100-conversations`** — Ensure it reads "Published: June 2026" or "Last updated: July 2026" in a visible, parseable format. The date range "January–June 2026" already exists but needs a cleaner published/updated label.
- [ ] **4D-4** Confirm each page's visible date **exactly matches** its `dateModified` in schema.

---

### 4E · Direct answer ledes on `/philosophy` and `/how-it-works`

- [ ] **4E-1** **`/philosophy`** — The first paragraph should answer *"What is GenMyo's philosophy?"* directly before editorial prose begins.
- [ ] **4E-2** **`/how-it-works`** — Lead with: *"The Mirror Project by GenMyo runs entirely in WhatsApp. You send one message, answer a few honest questions over six minutes, and leave with one thing you can see more clearly."* — before the 3-step cards.
- [ ] **4E-3** These can serve double-duty as the "In one sentence" blocks from 4A — one element, two purposes.

---

## Phase 5 — Validation Pass
> **Do not skip.** Schema with errors is worse than no schema.

### 5A · Google Rich Results Test
- [ ] **5A-1** Go to [search.google.com/test/rich-results](https://search.google.com/test/rich-results).
- [ ] **5A-2** Test `https://genmyo.ai/` — expect `Organization`, `WebSite`, `Service`. Zero errors.
- [ ] **5A-3** Test `https://genmyo.ai/faq` — expect `FAQPage` with all Q&As. Zero errors.
- [ ] **5A-4** Test `https://genmyo.ai/how-it-works` — expect `HowTo`. Zero errors.
- [ ] **5A-5** Test `https://genmyo.ai/100-conversations` — expect `Article` + `Dataset`. Zero errors.
- [ ] **5A-6** Test `https://genmyo.ai/blog/the-conversation-after-the-workshop` — expect `BlogPosting`. Zero errors.
- [ ] **5A-7** Test `https://genmyo.ai/emotional-check-in` — expect `HowTo` + `WebPage`. Zero errors.
- [ ] **5A-8** Test `https://genmyo.ai/join` — expect `HowTo`. Zero errors.
- [ ] **5A-9** Test `https://genmyo.ai/philosophy` — expect `AboutPage`. Zero errors.
- [ ] **5A-10** Screenshot each passing result — save to `guide/validation/`.

### 5B · Schema.org validator
- [ ] **5B-1** Go to [validator.schema.org](https://validator.schema.org).
- [ ] **5B-2** Paste homepage URL — confirm `@graph` resolves as a single connected graph, not three orphan nodes.
- [ ] **5B-3** Verify all `@id` cross-references resolve — `{ "@id": "https://genmyo.ai/#organization" }` must point to one defined node, not create a new one.
- [ ] **5B-4** Paste `/faq` URL — confirm `FAQPage` mainEntity array is valid.
- [ ] **5B-5** Fix any `@id` collision (two schema blocks defining `#organization` with different values — must only ever be one definition).

### 5C · DOM and curl checks
- [ ] **5C-1** `curl -s https://genmyo.ai | grep "ld+json"` — must return at least one `<script>` block.
- [ ] **5C-2** `curl -s -A "GPTBot" https://genmyo.ai | grep "inner wellness platform"` — AI crawlers see entity definition in rendered HTML.
- [ ] **5C-3** `curl -s https://genmyo.ai/faq | grep "journaling app"` — new FAQ denial entry is in DOM.
- [ ] **5C-4** `curl -s https://genmyo.ai/sitemap.xml` — returns valid XML, not binary/garbled. Check `Content-Type: application/xml` header.
- [ ] **5C-5** `curl -s https://genmyo.ai/robots.txt | grep "GPTBot"` — returns `Allow: /`.
- [ ] **5C-6** `curl -s https://genmyo.ai/llms.txt` — returns llms.txt content.
- [ ] **5C-7** `curl -s https://genmyo.ai | grep "not therapy, not a diagnostic tool"` — boundary sentence in DOM.

### 5D · `@id` graph integrity check
- [ ] **5D-1** Search codebase for `#organization` — every occurrence must use `"https://genmyo.ai/#organization"` exactly (no trailing slash variation, no `www.`).
- [ ] **5D-2** Search for `#website` — same consistency.
- [ ] **5D-3** Search for `#mirror-project` — same.
- [ ] **5D-4** Ensure no page defines a new `Organization` object inline — all references must be `{ "@id": "..." }` pointing to the homepage anchor.

### 5E · Google Search Console (7 days post-deploy)
- [ ] **5E-1** Log into GSC → Enhancements tab.
- [ ] **5E-2** Confirm `FAQ` enhancement report appears with valid items.
- [ ] **5E-3** Confirm `HowTo` enhancement report appears with valid items.
- [ ] **5E-4** No schema errors in Coverage report.
- [ ] **5E-5** Re-submit sitemap after all Phase 1–4 changes are deployed.

---

## Phase 6 — Off-Site Corroboration
> **This is the citation ceiling.** Per the guide: *"Until LinkedIn and at least one other profile are live pointing back at genmyo.ai, you're a single-source entity — perfectly marked up but uncorroborated."*

### 6A · LinkedIn Company Page
- [ ] **6A-1** Create LinkedIn Company Page for GenMyo.
- [ ] **6A-2** Fill: name ("GenMyo"), tagline (verbatim entity definition), website (`https://genmyo.ai`), industry ("Wellness and Fitness Services"), size, founding date.
- [ ] **6A-3** About field: same sentence as homepage schema `description`.
- [ ] **6A-4** Publish a first post linking to `https://genmyo.ai`.
- [ ] **6A-5** Copy the LinkedIn company page URL.
- [ ] **6A-6** Add to `sameAs` in homepage `@graph` schema and redeploy.

### 6B · Crunchbase
- [ ] **6B-1** Create Crunchbase organization profile.
- [ ] **6B-2** Fill: name, short description (entity definition), website, founding date, HQ location, category ("Mental Health" or "Health & Wellness").
- [ ] **6B-3** Add Crunchbase URL to `sameAs` and redeploy.

### 6C · Product Hunt
- [ ] **6C-1** Create a Product Hunt listing for The Mirror Project.
- [ ] **6C-2** Tagline: *"A free 6-minute guided reflection on WhatsApp — no app, no advice, just honest questions."*
- [ ] **6C-3** Description: entity definition + 2-3 sentences from `/100-conversations` findings.
- [ ] **6C-4** Link: `https://genmyo.ai/join`.
- [ ] **6C-5** Add Product Hunt profile URL to `sameAs` if it generates a persistent profile page.

### 6D · AlternativeTo
- [ ] **6D-1** List GenMyo on [alternativeto.net](https://alternativeto.net) as an alternative to Rosebud, Stoic, and Reflectly.
- [ ] **6D-2** Use entity definition description.

### 6E · Reddit presence
- [ ] **6E-1** Identify relevant subreddits: `r/journaling`, `r/selfimprovement`, `r/Mindfulness`, `r/mentalhealth`.
- [ ] **6E-2** Contribute genuinely before posting about GenMyo.
- [ ] **6E-3** Link to `/100-conversations` report specifically — original data is shareworthy and citable.

### 6F · `sameAs` update discipline
- [ ] **6F-1** After each external profile goes live and is indexed, add its URL to the `sameAs` array on the homepage.
- [ ] **6F-2** Redeploy and re-run the validation pass (Phase 5) after each addition.
- [ ] **6F-3** Never add a `sameAs` URL that redirects, 404s, or doesn't mention GenMyo.

---

## Phase 7 — Maintenance Cadence
> **Schema is not set-and-forget.** SPA frameworks drop head tags silently on rebuilds.

### 7A · After every Vercel deployment
- [ ] `curl -s https://genmyo.ai | grep "ld+json"` — schema present.
- [ ] Run Google Rich Results Test on homepage — takes 2 minutes.
- [ ] Spot-check one other page (rotate: `/faq`, `/how-it-works`, `/100-conversations`).

### 7B · Monthly
- [ ] Check GSC Enhancements tab — no new errors.
- [ ] Update `dateModified` in schema and visible date-stamps on any page that was edited.
- [ ] Update `llms.txt` if new pages or guides were added.
- [ ] Check all `sameAs` URLs still resolve (profiles can be deleted/renamed).

### 7C · Quarterly
- [ ] Re-run the full validation pass (Phase 5A–5D).
- [ ] Audit the `faqs` array — add new questions if users are asking them.
- [ ] Run a Perplexity or ChatGPT query: *"What is GenMyo?"* — note what it says, compare to entity definition, adjust content if drifted.
- [ ] Update `lastmod` dates in `sitemap.xml` for any page that changed.

### 7D · When adding a new page
- [ ] Add appropriate schema (at minimum: `WebPage` with `isPartOf: { "@id": "#website" }`).
- [ ] Include the boundary sentence.
- [ ] Add to `sitemap.xml`.
- [ ] Add to `llms.txt` if it's a substantive content page.
- [ ] Run Rich Results Test before deploying.

---

## Completion Summary

| Phase | Tasks | Blocker for next phase? |
|---|---|---|
| Phase 1 — Foundation | 1A–1D (~18 tasks) | ✅ Yes — do first |
| Phase 2 — @graph schema | 2A–2B (~8 tasks) | ✅ Yes — other schemas reference it |
| Phase 3 — Page schemas | 3A–3H (~30 tasks) | No — parallelise with Phase 4 |
| Phase 4 — Content copy | 4A–4E (~18 tasks) | No — parallelise with Phase 3 |
| Phase 5 — Validation | 5A–5E (~25 tasks) | ✅ Yes — gate before Phase 6 |
| Phase 6 — Off-site | 6A–6F (~20 tasks) | No — ongoing |
| Phase 7 — Maintenance | 7A–7D (recurring) | No — recurring |

**Total implementable tasks (Phase 1–5):** ~99 discrete steps
**Deploy order:** Phase 1 → Phase 2 → Phase 3+4 (parallel) → Phase 5 → Phase 6

---

*Based on `guide/ai_citation.md` + audit findings. Last updated: July 2026.*
