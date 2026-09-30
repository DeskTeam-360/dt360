"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type GhlBookingEmbedConfig = {
  bookingIframeSrc: string;
  bookingIframeId: string;
  bookingEmbedScriptSrc: string;
  /** Unique value for script dedupe dataset (defaults to bookingIframeId). */
  scriptDatasetKey?: string;
  iframeTitle?: string;
};

const SET_HEIGHT_MESSAGE = "highlevel.setHeight";
const MIN_IFRAME_HEIGHT = 520;

/**
 * Lead Connector / GHL booking widget.
 *
 * form_embed.js hides booking iframes until it handles `iframeLoaded`.
 * If the iframe starts loading before that script registers its message
 * handler, the first postMessage is missed and the calendar stays hidden
 * until a manual reload. Delay the iframe `src` until the embed script is ready.
 *
 * The widget reports its content height via `["highlevel.setHeight", { height }]`
 * on every step (time slots, form), but form_embed.js does not apply it, so the
 * iframe height is synced from that message here.
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
  const [iframeHeight, setIframeHeight] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const markReady = useCallback(() => setEmbedReady(true), []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const source = iframeRef.current?.contentWindow;
      if (!source || event.source !== source) return;
      const { data } = event;
      if (!Array.isArray(data) || data[0] !== SET_HEIGHT_MESSAGE) return;
      const height = Number(data[1]?.height);
      if (Number.isFinite(height) && height > 0) {
        setIframeHeight(Math.max(Math.ceil(height), MIN_IFRAME_HEIGHT));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className={cn("flex min-h-[520px] w-full justify-center", className)}>
      <iframe
        ref={iframeRef}
        id={bookingIframeId}
        src={embedReady ? bookingIframeSrc : undefined}
        title={iframeTitle}
        allow="payment"
        scrolling="no"
        className="min-h-[520px] w-[100%] max-w-full border-0 max-[767px]:w-full max-[767px]:max-w-full"
        style={{
          border: "none",
          overflow: "hidden",
          height: iframeHeight ?? MIN_IFRAME_HEIGHT,
        }}
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
