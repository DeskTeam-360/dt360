import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import type { BlogPost } from '@/data/blog';
import { BLOG_SITEMAP_EXCLUDED_SLUGS } from '@/data/blogSitemapExtraSlugs';
import { getGate5BlogOverride } from '@/data/gate5BlogOverrides';
import {
  getGate5NewBlogPost,
  type Gate5NewBlogPost,
} from '@/data/gate5NewBlogPosts';
import {
  GATE5_S9_BLOG_PATCHES,
  normalizeQuotes,
} from '@/data/gate5S9LinkPatches';
import { toCaseStudyPublicSlug } from '@/lib/seo/fix-report-redirects';
import { getPostBySlug, getBlogLatestPostsPoolForRelated, getAllPublishedPostSlugs, isCaseStudyPost } from '@/lib/wordpress';
import { withPageCanonical } from '@/lib/seo';

const PLACEHOLDER_IMAGE = '/images/blog/blog-placeholder.png';

function synthesizeStandalonePost(override: Gate5NewBlogPost): BlogPost {
  return {
    id: `gate5-${override.slug}`,
    slug: override.slug,
    title: override.postTitle,
    excerpt: '',
    content: override.contentHtml,
    image: PLACEHOLDER_IMAGE,
    category: override.category,
    categories: [override.category],
    author: 'Jeremy Kenerson',
    readTime: '8 min read',
  };
}

/** Gate 5 S9 — insert planned link sentences into live blog HTML. */
function applyGate5S9BlogPatches(slug: string, content: string): string {
  const path = `/blog/${slug}`;
  const patches = GATE5_S9_BLOG_PATCHES.filter((p) => p.path === path);
  if (patches.length === 0) return content;

  let out = content;
  for (const patch of patches) {
    if (out.includes(patch.replaceHtmlFragment)) continue;
    if (out.includes(patch.find)) {
      out = out.replace(patch.find, patch.replaceHtmlFragment);
      continue;
    }
    const needle = normalizeQuotes(patch.find);
    const normOut = normalizeQuotes(out);
    const at = normOut.indexOf(needle);
    if (at < 0) continue;
    // Map normalized index back by scanning original with same length window.
    // Quotes differ by at most 1 code unit each, so use a sliding exact-length match.
    const targetLen = patch.find.length;
    let replaced = false;
    for (let i = 0; i <= out.length - targetLen; i++) {
      const slice = out.slice(i, i + targetLen);
      if (normalizeQuotes(slice) === needle) {
        out = out.slice(0, i) + patch.replaceHtmlFragment + out.slice(i + targetLen);
        replaced = true;
        break;
      }
      // Also try longer windows when curly vs straight changes length (same for these chars).
    }
    if (!replaced) {
      // Fallback: length may differ if HTML entities wrap the sentence — try loose search.
      const loose = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(loose.replace(/['']/g, "[''’]"));
      // Skip fragile regex fallback — leave unmatched for later crawl check.
      void re;
    }
  }
  return out;
}

async function applyGate5BlogOverride(post: BlogPost): Promise<BlogPost> {
  const mergeOverride = getGate5BlogOverride(post.slug);
  const newOverride = getGate5NewBlogPost(post.slug);
  const override = mergeOverride ?? newOverride;

  let next: BlogPost = post;
  if (override) {
    let image = post.image;
    if ('featuredImageFromSlug' in override && override.featuredImageFromSlug) {
      const imageSource = await getPostBySlug(override.featuredImageFromSlug);
      if (imageSource?.image) {
        image = imageSource.image;
      }
    }

    next = {
      ...post,
      title: override.postTitle,
      excerpt: '',
      content: override.contentHtml,
      image,
      ...(newOverride
        ? { category: newOverride.category, categories: [newOverride.category] }
        : {}),
    };
  }

  return {
    ...next,
    content: applyGate5S9BlogPatches(next.slug, next.content ?? ''),
  };
}

export type BlogSinglePageData = {
  post: BlogPost;
  relatedPosts: BlogPost[];
  publishedSlugs: string[];
  faqs?: Array<{ question: string; answer: string }>;
  showInsourcingDefinedTerm?: boolean;
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

  const pool = latestPostsPool.filter(
    (p) => p.slug !== slug && !BLOG_SITEMAP_EXCLUDED_SLUGS.has(p.slug),
  );
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

  take(
    pool.filter((p) => relatedSlugs.includes(p.slug)),
    5,
  );
  take(
    pool.filter((p) => sharesCategory(p, post)),
    5,
  );
  take(pool, 5);

  if (picked.length >= 3) {
    return picked.slice(0, 5);
  }
  return picked;
}

export async function getBlogSinglePageData(
  slug: string,
): Promise<BlogSinglePageData | null> {
  if (BLOG_SITEMAP_EXCLUDED_SLUGS.has(slug)) {
    return null;
  }

  const standalone = getGate5NewBlogPost(slug);

  const [wpPost, latestPostsPool, publishedSlugs] = await Promise.all([
    getPostBySlug(slug),
    getBlogLatestPostsPoolForRelated(),
    getAllPublishedPostSlugs(),
  ]);

  let post: BlogPost | null = wpPost;

  if (!post && standalone) {
    post = synthesizeStandalonePost(standalone);
  }

  if (!post) {
    return null;
  }

  if (wpPost && isCaseStudyPost(post)) {
    permanentRedirect(`/case-studies/${toCaseStudyPublicSlug(slug)}`);
  }

  const resolvedPost = await applyGate5BlogOverride(post);
  const slugs = new Set(publishedSlugs);
  if (standalone) slugs.add(slug);

  return {
    post: resolvedPost,
    relatedPosts: resolveRelatedPosts(slug, resolvedPost, latestPostsPool),
    publishedSlugs: [...slugs],
    faqs: standalone?.faqs,
    showInsourcingDefinedTerm: slug === 'what-is-insourcing',
  };
}

export async function generateBlogPostMetadata(slug: string): Promise<Metadata> {
  if (BLOG_SITEMAP_EXCLUDED_SLUGS.has(slug)) {
    return {
      title: 'Post Not Found',
      robots: { index: false, follow: false },
    };
  }

  const standalone = getGate5NewBlogPost(slug);
  const post = (await getPostBySlug(slug)) ?? (standalone ? synthesizeStandalonePost(standalone) : null);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  if (!standalone && isCaseStudyPost(post)) {
    permanentRedirect(`/case-studies/${toCaseStudyPublicSlug(slug)}`);
  }

  const resolvedPost = await applyGate5BlogOverride(post);
  const mergeOverride = getGate5BlogOverride(slug);
  const description =
    standalone?.metaDescription ??
    mergeOverride?.metaDescription ??
    resolvedPost.excerpt;

  return withPageCanonical(getBlogPostCanonicalPath(slug), {
    title: resolvedPost.title,
    description,
  });
}
