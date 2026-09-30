"use client";

import Script from "next/script";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

export type GhlBookingEmbedConfig = {
  bookingIframeSrc: string;
  bookingIframeId: string;
  bookingEmbedScriptSrc: string;
  /** Unique value for script dedupe dataset (defaults to bookingIframeId). */
  scriptDatasetKey?: string;
  iframeTitle?: string;
};

/**
 * Lead Connector / GHL booking widget.
 *
 * form_embed.js hides booking iframes until it handles `iframeLoaded`.
 * If the iframe starts loading before that script registers its message
 * handler, the first postMessage is missed and the calendar stays hidden
 * until a manual reload. Delay the iframe `src` until the embed script is ready.
 *
 * form_embed.js also auto-resizes the iframe (inline `height`) to its content
 * on every step (time slots, form). Keep min-height small and never set a fixed
 * `height` or `scrolling="no"`, or the resizer can't shrink/grow it correctly.
 */
export function GhlBookingEmbed({
  config,
  className = "",
}: {
  config: GhlBookingEmbedConfig;
  className?: string;
}) {
  const {
    bookingIframeSrc,
    bookingIframeId,
    bookingEmbedScriptSrc,
    iframeTitle = "Schedule your call",
  } = config;
  const [embedReady, setEmbedReady] = useState(false);
  const markReady = useCallback(() => setEmbedReady(true), []);

  return (
    <div className={cn("flex min-h-[520px] w-full justify-center", className)}>
      <iframe
        id={bookingIframeId}
        src={embedReady ? bookingIframeSrc : undefined}
        title={iframeTitle}
        allow="payment"
        className="min-h-[520px] w-[100%] max-w-full border-0 max-[767px]:w-full max-[767px]:max-w-full"
        style={{ border: "none", overflow: "hidden" }}
      />
      <Script
        id="ghl-form-embed"
        src={bookingEmbedScriptSrc}
        strategy="afterInteractive"
        onReady={markReady}
        onError={markReady}
      />
    </div>
  );
}
