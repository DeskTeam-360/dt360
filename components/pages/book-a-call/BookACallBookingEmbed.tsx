"use client";

import { useEffect, useRef } from "react";
import { bookACallForm } from "@/data/bookACall";

const { bookingIframeSrc, bookingIframeId, bookingEmbedScriptSrc } = bookACallForm;

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

function loadEmbedScript(onReady: () => void) {
  if (typeof window.iFrameResize === "function") {
    onReady();
    return;
  }

  const existing = document.querySelector<HTMLScriptElement>(
    'script[data-book-a-call-booking-embed="true"]',
  );

  if (existing) {
    existing.addEventListener("load", onReady, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.src = bookingEmbedScriptSrc;
  script.type = "text/javascript";
  script.async = true;
  script.dataset.bookACallBookingEmbed = "true";
  script.addEventListener("load", onReady, { once: true });
  document.body.appendChild(script);
}

/**
 * Lead Connector / GHL booking widget (not Calendly).
 * form_embed.js hides iframes until iFrameResize runs — must init after this iframe mounts.
 */
export function BookACallBookingEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const run = () => initBookingIframe(iframe);
    loadEmbedScript(run);

    const retry = window.setTimeout(run, 600);

    return () => {
      window.clearTimeout(retry);
      iframe.removeAttribute("data-iframe-resizer-initialized");
    };
  }, []);

  return (
    <div className="flex w-full justify-center py-4">
      <iframe
        ref={iframeRef}
        id={bookingIframeId}
        src={bookingIframeSrc}
        title="Schedule your call"
        className="w-[100%] max-w-full border-0 max-[767px]:w-full max-[767px]:max-w-full"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
      />
    </div>
  );
}
