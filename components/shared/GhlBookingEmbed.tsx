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

/**
 * Lead Connector / GHL booking widget.
 *
 * F7: defer script + iframe until the widget is near the viewport so Book a Call
 * (and sibling calendar pages) paint useful content first.
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [embedReady, setEmbedReady] = useState(false);
  const markReady = useCallback(() => setEmbedReady(true), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <div
      ref={containerRef}
      className={cn("flex min-h-[520px] w-full justify-center", className)}
    >
      {!inView ? (
        <div
          className="flex min-h-[520px] w-full items-center justify-center px-4"
          aria-busy="true"
          aria-live="polite"
        >
          <p className="text-center font-montserrat text-[16px] font-medium text-[#11104C]/70 md:text-[18px]">
            Loading the calendar…
          </p>
        </div>
      ) : (
        <>
          <iframe
            id={bookingIframeId}
            src={embedReady ? bookingIframeSrc : undefined}
            title={iframeTitle}
            allow="payment"
            loading="lazy"
            className="w-[100%] max-w-full border-0 max-[767px]:w-full max-[767px]:max-w-full"
            style={{ border: "none", overflow: "hidden", minHeight: 520 }}
          />
          <Script
            id={`ghl-form-embed-${bookingIframeId}`}
            src={bookingEmbedScriptSrc}
            strategy="lazyOnload"
            onReady={markReady}
            onError={markReady}
          />
        </>
      )}
    </div>
  );
}
