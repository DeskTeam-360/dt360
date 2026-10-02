"use client";

import { useEffect, useRef } from "react";
import { GA_BOOKED_CALL_EVENT } from "@/lib/seo/analytics";

type Props = {
  /** Where the booking was confirmed (for GA4 event params). */
  source?: string;
};

/**
 * F4 — fire once on the booking thank-you page so GA4 can mark booked calls
 * as a key event (Admin > Events → mark `booked_call` as key event).
 */
export function GaBookedCallEvent({ source = "demo_call_thank_you" }: Props) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;

    const send = () => {
      if (typeof window.gtag !== "function") return false;
      window.gtag("event", GA_BOOKED_CALL_EVENT, {
        event_category: "conversion",
        event_label: source,
      });
      // Recommended GA4 lead event (also useful if key-event setup uses this name).
      window.gtag("event", "generate_lead", {
        method: "book_a_call",
        lead_source: source,
      });
      return true;
    };

    if (send()) return;

    // gtag may still be loading (afterInteractive); retry briefly.
    const started = Date.now();
    const id = window.setInterval(() => {
      if (send() || Date.now() - started > 8000) {
        window.clearInterval(id);
      }
    }, 250);

    return () => window.clearInterval(id);
  }, [source]);

  return null;
}
