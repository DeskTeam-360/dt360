"use client";

import { useMemo } from "react";
import { TestimonialCarouselHomeStyle } from "@/components/shared/TestimonialCarouselHomeStyle";
import type { SocialProofTestimonial } from "@/data/home";

type Props = {
  items: SocialProofTestimonial[];
};

function shuffleTestimonials(items: SocialProofTestimonial[]): SocialProofTestimonial[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function SocialProofTestimonialCarousel({ items }: Props) {
  const displayItems = useMemo(() => shuffleTestimonials(items), [items]);

  return <TestimonialCarouselHomeStyle items={displayItems} />;
}
