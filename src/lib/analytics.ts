/**
 * Lightweight analytics event tracking.
 * Fires to GA4 (gtag) and Meta Pixel (fbq) if present. No-ops otherwise,
 * so the site works before analytics IDs are configured.
 */

type EventName =
  | "calculator_started"
  | "calculator_completed"
  | "calculator_unit_selected"
  | "calculator_nationality"
  | "whatsapp_clicked"
  | "form_submitted"
  | "brochure_downloaded"
  | "floor_plan_viewed"
  | "video_played"
  | "language_switched"
  | "exit_popup_shown"
  | "exit_popup_converted";

interface WindowWithTrackers extends Window {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}

export function track(event: EventName, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as WindowWithTrackers;
  try {
    w.gtag?.("event", event, params);
    w.dataLayer?.push({ event, ...params });
    // Map a couple of key events to Meta standard events for ad optimisation.
    if (event === "whatsapp_clicked" || event === "form_submitted") {
      w.fbq?.("track", "Lead", params);
    }
    if (event === "calculator_completed") {
      w.fbq?.("track", "ViewContent", params);
    }
  } catch {
    /* never let analytics break the UI */
  }
}
