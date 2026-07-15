"use client";

import React from 'react';
import { AUTHOR_INFO } from '@/data/blog';
import { SafeImage } from '@/components/shared/SafeImage';

export function AuthorSection() {

  return (
    <>
      <section className="relative w-full overflow-hidden bg-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="/images/blog/blog-bubble-cta-bg.png"
            alt=""
            fill
            className="object-contain object-right"
          />
        </div>

        {/* Pink Radial Glow (Bottom Left) */}
        <div 
          className="absolute z-0 pointer-events-none"
          style={{
            width: '741px',
            height: '741px',
            left: '-370px',
            bottom: '-250px',
            background: 'radial-gradient(50% 50% at 50% 50%, rgba(227, 5, 141, 0.4) 0%, rgba(227, 5, 141, 0) 100%)'
          }}
        />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row pt-16 md:pt-24 lg:pt-32">
          {/* Left Column (Content) */}
          <div className="w-full md:w-[60%] lg:w-[50%] pb-0 md:pb-24 lg:pb-32 z-20">
            <span className="inline-block bg-[#e2e8fa] text-[#4b5ba3] px-[15px] py-[6px] md:px-[20px] md:py-[8px] rounded-[20px] font-bold text-[14px] md:text-[16px] uppercase mb-6 md:mb-8">
              AUTHOR
            </span>

            <h2 className="text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] font-bold mb-6 md:mb-8 font-heading tracking-tight">
              <span className="text-[#11104c]">About </span>
              <span className="text-[#e3058d]">{AUTHOR_INFO.name}</span>
            </h2>

            <p className="text-[16px] md:text-[18px] leading-[1.6] md:leading-[30px] text-[#11104c] font-semibold max-w-[650px] font-body">
              {AUTHOR_INFO.bio}
            </p>
          </div>

          {/* Right Column (Jeremy Image) — sized to fill section height like prior portrait asset */}
          <div className="w-full md:w-[40%] lg:w-[50%] mt-12 md:mt-0 flex justify-center md:absolute md:bottom-0 md:right-2 lg:right-4 xl:right-8 z-10 pointer-events-none">
            <div className="relative w-[300px] h-[380px] origin-bottom scale-[1.1] translate-y-4 sm:w-[400px] sm:h-[480px] sm:scale-[1.1] md:w-[500px] md:h-[620px] md:translate-y-6 md:scale-[1.1] lg:w-[580px] lg:h-[720px] lg:translate-y-7 lg:scale-[1.1] xl:w-[640px] xl:h-[780px] xl:scale-[1.1]">
              <SafeImage
                src="/images/blog/blog-cta-jeremy-kenerson-deskteam360.png"
                alt={`${AUTHOR_INFO.name}, founder of DeskTeam360`}
                fill
                className="object-contain object-bottom pointer-events-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
