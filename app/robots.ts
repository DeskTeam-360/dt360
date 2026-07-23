import type { MetadataRoute } from "next";
import { getSiteUrl, isSearchEngineIndexable } from "@/config/site";

/**
 * Paths that should not be crawled on production (internal flows, thank-you,
 * legacy WP commerce, non-public tools). Public marketing pages stay allowed.
 */
const PRODUCTION_DISALLOW_PATHS = [
  "/api/",
  // Thank-you / scheduled confirmation (also noindex in page metadata)
  "/demo-call-scheduled-thank-you",
  "/onboarding-call-scheduled-thank-you",
  // Internal booking flows (not primary SEO landing pages)
  "/onboarding-call-am2",
  "/client-meeting-with-am2",
  // Dev / test only
  "/blog/test",
  // Legacy WordPress / WooCommerce surfaces (often soft-404 or noindex in GSC)
  "/cart",
  "/checkout",
  "/my-account",
  "/product/",
  "/product-category/",
  "/affiliate-area",
  "/customer-portal",
  "/wp-admin/",
  "/wp-json/",
  "/wp-login.php",
  "/xmlrpc.php",
] as const;

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  const indexable = isSearchEngineIndexable();

  // Staging / local: block all crawling, do not advertise sitemap
  if (!indexable) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
      host: base.replace(/^https?:\/\//, ""),
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...PRODUCTION_DISALLOW_PATHS],
      },
    ],
    sitemap: `${base}/sitemap_index.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}
