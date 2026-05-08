import React from 'react';
import { SafeImage } from '@/components/shared/SafeImage';

export function BlogHero() {
  return (
    <section className="relative overflow-visible mb-0">
      {/* Main Hero Container with curved bottom */}
      <div className="relative pb-[120px] md:pb-[180px] z-10 overflow-hidden">
        {/* Blue Gradient Background - Bottom Layer */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#3656b3] to-transparent opacity-20" />
        </div>

        {/* Background Image Container - 120% height to ensure baked-in curve is cropped out */}
        <div className="absolute inset-x-0 top-0 h-[120%]">
          <SafeImage
            src="/images/blog/blog-hero-bg-jeremy-work.png"
            alt="Hero Background"
            fill
            className="object-cover object-[center_top]"
            priority
          />
        </div>

        {/* Top Gradient Overlay - from blue to transparent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#a0affb]/40 via-[#3656b3]/20 to-transparent h-full" />
        </div>

        {/* SVG Curve at the bottom of the container */}
        <div className="absolute bottom-0 left-0 right-0 h-[80px] md:h-[150px] z-10 pointer-events-none">
          <svg className="absolute bottom-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 150" fill="none">
            <defs>
              <filter id="inset-shadow" x="-10%" y="-10%" width="120%" height="120%">
                {/* 1. Create a drop shadow (offset down) of the shape */}
                <feOffset dx="0" dy="15" />
                <feGaussianBlur stdDeviation="12" result="offset-blur" />
                {/* 2. Subtract the shifted blur from the original shape to isolate the top inner edge */}
                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                {/* 3. Color this isolated edge black */}
                <feFlood floodColor="black" floodOpacity="0.35" result="color" />
                <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                {/* 4. Blend the black inner edge over the original blue shape */}
                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
              </filter>
            </defs>
            
            {/* The solid blue area with the perfect inset shadow applied */}
            <path 
              d="M0,0 Q720,150 1440,0 L1440,150 L0,150 Z" 
              fill="#869AD1" 
              filter="url(#inset-shadow)" 
            />
          </svg>
        </div>

        {/* Content */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative pt-32 md:pt-[240px] pb-32">
          <div className="flex justify-end">
            <div className="w-full">
              <h1
                className="font-bold text-right font-heading whitespace-nowrap mb-12"
                style={{
                  fontSize: '63px',
                  lineHeight: '1.2',
                  background: 'linear-gradient(90deg, #11104C 0%, #30439E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  // @ts-expect-error - temp
                  textFillColor: 'transparent',
                  WebkitTextStroke: '2px #FFFFFF',
                  // @ts-expect-error - temp
                  paintOrder: 'stroke fill',
                  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))',
                  width: 'fit-content',
                  marginLeft: 'auto'
                }}
              >
                The DeskTeam360 Blog
              </h1>

              <div className="bg-white/44 backdrop-blur-md border-[3px] border-white rounded-[30px] p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] w-fit max-w-[650px] ml-auto">
                <p className="text-[20px] md:text-[24px] leading-[1.4] md:leading-[36px] text-[#11104c] font-semibold mb-6 text-right font-sans">
                  Real talk about delegation, outsourcing,<br />
                  and growing your business without<br />
                  working 80-hour weeks. I spent 12 years<br />
                  and over $1 million learning what works.<br />
                  These are the lessons.
                </p>
                <p className="text-[22px] md:text-[26px] leading-[1.5] text-[#e3058d] font-semibold italic text-right font-heading">
                  Jeremy Kenerson, Founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Icon - Half in Hero, Half in Featured Section */}
      <div className="absolute -bottom-[20px] md:-bottom-[8px] left-0 right-0 z-20">
        <div className="flex justify-center">
          <div className="relative w-[120px] h-[120px] md:w-[208px] md:h-[208px] flex items-center justify-center">
            <SafeImage
              src="/images/blog/DT360 Icon.png"
              alt="DeskTeam360 Icon"
              fill
              className="object-contain z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
