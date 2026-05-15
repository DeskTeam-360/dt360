"use client";

import { TestimonialCarouselHomeStyle } from "@/components/shared/TestimonialCarouselHomeStyle";
import type { ServicesTestimonial } from "@/data/servicesPage";

type Props = {
  items: ServicesTestimonial[];
};

export function ServicesTestimonialsCarousel({ items }: Props) {
  return <TestimonialCarouselHomeStyle items={items} />;
}
