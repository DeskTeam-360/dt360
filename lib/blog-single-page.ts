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
    image: override.image || PLACEHOLDER_IMAGE,
    category: override.category,
    categories: [override.category],
    author: 'Jeremy Kenerson',
    readTime: '8 min read',
    date: override.date,
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
      image: newOverride?.image || image,
      ...(newOverride
        ? {
            category: newOverride.category,
            categories: [newOverride.category],
            ...(newOverride.date ? { date: newOverride.date } : {}),
          }
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

/** Canonical blog post URL — matches sitemap (`/blog/${slug}`, no trailing slash). */
export function getBlogPostCanonicalPath(slug: string): string {
  return `/blog/${slug}`;
}

const COMMON_STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
  'any', 'are', 'aren', 'arent', 'as', 'at', 'be', 'because', 'been', 'before',
  'being', 'below', 'between', 'both', 'but', 'by', 'can', 'cannot', 'could',
  'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from',
  'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers',
  'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is',
  'isn', 'isnt', 'it', 'its', 'itself', 'just', 'me', 'more', 'most', 'my',
  'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only',
  'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same',
  'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their',
  'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this',
  'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was',
  'wasn', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who',
  'whom', 'why', 'with', 'won', 'would', 'you', 'your', 'yours', 'yourself',
  'yourselves', 'vs', 'versus', 'guide', 'actually'
]);

/**
 * Extracts distinct meaningful keywords from titles, slugs, or text.
 * Strips punctuation, numbers-only tokens, short words (<=2 chars), and stopwords.
 */
function extractSignificantKeywords(text: string): string[] {
  if (!text) return [];
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !/^\d+$/.test(w) && !COMMON_STOP_WORDS.has(w));
  return Array.from(new Set(tokens));
}

/**
 * Related posts from main (tag/keyword scoring), with Gate 5 sitemap exclusions.
 * Each blog displays up to 3 related posts.
 */
export function resolveRelatedPosts(
  slug: string,
  post: BlogPost,
  postsPool: BlogPost[],
): BlogPost[] {
  // Collect target post tags & categories
  const targetTags = new Set(
    (post.tags || [])
      .map((t) => t.toLowerCase().trim())
      .filter((t) => t.length > 0)
  );

  const targetCategories = new Set(
    (post.categories && post.categories.length > 0 ? post.categories : [post.category])
      .map((c) => c.toLowerCase().trim())
      .filter((c) => c.length > 0 && c !== 'all posts' && c !== 'uncategorized')
  );

  // Extract primary keywords from title and slug
  const targetKeywords = new Set(
    extractSignificantKeywords(`${post.title} ${post.slug}`)
  );

  // Check if legacy manually curated related section exists in content
  const content = post.content || '';
  const manuallyCuratedSlugs = new Set<string>();
  const relatedSectionMatch = content.match(/class="dt360-related-posts"[\s\S]*?<\/div>/);

  if (relatedSectionMatch) {
    const linkMatches = relatedSectionMatch[0].matchAll(
      /href="https?:\/\/[^"\/]+\/([^"\/#\s?]+)\/?/g,
    );
    for (const lm of linkMatches) {
      if (lm[1] && lm[1] !== 'blog') {
        manuallyCuratedSlugs.add(lm[1].toLowerCase());
      }
    }
  }

  // Filter out the current post and Gate 5 excluded slugs
  const candidates = postsPool.filter(
    (p) =>
      p.slug !== slug &&
      p.id !== post.id &&
      !BLOG_SITEMAP_EXCLUDED_SLUGS.has(p.slug),
  );

  // Score each candidate
  const scored = candidates.map((candidate) => {
    let score = 0;
    const candSlugLower = candidate.slug.toLowerCase();

    // 1. Manually curated slug bonus (+15 points)
    if (manuallyCuratedSlugs.has(candSlugLower)) {
      score += 15;
    }

    // 2. Exact tag match (+10 points per shared tag)
    if (candidate.tags && candidate.tags.length > 0) {
      for (const t of candidate.tags) {
        const normalized = t.toLowerCase().trim();
        if (targetTags.has(normalized)) {
          score += 10;
        }
      }
    }

    // 3. Category match (+5 points per shared category)
    const candCategories = (candidate.categories && candidate.categories.length > 0
      ? candidate.categories
      : [candidate.category]
    )
      .map((c) => c.toLowerCase().trim())
      .filter((c) => c.length > 0 && c !== 'all posts' && c !== 'uncategorized');

    for (const c of candCategories) {
      if (targetCategories.has(c)) {
        score += 5;
      }
    }

    // 4. Title / slug keyword match (+3 points per shared keyword)
    const candKeywords = extractSignificantKeywords(`${candidate.title} ${candidate.slug}`);
    const matchedTokens = new Set<string>();

    for (const kw of candKeywords) {
      if (targetKeywords.has(kw) && !matchedTokens.has(kw)) {
        score += 3;
        matchedTokens.add(kw);
      }
    }

    // 5. Title substring/stem overlap bonus (+1 point per matching root word)
    const candTitleLower = candidate.title.toLowerCase();
    for (const kw of targetKeywords) {
      if (kw.length >= 4 && candTitleLower.includes(kw) && !matchedTokens.has(kw)) {
        score += 1;
      }
    }

    return {
      post: candidate,
      score,
    };
  });

  // Sort by score descending, tie-breaker by date descending
  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    const dateA = a.post.date ? new Date(a.post.date).getTime() : 0;
    const dateB = b.post.date ? new Date(b.post.date).getTime() : 0;
    return dateB - dateA;
  });

  // Pick top 3 related posts with positive score
  const relatedPosts: BlogPost[] = [];
  const selectedSlugs = new Set<string>([slug]);

  for (const item of scored) {
    if (item.score > 0 && !selectedSlugs.has(item.post.slug)) {
      relatedPosts.push(item.post);
      selectedSlugs.add(item.post.slug);
      if (relatedPosts.length >= 3) break;
    }
  }

  // Graceful fallback: If fewer than 3 matching posts were found, backfill
  // from the pool (prioritizing same category first, then latest) so exactly 3 cards are displayed.
  if (relatedPosts.length < 3) {
    // Attempt same category first
    for (const candidate of candidates) {
      if (!selectedSlugs.has(candidate.slug)) {
        const candCategories = (candidate.categories || [candidate.category]).map((c) =>
          c.toLowerCase().trim()
        );
        const hasCommonCat = candCategories.some((c) => targetCategories.has(c));
        if (hasCommonCat) {
          relatedPosts.push(candidate);
          selectedSlugs.add(candidate.slug);
          if (relatedPosts.length >= 3) break;
        }
      }
    }

    // If still less than 3, backfill from remaining candidates
    if (relatedPosts.length < 3) {
      for (const candidate of candidates) {
        if (!selectedSlugs.has(candidate.slug)) {
          relatedPosts.push(candidate);
          selectedSlugs.add(candidate.slug);
          if (relatedPosts.length >= 3) break;
        }
      }
    }
  }

  return relatedPosts.slice(0, 3);
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
