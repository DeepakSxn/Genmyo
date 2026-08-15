/**
 * Central WhatsApp config for GenMyo.
 * Bare click-to-chat — no prefill (works cleanly on Android + iPhone).
 */

export const WHATSAPP_BUSINESS_ID = "message/Y4GOKBIGBWUUM1";

/** WhatsApp Business click-to-chat URL (no ?text= prefill). */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_BUSINESS_ID}`;

/** @deprecated kept for call sites — always returns bare link, ignores text */
export function getWhatsAppUrl(_text?: string): string {
  return WHATSAPP_URL;
}

/** @deprecated kept for call sites — always returns bare link */
export function getWhatsAppStartUrl(_name?: string | null): string {
  return WHATSAPP_URL;
}
