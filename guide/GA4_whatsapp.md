# Ticket: Instrument the website → WhatsApp handoff funnel (GA4)

**Product:** GenMyo (genmyo.ai) — The Mirror Project  
**Goal:** Measure conversion from website visit all the way to a WhatsApp reflection actually starting, so we can see and fix drop-off at the handoff.  
**Owner:** _[assign]_ · **Reviewer:** _[assign]_ · **Priority:** High

---

## Implementation status (website)

| # | Event | Status | Where |
|---|-------|--------|--------|
| 1 | `cta_whatsapp_click` | ✅ | Global click delegation on any `/join` link + `data-cta-location` |
| 2 | `join_page_view` | ✅ | `/join` mount |
| 3 | `join_form_start` | ✅ | First field focus |
| 4 | `join_form_submit` | ✅ | After successful register / crisis-users save (not on 409/validation fail) |
| 5 | `whatsapp_redirect` | ✅ | Success-screen QR + Open WhatsApp button clicks |
| 6 | `whatsapp_conversation_started` | 🔶 Mirror | Call `POST /api/ga4-mp` (below) |
| 7 | `reflection_completed` | 🔶 Mirror | Same endpoint, `event_name: reflection_completed` |
| 8 | `quiz_start` / `quiz_complete` | ✅ | `/quiz` |

**Stitch keys on register payloads:** `lead_id`, `ga_client_id`, `ga_session_id` (also echoed in context notes for Mirror). Stored in **your DB**, never as GA4 event params with phone/email.

**GA4 Admin still required (manual):**
- Mark `join_form_submit` and `whatsapp_conversation_started` as **key events**
- Create Measurement Protocol API secret → set Vercel `GA4_MP_API_SECRET`
- Optional gate: Vercel `GA4_MP_SECRET` (Mirror sends header `x-genmyo-mp-secret`)
- Build funnel exploration in GA4 DebugView / Explore

**Page identity note:** `index.html` `<title>` is `GenMyo, Start Your Free Reflection on WhatsApp` — that is the **homepage** document title (not a separate route). Funnel CTAs from `/` are in scope.

**Product flow note:** After submit the site shows a success screen with QR + button (not an immediate `window.location` to wa.me). `whatsapp_redirect` fires on those clicks. HIGH crisis → helplines only; still fires `join_form_submit` with `crisis_hold: true`; no WhatsApp redirect.

---

## Why

GA4 lives on the website; the conversion (user messages the bot) happens inside WhatsApp, which GA4 can't see. Today "Key events" shows *No data available* — we have zero visibility into whether visitors convert. This ticket instruments the full path and stitches the two halves together.

## The real flow (as built today)

```
Any page (home, /how-it-works, /quiz, etc.)
   │  CTA: "Start your reflection on WhatsApp →" / "Start free"
   ▼
/join  (form: Name*, Email*, DOB, Country, WhatsApp Number*, "What's been sitting with you", consent*)
   │  submit
   ▼
Backend saves lead  ──►  success screen (QR + Open WhatsApp)
   ▼
User opens WhatsApp / sends first message
   ▼
Bot receives inbound message  ──►  reflection begins
```

**Stitch key = the WhatsApp phone number the user types into the `/join` form**, plus `lead_id` + `ga_client_id` on the register body.

---

## Events to implement

| # | Event name | Type | Fires when | Key event? |
|---|-----------|------|-----------|:---:|
| 1 | `cta_whatsapp_click` | client (gtag/GTM) | User clicks any CTA that routes to `/join` | – |
| 2 | `join_page_view` | client | `/join` loads (can also read from automatic `page_view`) | – |
| 3 | `join_form_start` | client | User focuses/edits the first form field | – |
| 4 | `join_form_submit` | client | Form passes validation and submits successfully | ✅ **on-site conversion** |
| 5 | `whatsapp_redirect` | client | Deep link fired / WhatsApp open triggered | – |
| 6 | `whatsapp_conversation_started` | **server (MP)** | Bot receives the first inbound message | ✅ **true conversion** |
| 7 | `reflection_completed` | server (MP) | Bot marks first reflection complete (optional, north-star) | optional ✅ |
| 8 | `quiz_start` / `quiz_complete` | client | Inner-Weather quiz interactions (intent signal) | – |

**Mark exactly two as key events to start:** `join_form_submit` and `whatsapp_conversation_started`.  
The ratio between them **is** your handoff conversion rate — the number you can't see today.

---

## Event parameters

### `cta_whatsapp_click`
```js
gtag('event', 'cta_whatsapp_click', {
  button_location: 'hero',        // hero | nav | for_you | final_cta | footer | mobile_sticky | quiz_result | …
  page_path: location.pathname,
  cta_text: 'Start your reflection on WhatsApp'
});
```

### `join_form_submit`  (primary on-site conversion)
```js
gtag('event', 'join_form_submit', {
  has_country: true,
  has_dob: true,
  wrote_reflection_note: true,
  entry_source: sessionStorage.getItem('first_cta_location') || 'unknown',
  crisis_hold: false
});
```

### `whatsapp_conversation_started`  (server-side, via Measurement Protocol)

```
event params:
  lead_id          : internal lead id (not PII)
  minutes_to_reply : whole minutes between form submit and first inbound message
  matched_on       : 'phone' | 'refcode'
```

> ⚠️ **Never send PII or reflection content to GA4.** No phone numbers, emails, names, DOB, or the "what's been sitting with you" text.

---

## Stitching: `client_id` through the form

On `/join` submit the website reads GA4 `client_id` + `session_id` via `gtag('get', …)` and sends:

```json
{
  "lead_id": "ld_…",
  "ga_client_id": "1234567890.1712345678",
  "ga_session_id": "1712345678",
  "...register fields..."
}
```

Mirror must **persist** `lead_id` ↔ `phone` ↔ `ga_client_id` ↔ `ga_session_id` at register time.

On first inbound WhatsApp message: match phone (or ref code) → look up `ga_client_id` → call MP once (idempotent on `lead_id`).

---

## Mirror: fire conversation started

`POST https://www.genmyo.ai/api/ga4-mp`  
Header (if configured): `x-genmyo-mp-secret: <GA4_MP_SECRET>`  
Content-Type: `application/json`

```json
{
  "event_name": "whatsapp_conversation_started",
  "client_id": "1234567890.1712345678",
  "session_id": "1712345678",
  "lead_id": "ld_9c2f04",
  "minutes_to_reply": 3,
  "matched_on": "phone",
  "debug": false
}
```

Validate first with `"debug": true` (hits Google's debug endpoint).

Vercel env:
- `GA4_MP_API_SECRET` — from GA4 Admin → Data Streams → Measurement Protocol API secrets
- `GA4_MP_SECRET` — optional shared secret for Mirror → website
- `GA4_MEASUREMENT_ID` — optional override (default `G-NJ54MSB84D`)

---

## Trigger conditions (precise)

- **`cta_whatsapp_click`** — delegated listener on `/join` links; stashes `first_cta_location` in sessionStorage.
- **`join_form_submit`** — after successful API save (register or crisis-users). Not on validation fail or 409.
- **`whatsapp_redirect`** — on success-screen WhatsApp button / QR click.
- **`whatsapp_conversation_started`** — Mirror, once per `lead_id`, first inbound only.

---

## Consent

Gate client tags behind a consent banner with GA4 Consent Mode (`analytics_storage`) when the banner ships. The `/join` T&Cs checkbox is separate (WhatsApp opt-in). No consent banner is live yet — GA currently loads from `index.html` as before.

---

## Definition of done

- [x] Website client events 1–5 + 8 wired in code
- [x] `client_id` / `session_id` / `lead_id` sent on register + crisis payloads
- [x] `POST /api/ga4-mp` ready for Mirror
- [ ] All events visible in GA4 **DebugView** (after deploy + test)
- [ ] `client_id` round-trip verified with one real lead (Mirror)
- [ ] `join_form_submit` and `whatsapp_conversation_started` marked as key events
- [ ] Funnel exploration built in GA4
- [ ] Confirmed: no PII in event parameters (audit DebugView)
- [x] Documented homepage title identity (see Implementation status)

---

## What each gap will tell us

- **CTA click → /join view:** landing-page copy / CTA clarity.
- **/join view → form submit:** the form is the friction (fields, length, trust). This is the biggest lever the *website* owns.
- **form submit → conversation started:** the WhatsApp open itself is leaking (wrong number, "message this business?" hesitation, device friction). Different problem, different fix — which is exactly why we split events 4/5/6.
