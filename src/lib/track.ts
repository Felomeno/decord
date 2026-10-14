// Contact KPIs (see docs/decormg/04-ux-architecture.md). Pushes to window.dataLayer only if an
// analytics tool has been installed with consent; otherwise it does nothing. No cookies are set here.

type TrackEvent =
  | "cta_whatsapp"
  | "cta_phone"
  | "builder_open_whatsapp"
  | "builder_copy"
  | "builder_invalid"
  | "project_open";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: TrackEvent, detail: Record<string, string> = {}) {
  if (typeof window === "undefined" || !Array.isArray(window.dataLayer)) return;
  window.dataLayer.push({ event, ...detail });
}
