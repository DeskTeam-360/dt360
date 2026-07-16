import { gql, GraphQLClient } from "graphql-request";
import type { SitemapUrlEntry } from "@/lib/sitemap/types";
import { formatSitemapLastmod } from "@/lib/sitemap/xml";

const CASE_STUDY_CATEGORY_SLUGS = ["case-study", "website-case-study"] as const;

type WpCategoryNode = {
  name?: string;
  slug?: string;
  count?: number;
  posts?: {
    nodes?: Array<{ date?: string; modified?: string }>;
  };
};

type WpPostNode = {
  slug: string;
  date?: string;
  modified?: string;
  categories?: { nodes?: Array<{ name?: string; slug?: string }> };
};

type SitemapPostsResponse = {
  posts?: {
    pageInfo?: { hasNextPage?: boolean; endCursor?: string | null };
    nodes?: WpPostNode[];
  };
};

type SitemapCategoriesResponse = {
  categories?: { nodes?: WpCategoryNode[] };
};

type SitemapCaseStudyPostsResponse = {
  posts?: { nodes?: WpPostNode[] };
};

function getWordPressGraphqlUrl(): string {
  const url = process.env.WORDPRESS_API_URL?.trim();
  if (!url) {
    throw new Error("Missing WORDPRESS_API_URL environment variable.");
  }
  return url;
}

function getAuthHeader(): Record<string, string> {
  const apiUser = process.env.WORDPRESS_USER;
  const apiToken = process.env.WORDPRESS_AUTH_TOKEN;
  if (!apiToken) return {};

  if (apiToken.startsWith("ey")) {
    return { Authorization: `Bearer ${apiToken}` };
  }

  if (apiUser && apiToken) {
    const auth = Buffer.from(`${apiUser}:${apiToken}`).toString("base64");
    return { Authorization: `Basic ${auth}` };
  }

  return { Authorization: `Bearer ${apiToken}` };
}

function createWpClient(): GraphQLClient {
  return new GraphQLClient(getWordPressGraphqlUrl(), {
    headers: getAuthHeader(),
  });
}

function isCaseStudyCategoryName(name: string): boolean {
  const lower = name.toLowerCase();
  return lower.includes("case study") || lower.includes("case-study");
}

function isCaseStudyCategorySlug(slug: string): boolean {
  return (CASE_STUDY_CATEGORY_SLUGS as readonly string[]).includes(slug);
}

function pickPostLastmod(post: { date?: string; modified?: string }): string | undefined {
  return formatSitemapLastmod(post.modified || post.date);
}

function postHasCaseStudyCategory(post: WpPostNode): boolean {
  const categories = post.categories?.nodes ?? [];
  return categories.some((category) => {
    const name = category.name ?? "";
    const slug = category.slug ?? "";
    return isCaseStudyCategoryName(name) || isCaseStudyCategorySlug(slug);
  });
}

const POSTS_QUERY = gql`
  query SitemapPosts($first: Int!, $after: String) {
    posts(
      first: $first
      after: $after
      where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        slug
        date
        modified
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

const CATEGORIES_QUERY = gql`
  query SitemapCategories($first: Int!) {
    categories(first: $first, where: { hideEmpty: true }) {
      nodes {
        name
        slug
        count
        posts(first: 1, where: { status: PUBLISH, orderby: { field: MODIFIED, order: DESC } }) {
          nodes {
            date
            modified
          }
        }
      }
    }
  }
`;

const CASE_STUDY_POSTS_QUERY = gql`
  query SitemapCaseStudyPosts($first: Int!, $categoryName: String!) {
    posts(
      first: $first
      where: {
        categoryName: $categoryName
        status: PUBLISH
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        slug
        date
        modified
      }
    }
  }
`;

export async function fetchBlogPostEntries(siteUrl: string): Promise<SitemapUrlEntry[]> {
  const client = createWpClient();
  const entries: SitemapUrlEntry[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data: SitemapPostsResponse = await client.request<SitemapPostsResponse>(
      POSTS_QUERY,
      { first: 100, after },
    );

    const nodes = data.posts?.nodes ?? [];
    for (const post of nodes) {
      if (postHasCaseStudyCategory(post)) continue;
      entries.push({
        loc: `${siteUrl}/blog/${post.slug}`,
        lastmod: pickPostLastmod(post),
      });
    }

    hasNextPage = Boolean(data.posts?.pageInfo?.hasNextPage);
    after = data.posts?.pageInfo?.endCursor ?? null;
    if (!after) break;
  }

  return entries;
}

export async function fetchCategoryEntries(siteUrl: string): Promise<SitemapUrlEntry[]> {
  const client = createWpClient();
  const data: SitemapCategoriesResponse = await client.request<SitemapCategoriesResponse>(
    CATEGORIES_QUERY,
    { first: 100 },
  );

  const entries: SitemapUrlEntry[] = [];

  for (const category of data.categories?.nodes ?? []) {
    const name = category.name?.trim();
    const slug = category.slug?.trim();
    if (!name || !slug || (category.count ?? 0) <= 0) continue;
    if (isCaseStudyCategoryName(name) || isCaseStudyCategorySlug(slug)) continue;
    if (name.toLowerCase() === "uncategorized") continue;

    const latestPost = category.posts?.nodes?.[0];
    entries.push({
      loc: `${siteUrl}/blog/category/${slug}`,
      lastmod: latestPost ? pickPostLastmod(latestPost) : undefined,
    });
  }

  return entries.sort((a, b) => a.loc.localeCompare(b.loc));
}

export async function fetchCaseStudyEntries(siteUrl: string): Promise<SitemapUrlEntry[]> {
  const client = createWpClient();
  const seen = new Set<string>();
  const entries: SitemapUrlEntry[] = [];

  for (const categorySlug of CASE_STUDY_CATEGORY_SLUGS) {
    const data: SitemapCaseStudyPostsResponse = await client.request<SitemapCaseStudyPostsResponse>(
      CASE_STUDY_POSTS_QUERY,
      { first: 100, categoryName: categorySlug },
    );

    for (const post of data.posts?.nodes ?? []) {
      if (seen.has(post.slug)) continue;
      seen.add(post.slug);
      entries.push({
        loc: `${siteUrl}/case-studies/${post.slug}`,
        lastmod: pickPostLastmod(post),
      });
    }
  }

  return entries;
}
