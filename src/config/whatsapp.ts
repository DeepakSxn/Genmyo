/**
 * Central WhatsApp config for GenMyo.
 * Same wa.me click-to-chat URL works on Android and iPhone (opens WhatsApp with a draft to send).
 */

export const WHATSAPP_BUSINESS_ID = "message/Y4GOKBIGBWUUM1";

/** Default first message the Mirror expects */
export const DEFAULT_WHATSAPP_TEXT = "hi mirror";

/**
 * Strip internal ops fields that must never appear in the user's WhatsApp draft
 * (Token, Path, Weather Profile, etc. — those belong in sheet/email only).
 */
export function sanitizeWhatsAppText(text: string): string {
  return text
    .replace(/\s*\(?\s*Token:\s*genmyo_ref_[A-Za-z0-9]+\)?/gi, "")
    .replace(/\s*Token:\s*genmyo_ref_[A-Za-z0-9]+/gi, "")
    .replace(
      /\s*\|?\s*(Path|Quiz completed|Weather Profile|Perk|DOB|Country|City|Life stage|Notes|6 Months Free eligible)\s*:[^|]*/gi,
      ""
    )
    .replace(/\s*\|\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/\.\s*\./g, ".")
    .trim();
}

/**
 * Prefill after join / welcome email: "hi mirror. this is {name}"
 */
export function getWhatsAppStartText(name?: string | null): string {
  const trimmed = (name || "").trim();
  return trimmed ? `hi mirror. this is ${trimmed}` : DEFAULT_WHATSAPP_TEXT;
}

/**
 * Fully encoded WhatsApp Business click-to-chat URL (Android + iPhone).
 */
export function getWhatsAppUrl(text: string = DEFAULT_WHATSAPP_TEXT): string {
  const cleaned = sanitizeWhatsAppText(text || DEFAULT_WHATSAPP_TEXT) || DEFAULT_WHATSAPP_TEXT;
  return `https://wa.me/${WHATSAPP_BUSINESS_ID}?text=${encodeURIComponent(cleaned)}`;
}

export function getWhatsAppStartUrl(name?: string | null): string {
  return getWhatsAppUrl(getWhatsAppStartText(name));
}
