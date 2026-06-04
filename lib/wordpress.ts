import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { GraphQLClient, gql } from 'graphql-request';
import { BlogPost } from '@/data/blog';
import { socialProofSection, type SocialProofTestimonial } from '@/data/home';
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
  // Dev: always hit WP so CMS edits (e.g. new testimonials) show without waiting on Data Cache TTL.
  if (process.env.NODE_ENV === 'development') {
    return producer();
  }

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

type WpCategoryNameNode = {
  name?: string;
  slug?: string;
  count?: number;
  posts?: { nodes?: WpPostNode[] };
};

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

const decodeHtmlEntities = (text: string): string => {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&quot;': '"',
    '&lt;': '<',
    '&gt;': '>',
    '&#8211;': '–',
    '&#8212;': '—',
    '&#8216;': "'",
    '&#8217;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8230;': '...',
    '&hellip;': '...',
    '&middot;': '·',
    '&raquo;': '»',
    '&laquo;': '«',
    '&nbsp;': ' ',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&#038;': '&',
    '&#039;': "'",
  };
  return text.replace(/&[#a-zA-Z0-9]+;/g, (match) => entities[match] || match);
};

const stripExcerptHtml = (excerpt?: string): string =>
  decodeHtmlEntities(excerpt?.replace(/<[^>]*>?/gm, '') ?? '').trim();

const isCaseStudyCategory = (name: string): boolean => {
  const lower = name.toLowerCase();
  return lower.includes('case study') || lower.includes('case-study');
};

const toCategorySlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/\s*&\s*/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const BLOG_POSTS_BY_CATEGORY_QUERY = gql`
  query GetBlogPostsByCategory($first: Int!, $categoryName: String!) {
    posts(
      first: $first
      where: {
        categoryName: $categoryName
        status: PUBLISH
        orderby: { field: DATE, order: DESC }
      }
    ) {
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
  }
`;

async function fetchBlogPostsByCategorySlug(
  categorySlug: string,
  first = 100,
): Promise<BlogPost[]> {
  const data = await client.request<{ posts?: { nodes?: WpPostNode[] } }>(
    BLOG_POSTS_BY_CATEGORY_QUERY,
    { first, categoryName: categorySlug },
  );
  return (data.posts?.nodes ?? []).map(mapPost);
}



/** Same rules as getBlogData: featured slots vs "latest" pool (for related posts on detail). */
const partitionBlogPostsForListing = (
  allPosts: BlogPost[],
  categoryNodes: WpCategoryNameNode[] | undefined,
  categoryToLatestPostMap?: Record<string, BlogPost>
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

    if (categoryToLatestPostMap && categoryToLatestPostMap[category]) {
      featuredPostsMap[category] = categoryToLatestPostMap[category];
      usedPostIds.add(categoryToLatestPostMap[category].id);
      return;
    }

    const latestInCategory = validPosts.find((post: BlogPost) => 
      post.categories?.some(c => c.toLowerCase() === category.toLowerCase())
    );
    if (latestInCategory) {
      featuredPostsMap[category] = latestInCategory;
      usedPostIds.add(latestInCategory.id);
    }
  });

  const latestPosts = validPosts.filter((post: BlogPost) => !usedPostIds.has(post.id));

  return { featuredPostsMap, latestPosts, categories   };
};

/** Case Study category posts (excluded from main blog listing). */
const mapCaseStudyPost = (post: WpPostNode): BlogPost => {
  const excerpt = stripExcerptHtml(post.excerpt);
  const categoriesList =
    post.categories?.nodes
      ?.map((n) => n.name)
      .filter((n): n is string => typeof n === 'string' && n.length > 0) ?? [];
  const caseStudyCats = categoriesList.filter(isCaseStudyCategory);

  return {
    id: post.id,
    slug: post.slug,
    title: decodeHtmlEntities(post.title || ''),
    excerpt,
    content: post.content,
    image: post.featuredImage?.node?.sourceUrl || '/images/blog/blog-placeholder.png',
    category: caseStudyCats[0] || 'Case Study',
    categories: caseStudyCats.length > 0 ? caseStudyCats : ['Case Study'],
    author: post.author?.node?.name || 'Admin',
    readTime: calculateReadTime(post.content || excerpt),
    date: post.date,
    tagColor: 'bg-[#e3058d]',
  };
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
    title: decodeHtmlEntities(post.title || ''),
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
    title: decodeHtmlEntities(post.title || ''),
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

/** Case Studies list page — items shown per "Load More" click. */
export const CASE_STUDIES_PAGE_SIZE = 9;

/** WP category slugs for the Case Studies listing (Case Study + Website Case Study). */
const CASE_STUDY_CATEGORY_SLUGS = ['case-study', 'website-case-study'] as const;

const CASE_STUDY_POSTS_BY_CATEGORY_QUERY = gql`
  query GetCaseStudyPostsByCategory($first: Int!, $categoryName: String!) {
    posts(
      first: $first
      where: {
        categoryName: $categoryName
        status: PUBLISH
        orderby: { field: DATE, order: DESC }
      }
    ) {
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
  }
`;

async function fetchCaseStudyPostsForCategory(
  categorySlug: string,
  first = 100,
): Promise<BlogPost[]> {
  const data = await client.request<{ posts?: { nodes?: WpPostNode[] } }>(
    CASE_STUDY_POSTS_BY_CATEGORY_QUERY,
    { first, categoryName: categorySlug },
  );
  return (data.posts?.nodes ?? []).map(mapCaseStudyPost);
}

function mergeCaseStudyPostsByDate(postGroups: BlogPost[][]): BlogPost[] {
  const byId = new Map<string, BlogPost>();
  for (const posts of postGroups) {
    for (const post of posts) {
      byId.set(post.id, post);
    }
  }
  return Array.from(byId.values()).sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0;
    const bTime = b.date ? new Date(b.date).getTime() : 0;
    return bTime - aTime;
  });
}

/** Published posts in `case-study` and `website-case-study` (Case Studies pages). */
export const getAllCaseStudyPosts = cache(async (): Promise<BlogPost[]> => {
  return fetchWordPressCached(['wp', 'case-studies', 'website-case-study'], async () => {
    try {
      const groups = await Promise.all(
        CASE_STUDY_CATEGORY_SLUGS.map((slug) => fetchCaseStudyPostsForCategory(slug, 100)),
      );
      return mergeCaseStudyPostsByDate(groups);
    } catch (error) {
      console.error('Error fetching case study posts:', error);
      return [];
    }
  });
});

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
          slug
          count
          posts(first: 1, where: { orderby: { field: DATE, order: DESC } }) {
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
        }
      }
    }
  `;

  try {
    const data = await client.request<GetAllBlogDataResponse>(query, { first: 300 });

    const allPosts = (data.posts?.nodes || []).map(mapPost);
    
    const categoryToLatestPostMap: Record<string, BlogPost> = {};
    if (data.categories?.nodes) {
      data.categories.nodes.forEach(catNode => {
        if (catNode.name && catNode.posts?.nodes && catNode.posts.nodes.length > 0) {
          categoryToLatestPostMap[catNode.name] = mapPost(catNode.posts.nodes[0]);
        }
      });
    }

    const { featuredPostsMap, latestPosts, categories } = partitionBlogPostsForListing(
      allPosts,
      data.categories?.nodes,
      categoryToLatestPostMap
    );

    const categoryNodes =
      data.categories?.nodes?.filter((cat) => {
        if (!cat.name || (cat.count ?? 0) <= 0) return false;
        const lower = cat.name.toLowerCase();
        return (
          !lower.includes('case study') &&
          !lower.includes('case-study') &&
          lower !== 'uncategorized'
        );
      }) ?? [];

    const categoryLatestPostsMap: Record<string, BlogPost[]> = {};

    await Promise.all(
      categoryNodes.map(async (catNode) => {
        const name = catNode.name!;
        const slug = catNode.slug?.trim() || toCategorySlug(name);
        const featuredId = featuredPostsMap[name]?.id;

        try {
          const posts = await fetchBlogPostsByCategorySlug(slug, 100);
          categoryLatestPostsMap[name] = featuredId
            ? posts.filter((post) => post.id !== featuredId)
            : posts;
        } catch (categoryError) {
          console.warn(`Blog posts for category "${name}" (${slug}):`, categoryError);
          categoryLatestPostsMap[name] = latestPosts.filter((post) => {
            if (featuredId && post.id === featuredId) return false;
            const cats =
              post.categories && post.categories.length > 0
                ? post.categories
                : [post.category];
            return cats.some((c) => c.toLowerCase() === name.toLowerCase());
          });
        }
      }),
    );

    return {
      featuredPostsMap,
      latestPosts,
      categories,
      categoryLatestPostsMap,
    };
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return {
      featuredPostsMap: {},
      latestPosts: [],
      categories: ['All Posts'],
      categoryLatestPostsMap: {},
    };
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
          posts(first: 1, where: { orderby: { field: DATE, order: DESC } }) {
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
        }
      }
    }
  `;

    try {
      const data = await client.request<GetAllBlogDataResponse>(query, { first: 300 });
      const allPosts = (data.posts?.nodes || []).map(mapPostLite);
      
      const categoryToLatestPostMap: Record<string, BlogPost> = {};
      if (data.categories?.nodes) {
        data.categories.nodes.forEach(catNode => {
          if (catNode.name && catNode.posts?.nodes && catNode.posts.nodes.length > 0) {
            categoryToLatestPostMap[catNode.name] = mapPostLite(catNode.posts.nodes[0]);
          }
        });
      }
      
      const { latestPosts } = partitionBlogPostsForListing(allPosts, data.categories?.nodes, categoryToLatestPostMap);
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

type WpShowcaseCategoryNode = {
  name?: string;
  count?: number;
};

const SHOWCASE_ALL_WORK = 'All Work';
/** Max showcase posts loaded per filter category (carousel + gallery). */
const SHOWCASE_PER_CATEGORY_LIMIT = 300;

/** Sort filter pills: All Work first, then WP taxonomy count (desc), tie-break A–Z. */
function buildShowcaseCategoryList(
  taxonomyNodes: WpShowcaseCategoryNode[] | undefined,
  allItems: ShowcaseItem[],
): string[] {
  const fromWp = (taxonomyNodes ?? [])
    .filter(
      (node): node is { name: string; count: number } =>
        typeof node.name === 'string' &&
        node.name.length > 0 &&
        node.name !== SHOWCASE_ALL_WORK &&
        (node.count ?? 0) > 0,
    )
    .sort((a, b) => {
      const byCount = (b.count ?? 0) - (a.count ?? 0);
      return byCount !== 0 ? byCount : a.name.localeCompare(b.name);
    })
    .map((node) => node.name);

  const wpNames = new Set(fromWp);
  const orphanCounts = new Map<string, number>();

  for (const item of allItems) {
    for (const cat of item.categories) {
      if (cat === SHOWCASE_ALL_WORK || wpNames.has(cat)) continue;
      orphanCounts.set(cat, (orphanCounts.get(cat) ?? 0) + 1);
    }
  }

  const orphans = [...orphanCounts.entries()]
    .sort((a, b) => {
      const byCount = b[1] - a[1];
      return byCount !== 0 ? byCount : a[0].localeCompare(b[0]);
    })
    .map(([name]) => name);

  if (fromWp.length > 0) {
    return [SHOWCASE_ALL_WORK, ...fromWp, ...orphans];
  }

  // Fallback if taxonomy query is empty/unavailable: count from loaded items.
  const localCounts = new Map<string, number>();
  for (const item of allItems) {
    for (const cat of item.categories) {
      if (cat === SHOWCASE_ALL_WORK) continue;
      localCounts.set(cat, (localCounts.get(cat) ?? 0) + 1);
    }
  }

  const fromItems = [...localCounts.entries()]
    .sort((a, b) => {
      const byCount = b[1] - a[1];
      return byCount !== 0 ? byCount : a[0].localeCompare(b[0]);
    })
    .map(([name]) => name);

  return [SHOWCASE_ALL_WORK, ...fromItems];
}

const mapShowcase = (node: WpShowcaseNode): ShowcaseItem => ({
  id: node.id,
  title: node.title,
  image: node.featuredImage?.node?.sourceUrl || '/images/showcase/placeholder.png',
  categories: [
    SHOWCASE_ALL_WORK,
    ...(node.showcaseCategories?.nodes
      ?.map((c) => c.name)
      .filter((n): n is string => typeof n === 'string' && n.length > 0) ?? []),
  ],
});

/** Posts loaded via taxonomy relation may omit the parent term on `showcaseCategories`. */
const withShowcaseCategory = (item: ShowcaseItem, categoryName: string): ShowcaseItem => {
  if (item.categories.includes(categoryName)) return item;
  return { ...item, categories: [...item.categories, categoryName] };
};

type WpShowcaseCategoryWithPosts = WpShowcaseCategoryNode & {
  showcases?: { nodes?: WpShowcaseNode[] };
};

type WpTestimonialNode = {
  databaseId: number;
  slug: string;
  title: string;
  content?: string;
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
};

const mapHomeTestimonial = (node: WpTestimonialNode): SocialProofTestimonial => {
  const attribution = decodeHtmlEntities(node.title?.trim() ?? '');
  return {
    id: node.slug || String(node.databaseId),
    attribution,
    quote: stripExcerptHtml(node.content),
    imageSrc: node.featuredImage?.node?.sourceUrl ?? '/images/showcase/placeholder.png',
    imageAlt: node.featuredImage?.node?.altText?.trim() || `${attribution} portrait.`,
  };
};

const HOME_TESTIMONIALS_QUERY = gql`
  query GetHomeTestimonials($first: Int!, $orderbyField: PostObjectsConnectionOrderbyEnum!) {
    testimonials(
      first: $first
      where: { status: PUBLISH, orderby: { field: $orderbyField, order: ASC } }
    ) {
      nodes {
        databaseId
        slug
        title
        content(format: RAW)
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

async function fetchPublishedTestimonials(
  orderbyField: 'MENU_ORDER' | 'DATE',
): Promise<SocialProofTestimonial[]> {
  const data = await client.request<{ testimonials?: { nodes?: WpTestimonialNode[] } }>(
    HOME_TESTIMONIALS_QUERY,
    { first: 100, orderbyField },
  );
  return (data.testimonials?.nodes ?? [])
    .map(mapHomeTestimonial)
    .filter((item) => item.quote.length > 0);
}

/** All published testimonials for the homepage carousel (WP CPT `testimonial`). */
export const getHomeTestimonials = cache(async (): Promise<SocialProofTestimonial[]> => {
  return fetchWordPressCached(['wp', 'home-testimonials'], async () => {
    try {
      const byMenuOrder = await fetchPublishedTestimonials('MENU_ORDER');
      if (byMenuOrder.length > 0) return byMenuOrder;
    } catch (error) {
      console.warn('Home testimonials (MENU_ORDER) unavailable, retrying DATE:', error);
    }

    try {
      const byDate = await fetchPublishedTestimonials('DATE');
      if (byDate.length > 0) return byDate;
    } catch (error) {
      console.error('Error fetching home testimonials:', error);
    }

    return socialProofSection.testimonials;
  });
});

export const getShowcaseData = cache(async () => {
  return fetchWordPressCached(['wp', 'showcase'], async () => {
    const nodesQuery = gql`
      query GetShowcaseNodes($first: Int!) {
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

    const categoriesQuery = gql`
      query GetShowcaseCategoryCounts {
        showcaseCategories(first: 100, where: { hideEmpty: true }) {
          nodes {
            name
            count
          }
        }
      }
    `;

    const categoriesWithShowcasesQuery = gql`
      query GetShowcasePostsByCategory($first: Int!) {
        showcaseCategories(first: 100, where: { hideEmpty: true }) {
          nodes {
            name
            count
            showcases(first: $first) {
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
        }
      }
    `;

    try {
      const [nodesResult, categoriesResult, byCategoryResult] = await Promise.allSettled([
        client.request<{ contentNodes?: { nodes?: WpShowcaseNode[] } }>(nodesQuery, {
          first: SHOWCASE_PER_CATEGORY_LIMIT,
        }),
        client.request<{ showcaseCategories?: { nodes?: WpShowcaseCategoryNode[] } }>(
          categoriesQuery,
        ),
        client.request<{ showcaseCategories?: { nodes?: WpShowcaseCategoryWithPosts[] } }>(
          categoriesWithShowcasesQuery,
          { first: SHOWCASE_PER_CATEGORY_LIMIT },
        ),
      ]);

      if (nodesResult.status === 'rejected') {
        throw nodesResult.reason;
      }

      const allItems = (nodesResult.value.contentNodes?.nodes ?? []).map(mapShowcase);
      const taxonomyNodes =
        categoriesResult.status === 'fulfilled'
          ? categoriesResult.value.showcaseCategories?.nodes
          : undefined;

      if (categoriesResult.status === 'rejected') {
        console.warn(
          'Showcase category counts unavailable; falling back to item-based counts:',
          categoriesResult.reason,
        );
      }

      if (byCategoryResult.status === 'rejected') {
        console.warn(
          'Showcase per-category posts unavailable; falling back to global batch filter:',
          byCategoryResult.reason,
        );
      }

      const categories = buildShowcaseCategoryList(taxonomyNodes, allItems);

      const itemsByCategory: Record<string, ShowcaseItem[]> = {
        [SHOWCASE_ALL_WORK]: allItems,
      };

      if (byCategoryResult.status === 'fulfilled') {
        for (const catNode of byCategoryResult.value.showcaseCategories?.nodes ?? []) {
          const name = catNode.name;
          if (typeof name !== 'string' || name.length === 0 || name === SHOWCASE_ALL_WORK) {
            continue;
          }
          itemsByCategory[name] = (catNode.showcases?.nodes ?? []).map((node) =>
            withShowcaseCategory(mapShowcase(node), name),
          );
        }
      }

      for (const cat of categories) {
        if (cat === SHOWCASE_ALL_WORK) continue;
        if ((itemsByCategory[cat]?.length ?? 0) > 0) continue;
        itemsByCategory[cat] = allItems.filter((item) => item.categories.includes(cat));
      }

      return {
        allItems,
        categories,
        itemsByCategory,
      };
    } catch (error) {
      console.error('Error fetching showcase data:', error);
      return { allItems: [], categories: [SHOWCASE_ALL_WORK], itemsByCategory: {} };
    }
  });
});
