"use client";

import Image from "next/image";
import { useState } from "react";
import {
  serviceFaqIllustrationImageClassName,
  serviceFaqIllustrationWrapperClassName,
} from "@/components/pages/service/shared/ServiceFaqIllustration";
import { ServiceSafeImage } from "@/components/pages/service/shared/ServiceSafeImage";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    id: "projects",
    question: "What kinds of projects can I submit?",
    answer:
      "Anything from website tasks, design tasks, video tasks. Landing pages, GoHighLevel funnels, WooCommerce stores, custom WordPress builds - if it's web work, we handle it.",
  },
  {
    id: "freelancer-difference",
    question: "How is this different from hiring a Freelancer?",
    answer:
      "You get a dedicated managed team with reliable turnaround, quality control, and unlimited revisions instead of depending on one individual freelancer.",
  },
  {
    id: "multiple-projects",
    question: "Can I submit multiple projects at once?",
    answer:
      "Yes. You can queue multiple tasks and we will prioritize and deliver them in order while keeping communication simple and transparent.",
  },
] as const;

const FAQ_ILLUSTRATION_DEFAULT = "/images/dt360-faq-section.png";
const FAQ_ILLUSTRATION_WEB_DEV = "/images/Service/web-design-dev-faq-illustration.png";

export type ServicesFaqSectionVariant = "default" | "webDesignDevelopment";

export type ServicesFaqSectionProps = {
  variant?: ServicesFaqSectionVariant;
};

export function ServicesFaqSection({ variant = "default" }: ServicesFaqSectionProps = {}) {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);
  const isWebDev = variant === "webDesignDevelopment";
  const illustrationSrc = isWebDev ? FAQ_ILLUSTRATION_WEB_DEV : FAQ_ILLUSTRATION_DEFAULT;

  return (
    <section className="relative isolate overflow-hidden bg-white px-5 pb-[84px] pt-8 md:px-10 md:pb-[96px] md:pt-[100px] xl:px-10 xl:pb-[120px] xl:pt-[110px]">
      <Image
        src="/images/dt360-faq-bg-service.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-8 xl:grid-cols-[0.95fr_1.1fr] xl:gap-10">
        <div
          className={cn(
            "flex justify-center xl:justify-start",
            serviceFaqIllustrationWrapperClassName,
            "xl:max-w-none",
          )}
        >
          {isWebDev ? (
            <ServiceSafeImage
              src={illustrationSrc}
              alt="FAQ illustration with code editor monitor and web development icons"
              width={640}
              height={640}
              className={serviceFaqIllustrationImageClassName}
              sizes="(max-width: 1023px) 100vw, 560px"
            />
          ) : (
            <Image
              src={FAQ_ILLUSTRATION_DEFAULT}
              alt="FAQ section illustration"
              width={609}
              height={739}
              className={serviceFaqIllustrationImageClassName}
              sizes="(max-width: 1023px) 100vw, 560px"
            />
          )}
        </div>

        <div>
          <h2 className="pb-10 text-center text-[clamp(2rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-[#101651] md:text-[64px] xl:text-left">
            Got Questions? <span className="text-[#ef2fa9]">Good</span>
          </h2>

          <div className="mt-6 space-y-4">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <article key={item.id} className="rounded-[16px]">
                  <button
                    type="button"
                    onClick={() => setOpenId((prev) => (prev === item.id ? "" : item.id))}
                    className={`group flex w-full items-center justify-between rounded-[16px] px-5 py-4 text-left transition duration-300 ease-out ${
                      isOpen
                        ? "bg-[#FFEDC0] text-[#1d2357]"
                        : "bg-[#7D8BF0] text-white hover:bg-[#FFEDC0] hover:text-[#1d2357]"
                    }`}
                    aria-expanded={isOpen}
                  >
                    <span className="pr-3 text-[24px] font-semibold leading-tight">{item.question}</span>
                    <span
                      className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#1d2357]" : "text-white group-hover:text-[#1d2357]"
                      }`}
                      aria-hidden
                    >
                      <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>

                  {isOpen ? (
                    <div className="px-5 pb-2 pt-3">
                      <p className="text-[18px] leading-relaxed text-[#24285e]">{item.answer}</p>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
