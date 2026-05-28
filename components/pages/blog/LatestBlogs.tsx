"use client";

import React, { useEffect, useState } from 'react';
import { LATEST_POSTS, BlogPost } from '@/data/blog';
import { SafeImage } from '@/components/shared/SafeImage';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Generate 15 dummy posts to fill 3 pages (5 posts per page)
const DUMMY_POSTS = Array.from({ length: 15 }).map((_, i) => {
  // Add an offset based on the page (i / 5) so each page starts with a different post
  const pageOffset = Math.floor(i / 5);
  const base = LATEST_POSTS[(i + pageOffset) % LATEST_POSTS.length];
  
  return {
    ...base,
    id: `dummy-post-${i}`,
    title: `${base.title}${pageOffset > 0 ? ` (Page ${pageOffset + 1})` : ''}`,
    excerpt: (i % 5 === 0) 
      ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel convallis ante. Sed id rutrum odio, sit amet auctor nibh. Integer lectus urna, dictum in mi sed. Nullam vel convallis ante. Sed id rutrum odio dolor sit amet, consectetur."
      : base.excerpt
  };
});

interface LatestBlogsProps {
  posts?: BlogPost[];
  selectedCategory?: string;
}

export function LatestBlogs({ posts = [], selectedCategory = "All Posts" }: LatestBlogsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  
  const displayPosts = posts.length > 0 ? posts : DUMMY_POSTS;
  const filteredPosts =
    selectedCategory === "All Posts"
      ? displayPosts
      : displayPosts.filter((post) => {
          const cats = post.categories && post.categories.length > 0 ? post.categories : [post.category];
          return cats.includes(selectedCategory);
        });
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / 5));

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory]);

  const currentPosts = filteredPosts.slice(currentPage * 5, (currentPage + 1) * 5);
  const highlighted = currentPosts[0];
  const secondPost = currentPosts[1];
  const remainingPosts = currentPosts.slice(2);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(p => p + 1);
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <h2 className="text-[32px] md:text-[56px] lg:text-[64px] leading-[1.1] font-bold text-[#11104c] mb-10 md:mb-16 font-heading tracking-tight">
          Our Latest Blogs
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {/* First Row: Large Highlighted Card + One Standard Card */}
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
              {/* Highlighted Card (Hover Reveal Design) */}
              {highlighted && (
                <div className="w-full h-full p-[6px] md:p-[8px] border border-[#11104c] rounded-[24px] md:rounded-[36px] bg-transparent shadow-lg lg:col-span-2 group flex flex-col">
                  <div className="relative flex-1 rounded-[18px] md:rounded-[28px] overflow-hidden w-full min-h-[400px] md:min-h-[500px] flex flex-col justify-between p-6 md:p-8 lg:p-10">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-[18px] md:rounded-[28px]">
                      <SafeImage
                        src={highlighted.image}
                        alt={highlighted.title}
                        fill
                        className="object-cover object-left-top transition-all duration-700 scale-110 blur-md md:scale-105 md:blur-none md:group-hover:scale-110 md:group-hover:blur-md"
                      />
                      {/* Dark overlay always visible on mobile, hover-only on desktop */}
                      <div className="absolute inset-0 bg-[#11104c]/80 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </div>

                    {/* Top Right: Tags */}
                    <div className="relative z-10 flex flex-wrap justify-end gap-3 w-full">
                      {(highlighted.categories && highlighted.categories.length > 0 ? highlighted.categories : [highlighted.category]).map((cat) => (
                        <span key={cat} className={cn(
                          "text-white px-[15px] py-[6px] md:px-[20px] md:py-[8px] rounded-[20px] font-bold text-[12px] md:text-[14px] uppercase tracking-wider shadow-sm",
                          highlighted.tagColor || "bg-[#f0573a]"
                        )}>
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Middle: Title and Excerpt (Always visible on mobile, Hover Reveal on desktop) */}
                    <div className="relative z-10 flex-1 flex flex-col justify-center items-start w-full lg:w-4/5 py-4 md:py-6 opacity-100 translate-y-0 md:opacity-0 md:translate-y-8 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-700 ease-out pointer-events-none">
                      <h3 className="text-[24px] md:text-[32px] lg:text-[40px] leading-[1.2] font-bold text-white mb-3 md:mb-4 font-heading drop-shadow-lg line-clamp-2 md:line-clamp-3">
                        {highlighted.title}
                      </h3>
                      <p className="text-[14px] md:text-[16px] lg:text-[18px] leading-[1.6] text-white/90 font-medium line-clamp-3 md:line-clamp-4 drop-shadow-md">
                        {highlighted.excerpt}
                      </p>
                    </div>

                    {/* Bottom Row: Button & Author Info */}
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between mt-auto gap-6 w-full">
                      <Link href={`/blog/${highlighted.slug}`}>
                        <button className="border-2 border-[#e3058d] text-[#e3058d] group-hover:border-[#f5b419] group-hover:text-[#f5b419] hover:!bg-[#f5b419] hover:!text-[#11104c] px-6 py-2 md:py-3 rounded-[10px] font-bold text-[14px] md:text-[16px] flex items-center gap-3 transition-colors cursor-pointer">
                          Read Post
                          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-current flex items-center justify-center">
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 stroke-[3]" />
                          </div>
                        </button>
                      </Link>
                      
                      <div className="flex items-center gap-3 md:gap-4 text-white font-medium text-[14px] md:text-[16px] bg-black/40 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/10 shadow-lg">
                        <span>{highlighted.readTime}</span>
                        <span className="text-white/40">|</span>
                        <span>{highlighted.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Standard Card 1 */}
              {secondPost && <BlogCard post={secondPost} />}
            </div>

            {/* Second Row: 3 Standard Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {remainingPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-12 md:mt-16 gap-4">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all",
              currentPage === 0 
                ? "bg-[#e2e2e2] text-[#acacac] cursor-not-allowed" 
                : "bg-[#e3058d] text-white hover:bg-[#d10481] shadow-lg hover:shadow-xl cursor-pointer"
            )}
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>
          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all",
              currentPage === totalPages - 1 
                ? "bg-[#e2e2e2] text-[#acacac] cursor-not-allowed" 
                : "bg-[#e3058d] text-white hover:bg-[#d10481] shadow-lg hover:shadow-xl cursor-pointer"
            )}
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="border border-[#11104c] rounded-[25px] md:rounded-[30px] flex flex-col group bg-white hover:bg-[#11104c] shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-4 md:p-5 pb-0">
        <div className="relative h-[220px] md:h-[240px] w-full overflow-hidden rounded-[15px] md:rounded-[20px]">
          <SafeImage
            src={post.image}
            alt={post.title}
            fill
            className="object-cover object-left-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex flex-wrap gap-2 z-10">
            {(post.categories && post.categories.length > 0 ? post.categories : [post.category]).map((cat) => (
              <span key={cat} className={cn(
                "text-white px-[12px] py-[4px] md:px-[15px] md:py-[6px] rounded-[20px] font-bold text-[10px] md:text-[12px] uppercase tracking-wider",
                post.tagColor || "bg-[#7547c5]"
              )}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 md:p-8 pt-5 md:pt-6 flex-grow flex flex-col">
        <div className="flex items-center gap-3 md:gap-4 text-[#8491e8] group-hover:text-white/80 font-semibold text-[12px] md:text-[14px] mb-3 transition-colors duration-300">
          <span>{post.readTime}</span>
          <span className="text-[#8491e8]/50 group-hover:text-white/50 transition-colors duration-300">|</span>
          <span>{post.author}</span>
        </div>
        <h3 className="text-[20px] md:text-[24px] leading-[1.3] font-bold text-[#11104c] group-hover:text-white mb-6 font-heading transition-colors duration-300">
          {post.title}
        </h3>
        <div className="mt-auto">
          <Link href={`/blog/${post.slug}`}>
            <button className="border-2 border-[#7547c5] text-[#7547c5] group-hover:border-[#f5b419] group-hover:text-[#f5b419] hover:!bg-[#f5b419] hover:!text-[#11104c] px-6 py-2 md:py-3 rounded-[10px] font-bold text-[14px] md:text-[16px] flex items-center gap-3 transition-colors cursor-pointer">
              Read Post
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-current flex items-center justify-center">
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 stroke-[3]" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
