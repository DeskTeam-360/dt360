import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getAllCaseStudyPosts, getPostBySlug, getAllPublishedPostSlugs } from '@/lib/wordpress';
import { DynamicBlogPostContent } from '@/components/pages/blog-single/DynamicBlogPostContent';
import { HaveQuestionsCTA } from '@/components/pages/case-studies/HaveQuestionsCTA';
import { BreadcrumbJsonLd, caseStudyBreadcrumbs } from '@/components/seo/BreadcrumbJsonLd';
import {
  caseStudyWordpressSlugCandidates,
  F19_CONVERT_ON_COMMAND_WP_SLUG,
  toCaseStudyPublicSlug,
} from '@/lib/seo/fix-report-redirects';
import type { BlogPost } from '@/data/blog';

type Props = {
  params: Promise<{ slug: string }>;
};

async function resolveCaseStudyPost(
  requestSlug: string,
): Promise<{ post: BlogPost; publicSlug: string } | null> {
  const publicSlug = toCaseStudyPublicSlug(requestSlug);

  // Old 120k path should be handled by next.config redirect; belt-and-suspenders here.
  if (requestSlug === F19_CONVERT_ON_COMMAND_WP_SLUG) {
    permanentRedirect(`/case-studies/${publicSlug}`);
  }

  for (const candidate of caseStudyWordpressSlugCandidates(publicSlug)) {
    const post = await getPostBySlug(candidate);
    if (post) {
      return { post, publicSlug };
    }
  }
  return null;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const resolved = await resolveCaseStudyPost(resolvedParams.slug);

  if (!resolved) {
    return {
      title: 'Case Study Not Found',
    };
  }

  const { post, publicSlug } = resolved;

  // Document title uses layout title.template (`%s | DeskTeam360`).
  // openGraph.title does not, so keep the brand there once.
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/case-studies/${publicSlug}`,
    },
    openGraph: {
      url: `/case-studies/${publicSlug}`,
      title: `${post.title} | DeskTeam360`,
      description: post.excerpt,
    },
  };
}

export const revalidate = 600; // 10 minutes

export default async function SingleCaseStudyPage({ params }: Props) {
  const resolvedParams = await params;
  const results = await Promise.all([
    resolveCaseStudyPost(resolvedParams.slug),
    getAllCaseStudyPosts(),
    getAllPublishedPostSlugs(),
  ]);
  const resolved = results[0];
  const latestPostsPool = results[1];
  const publishedSlugs = results[2];

  if (!resolved) {
    notFound();
  }

  const { post, publicSlug } = resolved;

  // Extract related posts from content if they exist (class="dt360-related-posts")
  const content = post.content || '';
  const relatedSlugs: string[] = [];
  const relatedSectionMatch = content.match(/class="dt360-related-posts"[\s\S]*?<\/div>/);
  
  if (relatedSectionMatch) {
    const linkMatches = relatedSectionMatch[0].matchAll(/href="https?:\/\/[^"\/]+\/([^"\/#\s?]+)\/?/g);
    for (const lm of linkMatches) {
      if (lm[1] && lm[1] !== 'case-studies') {
        relatedSlugs.push(lm[1]);
      }
    }
  }

  // Get the actual post objects for the extracted slugs from our dataset
  let relatedPosts = latestPostsPool.filter((p) => relatedSlugs.includes(p.slug));

  // If we found fewer than 3, fill up with latest posts (excluding the current one and ones already found)
  if (relatedPosts.length < 3) {
    const foundSlugs = relatedPosts.map((p) => p.slug);
    const additional = latestPostsPool
      .filter((p) => p.slug !== post.slug && p.slug !== publicSlug && !foundSlugs.includes(p.slug))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...additional];
  }

  return (
    <main className="flex-grow">
      <BreadcrumbJsonLd items={caseStudyBreadcrumbs(post.title, publicSlug)} />
      <DynamicBlogPostContent post={post} relatedPosts={relatedPosts} publishedSlugs={publishedSlugs} optimizeImages />
      <HaveQuestionsCTA />
    </main>
  );
}
