/**
 * GA4 Event Tracking — website → WhatsApp handoff funnel
 * Measurement ID: G-NJ54MSB84D
 *
 * Never send PII or reflection content to GA4.
 * Booleans, enums, durations, opaque lead ids only.
 */

export const GA_MEASUREMENT_ID = "G-NJ54MSB84D";

const FIRST_CTA_KEY = "first_cta_location";
const LEAD_ID_KEY = "genmyo_lead_id";

export type CtaButtonLocation =
  | "hero"
  | "nav"
  | "for_you"
  | "final_cta"
  | "footer"
  | "mobile_sticky"
  | "quiz_result"
  | "how_it_works"
  | "stories"
  | "founders_story"
  | "content"
  | "unknown";

export function initGA() {
  if (typeof window === "undefined") return;

  if (!window._gaInitialized) {
    if (typeof window.gtag !== "function") {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };

      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
      });
    }

    window._gaInitialized = true;
  }

  bindJoinCtaDelegation();
}

const getDeviceType = (): "mobile" | "desktop" => {
  if (typeof window === "undefined") return "desktop";
  const ua = window.navigator.userAgent;
  if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    return "mobile";
  }
  return "desktop";
};

export function trackGAEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined | null>
) {
  if (typeof window === "undefined") return;

  const cleaned: Record<string, string | number | boolean> = {
    device_type: getDeviceType(),
  };
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      cleaned[key] = value;
    }
  }

  if (window.gtag) {
    window.gtag("event", eventName, cleaned);
  } else {
    console.log(`[Analytics Pending Init] Event: ${eventName}`, cleaned);
  }
}

// ─── Funnel events (GA4_whatsapp.md) ─────────────────────────────────────────

export function rememberFirstCtaLocation(location: CtaButtonLocation | string) {
  if (typeof window === "undefined") return;
  if (!sessionStorage.getItem(FIRST_CTA_KEY)) {
    sessionStorage.setItem(FIRST_CTA_KEY, location);
  }
}

export function getFirstCtaLocation(): string {
  if (typeof window === "undefined") return "unknown";
  return sessionStorage.getItem(FIRST_CTA_KEY) || "unknown";
}

/** 1. CTA that routes to /join */
export function trackCtaWhatsappClick(opts: {
  button_location: CtaButtonLocation | string;
  cta_text?: string;
  page_path?: string;
}) {
  const button_location = opts.button_location || "unknown";
  rememberFirstCtaLocation(button_location);
  trackGAEvent("cta_whatsapp_click", {
    button_location,
    page_path: opts.page_path || (typeof window !== "undefined" ? window.location.pathname : "/"),
    cta_text: (opts.cta_text || "Start your reflection on WhatsApp").slice(0, 100),
  });
}

/** 2. /join loads */
export function trackJoinPageView() {
  trackGAEvent("join_page_view", {
    page_path: "/join",
    entry_source: getFirstCtaLocation(),
  });
}

/** 3. First focus/edit on join form */
export function trackJoinFormStart() {
  trackGAEvent("join_form_start", {
    form_id: "individual_registration",
    entry_source: getFirstCtaLocation(),
  });
}

/** 4. Successful join submit (on-site conversion — mark as key event in GA4) */
export function trackJoinFormSubmit(opts: {
  has_country: boolean;
  has_dob: boolean;
  wrote_reflection_note: boolean;
  crisis_hold?: boolean;
}) {
  trackGAEvent("join_form_submit", {
    has_country: opts.has_country,
    has_dob: opts.has_dob,
    wrote_reflection_note: opts.wrote_reflection_note,
    entry_source: getFirstCtaLocation(),
    crisis_hold: Boolean(opts.crisis_hold),
  });
}

/** 5. WhatsApp deep link / QR open triggered */
export function trackWhatsappRedirect(source: "button" | "qr" | "other" = "button") {
  trackGAEvent("whatsapp_redirect", {
    page_path: typeof window !== "undefined" ? window.location.pathname : "/join",
    redirect_source: source,
    entry_source: getFirstCtaLocation(),
  });
}

/** 8. Quiz */
export function trackQuizStart() {
  trackGAEvent("quiz_start", {
    page_path: "/quiz",
  });
}

export function trackQuizComplete(weatherKey: string) {
  trackGAEvent("quiz_complete", {
    weather_key: weatherKey,
  });
}

// ─── GA identity (stitching — store in your DB, never as GA event params with PII) ─

export interface GaIds {
  clientId: string;
  sessionId: string;
}

function gtagGet(field: "client_id" | "session_id"): Promise<string> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      resolve("");
      return;
    }
    let settled = false;
    const done = (value: unknown) => {
      if (settled) return;
      settled = true;
      resolve(typeof value === "string" ? value : String(value || ""));
    };
    try {
      window.gtag("get", GA_MEASUREMENT_ID, field, done);
    } catch {
      done("");
    }
    setTimeout(() => done(""), 1500);
  });
}

export async function getGaIds(): Promise<GaIds> {
  const [clientId, sessionId] = await Promise.all([
    gtagGet("client_id"),
    gtagGet("session_id"),
  ]);
  return { clientId, sessionId };
}

/** Opaque lead id for backend ↔ MP stitching (not phone, not email). */
export function getOrCreateLeadId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(LEAD_ID_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? `ld_${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`
        : `ld_${Date.now().toString(36)}`;
    sessionStorage.setItem(LEAD_ID_KEY, id);
  }
  return id;
}

// ─── Global /join CTA click delegation ───────────────────────────────────────

function isJoinHref(href: string | null): boolean {
  if (!href) return false;
  try {
    if (href.startsWith("/join")) return true;
    const url = new URL(href, window.location.origin);
    return url.pathname === "/join" || url.pathname === "/join/";
  } catch {
    return href.includes("/join");
  }
}

function resolveCtaLocation(el: Element): string {
  const explicit =
    el.getAttribute("data-cta-location") ||
    el.closest("[data-cta-location]")?.getAttribute("data-cta-location");
  if (explicit) return explicit;

  const path = window.location.pathname;
  if (path === "/") return "hero";
  if (path.startsWith("/quiz")) return "quiz_result";
  if (path.startsWith("/how-it-works")) return "how_it_works";
  if (path.startsWith("/stories")) return "stories";
  if (path.startsWith("/founders-story")) return "founders_story";
  return "content";
}

function bindJoinCtaDelegation() {
  if (typeof window === "undefined" || (window as any)._gaJoinCtaBound) return;
  (window as any)._gaJoinCtaBound = true;

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as Element | null;
      if (!target?.closest) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!isJoinHref(href)) return;

      // Nav Join button
      const inNav = Boolean(anchor.closest("[data-site-nav]"));
      const location = inNav ? "nav" : resolveCtaLocation(anchor);
      const cta_text = (anchor.textContent || "").replace(/\s+/g, " ").trim().slice(0, 100);

      trackCtaWhatsappClick({
        button_location: location,
        cta_text: cta_text || "Join",
        page_path: window.location.pathname,
      });
    },
    true
  );
}

// ─── Legacy helpers (kept for existing call sites) ───────────────────────────

export function trackCTAView(ctaId: string, location: string) {
  trackGAEvent("cta_view", {
    cta_id: ctaId,
    cta_location: location,
  });
}

/** @deprecated Prefer trackCtaWhatsappClick — still fires new event name */
export function trackCTAClickWhatsApp(ctaId: string, destination: string) {
  trackCtaWhatsappClick({
    button_location: ctaId.includes("hero")
      ? "hero"
      : ctaId.includes("foryou") || ctaId.includes("for_you")
        ? "for_you"
        : ctaId.includes("final")
          ? "final_cta"
          : "content",
    cta_text: ctaId,
    page_path: destination,
  });
}

export function trackFormStart(formId: string) {
  if (formId === "individual_registration") {
    trackJoinFormStart();
    return;
  }
  trackGAEvent("form_start", { form_id: formId });
}

export function trackFormFieldFocus(formId: string, fieldName: string) {
  trackGAEvent("form_field_focus", {
    form_id: formId,
    field_name: fieldName,
  });
}

export function trackDesktopQRShown(formId: string) {
  trackGAEvent("desktop_qr_shown", { form_id: formId });
}

export function trackWhatsAppRedirectFired(formId: string, _token?: string) {
  trackWhatsappRedirect("button");
}

export function trackReflectionStarted(method: "form_success" | "direct_link") {
  trackGAEvent("reflection_started", { start_method: method });
}

export function trackQuizStartedFromJoin() {
  trackQuizStart();
}

export function trackQuizCompleted(weatherKey: string) {
  trackQuizComplete(weatherKey);
}

export function trackPerkClaimed(_token: string) {
  trackGAEvent("perk_claimed", {});
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    _gaInitialized?: boolean;
    _gaJoinCtaBound?: boolean;
  }
}
