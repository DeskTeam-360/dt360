import { ServicesTestimonialsCarousel } from "@/components/pages/services/ServicesTestimonialsCarousel";
import type { ServicesTestimonial } from "@/data/servicesPage";

/** Reusable testimonial item shape — pages can import this type to type their own arrays. */
export type Testimonial = ServicesTestimonial;

type TestimonialsSectionProps = {
  /** First line of the heading, rendered in the pink accent color. */
  headingAccent: string;
  /** Second line of the heading, rendered in the default heading color. */
  headingTrailing: string;
  /** Carousel items shown below the heading. */
  items: Testimonial[];
  /** Optional id used for `aria-labelledby`. Provide a unique value if multiple instances appear on the same page. */
  headingId?: string;
  /** Optional extra classes appended to the outer `<section>`. */
  className?: string;
};

/**
 * Section template: pink radial backdrop + two-line accent heading + testimonial carousel.
 * Drop into any page and pass `items` (array) plus the heading text to customize.
 */
export function TestimonialsSection({
  headingAccent,
  headingTrailing,
  items,
  headingId = "testimonials-heading",
  className,
}: TestimonialsSectionProps) {
  return (
    <section
      className={
        "relative z-10 overflow-x-hidden bg-white pb-[80px] pt-[200px] md:pb-[90px] md:pt-[210px] lg:pb-[100px] lg:pt-[220px]" +
        (className ? ` ${className}` : "")
      }
      aria-labelledby={headingId}
    >
      <div
        className="pointer-events-none absolute left-[-240px] top-[-220px] aspect-square h-[90%] rounded-full bg-[radial-gradient(circle,rgba(170,239,255,0.85)_0%,rgba(170,239,255,0.35)_45%,rgba(170,239,255,0)_75%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1440px] px-5 text-center md:px-10 lg:px-10">
        <h2 id={headingId} className="leading-tight tracking-tight text-[#101651]">
          <span className="text-[#ef2fa9]">{headingAccent}</span>
          <br />
          {headingTrailing}
        </h2>
      </div>
      <ServicesTestimonialsCarousel items={items} />
    </section>
  );
}
