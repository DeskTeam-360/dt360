"use client";

import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    iFrameResize?: (...args: unknown[]) => void;
  }
}

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

  useEffect(() => {
    if (typeof window.iFrameResize === "function") {
      setEmbedReady(true);
    }
  }, []);

  return (
    <div className={cn("flex min-h-[520px] w-full justify-center", className)}>
      <iframe
        id={bookingIframeId}
        src={embedReady ? bookingIframeSrc : undefined}
        title={iframeTitle}
        allow="payment"
        scrolling="no"
        className="w-[100%] max-w-full border-0 max-[767px]:w-full max-[767px]:max-w-full"
        style={{ border: "none", overflow: "hidden", minHeight: 520 }}
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
