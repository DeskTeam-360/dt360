import type { Metadata } from 'next';
import type { BlogPost } from '@/data/blog';
import { getPostBySlug, getBlogLatestPostsPoolForRelated, getAllPublishedPostSlugs } from '@/lib/wordpress';
import { withPageCanonical } from '@/lib/seo';

export type BlogSinglePageData = {
  post: BlogPost;
  relatedPosts: BlogPost[];
  publishedSlugs: string[];
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
    .replace(/[^a-z0-9s-]/g, ' ')
    .split(/[\s-]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !/^\d+$/.test(w) && !COMMON_STOP_WORDS.has(w));
  return Array.from(new Set(tokens));
}

/**
 * Computes related blog posts based on keyword, tag, and category matching.
 * Candidates are scored by relevance and sorted descending.
 * Each blog displays exactly up to 3 related posts.
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

  // Filter out the current post
  const candidates = postsPool.filter((p) => p.slug !== slug && p.id !== post.id);

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
  const [post, latestPostsPool, publishedSlugs] = await Promise.all([
    getPostBySlug(slug),
    getBlogLatestPostsPoolForRelated(),
    getAllPublishedPostSlugs(),
  ]);

  if (!post) {
    return null;
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

  // Brand suffix comes from root layout title.template (`%s | DeskTeam360`).
  return withPageCanonical(getBlogPostCanonicalPath(slug), {
    title: post.title,
    description: post.excerpt,
  });
}
