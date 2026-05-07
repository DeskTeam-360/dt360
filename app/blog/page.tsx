import React from 'react';
import { Metadata } from 'next';
import { BlogHero } from '@/components/pages/blog/BlogHero';
import { FeaturedBlog } from '@/components/pages/blog/FeaturedBlog';
import { LatestBlogs } from '@/components/pages/blog/LatestBlogs';
import { DownloadCTA } from '@/components/pages/blog/DownloadCTA';
import { AuthorSection } from '@/components/pages/blog/AuthorSection';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Real talk about delegation, outsourcing, and growing your business without working 80-hour weeks.',
};

export default function BlogPage() {
  return (
    <main className="flex-grow">
      <BlogHero />
      <FeaturedBlog />
      <LatestBlogs />
      <DownloadCTA />
      <AuthorSection />
    </main>
  );
}
