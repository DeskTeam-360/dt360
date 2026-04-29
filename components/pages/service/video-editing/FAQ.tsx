"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";

const faqs = [
  {
    question: "What format should I send raw video files in?",
    answer:
      "We accept MP4, MOV, AVI, and most common formats. You can send via Google Drive, Dropbox, WeTransfer, or our task system.",
  },
  {
    question: "How long does video editing take?",
    answer:
      "Turnaround depends on length and complexity. Simple cuts are often next business day; longer edits are scheduled with your editor and tracked in your workspace.",
  },
  {
    question: "Can you match our existing brand style?",
    answer:
      "Yes. Share brand guidelines, reference videos, or past edits and we will match pacing, typography, lower-thirds, and on-screen style.",
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
        width={200}
        height={200}
        className="pointer-events-none absolute z-[2] -top-12 -left-[0.375rem] h-auto w-auto max-w-[min(340px,88vw)] sm:-left-3 sm:-top-14 sm:max-w-[min(360px,82vw)] md:-left-10 md:max-w-[min(380px,76vw)] lg:-left-[3.5rem] lg:-top-16 lg:max-w-[280px]"
      />
      <SafeImage
        src="/images/Service - Graphic Design.png"
        alt=""
        width={200}
        height={200}
        className="pointer-events-none absolute z-[2] -top-12 -right-[0.375rem] h-auto w-auto max-w-[min(340px,88vw)] sm:-right-3 sm:-top-14 sm:max-w-[min(360px,82vw)] md:-right-10 md:max-w-[min(380px,76vw)] lg:-right-[3.5rem] lg:-top-16 lg:max-w-[280px]"
      />
      <Container className="relative z-10 max-w-[1300px] !px-10 lg:!px-20">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 2xl:gap-14">
          <div className="relative mx-auto w-full max-w-[620px]">
            <SafeImage
              src="/images/Service - Video FAQ.png"
              alt="Video editing FAQ illustration"
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
