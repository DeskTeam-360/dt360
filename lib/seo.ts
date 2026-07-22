import type { Metadata } from "next";

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

/** Merge page metadata with a correct canonical (and matching Open Graph url). */
export function withPageCanonical(
  pathname: string,
  metadata: Metadata = {},
): Metadata {
  const path = canonicalPath(pathname);
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: path,
    },
    openGraph: {
      ...metadata.openGraph,
      url: path,
    },
  };
}
