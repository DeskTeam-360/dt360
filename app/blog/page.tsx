import React from 'react';
import { Metadata } from 'next';
import { BlogHero } from '@/components/pages/blog/BlogHero';
import { FeaturedBlog } from '@/components/pages/blog/FeaturedBlog';
import { LatestBlogs } from '@/components/pages/blog/LatestBlogs';
import { DownloadCTA } from '@/components/pages/blog/DownloadCTA';
import { AuthorSection } from '@/components/pages/blog/AuthorSection';

import { getBlogData } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Real talk about delegation, outsourcing, and growing your business without working 80-hour weeks.',
};

export default async function BlogPage() {
  const { featuredPostsMap, latestPosts, categories } = await getBlogData();

  return (
    <main className="flex-grow">
      <BlogHero />
      <FeaturedBlog featuredPostsMap={featuredPostsMap} categories={categories} />
      <LatestBlogs posts={latestPosts} />
      <DownloadCTA />
      <AuthorSection />
    </main>
  );
}
