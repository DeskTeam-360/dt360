"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/data/blog";
import { FeaturedBlog } from "@/components/pages/blog/FeaturedBlog";
import { LatestBlogs } from "@/components/pages/blog/LatestBlogs";

type Props = {
  featuredPostsMap: Record<string, BlogPost>;
  latestPosts: BlogPost[];
  categories: string[];
};

export function BlogListing({ featuredPostsMap, latestPosts, categories }: Props) {
  const resolvedCategories = useMemo(
    () => (categories.length > 0 ? categories : ["All Posts"]),
    [categories],
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(resolvedCategories[0] ?? "All Posts");

  return (
    <>
      <FeaturedBlog
        featuredPostsMap={featuredPostsMap}
        categories={resolvedCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <LatestBlogs key={selectedCategory} posts={latestPosts} selectedCategory={selectedCategory} />
    </>
  );
}
