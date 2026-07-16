import type { SitemapIndexEntry, SitemapUrlEntry } from "@/lib/sitemap/types";

const SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9";

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** W3C datetime with explicit UTC offset (Yoast-style). */
export function formatSitemapLastmod(input?: string | Date | null): string | undefined {
  if (!input) return undefined;
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString().replace(/\.\d{3}Z$/, "+00:00");
}

export function buildUrlsetXml(urls: SitemapUrlEntry[]): string {
  const rows = urls
    .map((entry) => {
      const loc = `    <loc>${escapeXml(entry.loc)}</loc>`;
      const lastmod = entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : "";
      return `  <url>\n${loc}${lastmod}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="${SITEMAP_NS}">
${rows}
</urlset>
`;
}

export function buildSitemapIndexXml(entries: SitemapIndexEntry[]): string {
  const rows = entries
    .map((entry) => {
      const loc = `    <loc>${escapeXml(entry.loc)}</loc>`;
      const lastmod = entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : "";
      return `  <sitemap>\n${loc}${lastmod}\n  </sitemap>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<sitemapindex xmlns="${SITEMAP_NS}">
${rows}
</sitemapindex>
`;
}

export function getLatestLastmod(urls: SitemapUrlEntry[]): string | undefined {
  let latest: string | undefined;
  for (const url of urls) {
    if (!url.lastmod) continue;
    if (!latest || url.lastmod > latest) latest = url.lastmod;
  }
  return latest;
}
