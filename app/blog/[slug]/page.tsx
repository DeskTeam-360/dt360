import { notFound } from 'next/navigation';
import { DynamicBlogPostContent } from '@/components/pages/blog-single/DynamicBlogPostContent';
import { BlogPostingJsonLd } from '@/components/seo/BlogPostingJsonLd';
import { BreadcrumbJsonLd, blogPostBreadcrumbs } from '@/components/seo/BreadcrumbJsonLd';
import { FaqPageJsonLd } from '@/components/seo/FaqPageJsonLd';
import { InsourcingDefinedTermJsonLd } from '@/components/seo/DefinedTermJsonLd';
import {
  generateBlogPostMetadata,
  getBlogSinglePageData,
} from '@/lib/blog-single-page';

type Props = {
  params: Promise<{ slug: string }>;
};

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
