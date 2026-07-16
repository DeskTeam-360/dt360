export type SitemapUrlEntry = {
  loc: string;
  lastmod?: string;
};

export type SitemapFile = {
  /** e.g. page-sitemap.xml, post-sitemap2.xml */
  filename: string;
  urls: SitemapUrlEntry[];
};

export type SitemapIndexEntry = {
  loc: string;
  lastmod?: string;
};
