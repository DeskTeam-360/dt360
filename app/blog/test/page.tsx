import { Metadata } from 'next';
import { BlogPostContent } from '@/components/pages/blog-single/BlogPostContent';

export const metadata: Metadata = {
  title: 'Blog Post (Test Layout)',
  description: 'Static preview of the single blog post layout.',
};

export default function TestBlogPage() {
  return (
    <main className="flex-grow">
      <BlogPostContent />
    </main>
  );
}
