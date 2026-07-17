/**
 * GA4 Event Tracking Helper
 * SSR-safe wrapper for Google Analytics (gtag)
 */

const GA_MEASUREMENT_ID = "G-V7QLD9X13G"; // Default GA4 ID for GenMyo

export function initGA() {
  if (typeof window === "undefined" || (window as any)._gaInitialized) return;

  // Add script tag dynamically
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });

  (window as any)._gaInitialized = true;
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
  params?: Record<string, any>
) {
  if (typeof window !== "undefined" && window.gtag) {
    const mergedParams = {
      ...params,
      device_type: getDeviceType(),
    };
    window.gtag("event", eventName, mergedParams);
  } else {
    console.log(`[Analytics Pending Init] Event: ${eventName}`, {
      ...params,
      device_type: getDeviceType(),
    });
  }
}

// Funnel-specific tracking helpers
export function trackCTAView(ctaId: string, location: string) {
  trackGAEvent("cta_view", {
    cta_id: ctaId,
    cta_location: location,
  });
}

export function trackCTAClickWhatsApp(ctaId: string, destination: string) {
  trackGAEvent("cta_click_whatsapp", {
    cta_id: ctaId,
    cta_destination: destination,
  });
}

export function trackFormStart(formId: string) {
  trackGAEvent("form_start", {
    form_id: formId,
  });
}

export function trackFormFieldFocus(formId: string, fieldName: string) {
  trackGAEvent("form_field_focus", {
    form_id: formId,
    field_name: fieldName,
  });
}

export function trackDesktopQRShown(formId: string) {
  trackGAEvent("desktop_qr_shown", {
    form_id: formId,
  });
}

export function trackWhatsAppRedirectFired(formId: string, token: string) {
  trackGAEvent("whatsapp_redirect_fired", {
    form_id: formId,
    token: token,
  });
}

export function trackReflectionStarted(method: "form_success" | "direct_link") {
  trackGAEvent("reflection_started", {
    start_method: method,
  });
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
