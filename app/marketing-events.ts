"use client";

type EventData = Record<string, string>;

type MarketingWindow = typeof window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  va?: (action: string, event: string, data?: EventData) => void;
};

export function trackMarketingEvent(event: string, data?: EventData) {
  if (typeof window === "undefined") return;
  const browser = window as MarketingWindow;
  browser.va?.("event", event, data);
  browser.gtag?.("event", event, data);
  browser.fbq?.("trackCustom", event, data);
}

export function trackLead(source: string, data?: EventData) {
  trackMarketingEvent("lead_whatsapp", { source, ...data });

  if (typeof window === "undefined") return;
  const browser = window as MarketingWindow;
  browser.fbq?.("track", "Lead", { content_name: source, ...data });
}
