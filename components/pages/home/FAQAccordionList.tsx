"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/home";
import { cn } from "@/lib/utils";

type Props = {
  items: FaqItem[];
};

export function FAQAccordionList({ items }: Props) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="mt-7 space-y-4 sm:mt-8">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <article key={item.id}>
            <button
              type="button"
              id={`${item.id}-trigger`}
              aria-expanded={isOpen}
              aria-controls={`${item.id}-panel`}
              className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-white px-6 py-4 text-left text-[#11104C] shadow-sm transition hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span className="text-base font-semibold sm:text-xl">{item.question}</span>
              <span
                className={cn(
                  "shrink-0 text-[#11104C] transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
                aria-hidden
              >
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div
              id={`${item.id}-panel`}
              role="region"
              aria-labelledby={`${item.id}-trigger`}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-1 pt-4 text-lg leading-relaxed text-white/90">{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
