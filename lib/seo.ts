import type { Metadata } from "next";
import { getGate5AbsoluteTitle } from "@/data/gate5AbsoluteTitles";
import { getCopyV3MetaDescription } from "@/data/developerCopyChangesV3";
import { siteConfig } from "@/config/site";

/**
 * Canonical path without trailing slash (except homepage `/`).
 * Matches `trailingSlash: false` and sitemap URL style.
 */
export function canonicalPath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const trimmed = pathname.trim();
  const withoutTrailing = trimmed.replace(/\/+$/, "");
  return withoutTrailing.startsWith("/") ? withoutTrailing : `/${withoutTrailing}`;
}

/** Metadata fragment for a page's self-canonical. */
export function pageAlternates(pathname: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: canonicalPath(pathname),
  };
}

const DEFAULT_OG_IMAGES: NonNullable<NonNullable<Metadata["openGraph"]>["images"]> = [
  {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: siteConfig.name,
  },
];

/**
 * Gate 5 F10 — absolute document title (no layout ` | DeskTeam360` suffix).
 * Falls back to a plain string title (which still uses the layout template).
 * SEO copy-changes-v3 also overrides meta description when present.
 *
 * Open Graph: page-level `openGraph` replaces the layout object in Next.js, so
 * always re-assert type + default image here (CMO P2 incomplete OG tags).
 */
/** Merge page metadata with a correct canonical (and matching Open Graph url). */
export function withPageCanonical(
  pathname: string,
  metadata: Metadata = {},
): Metadata {
  const path = canonicalPath(pathname);
  const gate5Title = getGate5AbsoluteTitle(path);
  const copyMeta = getCopyV3MetaDescription(path);
  const title =
    gate5Title != null
      ? { absolute: gate5Title }
      : metadata.title;
  const description = copyMeta ?? metadata.description;
  const pageOg = metadata.openGraph ?? {};
  const pageOgType =
    pageOg && typeof pageOg === "object" && "type" in pageOg
      ? (pageOg as { type?: string }).type
      : undefined;
  const ogType = pageOgType === "article" ? "article" : "website";
  const pageImages =
    pageOg && typeof pageOg === "object" && "images" in pageOg
      ? pageOg.images
      : undefined;

  return {
    ...metadata,
    title,
    description,
    alternates: {
      ...metadata.alternates,
      canonical: path,
    },
    openGraph: {
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      ...pageOg,
      url: path,
      ...(gate5Title ? { title: gate5Title } : {}),
      ...(copyMeta ? { description: copyMeta } : {}),
      // Page-level openGraph replaces layout; re-assert required fields.
      type: ogType,
      images: pageImages ?? DEFAULT_OG_IMAGES,
    },
  };
}
