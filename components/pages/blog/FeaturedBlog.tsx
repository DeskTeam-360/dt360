"use client";

import React from 'react';
import { CATEGORIES, FEATURED_POST, BlogPost } from '@/data/blog';
import { SafeImage } from '@/components/shared/SafeImage';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';



interface FeaturedBlogProps {
  featuredPostsMap: Record<string, BlogPost>;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function FeaturedBlog({
  featuredPostsMap,
  categories,
  selectedCategory,
  onSelectCategory,
}: FeaturedBlogProps) {
  const currentPost = featuredPostsMap[selectedCategory] || featuredPostsMap["All Posts"] || FEATURED_POST;

  return (
    <section className="relative pt-0 pb-16 bg-white overflow-hidden -mt-[2px] z-20">
      {/* Top Gradient Background */}
      <div 
        className="absolute top-0 left-0 right-0 h-[700px] pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(134, 154, 209, 0) 0%, #869AD1 95%, #869AD1 100%)',
          transform: 'matrix(-1, 0, 0, 1, 0, 0)',
        }}
      />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 pt-12 md:pt-16">
        <h2 className="text-[32px] md:text-[64px] leading-[1.1] font-bold text-[#11104c] text-center mb-8 md:mb-12 font-heading">
          Our Featured Blog
        </h2>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 md:mb-16">
          {(categories.length > 0 ? categories : CATEGORIES).map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={cn(
                "px-[15px] py-[8px] md:px-[25px] md:py-[15px] rounded-[30px] font-semibold text-[16px] md:text-[20px] transition-colors border cursor-pointer",
                selectedCategory === category
                  ? "bg-[#e3058d] text-white border-[#e3058d]"
                  : "bg-white text-[#11104c] border-[#11104c] hover:bg-gray-50"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article with Animation */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full p-[6px] md:p-[8px] border border-[#11104c] rounded-[24px] md:rounded-[36px] bg-transparent shadow-lg"
          >
            <div className="relative rounded-[18px] md:rounded-[28px] overflow-hidden w-full min-h-[400px] md:min-h-[500px] lg:h-[500px] flex flex-col justify-between p-6 md:p-8 lg:p-12 group">
              {/* Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden rounded-[18px] md:rounded-[28px]">
                <SafeImage
                  src={currentPost.image}
                  alt={currentPost.title}
                  fill
                  className="object-cover transition-all duration-700 scale-110 blur-md md:scale-105 md:blur-none md:group-hover:scale-110 md:group-hover:blur-md"
                />
                {/* Dark overlay always visible on mobile, hover-only on desktop */}
                <div className="absolute inset-0 bg-[#11104c]/80 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>

              {/* Top Right: Tags */}
              <div className="relative z-10 flex flex-wrap justify-end gap-3 w-full">
                <span className="bg-[#f0573a] text-white px-[15px] py-[6px] md:px-[20px] md:py-[8px] rounded-[20px] font-bold text-[12px] md:text-[14px] uppercase tracking-wider shadow-sm">
                  Featured
                </span>
                {(currentPost.categories && currentPost.categories.length > 0 ? currentPost.categories : [currentPost.category]).map((cat) => (
                  <span key={cat} className="bg-[#201f60] text-[#8491e8] px-[15px] py-[6px] md:px-[20px] md:py-[8px] rounded-[20px] font-bold text-[12px] md:text-[14px] uppercase tracking-wider shadow-sm">
                    {cat}
                  </span>
                ))}
              </div>

              {/* Middle: Title and Excerpt (Always visible on mobile, Hover Reveal on desktop) */}
              <div className="relative z-10 flex-1 flex flex-col justify-center items-start w-full lg:w-4/5 py-4 md:py-6 opacity-100 translate-y-0 md:opacity-0 md:translate-y-8 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-700 ease-out pointer-events-none">
                <h3 className="text-[24px] md:text-[32px] lg:text-[42px] leading-[1.2] font-bold text-white mb-3 md:mb-4 font-heading drop-shadow-lg line-clamp-2 md:line-clamp-3">
                  {currentPost.title}
                </h3>
                <p className="text-[14px] md:text-[16px] lg:text-[18px] leading-[1.6] text-white/90 font-medium line-clamp-3 md:line-clamp-4 drop-shadow-md">
                  {currentPost.excerpt}
                </p>
              </div>

              {/* Bottom Row: Button & Author Info */}
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between mt-auto gap-6 w-full">
                <Link href={`/blog/${currentPost.slug}`}>
                  <button className="bg-[#e3058d] text-white px-6 py-2.5 md:px-8 md:py-3 rounded-[30px] font-bold text-[16px] md:text-[18px] flex items-center gap-3 hover:bg-[#d11f62] transition-colors cursor-pointer">
                    Read Post
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 stroke-[3]" />
                    </div>
                  </button>
                </Link>
                
                <div className="flex items-center gap-3 md:gap-4 text-white font-medium text-[14px] md:text-[16px] bg-black/40 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/10 shadow-lg">
                  <span>{currentPost.readTime}</span>
                  <span className="text-white/40">|</span>
                  <span>{currentPost.author}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
