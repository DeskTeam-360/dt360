import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { S1_TRAILING_SLASH_BLOG_SLUG_SET } from "@/lib/seo/fix-report-redirects";

/**
 * One-hop redirects that next.config cannot do alone because
 * `trailingSlash: false` first strips `/path/` → `/path` (extra hop).
 *
 * S1: /{slug}/ → /blog/{slug}
 * F5: /pricing/ → /#pricing
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/pricing/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.hash = "pricing";
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
    "/best-unlimited-web-development-services/",
    "/fiverr-vs-upwork-vs-subscription/",
    "/how-to-create-marketing-budget/",
    "/outsource-hubspot-setup/",
    "/website-content-audit/",
  ],
};
