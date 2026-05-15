"use client";

import { TestimonialCarouselHomeStyle } from "@/components/shared/TestimonialCarouselHomeStyle";
import type { SocialProofTestimonial } from "@/data/home";

type Props = {
  items: SocialProofTestimonial[];
};

export function SocialProofTestimonialCarousel({ items }: Props) {
  return <TestimonialCarouselHomeStyle items={items} />;
}
