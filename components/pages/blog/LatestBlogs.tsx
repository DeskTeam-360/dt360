"use client";

import React, { useMemo, useState } from "react";
import { LATEST_POSTS, BlogPost } from "@/data/blog";
import { SafeImage } from "@/components/shared/SafeImage";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BlogPaginationNav } from "@/components/pages/blog/BlogPaginationNav";
import {
  BLOG_POSTS_PER_PAGE,
  paginateItems,
  type BlogPagination,
} from "@/lib/blog-pagination";

// Fallback when WP is empty (local/dev without API)
const DUMMY_POSTS = Array.from({ length: 15 }).map((_, i) => {
  const pageOffset = Math.floor(i / 5);
  const base = LATEST_POSTS[(i + pageOffset) % LATEST_POSTS.length];

  return {
    ...base,
    id: `dummy-post-${i}`,
    title: `${base.title}${pageOffset > 0 ? ` (Page ${pageOffset + 1})` : ""}`,
    excerpt:
      i % 5 === 0
        ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel convallis ante. Sed id rutrum odio, sit amet auctor nibh. Integer lectus urna, dictum in mi sed. Nullam vel convallis ante. Sed id rutrum odio dolor sit amet, consectetur."
        : base.excerpt,
  };
});

interface LatestBlogsProps {
  posts?: BlogPost[];
  selectedCategory?: string;
  featuredPost?: BlogPost;
  /** 1-based page for All Posts (URL-driven). Ignored when a category filter is active. */
  listPage?: number;
  /** Precomputed All Posts pagination from the server (F6). */
  allPostsPagination?: BlogPagination;
}

export function LatestBlogs({
  posts = [],
  selectedCategory = "All Posts",
  featuredPost,
  listPage = 1,
  allPostsPagination,
}: LatestBlogsProps) {
  const [clientPage, setClientPage] = useState(0);

  const displayPosts = posts.length > 0 ? posts : DUMMY_POSTS;
  const isAllPosts = selectedCategory === "All Posts";
  // Server pagination only when the parent already sliced All Posts for this URL page.
  const useServerPagination =
    isAllPosts && Boolean(allPostsPagination) && posts.length > 0;

  let filteredPosts: BlogPost[] =
    isAllPosts
      ? displayPosts
      : displayPosts.filter((post) => {
          const cats =
            post.categories && post.categories.length > 0
              ? post.categories
              : [post.category];
          return cats.includes(selectedCategory);
        });

  if (filteredPosts.length === 0 && featuredPost) {
    filteredPosts = [featuredPost];
  }

  const clientPagination = useMemo(
    () => paginateItems(filteredPosts, clientPage + 1, BLOG_POSTS_PER_PAGE),
    [filteredPosts, clientPage],
  );

  const currentPosts: BlogPost[] = useServerPagination
    ? filteredPosts
    : clientPagination.items;

  const navPagination: BlogPagination =
    useServerPagination && allPostsPagination
      ? allPostsPagination
      : {
          currentPage: clientPagination.currentPage,
          totalPages: clientPagination.totalPages,
          hasPrev: clientPagination.hasPrev,
          hasNext: clientPagination.hasNext,
          prevHref: clientPagination.prevHref,
          nextHref: clientPagination.nextHref,
        };

  const highlighted = currentPosts[0];
  const secondPost = currentPosts[1];
  const remainingPosts = currentPosts.slice(2);

  const handlePrev = () => {
    if (clientPage > 0) setClientPage((p) => p - 1);
  };

  const handleNext = () => {
    if (clientPage < navPagination.totalPages - 1) setClientPage((p) => p + 1);
  };

  return (
    <section className="overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <h2 className="mb-10 font-heading text-[32px] leading-[1.1] font-bold tracking-tight text-[#11104c] md:mb-16 md:text-[56px] lg:text-[64px]">
          Our Latest Blogs
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={
              useServerPagination
                ? `server-${listPage}`
                : `${selectedCategory}-${clientPage}`
            }
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-6 grid gap-6 md:mb-8 md:gap-8 lg:grid-cols-3">
              {highlighted && (
                <div className="group flex h-full w-full flex-col rounded-[24px] border border-[#11104c] bg-transparent p-[6px] shadow-lg md:rounded-[36px] md:p-[8px] lg:col-span-2">
                  <div className="relative flex min-h-[400px] w-full flex-1 flex-col justify-between overflow-hidden rounded-[18px] p-6 md:min-h-[500px] md:rounded-[28px] md:p-8 lg:p-10">
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-[18px] md:rounded-[28px]">
                      <SafeImage
                        src={highlighted.image}
                        alt={highlighted.title}
                        fill
                        className="scale-110 object-cover object-left-top blur-md transition-all duration-700 md:scale-105 md:blur-none md:group-hover:scale-110 md:group-hover:blur-md"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[#11104c]/80 opacity-100 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100" />
                    </div>

                    <div className="relative z-10 flex w-full flex-wrap justify-end gap-3">
                      {(highlighted.categories && highlighted.categories.length > 0
                        ? highlighted.categories
                        : [highlighted.category]
                      ).map((cat, idx) => (
                        <span
                          key={cat}
                          className={cn(
                            "rounded-[20px] px-[15px] py-[6px] text-[12px] font-bold tracking-wider uppercase shadow-sm md:px-[20px] md:py-[8px] md:text-[14px]",
                            idx === 0
                              ? cn("text-white", highlighted.tagColor || "bg-[#f0573a]")
                              : "bg-[#201f60] text-[#8491e8]",
                          )}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    <div className="pointer-events-none relative z-10 flex w-full flex-1 translate-y-0 flex-col items-start justify-center py-4 opacity-100 transition-all duration-700 ease-out md:translate-y-8 md:py-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 lg:w-4/5">
                      <h3 className="mb-3 font-heading text-[24px] leading-[1.2] font-bold text-white drop-shadow-lg line-clamp-2 md:mb-4 md:line-clamp-3 md:text-[32px] lg:text-[40px]">
                        {highlighted.title}
                      </h3>
                      <p className="line-clamp-3 text-[14px] leading-[1.6] font-medium text-white/90 drop-shadow-md md:line-clamp-4 md:text-[16px] lg:text-[18px]">
                        {highlighted.excerpt}
                      </p>
                    </div>

                    <div className="relative z-10 mt-auto flex w-full flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                      <Link href={`/blog/${highlighted.slug}`}>
                        <button className="flex cursor-pointer items-center gap-3 rounded-[10px] border-2 border-[#e3058d] px-6 py-2 text-[14px] font-bold text-[#e3058d] transition-colors group-hover:border-[#f5b419] group-hover:text-[#f5b419] hover:!bg-[#f5b419] hover:!text-[#11104c] md:py-3 md:text-[16px]">
                          Read Post
                          <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-current md:h-6 md:w-6">
                            <ArrowRight className="h-3 w-3 stroke-[3] md:h-4 md:w-4" />
                          </div>
                        </button>
                      </Link>

                      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[14px] font-medium text-white shadow-lg backdrop-blur-md md:gap-4 md:px-5 md:py-2.5 md:text-[16px]">
                        <span>{highlighted.readTime}</span>
                        <span className="text-white/40">|</span>
                        <span>{highlighted.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {secondPost && <BlogCard post={secondPost} />}
            </div>

            <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {useServerPagination ? (
          <BlogPaginationNav pagination={navPagination} />
        ) : navPagination.totalPages > 1 ? (
          <div className="mt-12 flex justify-center gap-4 md:mt-16">
            <button
              type="button"
              onClick={handlePrev}
              disabled={clientPage === 0}
              aria-label="Newer posts"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all md:h-12 md:w-12",
                clientPage === 0
                  ? "cursor-not-allowed bg-[#e2e2e2] text-[#acacac]"
                  : "cursor-pointer bg-[#e3058d] text-white shadow-lg hover:bg-[#d10481] hover:shadow-xl",
              )}
            >
              <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={clientPage >= navPagination.totalPages - 1}
              aria-label="Older posts"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all md:h-12 md:w-12",
                clientPage >= navPagination.totalPages - 1
                  ? "cursor-not-allowed bg-[#e2e2e2] text-[#acacac]"
                  : "cursor-pointer bg-[#e3058d] text-white shadow-lg hover:bg-[#d10481] hover:shadow-xl",
              )}
            >
              <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="group flex flex-col rounded-[25px] border border-[#11104c] bg-white shadow-sm transition-all duration-300 hover:bg-[#11104c] hover:shadow-md md:rounded-[30px]">
      <div className="p-4 pb-0 md:p-5">
        <div className="relative h-[220px] w-full overflow-hidden rounded-[15px] md:h-[240px] md:rounded-[20px]">
          <SafeImage
            src={post.image}
            alt={post.title}
            fill
            className="object-cover object-left-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-2 md:bottom-6 md:left-6">
            {(post.categories && post.categories.length > 0
              ? post.categories
              : [post.category]
            ).map((cat, idx) => (
              <span
                key={cat}
                className={cn(
                  "rounded-[20px] px-[12px] py-[4px] text-[10px] font-bold tracking-wider uppercase shadow-sm md:px-[15px] md:py-[6px] md:text-[12px]",
                  idx === 0
                    ? cn("text-white", post.tagColor || "bg-[#7547c5]")
                    : "bg-[#201f60] text-[#8491e8]",
                )}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-grow flex-col p-6 pt-5 md:p-8 md:pt-6">
        <div className="mb-3 flex items-center gap-3 text-[12px] font-semibold text-[#8491e8] transition-colors duration-300 group-hover:text-white/80 md:gap-4 md:text-[14px]">
          <span>{post.readTime}</span>
          <span className="text-[#8491e8]/50 transition-colors duration-300 group-hover:text-white/50">
            |
          </span>
          <span>{post.author}</span>
        </div>
        <h3 className="mb-6 font-heading text-[20px] leading-[1.3] font-bold text-[#11104c] transition-colors duration-300 group-hover:text-white md:text-[24px]">
          {post.title}
        </h3>
        <div className="mt-auto">
          <Link href={`/blog/${post.slug}`}>
            <button className="flex cursor-pointer items-center gap-3 rounded-[10px] border-2 border-[#7547c5] px-6 py-2 text-[14px] font-bold text-[#7547c5] transition-colors group-hover:border-[#f5b419] group-hover:text-[#f5b419] hover:!bg-[#f5b419] hover:!text-[#11104c] md:py-3 md:text-[16px]">
              Read Post
              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-current md:h-6 md:w-6">
                <ArrowRight className="h-3 w-3 stroke-[3] md:h-4 md:w-4" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
