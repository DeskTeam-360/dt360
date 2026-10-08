import type { Metadata } from "next";
import { getGate5AbsoluteTitle } from "@/data/gate5AbsoluteTitles";

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

/**
 * Gate 5 F10 — absolute document title (no layout ` | DeskTeam360` suffix).
 * Falls back to a plain string title (which still uses the layout template).
 */
/** Merge page metadata with a correct canonical (and matching Open Graph url). */
export function withPageCanonical(
  pathname: string,
  metadata: Metadata = {},
): Metadata {
  const path = canonicalPath(pathname);
  const gate5Title = getGate5AbsoluteTitle(path);
  const title =
    gate5Title != null
      ? { absolute: gate5Title }
      : metadata.title;

  return {
    ...metadata,
    title,
    alternates: {
      ...metadata.alternates,
      canonical: path,
    },
    openGraph: {
      ...metadata.openGraph,
      url: path,
      ...(gate5Title
        ? { title: gate5Title }
        : {}),
    },
  };
}
