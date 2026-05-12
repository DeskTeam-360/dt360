"use client";

import React, { useState } from 'react';
import { LATEST_POSTS, BlogPost } from '@/data/blog';
import { SafeImage } from '@/components/shared/SafeImage';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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
}

export function LatestBlogs({ posts = [] }: LatestBlogsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  
  const displayPosts = posts.length > 0 ? posts : DUMMY_POSTS;
  const totalPages = Math.max(1, Math.ceil(displayPosts.length / 5));

  const currentPosts = displayPosts.slice(currentPage * 5, (currentPage + 1) * 5);
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
              {/* Highlighted Card (Dark Background) */}
              {highlighted && (
                <div className="bg-white hover:bg-[#11104c] rounded-[25px] md:rounded-[30px] grid md:grid-cols-2 group border border-[#11104c] transition-colors duration-300 lg:col-span-2">
                  <div className="p-4 md:p-6 lg:pr-0 order-1 h-[300px] md:h-auto min-h-[300px]">
                    <div className="relative h-full w-full overflow-hidden rounded-[15px] md:rounded-[20px]">
                      <SafeImage
                        src={highlighted.image}
                        alt={highlighted.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className={cn(
                        "absolute top-4 left-4 md:top-6 md:left-6 text-white px-[15px] py-[6px] md:px-[20px] md:py-[8px] rounded-[20px] font-bold text-[12px] md:text-[14px] uppercase tracking-wider z-10",
                        highlighted.tagColor || "bg-[#f0573a]"
                      )}>
                        {highlighted.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center order-2">
                    <div className="flex items-center gap-4 text-[#8491e8] group-hover:text-white/80 font-semibold text-[12px] md:text-[14px] mb-4 md:mb-6 transition-colors duration-300">
                      <span>{highlighted.readTime}</span>
                      <span className="text-[#8491e8]/50 group-hover:text-white/50 transition-colors duration-300">|</span>
                      <span>{highlighted.author}</span>
                    </div>
                    <div className="relative">
                      <h3 className="text-[20px] md:text-[24px] leading-[1.3] font-bold text-[#11104c] group-hover:text-white mb-4 md:mb-6 font-heading transition-colors duration-300">
                        {highlighted.title}
                      </h3>
                    </div>
                    <p className="text-black/80 group-hover:text-white/80 text-[14px] md:text-[16px] leading-[1.6] md:leading-[28px] mb-8 font-medium transition-colors duration-300">
                      {highlighted.excerpt}
                    </p>
                    <button className="border-2 border-[#7547c5] text-[#7547c5] group-hover:border-[#f5b419] group-hover:text-[#f5b419] hover:!bg-[#f5b419] hover:!text-[#11104c] px-6 py-2 md:py-3 rounded-[10px] font-bold text-[16px] md:text-[18px] flex items-center gap-3 self-end transition-colors mt-auto">
                      Read Post
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-current flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 stroke-[3]" />
                      </div>
                    </button>
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
                : "bg-[#e3058d] text-white hover:bg-[#d10481] shadow-lg hover:shadow-xl"
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
                : "bg-[#e3058d] text-white hover:bg-[#d10481] shadow-lg hover:shadow-xl"
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
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className={cn(
            "absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white px-[12px] py-[4px] md:px-[15px] md:py-[6px] rounded-[20px] font-bold text-[10px] md:text-[12px] uppercase tracking-wider z-10",
            post.tagColor || "bg-[#7547c5]"
          )}>
            {post.category}
          </span>
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
          <button className="border-2 border-[#7547c5] text-[#7547c5] group-hover:border-[#f5b419] group-hover:text-[#f5b419] hover:!bg-[#f5b419] hover:!text-[#11104c] px-6 py-2 md:py-3 rounded-[10px] font-bold text-[14px] md:text-[16px] flex items-center gap-3 transition-colors">
            Read Post
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-current flex items-center justify-center">
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 stroke-[3]" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
