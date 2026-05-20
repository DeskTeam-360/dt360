import React from 'react';
import { ChevronRight } from 'lucide-react';
import { SafeImage } from '@/components/shared/SafeImage';

interface DownloadCTAProps {
  title?: string;
  subtitle?: React.ReactNode;
  description?: string;
  buttonText?: string;
  subtext?: string;
  showSubtext?: boolean;
}

export function DownloadCTA({
  title = "Free Download:",
  subtitle = <React.Fragment>The Ultimate Task<br />Delegation Template</React.Fragment>,
  description = "The exact framework I use with 400+ clients. Multi-sensory, step-by-step delegation that actually gets done right. Loom video + written outline + checklist - all in one template.",
  buttonText = "Download Free",
  subtext = "No credit card. No catch. Just the template.",
  showSubtext = true
}: DownloadCTAProps = {}) {
  return (
    <section className="w-full relative bg-white">
      <div className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
        {/* Torn Edge Background Image */}
        <SafeImage
          src="/images/blog/Download BG.png"
          alt="Download Background"
          fill
          className="object-cover md:object-fill object-center z-0"
        />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-35 md:py-40">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* Left Side: Icon and Title */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <svg className="w-[80px] h-[80px] md:w-[120px] md:h-[120px]" viewBox="0 0 162 162" fill="none">
                  <path
                    d="M81.0664 0C125.838 0 162.134 36.2947 162.134 81.0664C162.134 125.838 125.838 162.134 81.0664 162.134C36.2946 162.134 0 125.838 0 81.0664C0.000245753 36.2948 36.2948 0.000140208 81.0664 0ZM60.8359 43.6963V69.8564H35.6494L80.96 127.638L126.27 69.8564H102.231V43.6963H60.8359Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="text-white">
                <h2 className="text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] font-bold font-heading mb-1">
                  {title}
                </h2>
                <p className="text-[28px] md:text-[32px] lg:text-[40px] leading-[1.2] font-heading font-medium">
                  {subtitle}
                </p>
              </div>
            </div>

            {/* Right Side: Text and CTA */}
            <div className="text-white">
              <p className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.5] font-semibold mb-8">
                {description}
              </p>

              <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4 xl:gap-6">
                <button className="bg-white text-[#11104c] px-6 py-3 md:px-8 md:py-3 rounded-[10px] font-bold text-[16px] md:text-[18px] flex items-center gap-3 hover:bg-gray-100 transition-colors flex-shrink-0 cursor-pointer">
                  {buttonText}
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-current flex items-center justify-center">
                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4 stroke-[3]" />
                  </div>
                </button>

                {showSubtext && (
                  <p className="text-[12px] md:text-[14px] text-white/90 leading-tight font-medium">
                    {subtext}
                  </p>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
