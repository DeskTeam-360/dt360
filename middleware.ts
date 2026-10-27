import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LEGACY_TRAILING_SLASH_ONE_HOP } from "@/lib/seo/legacy-path-redirects";
import { S1_TRAILING_SLASH_BLOG_SLUG_SET } from "@/lib/seo/fix-report-redirects";

/**
 * One-hop redirects that next.config cannot do alone because
 * `trailingSlash: false` first strips `/path/` → `/path` (extra hop).
 *
 * S1: /{slug}/ → /blog/{slug}
 * F5: /pricing/ → /#pricing
 * Legacy marketing paths: /faqs/, /websites/, etc. → final destinations
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/pricing/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.hash = "pricing";
    return NextResponse.redirect(url, 308);
  }

  const legacyDest = LEGACY_TRAILING_SLASH_ONE_HOP[pathname];
  if (legacyDest) {
    if (/^https?:\/\//i.test(legacyDest)) {
      return NextResponse.redirect(legacyDest, 308);
    }
    const url = request.nextUrl.clone();
    url.pathname = legacyDest;
    return NextResponse.redirect(url, 308);
  }

  if (pathname.endsWith("/") && pathname.length > 1) {
    const slug = pathname.slice(1, -1);
    if (S1_TRAILING_SLASH_BLOG_SLUG_SET.has(slug)) {
      const url = request.nextUrl.clone();
      url.pathname = `/blog/${slug}`;
      return NextResponse.redirect(url, 308);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pricing/",
    "/faqs/",
    "/website-maintenance/",
    "/websites/",
    "/partner-program/",
    "/lost-opportunity-calculator/",
    "/how-to-delegate-tasks/",
    "/product/membership/",
    "/product/deskteam360-monthly-membership/",
    "/best-unlimited-web-development-services/",
    "/fiverr-vs-upwork-vs-subscription/",
    "/how-to-create-marketing-budget/",
    "/outsource-hubspot-setup/",
    "/website-content-audit/",
  ],
};
