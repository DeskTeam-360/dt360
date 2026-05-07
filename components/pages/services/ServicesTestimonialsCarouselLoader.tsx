import { getServicesTestimonials } from "@/lib/servicesTestimonials";
import { ServicesTestimonialsCarousel } from "@/components/pages/services/ServicesTestimonialsCarousel";

/** Server Component: mengambil testimonial dari API (fallback statis di lib) lalu merender carousel client. */
export async function ServicesTestimonialsCarouselLoader() {
  const items = await getServicesTestimonials();
  return <ServicesTestimonialsCarousel items={items} />;
}
