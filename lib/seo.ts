import type { Metadata } from "next";
import { getGate5AbsoluteTitle } from "@/data/gate5AbsoluteTitles";
import { getCopyV3MetaDescription } from "@/data/developerCopyChangesV3";
import { getSiteUrl, siteConfig } from "@/config/site";

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

const DEFAULT_SHARE_IMAGE_PATH = "/opengraph-image";

export type ShareImageInput = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

/** Absolute HTTPS (or http in local) URL for crawlers that do not resolve relative paths. */
export function toAbsoluteShareUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return `${getSiteUrl()}${DEFAULT_SHARE_IMAGE_PATH}`;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const base = getSiteUrl().replace(/\/$/, "");
  return trimmed.startsWith("/") ? `${base}${trimmed}` : `${base}/${trimmed}`;
}

function defaultShareImages(alt: string = siteConfig.name): ShareImageInput[] {
  return [
    {
      url: toAbsoluteShareUrl(DEFAULT_SHARE_IMAGE_PATH),
      width: 1200,
      height: 630,
      alt,
    },
  ];
}

function asImageList(
  images: NonNullable<NonNullable<Metadata["openGraph"]>["images"]> | undefined,
): ShareImageInput[] {
  if (!images) return [];
  const list = Array.isArray(images) ? images : [images];
  const resolved: ShareImageInput[] = [];
  for (const item of list) {
    if (typeof item === "string" || item instanceof URL) {
      resolved.push({
        url: String(item),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      });
      continue;
    }
    if (item && typeof item === "object" && "url" in item) {
      resolved.push({
        url: String(item.url),
        width: typeof item.width === "number" ? item.width : 1200,
        height: typeof item.height === "number" ? item.height : 630,
        alt: typeof item.alt === "string" ? item.alt : siteConfig.name,
      });
    }
  }
  return resolved;
}

/** Normalize page/featured images to absolute URLs; fall back to the site default share art. */
export function resolveShareImages(
  images?: NonNullable<NonNullable<Metadata["openGraph"]>["images"]>,
  alt: string = siteConfig.name,
): ShareImageInput[] {
  const resolved = asImageList(images)
    .map((img) => ({
      ...img,
      url: toAbsoluteShareUrl(img.url),
      alt: img.alt || alt,
    }))
    .filter((img) => Boolean(img.url));
  return resolved.length > 0 ? resolved : defaultShareImages(alt);
}

function resolveShareTitle(
  path: string,
  metadata: Metadata,
  gate5Title: string | null | undefined,
): string {
  if (gate5Title) return gate5Title;

  const pageOg = metadata.openGraph;
  if (pageOg && typeof pageOg === "object" && "title" in pageOg && pageOg.title) {
    return String(pageOg.title);
  }

  const title = metadata.title;
  if (typeof title === "string" && title.trim()) {
    if (path === "/") return title;
    if (title.includes("|")) return title;
    return `${title} | ${siteConfig.shortName}`;
  }
  if (title && typeof title === "object") {
    if ("absolute" in title && title.absolute) return String(title.absolute);
    if ("default" in title && title.default) {
      const value = String(title.default);
      if (path === "/" || value.includes("|")) return value;
      return `${value} | ${siteConfig.shortName}`;
    }
  }

  return path === "/" ? siteConfig.defaultTitle : siteConfig.defaultTitle;
}

/**
 * Gate 5 F10 — absolute document title (no layout ` | DeskTeam360` suffix).
 * Falls back to a plain string title (which still uses the layout template).
 * SEO copy-changes-v3 also overrides meta description when present.
 *
 * Open Graph + Twitter: page-level metadata replaces the layout objects in
 * Next.js. Always re-assert type, image, and page-specific twitter text so
 * inner pages do not inherit homepage share copy (CMO P1 social previews).
 */
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
  const description =
    (copyMeta ?? metadata.description ?? siteConfig.description) || siteConfig.description;

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

  const shareTitle = resolveShareTitle(path, { ...metadata, title }, gate5Title);
  const shareImages = resolveShareImages(pageImages, shareTitle);
  const shareImageUrls = shareImages.map((img) => img.url);
  const pageTwitter = metadata.twitter ?? {};
  // Match production canonical host style (homepage has no trailing slash).
  const absoluteUrl = path === "/" ? getSiteUrl() : `${getSiteUrl()}${path}`;

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
      url: absoluteUrl,
      title: shareTitle,
      description,
      type: ogType,
      images: shareImages,
    },
    twitter: {
      ...pageTwitter,
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: shareImageUrls,
    },
  };
}

/** Build OG/Twitter image metadata from a post/case-study featured media URL. */
export function featuredShareImages(
  imageUrl: string | null | undefined,
  alt: string,
): NonNullable<NonNullable<Metadata["openGraph"]>["images"]> {
  const url = imageUrl?.trim();
  if (!url) return resolveShareImages(undefined, alt);
  return resolveShareImages(
    [
      {
        url,
        width: 1200,
        height: 630,
        alt,
      },
    ],
    alt,
  );
}
