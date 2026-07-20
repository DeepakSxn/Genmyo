/**
 * Central WhatsApp Configuration for GenMyo
 * Update WHATSAPP_NUMBER or WHATSAPP_BUSINESS_LINK here to update links across the entire site.
 */

// If using a direct phone number (e.g. 91XXXXXXXXXX):
export const WHATSAPP_NUMBER = "91XXXXXXXXXX";

// If using a WhatsApp Business short link (e.g. message/Y4GOKBIGBWUUM1):
export const WHATSAPP_BUSINESS_ID = "message/Y4GOKBIGBWUUM1";

export const DEFAULT_WHATSAPP_TEXT = "hi mirror";

/**
 * Returns a fully formatted WhatsApp URL with optional prefilled message text.
 */
export function getWhatsAppUrl(text: string = DEFAULT_WHATSAPP_TEXT): string {
  const messageText = text || DEFAULT_WHATSAPP_TEXT;
  
  // Uses WhatsApp Business link if configured, or direct number if WHATSAPP_NUMBER is replaced
  if (WHATSAPP_NUMBER && !WHATSAPP_NUMBER.includes("X")) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
  }
  
  return `https://wa.me/${WHATSAPP_BUSINESS_ID}?text=${encodeURIComponent(messageText)}`;
}
