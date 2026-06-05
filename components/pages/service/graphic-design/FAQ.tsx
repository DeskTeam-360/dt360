"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { ServiceFaqIllustration } from "@/components/pages/service/shared/ServiceFaqIllustration";
import { ServiceSafeImage } from "@/components/pages/service/shared/ServiceSafeImage";

const faqs = [
  {
    question: "What design software do you use?",
    answer:
      "Adobe Photoshop, Illustrator, InDesign, Figma, Canva Pro, After Effects for motion graphics. You can of course file - always.",
  },
  {
    question: "How do I submit design requests?",
    answer:
      "You can submit requests through your shared workspace, and we prioritize based on urgency and campaign timelines.",
  },
  {
    question: "Can I ask for revisions?",
    answer:
      "Yes. Revisions are included in your monthly plan so you can iterate until each design matches your brand goals.",
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<string>(faqs[0].question);

  return (
    <section className="relative overflow-visible max-md:overflow-x-visible pb-20 pt-8 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28 2xl:pb-36 2xl:pt-36">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <ServiceSafeImage
          src="/images/Service - FAQ BG.png"
          alt=""
          width={1600}
          height={560}
          sizes="100vw"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
        />
      </div>
      
      <Container className="relative z-10 max-w-[1440px] !px-10 lg:!px-20">
      <ServiceSafeImage
        src="/images/Service - Graphic Code.png"
        alt=""
        width={512}
        height={512}
        className="pointer-events-none absolute z-[2] -top-45 left-[calc(var(--spacing)_*_0)] h-auto w-auto max-w-[min(100px,26vw)] sm:-left-10 sm:-top-50 sm:max-w-[min(118px,28vw)] md:-left-[1rem] md:w-[16%] md:max-w-[220px] md:min-w-[120px] lg:-left-[1rem] lg:-top-55 lg:w-[10%] lg:max-w-[190px] lg:min-w-[110px]"
      />
      <ServiceSafeImage
        src="/images/Service - Graphic Design.png"
        alt=""
        width={512}
        height={512}
        className="pointer-events-none absolute z-[2] -top-45 right-[calc(var(--spacing)_*_0)] h-auto w-auto max-w-[min(100px,26vw)] sm:-right-10 sm:-top-50 sm:max-w-[min(118px,28vw)] md:right-0 md:w-[16%] md:max-w-[220px] md:min-w-[120px] lg:right-0 lg:-top-55 lg:w-[10%] lg:max-w-[190px] lg:min-w-[110px]"
      />
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 2xl:gap-14">
          <ServiceFaqIllustration
            src="/images/Service - Graphic FAQ.png"
            alt="Graphic design FAQ illustration"
          />
          <div>
            <h2 className="type-rule-h2 leading-tight text-[#11104C]">
              Got Questions? <span className="text-[#E3058D]">Good</span>
            </h2>
            <div className="mt-6 space-y-4">
              {faqs.map((item) => {
                const isOpen = openId === item.question;

                return (
                  <article key={item.question} className="rounded-[16px]">
                    <button
                      type="button"
                      onClick={() => setOpenId((prev) => (prev === item.question ? "" : item.question))}
                      className={`group flex w-full items-center justify-between rounded-[16px] px-5 py-4 text-left transition duration-300 ease-out ${
                        isOpen
                          ? "bg-[#FFEDC0] text-[#1d2357]"
                          : "bg-[#7D8BF0] text-white hover:bg-[#FFEDC0] hover:text-[#1d2357]"
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span className="type-rule-h5 pr-3 font-semibold leading-tight">{item.question}</span>
                      <span
                        className={`shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#1d2357]" : "text-white group-hover:text-[#1d2357]"
                        }`}
                        aria-hidden
                      >
                        <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    {isOpen ? (
                      <div className="px-5 pb-2 pt-3">
                        <p className="text-[#24285e]">{item.answer}</p>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

