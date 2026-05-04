"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";

const includedPages = [
  [
    "Custom WordPress themes, child themes, and template tweaks",
    "Performance tuning, Core Web Vitals, and speed optimization",
    "HTML/CSS/JavaScript fixes and front-end bug resolution",
    "DNS, SSL, hosting migrations, and go-live support",
  ],
  [
    "Full website builds and redesigns - WordPress, Webflow, custom",
    "Landing pages and sales funnels",
    "GoHighLevel page builds and customizations",
    "WooCommerce and e-commerce builds",
  ],
  [
    "Schema markup, SEO-ready structure, and analytics setup",
    "Form builds, CRM embeds, and third-party API integrations",
    "Mobile-responsive layouts and accessibility improvements",
    "Staging workflows, backups, and safe update cadence",
  ],
];

export function Hero() {
  const [pageIndex, setPageIndex] = useState(1);
  const totalPages = includedPages.length;
  const visibleItems = useMemo(() => includedPages[pageIndex] ?? [], [pageIndex]);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(#02063B_0%,#02063B_50%,#E6236D_100%)] pb-20 pt-32 text-white sm:pb-24 lg:pt-40 lg:pb-28 2xl:pb-32">
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
            <h1 className="text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-5xl lg:text-[76px]">
              <span className="block text-[28px] font-semibold leading-tight text-white sm:text-[32px] lg:text-[40px] lg:leading-snug">
                Stop Paying $50/hr for
              </span>
              <span className="mt-1 block text-[#ef2f9e]">Web Development</span>
              <span className="mt-1 block text-[28px] font-semibold leading-tight text-white sm:text-[32px] lg:text-[40px] lg:leading-snug">
                That Takes 3 Weeks
              </span>
            </h1>
            <p className="mt-4 max-w-lg text-sm font-semibold leading-relaxed text-white/85 sm:text-base lg:max-w-xl lg:text-[18px]">
              There&apos;s a better way to get web work done. Not cheaper freelancers. Not a retainer agency with a
              10-person email chain. A flat-rate, dedicated web team that knows your brand and turns tasks around in
              1-3 days.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[640px]">
            <div
              className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle,rgba(251,98,183,0.45)_0%,rgba(71,56,206,0.15)_55%,transparent_75%)] blur-2xl"
              aria-hidden
            />
            <SafeImage
              src="/images/Service/web-development-hero.png"
              alt="3D illustration of a developer on a laptop with floating code editor and website layout windows"
              width={820}
              height={620}
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
        className="pointer-events-none absolute right-[calc(var(--spacing)*0)] top-[80%] z-[1] hidden h-auto w-[320px] rotate-180 opacity-85 lg:block"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,47,179,0.16),transparent_45%)]"
        aria-hidden
      />
      <Container className="relative z-10 max-w-[1400px] !px-10 pb-12 sm:pb-16 lg:!px-20 lg:pb-20 2xl:pb-28">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 2xl:gap-16">
          <div>
            <h2 className="max-w-lg text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:max-w-2xl lg:text-[64px] lg:leading-[1.02]">
              We Handle All of Your <span className="text-[#f6b22e]">Web Development</span> Needs
            </h2>
            <div className="mt-6">
              <SafeImage
                src="/images/Service/web-development-we-handle.png"
                alt="3D illustration of a developer at a multi-monitor desk with BUILD A WEBSITE on screen, Elementor, Divi, Duda, and responsive devices"
                width={760}
                height={620}
                className="h-auto w-full max-w-[620px]"
              />
            </div>
          </div>
          <div className="mx-auto w-full max-w-xl space-y-3 sm:max-w-2xl sm:space-y-4 lg:mx-0 lg:max-w-none">
            {visibleItems.map((item) => (
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
            <div className="flex items-center justify-center gap-2 pt-2">
              {Array.from({ length: totalPages }).map((_, dotIndex) => (
                <button
                  key={`dot-${dotIndex}`}
                  type="button"
                  onClick={() => setPageIndex(dotIndex)}
                  aria-label={`Show list page ${dotIndex + 1}`}
                  className={`h-2 w-2 rounded-full transition ${
                    pageIndex === dotIndex ? "bg-[#f6b22e]" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
