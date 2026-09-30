import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import type { BlogPost } from '@/data/blog';
import { getPostBySlug, getBlogLatestPostsPoolForRelated, getAllPublishedPostSlugs, isCaseStudyPost } from '@/lib/wordpress';
import { withPageCanonical } from '@/lib/seo';

export type BlogSinglePageData = {
  post: BlogPost;
  relatedPosts: BlogPost[];
  publishedSlugs: string[];
};

/** Canonical blog post URL — matches sitemap (`/blog/{slug}`, no trailing slash). */
export function getBlogPostCanonicalPath(slug: string): string {
  return `/blog/${slug}`;
}

function isListingCategory(name: string): boolean {
  const lower = name.toLowerCase();
  return (
    !lower.includes('case study') &&
    !lower.includes('case-study') &&
    lower !== 'uncategorized'
  );
}

function postCategories(post: BlogPost): string[] {
  const cats =
    post.categories && post.categories.length > 0
      ? post.categories
      : [post.category];
  return cats.filter(isListingCategory);
}

function sharesCategory(a: BlogPost, b: BlogPost): boolean {
  const aCats = postCategories(a).map((c) => c.toLowerCase());
  const bCats = postCategories(b).map((c) => c.toLowerCase());
  return aCats.some((c) => bCats.includes(c));
}

/**
 * F6 — 3 to 5 related posts as real links, preferring the same category.
 */
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

  const pool = latestPostsPool.filter((p) => p.slug !== slug);
  const picked: BlogPost[] = [];
  const pickedSlugs = new Set<string>();

  const take = (candidates: BlogPost[], limit: number) => {
    for (const candidate of candidates) {
      if (picked.length >= limit) break;
      if (pickedSlugs.has(candidate.slug)) continue;
      picked.push(candidate);
      pickedSlugs.add(candidate.slug);
    }
  };

  // Prefer explicit WP related block, then same category, then anything.
  take(
    pool.filter((p) => relatedSlugs.includes(p.slug)),
    5,
  );
  take(
    pool.filter((p) => sharesCategory(p, post)),
    5,
  );
  take(pool, 5);

  // Report asks for 3–5; keep whatever we have up to 5 (min 3 when pool allows).
  if (picked.length >= 3) {
    return picked.slice(0, 5);
  }
  return picked;
}

export async function getBlogSinglePageData(
  slug: string,
): Promise<BlogSinglePageData | null> {
  const [post, latestPostsPool, publishedSlugs] = await Promise.all([
    getPostBySlug(slug),
    getBlogLatestPostsPoolForRelated(),
    getAllPublishedPostSlugs(),
  ]);

  if (!post) {
    return null;
  }

  // F3: case studies must not stay live under /blog/{slug}
  if (isCaseStudyPost(post)) {
    permanentRedirect(`/case-studies/${slug}`);
  }

  return {
    post,
    relatedPosts: resolveRelatedPosts(slug, post, latestPostsPool),
    publishedSlugs,
  };
}

export async function generateBlogPostMetadata(slug: string): Promise<Metadata> {
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  if (isCaseStudyPost(post)) {
    permanentRedirect(`/case-studies/${slug}`);
  }

  // Brand suffix comes from root layout title.template (`%s | DeskTeam360`).
  return withPageCanonical(getBlogPostCanonicalPath(slug), {
    title: post.title,
    description: post.excerpt,
  });
}
