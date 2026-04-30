"use client";

import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";

const includedItems = [
  "Feed post graphics - single images, carousels, quote cards",
  "Instagram and Facebook story templates",
  "Reels and TikTok cover graphics",
  "LinkedIn post graphics and banners",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(#02063B_0%,#02063B_50%,#E6236D_100%)] pb-18 pt-32 text-white sm:pb-22 lg:pt-40 lg:pb-28 2xl:pb-32">
      <SafeImage
        src="/images/Service - Ellipse Red.png"
        alt=""
        width={380}
        height={380}
        className="pointer-events-none absolute -right-12 -top-12 z-[1] h-auto w-[230px] opacity-90 sm:w-[300px] lg:w-[360px]"
      />
      <SafeImage
        src="/images/Service - Ellipse Blue.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute -left-24 top-[calc(var(--spacing)*30)] z-[5] h-auto w-[260px] opacity-90 sm:w-[320px] lg:w-[390px]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(220,56,255,0.32),transparent_40%),radial-gradient(circle_at_0%_100%,rgba(61,43,190,0.45),transparent_48%)]"
        aria-hidden
      />
      <Container className="relative z-10 max-w-[1400px] !px-10 lg:!px-20">
        <div className="grid items-center gap-8 pb-10 lg:grid-cols-2 lg:gap-12 lg:pb-14 2xl:gap-16 2xl:pb-20">
          <div className="max-w-xl">
            <h1 className="text-4xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-[76px]">
              <span className="block">Consistent </span>
              <span className="block text-[#ef2f9e]">Social Media Content</span>
            </h1>
            <p className="mt-4 text-xl font-semibold text-white sm:text-2xl lg:text-[36px] lg:leading-tight">
              Without the Chaos
            </p>
            <p className="mt-4 max-w-lg text-sm font-semibold leading-relaxed text-white/85 sm:text-base lg:max-w-xl lg:text-[18px]">
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
            <SafeImage
              src="/images/Social - Hero.png"
              alt="Hero illustration for social media content service"
              width={820}
              height={780}
              priority
              className="relative z-10 h-auto w-full"
            />
          </div>
        </div>
      </Container>
      <SafeImage
        src="/images/Service - Ellipse Blue.png"
        alt=""
        width={460}
        height={460}
        className="pointer-events-none absolute right-0 top-[75%] z-[1] hidden h-auto w-[320px] rotate-180 opacity-85 lg:block"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,47,179,0.16),transparent_45%)]"
        aria-hidden
      />
      <Container className="relative z-10 max-w-[1400px] !px-10 pb-10 sm:pb-14 lg:!px-20 lg:pb-18 2xl:pb-24">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 2xl:gap-16">
          <div>
            <h2 className="max-w-lg text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:max-w-2xl lg:text-[64px] lg:leading-[1.02]">
              We Handle All of Your <span className="text-[#f6b22e]">Social Media</span> Content Needs
            </h2>
            <div className="mt-6">
              <SafeImage
                src="/images/Social - Whats Included.png"
                alt="Social media content workstation illustration"
                width={760}
                height={620}
                className="h-auto w-full max-w-[560px]"
              />
            </div>
          </div>
          <div className="mx-auto w-full max-w-xl space-y-3 sm:max-w-2xl sm:space-y-4 lg:mx-0 lg:max-w-none">
            {includedItems.map((item) => (
              <div
                key={item}
                className="relative rounded-2xl border border-white/20 bg-white/8 py-3 pl-14 pr-3 backdrop-blur-[2px] sm:py-4 sm:pl-16 sm:pr-4"
              >
                <SafeImage
                  src="/images/Service - Checklist.png"
                  alt=""
                  width={40}
                  height={40}
                  className="absolute left-[-18px] top-1/2 h-[40px] w-[40px] -translate-y-1/2"
                />
                <p className="text-base leading-relaxed text-white/95 sm:text-lg lg:text-[24px] lg:leading-tight">
                  {item}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-center gap-1 pt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#f6b22e]" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
