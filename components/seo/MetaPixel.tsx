"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getMetaPixelIds } from "@/lib/seo/analytics";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

/** Meta (Facebook) Pixel — supports multiple pixel IDs; tracks PageView on client navigations. */
export function MetaPixel() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);
  const pixelIds = getMetaPixelIds();

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  if (pixelIds.length === 0) return null;

  const initCalls = pixelIds.map((id) => `fbq('init', '${id}');`).join("\n          ");

  return (
    <>
      <Script id="meta-pixel" strategy="lazyOnload">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          ${initCalls}
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {pixelIds.map((id) => (
          <img
            key={id}
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
            alt=""
            aria-hidden="true"
          />
        ))}
      </noscript>
    </>
  );
}
