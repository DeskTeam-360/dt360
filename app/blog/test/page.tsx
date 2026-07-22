import { Metadata } from 'next';
import { withPageCanonical } from '@/lib/seo';
import { BlogPostContent } from '@/components/pages/blog-single/BlogPostContent';

export const metadata: Metadata = withPageCanonical("/blog/test", {
  title: 'Blog Post (Test Layout)',
  description: 'Static preview of the single blog post layout.',
});

export default function TestBlogPage() {
  return (
    <main className="flex-grow">
      <BlogPostContent />
    </main>
  );
}
