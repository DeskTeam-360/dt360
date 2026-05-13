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
    <div className="mt-24 space-y-3 sm:mt-28">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <article key={item.id} className="rounded-xl bg-transparent p-0">
            <button
              type="button"
              id={`${item.id}-trigger`}
              aria-expanded={isOpen}
              aria-controls={`${item.id}-panel`}
              className={cn(
                "flex w-full items-center justify-between gap-4 rounded-xl bg-white px-4 py-3 text-left text-[#11104C] shadow-sm transition hover:bg-zinc-50",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              )}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <b className="text-[24px] leading-tight">{item.question}</b>
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center transition-transform",
                  isOpen ? "rotate-180" : "rotate-0",
                )}
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
                <p className="type-rule-p mt-2 px-2 text-[#E8ECFF]">{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
