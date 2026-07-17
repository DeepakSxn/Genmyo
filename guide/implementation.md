Below is the fully merged, end-to-end phasemap for GenMyo — combining the technical audit (paste.txt) and the strategic growth playbook into a single chat-only checklist. Nothing here requires external tools; check items off sequentially, since each phase gates the next.

## Phase 0 — Unbreak the site (Week 1, blocks everything downstream)

- [x] Verify current bot-visible HTML: run `curl -A "GPTBot" https://genmyo.ai/philosophy | grep "<h1"` and confirm it returns empty (baseline proof of the problem)
- [x] Migrate to SSR/SSG (Next.js, Astro, Remix) or add prerendering middleware (Prerender.io, Vercel/Netlify prerender, vite-plugin-ssg)
- [x] Re-run the curl test post-fix; confirm real `<h1>` and body text return for GPTBot, ClaudeBot, and a plain non-JS fetch
- [x] Pick one host: 301 redirect `www.genmyo.ai → genmyo.ai` (matches your sitemap/brand)
- [x] Update every canonical tag to be per-route and self-referencing on the chosen host (kill the global `→ /` canonical)
- [x] Update sitemap.xml to reference only the chosen host, with real `<lastmod>` dates per URL
- [x] Ship unique `<title>` + `<meta name="description">` + `og:title` + `og:description` + `twitter:*` for every page (exact copy in the audit §5a — homepage, /philosophy, /join, /team, /partners, /blog, both blog posts)
- [x] Ship `/privacy` page with the plain-English data table (what's stored, retention period, human access, AI training use, delete/stop commands) — fill every bracketed placeholder truthfully before publishing
- [x] Replace the "Join" CTA sitewide with a real crawlable `<a href="https://wa.me/<NUMBER>?text=...">` anchor tag containing a prefilled first message
- [x] Add three-line CTA microcopy beneath the button: cost / time / friction-removal + a link to `/privacy`
- [x] Publish `robots.txt` explicitly allowing GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, CCBot, Applebot-Extended, with `Sitemap:` line included [growthscope](https://growthscope.io/en/blog/gptbot-block-allow-robots-txt-guide-2026)
- [x] Optional but recommended: add an `llms.txt` file stating org context, core pages, and entity definition for AI crawlers, since robots.txt only controls access, not context [growthscope](https://growthscope.io/en/blog/gptbot-block-allow-robots-txt-guide-2026)
- [x] Set up Google Search Console, Bing Webmaster Tools, and GA4; submit sitemap; record baseline (impressions, clicks, indexed pages — should currently read ~1)
- [x] Set up GA4 + WhatsApp webhook event tracking for the funnel: `cta_view → cta_click_whatsapp → reflection_started → reflection_completed`
- [x] Measure Core Web Vitals; target LCP under 2.5s on mobile 4G (CSR hydration was the likely killer — recheck after SSR)
- [x] **Milestone gate:** `site:genmyo.ai` returns 12+ indexed pages in GSC, not 1. Do not proceed to Phase 1 until true.

## Phase 1 — The 6 money pages + entity foundation (Weeks 1–4)

- [x] Rewrite `/` (homepage): new H1 "Some questions are better than advice," new self-contained entity-definition sub-headline (the exact sentence an LLM can lift verbatim — audit §5b)
- [x] Add homepage Section 1: trust bar (reflection count, "runs inside WhatsApp," privacy link, "not therapy" link)
- [x] Add homepage Section 2: "How it works" 3-step block (send message → answer questions → leave with one clear thing), including the STOP-anytime control line
- [x] Add homepage Section 3: one real anonymised reflection excerpt, rendered as crawlable HTML text (not an image)
- [x] Add homepage Section 4: "What GenMyo is not" — not therapy, not crisis service, not a habit tracker, not always-on
- [x] Build `/privacy` (already drafted in Phase 0 — confirm it's linked next to every CTA, not just the footer)
- [x] Build `/how-it-works` with the 3-step explainer + sample transcript, tagged for `HowTo` schema
- [x] Build `/faq` with all 12 Q&As from audit §5f (What is GenMyo / Mirror Project, is it free, app-free, duration, privacy, AI training use, not-therapy, crisis resources, unprompted messaging, who it's for, how to start) — verify crisis helpline numbers before publishing
- [x] Build `/whatsapp-journaling` targeting "whatsapp journaling" / "journaling without an app" — your uncontested beachhead keyword
- [x] Rewrite `/join` as the pure transactional endpoint: remove any email gate, state exactly what happens on submit
- [x] Deploy sitewide JSON-LD: `Organization`, `WebSite`, `Service` (not `MedicalWebPage`/`HealthApplication` — avoids YMYL scrutiny) — exact schema in audit §5g
- [x] Deploy `FAQPage` schema on `/faq` and homepage FAQ block
- [x] Deploy `HowTo` schema on `/how-it-works`
- [x] Everywhere in copy, write "The Mirror Project by GenMyo" on first mention (training the entity association against name collisions)
- [x] Run your canary GEO test today: ask ChatGPT, Perplexity, Claude, Gemini "What is GenMyo?" and log the baseline (expect hallucination or shrug)
- [x] **Milestone gate:** first non-zero impressions in GSC; first tracked `reflection_started` event.

## Phase 2 — The cluster content engine (Weeks 2–14, 3–4 pages/week → ~45 pages)
- [x] Build Cluster 1 (commercial, build first) — pillar `/ai-journaling` with an honest comparison table that admits competitor strengths
- [x] Add Cluster 1 sub-pages: `/alternatives/rosebud` (done), `/alternatives/stoic` (done), `/ai-journaling-vs-therapy`, `/is-ai-journaling-private`, `/journaling-without-an-app` (handled by `/whatsapp-journaling`), `/free-ai-journaling`
- [x] Build Cluster 2 (informational) — pillar `/feeling-stuck` + 7 sub-pages (feeling stuck in life, feeling stuck but busy, feeling stuck in your 20s, stuck in a job, languishing vs burnout vs depression, "just do something" doesn't work, knowing what you want)
- [x] Build Cluster 3 (link magnet + programmatic seed) — pillar `/guided-reflection` + 7 sub-pages of reflection question lists (end-of-day, morning, overwhelm, clarity, decision-making, weekly review, career)
- [x] Build Cluster 4 (brand moat) — make existing `/philosophy` visible with a CTA + 6 sub-pages (streaks, self-optimisation critique, inner alignment, no morning routine, why wellness got loud, growth at your own pace)
- [x] Enforce content mix: 55% commercial/comparison, 45% informational for the first 90 days (override the standard 40/60 split — commercial converts 10–20x better per click here)
- [x] Apply the extraction checklist to every new page: 2-sentence standalone answer up top, question-shaped H2s, one table/list, dated "Last updated" + named author, one proprietary data point (your reflection transcripts/100-conversation findings), contextual wa.me CTA at mid-scroll and end
- [x] Tag each blog post with `BlogPosting` + `Person` author schema and `BreadcrumbList`
- [x] **Milestone gate (Day 90):** ~25 indexed pages, 15,000 impressions/mo, 800 clicks/mo, 120 reflections/mo.

## Phase 3 — Authority, PR, and brand-demand engine (Weeks 4–20)

- [x] Publish "The 100 Conversations Report" — anonymised, quantified (top 5 recurring themes, % wanting advice vs. a better question, most common words), downloadable PDF, linkable standalone page
- [x] Build a free Reflection Prompt Generator tool (situation picker → 5 questions → one-click continue-in-WhatsApp), no signup required
- [x] Launch on Product Hunt — only after Phase 0 + Phase 1 pages are live (one-shot opportunity)
- [x] Create/complete entity corroboration: LinkedIn company page, Crunchbase profile, `sameAs` graph linking all of them back to the Organization schema
- [x] Identify and email authors of 3–5 "best AI journaling apps" listicles; offer free access + the 100 Conversations data
- [x] Answer 3 HARO/Qwoted/Featured queries per week on journaling, AI+wellbeing, burnout, WhatsApp-native products, anti-hustle culture
- [x] Book 6–10 founder podcast appearances (each creates a branded-search bump + citable transcript)
- [x] Sweep for unlinked brand mentions once PR starts; request links
- [x] Post 3x/week on LinkedIn as founder (reflection questions, report excerpts, build-in-public notes)
- [x] Produce YouTube Shorts/Reels (30-second prompt-library clips) — repurposed content, branded-search driver
- [x] Participate genuinely (no cold links) in r/Journaling, r/selfimprovement, r/getdisciplined — Reddit is also heavily weighted by LLM retrieval
- [x] Add a weekly reflection-question email to every completed reflection (owned audience = highest-CTR traffic)
- [x] Skip local/city-page SEO entirely (no service area — thin pages would risk quality signals); exception: create one Google Business Profile as an organisation if GenMyo is incorporated in India
- [x] **Milestone gate:** first brand searches appear in GSC; first AI citation logged in the GEO panel.

## Phase 4 — Compound, programmatic scale, and GEO lock-in (Week 12 → ongoing)

- [x] From Week 8: launch the refresh loop — monthly pull of GSC queries ranking positions 8–20, add exact query to title/H1, expand matching section, add an FAQ entry, internal-link from strongest page, re-request indexing
- [x] Enforce internal linking rules on every new page: 3–5 outbound links, 3–5 inbound links, keyword-rich anchors (never "click here"), cluster pages link up to pillar, every page links to `/join` or a wa.me CTA
- [x] Build the programmatic `/reflection-questions/[situation]` library (~120 target pages: feeling stuck at work, before a big decision, after a breakup, can't sleep, feeling behind, before a career change, feeling numb, Sunday night, overwhelmed, before a birthday, after rejection, etc.)
- [x] Quality-gate every programmatic page: 5–8 situation-specific (non-templated) questions, 150-word original intro, one real anonymised excerpt where available, internal links to pillar, wa.me CTA, `FAQPage`/`ItemList` schema — skip the page entirely if you can't hit 150 genuine words
- [x] Deploy remaining SERP-feature schema: `BreadcrumbList`, `Organization`, `Service`, `BlogPosting` + `Person` author sitewide
- [x] Confirm the entity-definition sentence is present verbatim on `/`, `/faq`, `/how-it-works`
- [x] Confirm scope-boundary statements ("not therapy, not a crisis service") appear on all three pages
- [x] Confirm comparison tables admit competitor strengths (never claim to "win everything")
- [x] Track the 15-prompt GEO panel monthly across ChatGPT, Perplexity, Claude, Gemini, AI Overviews — log cited / mentioned / absent per prompt, including the canary "What is GenMyo?"
- [x] Re-check `llms.txt` and `robots.txt` quarterly as AI crawler behavior and user-agent strings change [capston](https://capston.ai/robots-txt-for-ai-bots/)
- [ ] **Milestone gate (Day 180):** ~70 indexed pages, 180,000 impressions/mo, ~9,000 clicks/mo, 900 reflections/mo.
- [ ] **Milestone gate (Day 365):** 150 indexed pages, 400,000 impressions/mo, ~22,000 clicks/mo, 2,500 reflections/mo.

## Ongoing weekly/monthly scoreboard (run forever)

- [x] Weekly GSC check: impressions, clicks, CTR, query positions (1–3 / 4–10 / 11–20), indexed page count, top gaining/losing pages
- [x] Weekly funnel check: `cta_view → cta_click_whatsapp → reflection_started → reflection_completed`
- [x] Weekly calculation: Reflection Start Rate = `reflection_started ÷ cta_click_whatsapp` — flag if it drops below expected range (40–60% leak is normal pre-fix; the prefilled message should shrink this)
- [x] Monthly: run the 15-prompt GEO panel, report "% of AI answers where GenMyo is named"
- [x] Never let a rising impression count replace reflections-started as the definition of success — that is the one failure mode both source documents explicitly warn against