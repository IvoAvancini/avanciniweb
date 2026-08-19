"use client";

import { track } from "@vercel/analytics";

type EventData = Record<string, string>;

type MarketingWindow = typeof window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

export function trackMarketingEvent(event: string, data?: EventData) {
  track(event, data);

  const browser = window as MarketingWindow;
  browser.gtag?.("event", event, data);
  browser.fbq?.("trackCustom", event, data);
}

export function trackLead(source: string, data?: EventData) {
  trackMarketingEvent("lead_whatsapp", { source, ...data });

  const browser = window as MarketingWindow;
  browser.fbq?.("track", "Lead", { content_name: source, ...data });
}
