# GenMyo for Business

**Dedicated B2B page specification: SEO, GEO and conversion**
Prepared 8 October 2026 | Target page: `genmyo.ai/for-business`

> **Evidence labels.** **Measured** means observed directly. **Estimated** means my inference. **Needs data** means it could not be verified. The crawl, robots, sitemap and PageSpeed scripts could not be run against genmyo.ai, so the technical findings come from page fetches only.

---

## 1. Strategic call

Build a dedicated page. Today "For business" is a section on the homepage. It cannot rank for B2B queries or answer a buyer's questions, and it dilutes the consumer message.

- **URL:** `/for-business`. It matches the existing nav. Put keyword-rich phrasing in the H1 and title, not the slug.
- **Role:** a decision page for an HR or People lead. The goal is a booked pilot call, not a signup.
- **Primary CTA:** "Book a pilot call."
- **Secondary CTA:** "Try the Mirror yourself (2 min)." This is the strongest asset, because an HR buyer can experience the product before talking to sales.
- **Tertiary CTA:** "Get the trust and privacy pack," gated by work email only. It catches buyers who are not ready to book.

## 2. SERP and intent read (Estimated)

No keyword volumes were pulled, so everything below is Estimated until checked in Search Console or a keyword tool.

**What the live results show (Measured, directory-style results):** WhatsApp-delivered wellbeing already has competitors. Thryve offers anonymous 24/7 wellbeing support via WhatsApp and Telegram in over 50 languages (topai.tools listing). WellHR integrates with Slack and WhatsApp and gives employers aggregated anonymous wellbeing reports (G2 listing). "WhatsApp + anonymous + aggregate" is therefore no longer unique. GenMyo's differentiators have to be reflection and the "story, not mood" angle, plus human mentors.

| Role | Query theme | Intent |
|---|---|---|
| Primary | employee wellbeing platform on WhatsApp | Commercial |
| Secondary | WhatsApp wellbeing program for distributed or frontline teams | Commercial |
| Secondary | employee wellbeing without an app / low-friction EAP alternative | Comparison |
| Supporting (blog) | how to measure employee wellbeing anonymously; why wellbeing apps get low engagement | Informational |

Expect low-to-moderate difficulty for the long-tail WhatsApp terms and high difficulty for head terms such as "employee wellbeing platform." Do not target the head terms yet.

## 3. Page blueprint (top to bottom)

1. **Hero.** H1: "Employee wellbeing your people actually use, on WhatsApp." Add a one-line subhead, the dual CTA, and a trust strip: No app to install, aggregate-only reporting, not therapy, not surveillance. Show the dashboard visual, labelled "illustrative."
2. **Answer block (25 to 50 words, GEO).** A standalone definition: "GenMyo for Business is an AI-guided reflection program delivered on WhatsApp. Employees reflect privately in about two minutes a day; employers see only anonymous, aggregate wellbeing trends." AI engines will lift this block, so keep it self-contained.
3. **The problem.** Wellbeing programs fail on engagement, not on content. Use one sourced stat with a visible citation, and mark it `[needs source]` until one is found.
4. **How it works for employers.** Four steps: deploy via a WhatsApp link or QR code, employees reflect, you see aggregate insights, and optional human mentors are available.
5. **"What you see / what you never see" table.** The biggest trust and conversion lever for this buyer. List the minimum cohort size for reporting, no individual data, no transcripts, no training on reflections, and the retention policy.
6. **Outcomes.** Replace the mockup with real pilot data as soon as it exists. Until then, show what you measure and how, and do not present the +18% figure as a result.
7. **Who it is for.** Short cards for HR and People teams, distributed or frontline workforces, SMEs without an EAP, and consultancies, brokers and EAP providers (linking to Partners).
8. **Comparison table (very GEO-friendly).** GenMyo vs an app-based wellbeing platform vs a traditional EAP vs pulse surveys, across install friction, what employees do, what the employer sees, human escalation, and what it is not. Name competitors only if your legal position allows it.
9. **Proof.** Named quotes and logos (even pilot partners), the 100 Conversations report, and the founder's story.
10. **Safety.** State plainly that it is not a crisis service, describe the escalation path for crisis disclosures, and list the helplines.
11. **Security and compliance.** Cover data processing roles (including Meta/WhatsApp as a processor), GDPR and India's DPDP Act, and the certification roadmap. Do not claim certifications you do not hold. The trust pack download sits here.
12. **Pilot offer.** A free or low-cost 6-week pilot for 50 to 200 people with a pre-agreed measure. Show pricing logic or ranges so "book an enquiry" is not a black box.
13. **FAQ (8 to 10 buyer questions).** For example: Can HR see individual responses? What does it cost? How do we roll it out? What about crisis disclosures? Which countries and languages? Does it replace our EAP?
14. **Final CTA and short form.** Work email, company, headcount band and country, plus one optional "What are you hoping to solve?" field. Keep a sticky CTA on mobile.

### Conversion hygiene

- Use a minimal nav on this page, with one primary action per screen.
- Put a booking-calendar embed directly after the form so there is no dead end.
- Keep testimonials and numbers real.
- Capture UTMs and referrer in hidden form fields.

## 4. On-page SEO spec

- **Title (about 51 characters):** `Employee Wellbeing on WhatsApp | GenMyo for Business`
- **Meta description (about 150 characters):** `Anonymous, aggregate wellbeing for your team, delivered on WhatsApp. No app to install. Not therapy, not surveillance. Book a GenMyo pilot.`
- **Headings:** one H1, then H2s phrased as the questions buyers ask ("What does HR actually see?", "How is this different from an EAP?"). Keep the hierarchy clean with no skipped levels.
- **Internal links:** link to the page from the homepage nav, the footer and the Partners page. Link out to the Mirror demo, the 100 Conversations report, the privacy page and the founder's story. Use descriptive anchors, not "learn more."
- **Images:** descriptive alt text, WebP or AVIF, and explicit width and height to prevent layout shift.
- **Naming:** the site mixes "GenMyo," "GenMyō" and "GENMYŌ." Pick one canonical form for body copy, titles and schema, because name variants split entity recognition.

## 5. GEO spec

- Give every key query a standalone, quotable answer block directly under its heading.
- Use sourced, dated facts in short sentences, and avoid vague superlatives. Add a visible "Last updated" date.
- Mark up with `Organization` (with `sameAs` to LinkedIn, X, Instagram and Wellfound), `WebPage`, `Service` and `BreadcrumbList`. Add `FAQPage` only where the answers appear verbatim on the page. Google limits FAQ rich results for most sites, but the markup still helps machine extraction.
- `llms.txt` is optional and low-evidence. Do not prioritise it over server-rendered content.
- Build off-site surfaces that AI engines cite: a G2 or Capterra profile, the SHRM vendor directory, LinkedIn founder posts and partner pages.
- **Citability test after launch:** ask a live-fetch engine the target queries with your URL and see whether the answer block is used. Treat this as a proxy. Real unprompted citations appear on a weeks-long lag.

## 6. Technical findings and priorities

| Priority | Issue | Detail and fix |
|---|---|---|
| P0 | Client-side rendering | A fetch of `/philosophy` returned only the shared head with no body content; its canonical pointed to the homepage and the title was the homepage's (Measured, though the fetcher may not execute JS). If real crawlers see the same, subpages are effectively invisible and duplicate-signalled. AI crawlers generally do not run JavaScript, so GEO suffers most. Fix: server-side render or statically generate `/for-business` (ideally the whole site) so content and JSON-LD are in the initial HTML. |
| P0 | Per-page head tags | Each page needs its own title, meta description and self-referencing canonical. |
| P1 | www vs non-www | The canonical is `genmyo.ai` but internal links use `www.genmyo.ai`. Pick one, 301 the other, and align canonicals, sitemap and links. |
| P1 | robots.txt and AI bots | Needs a stance decision (see section 8). |
| P1 | Core Web Vitals | Targets: LCP under 2.5s, INP under 200ms, CLS under 0.1. The audience is largely on mid-range mobile devices, so compress the hero orb image and lazy-load the Mirror demo iframe. Needs data. |
| P2 | Sitemap, security, hreflang | Add the new page to the XML sitemap, check HTTPS and security headers, and add `hreflang` only when you localise. |

## 7. Measurement and alerts

**Funnel events to track (GA4 or equivalent):** page view, scroll to the trust table, Mirror demo started, trust pack requested, form started, form submitted, call booked, call held, pilot signed.

**Baselines:** a new page has none. Run four weeks, then set targets. As a hypothesis only (Estimated), a targeted B2B landing page might convert 2 to 5% of qualified visitors to an enquiry. Treat this as a placeholder, not a promise.

| Metric | Warning | Critical |
|---|---|---|
| Organic traffic to the page | -15% week on week | -30% week on week |
| Indexed pages | -5% | -20% |
| Core Web Vitals | "Needs improvement" | "Poor" |
| AI citations on target queries | Any key query lost | More than 20% of queries lost |

Add an always-on trigger for any drop of more than 30% below the trailing 28-day median. After each change, read results against a control over a fixed window (about 28 days for a content or technical change) before deciding to keep or roll back.

## 8. Decision needed: AI crawler stance

The recommended default is a split. Allow retrieval and search bots (OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude's search and user agents, Googlebot) so GenMyo can be cited. Block training crawlers (GPTBot, ClaudeBot, Google-Extended) if you do not want the content used for model training. The alternatives are fully open or fully closed. Confirm which stance GenMyo wants before the robots.txt is written.