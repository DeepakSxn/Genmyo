Everything below builds on what we've already established — the verbatim entity definition, the inner-wellness-only positioning, the no-journaling rule — so the schema and copy are consistent with the rest of the plan, not a fresh start.

---

# GenMyo AI-Citation Readiness: Schema + Content Blueprint

## Part 0 — The audit verdict (short, because we've covered most of it)

From the rendered pages I've seen, your current state:

| Signal | Status |
|---|---|
| Server-rendered HTML (crawlers see content) | ✅ Fixed — the P0 win |
| One verbatim entity definition sitewide | ⚠️ Inconsistent — footer says "AI-led platform for lasting human development," not your inner-wellness line |
| Schema on pages | ❓ Unverified — likely partial or missing; nothing validated |
| FAQ answers visible in DOM | 🔴 On `/100-conversations` the FAQ renders as questions only — if answers aren't in the HTML, `FAQPage` schema is invalid |
| Journaling contamination | 🔴 Footer nav still says "WhatsApp Journaling" / "AI Journaling" sitewide |
| Sitemap | 🔴 Served as binary — verify `Content-Type: application/xml` |
| robots.txt AI-crawler allowances | ❓ Unverified — must explicitly allow GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, CCBot |
| `llms.txt` | ❌ Not shipped |
| Off-site corroboration (`sameAs` targets that exist) | ❌ LinkedIn/Crunchbase pending — without these, citation ceiling is low regardless of on-site work |

The single most important principle for everything below: **AI engines cite entities they can define in one sentence, corroborated by multiple sources, marked up consistently.** Every schema block below carries the same `@id` graph and the same definition so the whole site reads as one coherent entity.

---

## Part 1 — The 5 schema types that matter for GenMyo

Ranked by citation value for *your* site specifically:

**1. `Organization` (sitewide, anchored on the homepage)** — Defines the GenMyo entity itself: name, definition, logo, `sameAs`. This is the root of the knowledge graph. Without it, every other schema floats unanchored.

**2. `FAQPage`** — The highest-yield extraction format that exists. Question-shaped content is what retrieval systems match against, because user prompts *are* questions. Your `/faq` is your citation workhorse.

**3. `Service`** — Defines The Mirror Project as a named offering with `serviceType: "Inner wellness — guided reflection"`. This is your category firewall: machine-readable proof you're *not* a journaling or meditation app. (Never `SoftwareApplication` — that's app-category schema and would re-file you where you don't belong.)

**4. `Article` (with `Dataset` characteristics) for `/100-conversations`** — Named, dated, quantified studies are what LLMs cite by name. This schema is what turns "some page" into "the 100 Conversations Report by GenMyo (2026)."

**5. `WebSite` + `BreadcrumbList`** — Structural glue: site name, page hierarchy, navigational clarity. Modest individually, but they complete the graph and support sitelinks/rich results.

*(Deliberately excluded: `MedicalWebPage`, `HealthTopicContent`, `SoftwareApplication` — all would invite YMYL scrutiny or category misfiling. Your "not therapy" positioning must hold in the markup too.)*

---

## Part 2 — The JSON-LD, page by page

**One rule before you paste:** every factual value in brackets (`REPLACE_*`) must be filled with something *true*. Schema with false claims (a founding date you invent, a `sameAs` to a profile that doesn't exist) hurts trust rather than building it. Only include `sameAs` URLs that are live.

### 2a. Homepage `/` — the entity anchor

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://genmyo.ai/#organization",
      "name": "GenMyo",
      "url": "https://genmyo.ai/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://genmyo.ai/logo.png"
      },
      "description": "GenMyo is an inner wellness platform delivered entirely through WhatsApp. Its core experience, The Mirror Project by GenMyo, is a guided reflection — a few honest questions, asked slowly, that help you reconnect with yourself and see what's actually going on. It is not therapy, not a diagnostic tool, and not a crisis service.",
      "email": "admin@genmyo.ai",
      "foundingDate": "REPLACE_YYYY-MM",
      "sameAs": [
        "REPLACE_LINKEDIN_URL_WHEN_LIVE",
        "REPLACE_CRUNCHBASE_URL_WHEN_LIVE"
      ],
      "knowsAbout": [
        "inner wellness",
        "guided reflection",
        "self-awareness",
        "emotional check-in",
        "inner alignment",
        "clarity"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://genmyo.ai/#website",
      "url": "https://genmyo.ai/",
      "name": "GenMyo",
      "publisher": { "@id": "https://genmyo.ai/#organization" },
      "inLanguage": "en"
    },
    {
      "@type": "Service",
      "@id": "https://genmyo.ai/#mirror-project",
      "name": "The Mirror Project",
      "alternateName": "The Mirror Project by GenMyo",
      "provider": { "@id": "https://genmyo.ai/#organization" },
      "serviceType": "Inner wellness — guided reflection",
      "description": "A free guided reflection of about six minutes, delivered entirely through WhatsApp. The Mirror Project by GenMyo asks a short sequence of honest questions to support self-awareness, clarity, and reconnection with yourself. It is not therapy, not a meditation library, and not a crisis service. There is no app to download and nothing to keep up with.",
      "areaServed": "Worldwide",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://genmyo.ai/join"
      }
    }
  ]
}
</script>
```

Note `knowsAbout`: an underused field that hands retrieval systems your topic cluster explicitly — and it's your keyword map (inner wellness, emotional check-in, etc.), not journaling terms.

### 2b. `/faq` — the extraction workhorse

Structure below covers the core questions; extend the `mainEntity` array with every Q&A that is **visibly on the page**. Answers must exist in the rendered HTML in the same words — that's both a Google requirement and how extraction actually works.

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://genmyo.ai/faq#faqpage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is GenMyo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GenMyo is an inner wellness platform delivered entirely through WhatsApp. Its core experience, The Mirror Project by GenMyo, is a guided reflection — a few honest questions, asked slowly, that help you reconnect with yourself and see what's actually going on. There is no app to download and no account to create."
      }
    },
    {
      "@type": "Question",
      "name": "Is GenMyo a journaling or meditation app?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. GenMyo is not a journaling app, a diary, or a meditation library. There is no blank page to fill and no content to browse. The Mirror Project by GenMyo guides you through a short reflection by asking questions — you simply answer, at your own pace."
      }
    },
    {
      "@type": "Question",
      "name": "Is GenMyo free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Your first reflection is free, with no card and no account required. REPLACE_WITH_TRUE_PRICING_DETAIL_IF_ANY."
      }
    },
    {
      "@type": "Question",
      "name": "Is this therapy? Can it replace a therapist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. GenMyo is not therapy and does not replace it. It does not diagnose, treat, or provide clinical care. Reflection can sit alongside therapy, but if you need clinical support, please seek a qualified professional. If you are in crisis, contact your local emergency number or a crisis helpline."
      }
    },
    {
      "@type": "Question",
      "name": "Is it private? Can a human read my reflections?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "REPLACE_WITH_TRUE_ANSWER_MATCHING_PRIVACY_PAGE_EXACTLY."
      }
    },
    {
      "@type": "Question",
      "name": "Will GenMyo message me if I don't reply?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. GenMyo only speaks when you start a reflection. It will never message you unprompted. Send STOP at any time and the conversation ends immediately, with no follow-ups."
      }
    }
  ]
}
</script>
```

The "Is GenMyo a journaling or meditation app?" entry is strategic: it puts your category denial *into the machine-readable layer*, so when an LLM retrieves your FAQ it learns the boundary explicitly.

### 2c. `/philosophy` — your most citable worldview page

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://genmyo.ai/philosophy#aboutpage",
  "url": "https://genmyo.ai/philosophy",
  "name": "Why GenMyo Is Quiet on Purpose",
  "about": { "@id": "https://genmyo.ai/#organization" },
  "description": "GenMyo's philosophy: wellness culture got loud, and the answer to feeling stuck isn't more content to consume. GenMyo asks questions instead of giving advice — no streaks, no feed, no optimisation scores. Inner wellness at your own pace.",
  "inLanguage": "en",
  "dateModified": "REPLACE_YYYY-MM-DD"
}
</script>
```

### 2d. `/100-conversations` — the citable study

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://genmyo.ai/100-conversations#article",
  "headline": "The 100 Conversations Report: Why More Wellness Content Isn't the Answer",
  "alternativeHeadline": "108 anonymized reflections on what actually helps when you feel stuck",
  "author": {
    "@type": "Organization",
    "@id": "https://genmyo.ai/#organization"
  },
  "publisher": { "@id": "https://genmyo.ai/#organization" },
  "datePublished": "REPLACE_TRUE_DATE",
  "dateModified": "REPLACE_TRUE_DATE",
  "url": "https://genmyo.ai/100-conversations",
  "description": "An analysis of 108 anonymized guided reflections conducted January–June 2026. Key findings: 89% of participants found a well-formulated question more valuable than direct advice; the most frequent terms were 'stuck', 'busy', and 'exhausted'. The data suggests the wellbeing bottleneck is not access to more content but the absence of a quiet space for internal processing.",
  "about": ["inner wellness", "self-reflection", "guided reflection"],
  "isAccessibleForFree": true
}
</script>
```

Putting the headline stats *inside* the `description` is deliberate — it gives retrieval systems a pre-packaged, citable summary with the numbers attached to the named study.

### 2e. `/emotional-check-in` (your spearhead page, when built) — or apply to `/how-it-works` today

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://genmyo.ai/emotional-check-in#webpage",
      "url": "https://genmyo.ai/emotional-check-in",
      "name": "How to Check In With Yourself — A Guided Emotional Check-In",
      "about": { "@id": "https://genmyo.ai/#mirror-project" },
      "dateModified": "REPLACE_YYYY-MM-DD"
    },
    {
      "@type": "HowTo",
      "@id": "https://genmyo.ai/emotional-check-in#howto",
      "name": "How to do an emotional check-in",
      "description": "A simple three-step emotional check-in you can do in about six minutes, guided by The Mirror Project by GenMyo on WhatsApp.",
      "totalTime": "PT6M",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Pause and arrive",
          "text": "Stop what you're doing for a moment. You don't need a quiet room or a routine — just a few minutes where you're not performing for anyone."
        },
        {
          "@type": "HowToStep",
          "name": "Answer one honest question",
          "text": "Instead of asking yourself 'how am I?', let one specific question do the work — for example: what's been quietly sitting with you this week?"
        },
        {
          "@type": "HowToStep",
          "name": "Name one thing clearly",
          "text": "You're not solving anything. The goal is to leave with one thing you can see more clearly than you could six minutes ago."
        }
      ]
    }
  ]
}
</script>
```

`HowTo` on this page matters because "how to check in with yourself" is a step-shaped query — this format is what both featured snippets and AI answers assemble from.

---

## Part 3 — Validation checklist

Run in this order after deploying:

- [ ] **Google Rich Results Test** (search.google.com/test/rich-results) on all five URLs — zero errors, zero warnings you don't understand.
- [ ] **Schema.org validator** (validator.schema.org) — catches graph/`@id` issues Google's tool ignores.
- [ ] **View-source check:** every `FAQPage` answer text exists verbatim in the rendered HTML. Schema for content not on the page = policy violation, and unextractable anyway.
- [ ] **`@id` graph check:** every reference to `https://genmyo.ai/#organization` resolves — one organization node, referenced everywhere, never duplicated with different values.
- [ ] **Truthfulness sweep:** no `REPLACE_*` left, no `sameAs` to dead URLs, dates real.
- [ ] **`curl -A "GPTBot" https://genmyo.ai/ | grep "ld+json"`** — confirms AI crawlers receive the schema server-side (the whole game).
- [ ] **GSC → Enhancements** a week later: FAQ and HowTo reports appear with valid items.
- [ ] **Re-validate after every deploy** — SPA frameworks silently drop head tags on rebuilds more often than anyone expects.

---

## Part 4 — Exact content changes for citation readiness

These are the deltas beyond what's already planned:

**1. Fix the footer tagline (sitewide, today).**
- Current: *"An AI-led platform designed to support lasting human development through personalized reflection, guidance, and growth."*
- Replace: *"GenMyo is an inner wellness platform delivered through WhatsApp. The Mirror Project by GenMyo — a guided reflection to help you reconnect with yourself."*
- Why: The footer appears on every page; it's the most-repeated sentence on your site. Right now it contradicts your entity definition. Make it the definition.

**2. Render the FAQ answers.** On `/100-conversations` (and anywhere the FAQ appears), the answers must be present and expanded in the DOM, not hidden behind JS-only accordions that never render text. If you use accordions, ensure the answer text is in the HTML even when visually collapsed.

**3. Add an "In one sentence" block to the top of `/philosophy`, `/how-it-works`, and `/100-conversations`.** Format:
> **In one sentence:** [self-contained claim with the entity name].
> e.g. `/100-conversations`: *"In one sentence: across 108 guided reflections, GenMyo found that 89% of people got more value from one well-formed question than from direct advice."*
- Why: LLMs extract sentences, not pages. Hand them the sentence. This is the single highest-yield copy pattern in GEO, and the calm declarative tone fits your voice exactly.

**4. Convert two `/philosophy` headers to questions.** E.g. "Why we don't give advice" → `## Why doesn't GenMyo give advice?` and "No streaks" → `## Why is there no streak or score?` — question-shaped headers are the retrieval hooks; the answers beneath stay in your voice.

**5. Add the boundary sentence to every key page, verbatim:** *"GenMyo is not therapy, not a diagnostic tool, and not a crisis service."* Same words everywhere. Models reward and reproduce honest scope statements — and verbatim repetition across pages reads as entity fact, not marketing copy.

**6. Date-stamp visibly.** "Last updated: [Month Year]" on `/philosophy`, `/faq`, `/100-conversations`, matching `dateModified` in the schema. Undated content is down-weighted for citation.

**7. Ship `llms.txt`** (template from earlier in our plan) — the markdown version of everything above, at the root.

---

## Part 5 — Brand voice check

Everything above passes the GenMyo voice test because the two are naturally aligned — and that's worth saying explicitly: **what AI engines want (plain, honest, self-contained, boundary-stating sentences) is what your brand already is.** No hype adjectives in any schema description. Boundaries stated as care, not legalese. Questions asked the way a person would ask them. The one voice adjustment I made throughout: schema descriptions are slightly plainer than your on-page poetry — "a few honest questions, asked slowly" survives, but machine-facing text drops metaphor in favor of the definition. That's correct: the *page* can be quiet and evocative; the *markup* should be quiet and literal.

---

**Priority order:** (1) footer tagline fix + FAQ answers rendered, (2) homepage `@graph` deployed, (3) `/faq` FAQPage, (4) `/100-conversations` Article schema, (5) validation pass, (6) "In one sentence" blocks + question headers, (7) `llms.txt`.

The one dependency that caps everything: the `sameAs` targets. Until LinkedIn and at least one other profile are live and pointing back at genmyo.ai, you're a single-source entity — perfectly marked up, but uncorroborated. Ship the LinkedIn page (per the previous plan) in the same sprint as this schema, and the two together are what make GenMyo start appearing in AI answers.