import React from 'react';
import { Metadata } from 'next';
import { BlogHero } from '@/components/pages/blog/BlogHero';
import { BlogListing } from '@/components/pages/blog/BlogListing';
import { DownloadCTA } from '@/components/pages/blog/DownloadCTA';
import { AuthorSection } from '@/components/pages/blog/AuthorSection';

import { getBlogData } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Real talk about delegation, outsourcing, and growing your business without working 80-hour weeks.',
};

export default async function BlogPage() {
  const { featuredPostsMap, latestPosts, categories, categoryLatestPostsMap } =
    await getBlogData();

  return (
    <main className="flex-grow">
      <BlogHero />
      <BlogListing
        featuredPostsMap={featuredPostsMap}
        latestPosts={latestPosts}
        categoryLatestPostsMap={categoryLatestPostsMap}
        categories={categories}
      />
      <DownloadCTA />
      <AuthorSection />
    </main>
  );
}
