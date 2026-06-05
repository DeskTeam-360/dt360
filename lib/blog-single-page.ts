import type { Metadata } from 'next';
import type { BlogPost } from '@/data/blog';
import { getPostBySlug, getBlogLatestPostsPoolForRelated } from '@/lib/wordpress';

export type BlogSinglePageData = {
  post: BlogPost;
  relatedPosts: BlogPost[];
};

/** Canonical blog post URL (WordPress-style, no `/blog/` prefix). */
export function getBlogPostCanonicalPath(slug: string): string {
  return `/${slug}`;
}

function resolveRelatedPosts(
  slug: string,
  post: BlogPost,
  latestPostsPool: BlogPost[],
): BlogPost[] {
  const content = post.content || '';
  const relatedSlugs: string[] = [];
  const relatedSectionMatch = content.match(/class="dt360-related-posts"[\s\S]*?<\/div>/);

  if (relatedSectionMatch) {
    const linkMatches = relatedSectionMatch[0].matchAll(
      /href="https?:\/\/[^"\/]+\/([^"\/#\s?]+)\/?/g,
    );
    for (const lm of linkMatches) {
      if (lm[1] && lm[1] !== 'blog') {
        relatedSlugs.push(lm[1]);
      }
    }
  }

  let relatedPosts = latestPostsPool.filter((p) => relatedSlugs.includes(p.slug));

  if (relatedPosts.length < 3) {
    const foundSlugs = relatedPosts.map((p) => p.slug);
    const additional = latestPostsPool
      .filter((p) => p.slug !== slug && !foundSlugs.includes(p.slug))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...additional];
  }

  return relatedPosts;
}

export async function getBlogSinglePageData(
  slug: string,
): Promise<BlogSinglePageData | null> {
  const [post, latestPostsPool] = await Promise.all([
    getPostBySlug(slug),
    getBlogLatestPostsPoolForRelated(),
  ]);

  if (!post) {
    return null;
  }

  return {
    post,
    relatedPosts: resolveRelatedPosts(slug, post, latestPostsPool),
  };
}

export async function generateBlogPostMetadata(slug: string): Promise<Metadata> {
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | DeskTeam360',
    };
  }

  return {
    title: `${post.title} | DeskTeam360`,
    description: post.excerpt,
    alternates: {
      canonical: getBlogPostCanonicalPath(slug),
    },
  };
}
