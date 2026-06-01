"use client";

import { TestimonialCarouselHomeStyle } from "@/components/shared/TestimonialCarouselHomeStyle";
import type { SocialProofTestimonial } from "@/data/home";

type Props = {
  items: SocialProofTestimonial[];
};

/** Keep WP/server order — random shuffle here caused SSR/client hydration mismatch. */
export function SocialProofTestimonialCarousel({ items }: Props) {
  return <TestimonialCarouselHomeStyle items={items} />;
}
