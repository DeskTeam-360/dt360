"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type GhlBookingEmbedConfig = {
  bookingIframeSrc: string;
  bookingIframeId: string;
  bookingEmbedScriptSrc: string;
  /** Unique value for script dedupe dataset (defaults to bookingIframeId). */
  scriptDatasetKey?: string;
  iframeTitle?: string;
};

declare global {
  interface Window {
    iFrameResize?: (
      options: Record<string, unknown>,
      target?: string | HTMLElement,
    ) => void;
  }
}

const IFRAME_RESIZE_OPTIONS = {
  log: false,
  checkOrigin: false,
  enablePublicMethods: true,
  scrolling: true,
  sizeHeight: true,
  sizeWidth: false,
  autoResize: true,
  heightCalculationMethod: "offset",
};

function initBookingIframe(iframe: HTMLIFrameElement) {
  if (iframe.getAttribute("data-iframe-resizer-initialized") === "true") {
    return;
  }

  if (typeof window.iFrameResize === "function") {
    window.iFrameResize(IFRAME_RESIZE_OPTIONS, iframe);
    return;
  }

  iframe.addEventListener(
    "load",
    () => {
      window.iFrameResize?.(IFRAME_RESIZE_OPTIONS, iframe);
    },
    { once: true },
  );
}

function loadEmbedScript(scriptSrc: string, datasetKey: string, onReady: () => void) {
  if (typeof window.iFrameResize === "function") {
    onReady();
    return;
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[data-ghl-booking-embed="${datasetKey}"]`,
  );

  if (existing) {
    existing.addEventListener("load", onReady, { once: true });
    return;
  }

  const anyGhlScript = document.querySelector<HTMLScriptElement>('script[data-ghl-booking-embed]');
  if (anyGhlScript?.src === scriptSrc) {
    anyGhlScript.addEventListener("load", onReady, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.src = scriptSrc;
  script.type = "text/javascript";
  script.async = true;
  script.dataset.ghlBookingEmbed = datasetKey;
  script.addEventListener("load", onReady, { once: true });
  document.body.appendChild(script);
}

/**
 * Lead Connector / GHL booking widget. form_embed.js hides iframes until iFrameResize runs.
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
    scriptDatasetKey = bookingIframeId,
    iframeTitle = "Schedule your call",
  } = config;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const run = () => initBookingIframe(iframe);
    loadEmbedScript(bookingEmbedScriptSrc, scriptDatasetKey, run);

    const retry = window.setTimeout(run, 600);

    return () => {
      window.clearTimeout(retry);
      iframe.removeAttribute("data-iframe-resizer-initialized");
    };
  }, [bookingEmbedScriptSrc, scriptDatasetKey]);

  return (
    <div className={cn("flex w-full justify-center", className)}>
      <iframe
        ref={iframeRef}
        id={bookingIframeId}
        src={bookingIframeSrc}
        title={iframeTitle}
        className="w-[100%] max-w-full border-0 max-[767px]:w-full max-[767px]:max-w-full"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
      />
    </div>
  );
}
