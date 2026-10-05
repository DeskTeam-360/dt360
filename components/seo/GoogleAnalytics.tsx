"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { getGaMeasurementId, getGoogleAdsId } from "@/lib/seo/analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function GoogleTagPageViews({
  gaId,
  adsId,
}: {
  gaId: string;
  adsId: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    window.gtag?.("config", gaId, { page_path: pagePath });
    window.gtag?.("config", adsId, { page_path: pagePath });
  }, [adsId, gaId, pathname, searchParams]);

  return null;
}

/** GA4 + Google Ads via shared gtag.js. */
export function GoogleAnalytics() {
  const gaId = getGaMeasurementId();
  const adsId = getGoogleAdsId();

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
          gtag('config', '${adsId}');
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleTagPageViews gaId={gaId} adsId={adsId} />
      </Suspense>
    </>
  );
}
