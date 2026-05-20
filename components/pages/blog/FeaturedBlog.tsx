"use client";

import React, { useState } from 'react';
import { CATEGORIES, FEATURED_POST, BlogPost } from '@/data/blog';
import { SafeImage } from '@/components/shared/SafeImage';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';



interface FeaturedBlogProps {
  featuredPostsMap: Record<string, BlogPost>;
  categories: string[];
}

export function FeaturedBlog({ featuredPostsMap, categories }: FeaturedBlogProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  
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
              onClick={() => setSelectedCategory(category)}
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
            className="bg-[#fffaed] border border-[#11104c] rounded-[20px] md:rounded-[30px] overflow-hidden grid lg:grid-cols-2"
          >
            <div className="p-6 md:p-12 lg:pr-6 flex flex-col justify-center order-2 lg:order-1">
              <div className="flex gap-3 mb-4 md:mb-6">
                <span className="bg-[#f0573a] text-white px-[15px] py-[6px] md:px-[20px] md:py-[8px] rounded-[20px] font-bold text-[14px] md:text-[16px] uppercase tracking-wider">
                  Featured
                </span>
                <span className="bg-[#201f60] text-[#8491e8] px-[15px] py-[6px] md:px-[20px] md:py-[8px] rounded-[20px] font-bold text-[14px] md:text-[16px] uppercase tracking-wider">
                  {currentPost.category}
                </span>
              </div>

              <h3 className="text-[28px] md:text-[44px] lg:text-[52px] leading-[1.1] font-bold text-[#11104c] mb-4 md:mb-6 font-heading">
                {currentPost.title}
              </h3>

              <p className="text-[16px] md:text-[18px] leading-[1.6] md:leading-[30px] text-black font-semibold mb-8">
                {currentPost.excerpt}
              </p>

              {/* Action row aligned horizontally */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-auto">
                <Link href={`/blog/${currentPost.slug}`}>
                  <button className="bg-[#e3058d] text-white px-6 py-3 md:px-8 md:py-4 rounded-[30px] font-bold text-[18px] md:text-[20px] flex items-center gap-3 hover:bg-[#d11f62] transition-colors cursor-pointer">
                    Read Post
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-white flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 stroke-[3]" />
                    </div>
                  </button>
                </Link>
                
                <div className="flex items-center gap-4 text-[#e3058d] font-semibold text-[16px] md:text-[20px]">
                  <span>{currentPost.readTime}</span>
                  <span className="text-[#e3058d]/50">|</span>
                  <span>{currentPost.author}</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-12 lg:pl-6 order-1 lg:order-2 h-[300px] sm:h-[400px] lg:h-auto min-h-[300px]">
              <div className="relative w-full h-full rounded-[15px] md:rounded-[20px] overflow-hidden">
                <SafeImage
                  src={currentPost.image}
                  alt={currentPost.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
