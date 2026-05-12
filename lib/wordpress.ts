import { GraphQLClient, gql } from 'graphql-request';
import { BlogPost } from '@/data/blog';

const API_URL = process.env.WORDPRESS_API_URL || 'https://deskteam360.com/endpoint';
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

// Helper to calculate read time
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content ? content.split(/\s+/).length : 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Helper to map WordPress post to BlogPost type
const mapPost = (post: any): BlogPost => {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt?.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...', // Strip HTML
    content: post.content,
    image: post.featuredImage?.node?.sourceUrl || '/images/blog/blog-placeholder.png',
    category: post.categories?.nodes[0]?.name || 'Uncategorized',
    author: post.author?.node?.name || 'Admin',
    readTime: calculateReadTime(post.content || ''),
    date: post.date,
    tagColor: 'bg-[#f0573a]', // Default color
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
        }
      }
    }
  `;

  try {
    const data: any = await client.request(query, { first: 100 });
    
    // Parse categories
    const allCategories = data.categories?.nodes
      .map((c: any) => c.name)
      .filter((name: string) => {
        const lowerName = name.toLowerCase();
        return !lowerName.includes('case study') && !lowerName.includes('case-study') && lowerName !== 'uncategorized';
      }) || [];
    
    const categories = ['All Posts', ...allCategories];

    // Parse posts
    const allPosts = (data.posts?.nodes || []).map(mapPost);
    
    // 1. Filter out case studies
    const validPosts = allPosts.filter((post: BlogPost) => {
      const categoryName = post.category.toLowerCase();
      return !categoryName.includes('case study') && !categoryName.includes('case-study');
    });

    // 2. Extract latest post of each category for FeaturedBlog
    const featuredPostsMap: Record<string, BlogPost> = {};
    const usedPostIds = new Set<string>();

    // "All Posts" gets the absolute latest post
    if (validPosts.length > 0) {
      featuredPostsMap['All Posts'] = validPosts[0];
      usedPostIds.add(validPosts[0].id);
    }

    // For each valid category, find the latest post
    categories.forEach(category => {
      if (category === 'All Posts') return;
      
      const latestInCategory = validPosts.find((post: BlogPost) => post.category === category);
      if (latestInCategory) {
        featuredPostsMap[category] = latestInCategory;
        usedPostIds.add(latestInCategory.id);
      }
    });

    // 3. The rest go to LatestBlogs
    const latestPosts = validPosts.filter((post: BlogPost) => !usedPostIds.has(post.id));

    return {
      featuredPostsMap,
      latestPosts,
      categories
    };
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return { featuredPostsMap: {}, latestPosts: [], categories: ['All Posts'] };
  }
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
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
    const data: any = await client.request(query, { id: slug });
    return data.post ? mapPost(data.post) : null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
};
