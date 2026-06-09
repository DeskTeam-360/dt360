import { notFound } from 'next/navigation';
import { DynamicBlogPostContent } from '@/components/pages/blog-single/DynamicBlogPostContent';
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
      <DynamicBlogPostContent 
        post={data.post} 
        relatedPosts={data.relatedPosts} 
        publishedSlugs={data.publishedSlugs}
      />
    </main>
  );
}
