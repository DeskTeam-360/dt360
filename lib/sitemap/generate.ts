import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildStaticPageEntries } from "@/lib/sitemap/static-pages";
import type { SitemapFile, SitemapIndexEntry } from "@/lib/sitemap/types";
import {
  fetchBlogPostEntries,
  fetchCaseStudyEntries,
  fetchCategoryEntries,
} from "@/lib/sitemap/fetch-wp";
import {
  buildSitemapIndexXml,
  buildUrlsetXml,
  formatSitemapLastmod,
  getLatestLastmod,
} from "@/lib/sitemap/xml";

export const SITEMAP_ENTRIES_PER_FILE = 1000;

export type GenerateSitemapOptions = {
  siteUrl: string;
  outputDir?: string;
  generatedAt?: string;
};

export type GenerateSitemapResult = {
  outputDir: string;
  files: string[];
  indexUrl: string;
  warnings: string[];
};

function normalizeSiteUrl(siteUrl: string): string {
  let value = siteUrl.trim().replace(/\/$/, "");
  if (!/^https?:\/\//i.test(value)) {
    value = `https://${value}`;
  }
  return value;
}

function paginateEntries(
  baseName: string,
  urls: import("@/lib/sitemap/types").SitemapUrlEntry[],
): SitemapFile[] {
  if (urls.length === 0) {
    return [{ filename: `${baseName}-sitemap.xml`, urls: [] }];
  }

  const files: SitemapFile[] = [];
  const totalPages = Math.ceil(urls.length / SITEMAP_ENTRIES_PER_FILE);

  for (let page = 0; page < totalPages; page += 1) {
    const chunk = urls.slice(page * SITEMAP_ENTRIES_PER_FILE, (page + 1) * SITEMAP_ENTRIES_PER_FILE);
    const suffix = page === 0 ? "" : `${page + 1}`;
    files.push({
      filename: `${baseName}-sitemap${suffix}.xml`,
      urls: chunk,
    });
  }

  return files;
}

export async function generateSitemaps(
  options: GenerateSitemapOptions,
): Promise<GenerateSitemapResult> {
  const siteUrl = normalizeSiteUrl(options.siteUrl);
  const outputDir = path.resolve(options.outputDir ?? path.join(process.cwd(), "public"));
  const generatedAt = options.generatedAt ?? formatSitemapLastmod(new Date())!;
  const warnings: string[] = [];

  await mkdir(outputDir, { recursive: true });

  const pageEntries = buildStaticPageEntries(siteUrl, generatedAt);

  let postEntries: import("@/lib/sitemap/types").SitemapUrlEntry[] = [];
  let categoryEntries: import("@/lib/sitemap/types").SitemapUrlEntry[] = [];
  let caseStudyEntries: import("@/lib/sitemap/types").SitemapUrlEntry[] = [];

  try {
    [postEntries, categoryEntries, caseStudyEntries] = await Promise.all([
      fetchBlogPostEntries(siteUrl),
      fetchCategoryEntries(siteUrl),
      fetchCaseStudyEntries(siteUrl),
    ]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    warnings.push(`WordPress fetch failed: ${message}`);
  }

  const sitemapFiles: SitemapFile[] = [
    { filename: "page-sitemap.xml", urls: pageEntries },
    ...paginateEntries("post", postEntries),
    { filename: "category-sitemap.xml", urls: categoryEntries },
    { filename: "case-study-sitemap.xml", urls: caseStudyEntries },
  ];

  const writtenFiles: string[] = [];

  for (const file of sitemapFiles) {
    const filePath = path.join(outputDir, file.filename);
    await writeFile(filePath, buildUrlsetXml(file.urls), "utf8");
    writtenFiles.push(file.filename);
  }

  const indexEntries: SitemapIndexEntry[] = sitemapFiles.map((file) => ({
    loc: `${siteUrl}/${file.filename}`,
    lastmod: getLatestLastmod(file.urls) ?? generatedAt,
  }));

  const indexPath = path.join(outputDir, "sitemap_index.xml");
  await writeFile(indexPath, buildSitemapIndexXml(indexEntries), "utf8");
  writtenFiles.push("sitemap_index.xml");

  return {
    outputDir,
    files: writtenFiles,
    indexUrl: `${siteUrl}/sitemap_index.xml`,
    warnings,
  };
}
