import { notFound } from 'next/navigation';
import { DynamicBlogPostContent } from '@/components/pages/blog-single/DynamicBlogPostContent';
import { BlogPostingJsonLd } from '@/components/seo/BlogPostingJsonLd';
import { BreadcrumbJsonLd, blogPostBreadcrumbs } from '@/components/seo/BreadcrumbJsonLd';
import { FaqPageJsonLd } from '@/components/seo/FaqPageJsonLd';
import { InsourcingDefinedTermJsonLd } from '@/components/seo/DefinedTermJsonLd';
import { BLOG_SITEMAP_EXCLUDED_SLUGS } from '@/data/blogSitemapExtraSlugs';
import { GATE5_NEW_BLOG_SLUGS } from '@/data/gate5NewBlogPosts';
import {
  generateBlogPostMetadata,
  getBlogSinglePageData,
} from '@/lib/blog-single-page';
import {
  getAllCaseStudyPosts,
  getAllPublishedPostSlugs,
} from '@/lib/wordpress';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Prerender published posts so HTML is ISR-cached (s-maxage) instead of
 * `Cache-Control: private, no-store` on every Ahrefs/crawler hit (P2 slow pages).
 */
export async function generateStaticParams() {
  try {
    const [slugs, caseStudies] = await Promise.all([
      getAllPublishedPostSlugs(),
      getAllCaseStudyPosts(),
    ]);
    const caseStudySlugs = new Set(caseStudies.map((post) => post.slug));
    const unique = new Set<string>([...slugs, ...GATE5_NEW_BLOG_SLUGS]);
    return [...unique]
      .filter(
        (slug) =>
          Boolean(slug) &&
          !BLOG_SITEMAP_EXCLUDED_SLUGS.has(slug) &&
          !caseStudySlugs.has(slug),
      )
      .map((slug) => ({ slug }));
  } catch {
    // Build without WP: still allow on-demand ISR via dynamicParams (default true).
    return GATE5_NEW_BLOG_SLUGS.map((slug) => ({ slug }));
  }
}

/** Align with `app/blog/layout.tsx` — keep full-route HTML cacheable. */
export const revalidate = 600;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return generateBlogPostMetadata(slug);
}

export default async function SingleBlogPage({ params }: Props) {
  const { slug } = await params;
  const data = await getBlogSinglePageData(slug);

  if (!data) {
    notFound();
  }

  return (
    <main className="flex-grow">
      <BreadcrumbJsonLd items={blogPostBreadcrumbs(data.post.title, slug)} />
      <BlogPostingJsonLd post={data.post} path={`/blog/${slug}`} />
      {data.faqs && data.faqs.length > 0 ? (
        <FaqPageJsonLd items={data.faqs} />
      ) : null}
      {data.showInsourcingDefinedTerm ? <InsourcingDefinedTermJsonLd /> : null}
      <DynamicBlogPostContent
        post={data.post}
        relatedPosts={data.relatedPosts}
        publishedSlugs={data.publishedSlugs}
      />
    </main>
  );
}
