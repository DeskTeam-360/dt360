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

type WpCategoryNameNode = { name?: string; count?: number };

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

const stripExcerptHtml = (excerpt?: string): string =>
  (excerpt?.replace(/<[^>]*>?/gm, '') ?? '')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();

/** Same rules as getBlogData: featured slots vs "latest" pool (for related posts on detail). */
const partitionBlogPostsForListing = (
  allPosts: BlogPost[],
  categoryNodes: WpCategoryNameNode[] | undefined,
): { featuredPostsMap: Record<string, BlogPost>; latestPosts: BlogPost[]; categories: string[] } => {
  const validPosts = allPosts.filter((post: BlogPost) => {
    const validCats = (post.categories || []).filter(c => {
      const lower = c.toLowerCase();
      return !lower.includes('case study') && !lower.includes('case-study') && lower !== 'uncategorized';
    });
    return validCats.length > 0;
  });

  const allCategories =
    categoryNodes
      ?.filter((c) => (c.count ?? 0) > 0)
      .map((c) => c.name)
      .filter((name): name is string => typeof name === 'string' && name.length > 0)
      .filter((name) => {
        const lowerName = name.toLowerCase();
        return (
          !lowerName.includes('case study') &&
          !lowerName.includes('case-study') &&
          lowerName !== 'uncategorized'
        );
      }) ?? [];

  const categories = ['All Posts', ...allCategories];

  const featuredPostsMap: Record<string, BlogPost> = {};
  const usedPostIds = new Set<string>();

  if (validPosts.length > 0) {
    featuredPostsMap['All Posts'] = validPosts[0];
    usedPostIds.add(validPosts[0].id);
  }

  categories.forEach((category) => {
    if (category === 'All Posts') return;

    const latestInCategory = validPosts.find((post: BlogPost) => 
      post.categories?.some(c => c.toLowerCase() === category.toLowerCase())
    );
    if (latestInCategory) {
      featuredPostsMap[category] = latestInCategory;
      usedPostIds.add(latestInCategory.id);
    }
  });

  const latestPosts = validPosts.filter((post: BlogPost) => !usedPostIds.has(post.id));

  return { featuredPostsMap, latestPosts, categories };
};

// Helper to map WordPress post to BlogPost type
const mapPost = (post: WpPostNode): BlogPost => {
  const excerpt = stripExcerptHtml(post.excerpt);
  const categoriesList = post.categories?.nodes?.map(n => n.name).filter((n): n is string => typeof n === 'string' && n.length > 0) || [];
  const validCategory = categoriesList.find(c => {
    const lower = c.toLowerCase();
    return !lower.includes('case study') && !lower.includes('case-study') && lower !== 'uncategorized';
  }) || categoriesList[0] || 'Uncategorized';

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt,
    content: post.content,
    image: post.featuredImage?.node?.sourceUrl || '/images/blog/blog-placeholder.png',
    category: validCategory,
    categories: categoriesList,
    author: post.author?.node?.name || 'Admin',
    readTime: calculateReadTime(post.content || excerpt),
    date: post.date,
    tagColor: 'bg-[#f0573a]', // Default color
  };
};

/** Without `content` — for related pool on detail page (saves bandwidth & WP parse). */
const mapPostLite = (post: WpPostNode): BlogPost => {
  const excerpt = stripExcerptHtml(post.excerpt);
  const categoriesList = post.categories?.nodes?.map(n => n.name).filter((n): n is string => typeof n === 'string' && n.length > 0) || [];
  const validCategory = categoriesList.find(c => {
    const lower = c.toLowerCase();
    return !lower.includes('case study') && !lower.includes('case-study') && lower !== 'uncategorized';
  }) || categoriesList[0] || 'Uncategorized';

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt,
    content: undefined,
    image: post.featuredImage?.node?.sourceUrl || '/images/blog/blog-placeholder.png',
    category: validCategory,
    categories: categoriesList,
    author: post.author?.node?.name || 'Admin',
    readTime: calculateReadTime(excerpt),
    date: post.date,
    tagColor: 'bg-[#f0573a]',
  };
};

export const getBlogData = async () => {
  const query = gql`
    query GetAllBlogData($first: Int!) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
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
            }
          }
        }
      }
      categories(first: 100) {
        nodes {
          name
          count
        }
      }
    }
  `;

  try {
    const data = await client.request<GetAllBlogDataResponse>(query, { first: 300 });

    const allPosts = (data.posts?.nodes || []).map(mapPost);
    const { featuredPostsMap, latestPosts, categories } = partitionBlogPostsForListing(
      allPosts,
      data.categories?.nodes,
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
};

/**
 * Post pool for the "You Might Also Like" block on `/blog/[slug]`.
 * Lightweight query (no `content` field) — featured vs latest logic matches getBlogData.
 */
export const getBlogLatestPostsPoolForRelated = cache(async (): Promise<BlogPost[]> => {
  return fetchWordPressCached(['wp', 'blog-related-pool'], async () => {
    const query = gql`
    query GetBlogPostsForRelated($first: Int!) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
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
            }
          }
        }
      }
      categories(first: 100) {
        nodes {
          name
          count
        }
      }
    }
  `;

    try {
      const data = await client.request<GetAllBlogDataResponse>(query, { first: 300 });
      const allPosts = (data.posts?.nodes || []).map(mapPostLite);
      const { latestPosts } = partitionBlogPostsForListing(allPosts, data.categories?.nodes);
      return latestPosts;
    } catch (error) {
      console.error('Error fetching blog pool for related:', error);
      return [];
    }
  });
});

/** Single request: `generateMetadata` + page share the same result (no double WP hit). */
export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  return fetchWordPressCached(['wp', 'post', slug], async () => {
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
