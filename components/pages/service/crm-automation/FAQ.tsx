"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";

const faqs = [
  {
    question: "What CRM platforms do you support?",
    answer:
      "GoHighLevel, HubSpot, Salesforce, Keap, ActiveCampaign, Zoho, Monday.com, and more. If it has an API, we can probably work with it.",
  },
  {
    question: "Do you handle the automations or just the setup?",
    answer:
      "We configure end-to-end: triggers, routing, tags, integrations, QA, and refinement so automations stay reliable—not a one-off build you have to troubleshoot alone.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section className="relative overflow-visible py-20 sm:py-24 lg:py-28 2xl:py-36">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <SafeImage
          src="/images/Service - FAQ BG.png"
          alt=""
          width={1600}
          height={560}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
        />
      </div>
      <SafeImage
        src="/images/Service - Graphic Code.png"
        alt=""
        width={512}
        height={512}
        className="pointer-events-none absolute z-[2] -top-12 left-[calc(var(--spacing)_*_0)] h-auto w-auto max-w-[min(100px,26vw)] sm:-left-10 sm:-top-14 sm:max-w-[min(118px,28vw)] md:-left-[1rem] md:w-[16%] md:max-w-[220px] md:min-w-[120px] lg:-left-[1rem] lg:-top-16 lg:w-[10%] lg:max-w-[190px] lg:min-w-[110px]"
      />
      <SafeImage
        src="/images/Service - Graphic Design.png"
        alt=""
        width={512}
        height={512}
        className="pointer-events-none absolute z-[2] -top-12 right-[calc(var(--spacing)_*_0)] h-auto w-auto max-w-[min(100px,26vw)] sm:-right-10 sm:-top-14 sm:max-w-[min(118px,28vw)] md:right-0 md:w-[16%] md:max-w-[220px] md:min-w-[120px] lg:right-0 lg:-top-16 lg:w-[10%] lg:max-w-[190px] lg:min-w-[110px]"
      />
      <Container className="relative z-10 max-w-[1300px] !px-10 lg:!px-20">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 2xl:gap-14">
          <div className="relative mx-auto w-full max-w-[620px]">
            <SafeImage
              src="/images/CRM - FAQ.png"
              alt="CRM and automation FAQ illustration"
              width={860}
              height={640}
              className="h-auto w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-[#11114d] sm:text-4xl lg:text-5xl 2xl:text-6xl">
              Got Questions? <span className="text-[#e62a98]">Good</span>
            </h2>
            <div className="mt-5 space-y-3 sm:mt-6">
              {faqs.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={item.question} className="rounded-xl bg-transparent p-0">
                    <button
                      type="button"
                      onClick={() => toggleItem(index)}
                      className={`flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3 text-left font-semibold ${
                        isOpen ? "bg-[#FFEDC0] text-[#1E1E1E]" : "bg-[#7D8BF0] text-white"
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span className="text-[24px] leading-tight">{item.question}</span>
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center transition-transform ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        aria-hidden
                      >
                        <svg viewBox="0 0 24 24" className="h-[24px] w-[24px]" fill="none">
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
                      <p className="mt-2 px-2 text-[18px] leading-relaxed text-[#11114d]">{item.answer}</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
