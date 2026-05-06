"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";

const faqs = [
  {
    question: "How does billing work for white-label clients?",
    answer:
      "You sell and invoice at your rate. DeskTeam360 bills you a predictable monthly seat model so margin stays clear and you can package services your way.",
  },
  {
    question: "Can we use our own project tools and brand?",
    answer:
      "Yes. We plug into your PM stack, email domain, and client-facing assets. Delivery happens under your processes with DeskTeam360 operating as your back-office team.",
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<string>(faqs[0].question);

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
      <Container className="relative z-10 max-w-[1440px] !px-10 lg:!px-20">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 2xl:gap-14">
          <div className="relative mx-auto w-full max-w-[620px]">
            <SafeImage
              src="/images/White Label - FAQ.png"
              alt="White label agency FAQ illustration"
              width={860}
              height={640}
              className="h-auto w-full"
            />
          </div>
          <div>
            <h2 className="type-rule-h2 leading-tight text-[#11114d]">
              Got Questions? <span className="text-[#e62a98]">Good</span>
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
                      <span className="type-rule-h5 pr-3 leading-tight">{item.question}</span>
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
