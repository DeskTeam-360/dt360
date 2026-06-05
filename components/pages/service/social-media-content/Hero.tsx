"use client";

import { Container } from "@/components/shared/Container";
import { ServiceSafeImage } from "@/components/pages/service/shared/ServiceSafeImage";
import { ServiceHeroIncludedChecklist } from "@/components/pages/service/shared/ServiceHeroIncludedChecklist";

const includedItems = [
  "Feed post graphics - single images, carousels, quote cards",
  "Instagram and Facebook story templates",
  "Reels and TikTok cover graphics",
  "LinkedIn post graphics and banners",
  "YouTube thumbnails and channel art",
  "Twitter/X graphics and headers",
  "Social media ad creatives",
  "Profile photos and cover image refreshes",
  "Branded content templates for ongoing use"
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(#02063B_0%,#02063B_50%,#E6236D_100%)] pb-10 pt-32 text-white sm:pb-12 xl:pt-40 xl:pb-14 2xl:pb-16">
      <ServiceSafeImage
        src="/images/Service - Ellipse Red.png"
        alt=""
        width={380}
        height={380}
        className="pointer-events-none absolute -right-12 -top-12 z-[1] h-auto w-[230px] opacity-90 sm:w-[300px] xl:w-[360px]"
      />
      <ServiceSafeImage
        src="/images/Service - Ellipse Blue.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute -left-24 top-[calc(var(--spacing)*30)] z-[5] h-auto w-[260px] opacity-90 sm:w-[320px] xl:w-[390px]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(220,56,255,0.32),transparent_40%),radial-gradient(circle_at_0%_100%,rgba(61,43,190,0.45),transparent_48%)]"
        aria-hidden
      />
      <Container className="relative z-10 max-w-[1440px] !px-10 xl:!px-20">
        <div className="grid items-center gap-8 pb-8 xl:grid-cols-2 xl:gap-12 xl:pb-10 2xl:gap-16 2xl:pb-12">
          <div className="w-full min-w-0">
            <h1 className="type-rule-h1 leading-[1.03] tracking-tight text-white">
              <span className="block">Consistent </span>
              <span className="block text-[#E3058D]">Social Media Content</span>
            </h1>
            <p className="type-rule-h4 mt-4 leading-tight text-white">
              Without the Chaos
            </p>
            <p className="type-rule-p mt-4 w-full max-w-none text-white/85">
              Your social media presence should not depend on whether you had time to make graphics this week. With
              DeskTeam360, you have a dedicated social media setter who knows your brand and delivers content on your
              schedule.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[560px]">
            <div
              className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle,rgba(251,98,183,0.45)_0%,rgba(71,56,206,0.15)_55%,transparent_75%)] blur-2xl"
              aria-hidden
            />
            <ServiceSafeImage
              src="/images/Social-Hero-1.png"
              alt="Hero illustration for social media content service"
              width={820}
              height={780}
              priority
              sizes="(max-width: 1023px) 90vw, 820px"
              className="relative z-10 h-auto w-full"
            />
          </div>
        </div>
      </Container>
      <ServiceSafeImage
        src="/images/Service - Ellipse Blue.png"
        alt=""
        width={460}
        height={460}
        className="pointer-events-none absolute right-0 top-[75%] z-[1] hidden h-auto w-[320px] rotate-180 opacity-85 xl:block"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,47,179,0.16),transparent_45%)]"
        aria-hidden
      />
      <Container className="relative z-10 max-w-[1440px] !px-10 pb-6 sm:pb-8 xl:!px-20 xl:pb-10">
        <div className="grid grid-cols-1 items-start gap-x-16 gap-y-12 sm:gap-y-16 xl:grid-cols-2 xl:gap-x-28 xl:gap-y-24 2xl:gap-x-32 2xl:gap-y-28">
          <h2 className="type-rule-h2 col-span-full w-full max-w-none min-w-0 leading-tight text-white xl:max-w-2xl xl:leading-[1.02]">
            We Handle All of Your <span className="text-[#f6b22e]">Social Media</span> Content Needs
          </h2>
          <div className="flex w-full justify-center">
            <ServiceSafeImage
              src="/images/Social - Whats Included.png"
              alt="Social media content workstation illustration"
              width={760}
              height={620}
              className="h-auto w-full max-w-[560px]"
            />
          </div>
          <ServiceHeroIncludedChecklist items={includedItems} />
        </div>
      </Container>
    </section>
  );
}
