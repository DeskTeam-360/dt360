import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { GraphQLClient, gql } from 'graphql-request';
import { BlogPost } from '@/data/blog';
import type { ShowcaseItem } from '@/data/showcase';
import { BLOG_ROUTE_REVALIDATE_SECONDS } from '@/lib/blog-revalidate';

const API_URL = process.env.WORDPRESS_URL || process.env.WORDPRESS_API_URL || 'https://clone.deskteam360.com/endpoint';
const API_USER = process.env.WORDPRESS_USER;
const API_TOKEN = process.env.WORDPRESS_AUTH_TOKEN;

const getAuthHeader = (): Record<string, string> => {
  if (!API_TOKEN) return {};

  // If it's likely a JWT
  if (API_TOKEN.startsWith('ey')) {
    return { Authorization: `Bearer ${API_TOKEN}` };
  }

  // If we have a user and token, assume it's an Application Password (Basic Auth)
  if (API_USER && API_TOKEN) {
    const auth = Buffer.from(`${API_USER}:${API_TOKEN}`).toString('base64');
    return { Authorization: `Basic ${auth}` };
  }

  // Fallback to Bearer for other token types
  return { Authorization: `Bearer ${API_TOKEN}` };
};

const client = new GraphQLClient(API_URL, {
  headers: getAuthHeader(),
});

const WORDPRESS_BLOG_CACHE_TAG = 'wordpress-blog';

/**
 * Data Cache Next.js (TTL = BLOG_REVALIDATE_SECONDS).
 * Outside a Next context (e.g. scratch script), falls back to a direct call.
 */
async function fetchWordPressCached<T>(
  cacheKey: string[],
  producer: () => Promise<T>,
): Promise<T> {
  try {
    return await unstable_cache(producer, cacheKey, {
      revalidate: BLOG_ROUTE_REVALIDATE_SECONDS,
      tags: [WORDPRESS_BLOG_CACHE_TAG, cacheKey.join(':')],
    })();
  } catch {
    return producer();
  }
}

/** Shape of a post node returned by our WPGraphQL queries */
type WpPostNode = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  date?: string;
  featuredImage?: { node?: { sourceUrl?: string } };
  author?: { node?: { name?: string } };
  categories?: { nodes?: Array<{ name?: string }> };
};

type WpCategoryNameNode = { name?: string };

type GetAllBlogDataResponse = {
  posts?: { nodes?: WpPostNode[] };
  categories?: { nodes?: WpCategoryNameNode[] };
};

type GetPostBySlugResponse = {
  post?: WpPostNode | null;
};

// Helper to calculate read time
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content ? content.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
};

const decodeHtmlEntities = (str?: string): string => {
  if (!str) return '';
  return str
    .replace(/&raquo;/g, '»')
    .replace(/&middot;/g, '·')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&hellip;/g, '…')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8230;/g, '…')
    .replace(/&#038;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
};

const stripExcerptHtml = (excerpt?: string): string => {
  const stripped = (excerpt?.replace(/<[^>]*>?/gm, '') ?? '').trim();
  return decodeHtmlEntities(stripped);
};

/** Same rules as getBlogData: featured slots vs "latest" pool (for related posts on detail). */
const CATEGORY_MAP: Record<string, string> = {
  'delegation': 'Delegation',
  'outsourcing': 'Outsourcing',
  'comparisons': 'Comparisons',
  'scaling': 'Scaling',
  'pricing-cost': 'Pricing & cost'
};

const getCategoryFromSlugs = (categories?: { nodes?: Array<{ name?: string, slug?: string }> }): string | null => {
  if (!categories?.nodes) return null;
  for (const cat of categories.nodes) {
    if (cat.slug && CATEGORY_MAP[cat.slug.toLowerCase()]) {
      return CATEGORY_MAP[cat.slug.toLowerCase()];
    }
  }
  return null;
};

const getCategoryTagColor = (category: string): string => {
  switch (category) {
    case 'Delegation':
      return 'bg-[#f0573a]';
    case 'Comparisons':
      return 'bg-[#7547c5]';
    case 'Outsourcing':
      return 'bg-[#e3058d]';
    case 'Scaling':
      return 'bg-[#f5b419]';
    case 'Pricing & cost':
      return 'bg-[#00a896]';
    default:
      return 'bg-[#7547c5]';
  }
};

const partitionBlogPostsForListing = (
  allPosts: BlogPost[],
  categoryNodes: WpCategoryNameNode[] | undefined,
): { featuredPostsMap: Record<string, BlogPost>; latestPosts: BlogPost[]; categories: string[] } => {
  const displayCategories = ['All Posts', ...Object.values(CATEGORY_MAP)];

  // Filter valid posts: only those that have one of the matched categories
  const validPosts = allPosts.filter((post: BlogPost) => {
    return Object.values(CATEGORY_MAP).includes(post.category);
  });

  const featuredPostsMap: Record<string, BlogPost> = {};
  const usedPostIds = new Set<string>();

  if (validPosts.length > 0) {
    featuredPostsMap['All Posts'] = validPosts[0];
    usedPostIds.add(validPosts[0].id);
  }

  displayCategories.forEach((category) => {
    if (category === 'All Posts') return;

    const latestInCategory = validPosts.find((post: BlogPost) => post.category === category);
    if (latestInCategory) {
      featuredPostsMap[category] = latestInCategory;
      usedPostIds.add(latestInCategory.id);
    }
  });

  const latestPosts = validPosts.filter((post: BlogPost) => !usedPostIds.has(post.id));

  return { featuredPostsMap, latestPosts, categories: displayCategories };
};

// Helper to map WordPress post to BlogPost type
const mapPost = (post: WpPostNode): BlogPost => {
  const excerpt = stripExcerptHtml(post.excerpt);
  const category = getCategoryFromSlugs(post.categories) || 'Uncategorized';
  return {
    id: post.id,
    slug: post.slug,
    title: decodeHtmlEntities(post.title),
    excerpt,
    content: post.content,
    image: post.featuredImage?.node?.sourceUrl || '/images/blog/blog-placeholder.png',
    category,
    author: post.author?.node?.name || 'Admin',
    readTime: calculateReadTime(post.content || excerpt),
    date: post.date,
    tagColor: getCategoryTagColor(category),
  };
};

/** Without `content` — for related pool on detail page (saves bandwidth & WP parse). */
const mapPostLite = (post: WpPostNode): BlogPost => {
  const excerpt = stripExcerptHtml(post.excerpt);
  const category = getCategoryFromSlugs(post.categories) || 'Uncategorized';
  return {
    id: post.id,
    slug: post.slug,
    title: decodeHtmlEntities(post.title),
    excerpt,
    content: undefined,
    image: post.featuredImage?.node?.sourceUrl || '/images/blog/blog-placeholder.png',
    category,
    author: post.author?.node?.name || 'Admin',
    readTime: calculateReadTime(excerpt),
    date: post.date,
    tagColor: getCategoryTagColor(category),
  };
};

interface PaginatedPostsResponse {
  posts?: {
    pageInfo?: {
      hasNextPage?: boolean;
      endCursor?: string;
    };
    nodes?: WpPostNode[];
  };
}

/**
 * Helper to fetch all WordPress posts using paginated requests to bypass the 100-post limit.
 */
async function fetchAllPostsFromWordPress(includeContent: boolean = true): Promise<BlogPost[]> {
  const query = includeContent 
    ? gql`
        query GetAllBlogData($first: Int!, $after: String) {
          posts(first: $first, where: { orderby: { field: DATE, order: DESC } }, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              slug
              title
              excerpt
              content
              date
              featuredImage {
                node {
                  sourceUrl
                }
              }
              author {
                node {
                  name
                }
              }
              categories {
                nodes {
                  name
                  slug
                }
              }
            }
          }
        }
      `
    : gql`
        query GetBlogPostsForRelated($first: Int!, $after: String) {
          posts(first: $first, where: { orderby: { field: DATE, order: DESC } }, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              slug
              title
              excerpt
              date
              featuredImage {
                node {
                  sourceUrl
                }
              }
              author {
                node {
                  name
                }
              }
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

  const mapper = includeContent ? mapPost : mapPostLite;
  let allPosts: BlogPost[] = [];
  let hasNextPage = true;
  let after: string | null = null;
  let pageCount = 0;

  // Fetch in chunks of 100 to avoid high response payloads, up to a safety limit
  while (hasNextPage && pageCount < 10) {
    pageCount++;
    const response: PaginatedPostsResponse = await client.request<PaginatedPostsResponse>(query, { first: 100, after });

    const nodes = response.posts?.nodes || [];
    const mapped = nodes.map(mapper);
    allPosts = [...allPosts, ...mapped];

    hasNextPage = response.posts?.pageInfo?.hasNextPage || false;
    after = response.posts?.pageInfo?.endCursor || null;
  }

  return allPosts;
}

export const getBlogData = async () => {
  return fetchWordPressCached(['wp', 'blog-data-all-v2'], async () => {
    try {
      const allPosts = await fetchAllPostsFromWordPress(true);
      const { featuredPostsMap, latestPosts, categories } = partitionBlogPostsForListing(
        allPosts,
        undefined,
      );

      return {
        featuredPostsMap,
        latestPosts,
        categories,
      };
    } catch (error) {
      console.error('Error fetching blog data:', error);
      return { featuredPostsMap: {}, latestPosts: [], categories: ['All Posts'] };
    }
  });
};

/**
 * Post pool for the "You Might Also Like" block on `/blog/[slug]`.
 * Lightweight query (no `content` field) — featured vs latest logic matches getBlogData.
 */
export const getBlogLatestPostsPoolForRelated = cache(async (): Promise<BlogPost[]> => {
  return fetchWordPressCached(['wp', 'blog-related-pool-v2'], async () => {
    try {
      const allPosts = await fetchAllPostsFromWordPress(false);
      const { latestPosts } = partitionBlogPostsForListing(allPosts, undefined);
      return latestPosts;
    } catch (error) {
      console.error('Error fetching blog pool for related:', error);
      return [];
    }
  });
});

/** Single request: `generateMetadata` + page share the same result (no double WP hit). */
export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  return fetchWordPressCached(['wp', 'post-v2', slug], async () => {
    const query = gql`
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        id
        slug
        title
        excerpt
        content
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  `;

    try {
      const data = await client.request<GetPostBySlugResponse>(query, { id: slug });
      return data.post ? mapPost(data.post) : null;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      return null;
    }
  });
});

// ─── Showcase ────────────────────────────────────────────────────────────────

type WpShowcaseNode = {
  id: string;
  title: string;
  slug: string;
  featuredImage?: { node?: { sourceUrl?: string } };
  showcaseCategories?: { nodes?: Array<{ name?: string }> };
};

type GetShowcaseResponse = {
  contentNodes?: {
    nodes?: WpShowcaseNode[];
  };
};

const mapShowcase = (node: WpShowcaseNode): ShowcaseItem => ({
  id: node.id,
  title: node.title,
  image: node.featuredImage?.node?.sourceUrl || '/images/showcase/placeholder.png',
  categories: [
    'All Work',
    ...(node.showcaseCategories?.nodes
      ?.map((c) => c.name)
      .filter((n): n is string => typeof n === 'string' && n.length > 0) ?? []),
  ],
});

export const getShowcaseData = async () => {
  const query = gql`
    query GetShowcaseData($first: Int!) {
      contentNodes(
        where: { contentTypes: DT360_SHOWCASE, orderby: { field: DATE, order: DESC } }
        first: $first
      ) {
        nodes {
          id
          ... on Showcase {
            title
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
            showcaseCategories {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await client.request<GetShowcaseResponse>(query, { first: 300 });
    const allItems = (data.contentNodes?.nodes ?? []).map(mapShowcase);

    const categorySet = new Set<string>();
    allItems.forEach((item) =>
      item.categories.forEach((c) => categorySet.add(c)),
    );
    categorySet.delete('All Work');
    const categories = ['All Work', ...Array.from(categorySet).sort()];

    const itemsByCategory: Record<string, ShowcaseItem[]> = {};
    for (const cat of categories) {
      if (cat === 'All Work') {
        itemsByCategory[cat] = allItems.slice(0, 5);
      } else {
        itemsByCategory[cat] = allItems
          .filter((item) => item.categories.includes(cat))
          .slice(0, 5);
      }
    }

    return {
      allItems,
      categories,
      itemsByCategory,
    };
  } catch (error) {
    console.error('Error fetching showcase data:', error);
    return { allItems: [], categories: ['All Work'], itemsByCategory: {} };
  }
};
