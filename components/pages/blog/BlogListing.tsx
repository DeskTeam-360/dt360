"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/data/blog";
import { FeaturedBlog } from "@/components/pages/blog/FeaturedBlog";
import { LatestBlogs } from "@/components/pages/blog/LatestBlogs";
import { paginateItems, type BlogPagination } from "@/lib/blog-pagination";

type Props = {
  featuredPostsMap: Record<string, BlogPost>;
  latestPosts: BlogPost[];
  categoryLatestPostsMap: Record<string, BlogPost[]>;
  categories: string[];
  initialCategory?: string;
  /** 1-based All Posts page from the URL (F6). */
  listPage?: number;
  showFeatured?: boolean;
};

export function BlogListing({
  featuredPostsMap,
  latestPosts,
  categoryLatestPostsMap,
  categories,
  initialCategory,
  listPage = 1,
  showFeatured = true,
}: Props) {
  const resolvedCategories = useMemo(
    () => (categories.length > 0 ? categories : ["All Posts"]),
    [categories],
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory && resolvedCategories.includes(initialCategory)
      ? initialCategory
      : (resolvedCategories[0] ?? "All Posts"),
  );

  const allPostsPage = useMemo(
    () => paginateItems(latestPosts, listPage),
    [latestPosts, listPage],
  );

  const paginationForNav: BlogPagination = {
    currentPage: allPostsPage.currentPage,
    totalPages: allPostsPage.totalPages,
    hasPrev: allPostsPage.hasPrev,
    hasNext: allPostsPage.hasNext,
    prevHref: allPostsPage.prevHref,
    nextHref: allPostsPage.nextHref,
  };

  return (
    <>
      {showFeatured ? (
        <FeaturedBlog
          featuredPostsMap={featuredPostsMap}
          categories={resolvedCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      ) : null}
      <LatestBlogs
        key={selectedCategory}
        posts={
          selectedCategory === "All Posts"
            ? allPostsPage.items
            : (categoryLatestPostsMap[selectedCategory] ?? [])
        }
        selectedCategory={selectedCategory}
        featuredPost={featuredPostsMap[selectedCategory]}
        listPage={listPage}
        allPostsPagination={
          selectedCategory === "All Posts" ? paginationForNav : undefined
        }
      />
    </>
  );
}
