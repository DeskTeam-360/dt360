import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { contactHero } from "@/data/contact";

export function ContactHero() {
  const { title, heroImageSrc, heroImageAlt } = contactHero;

  return (
    <section
      className="relative overflow-x-hidden bg-[#11104C] pb-0 pt-28 text-white sm:pt-32 lg:pt-[120px]"
      aria-labelledby="contact-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_0%_0%,rgba(0,200,244,0.25)_0%,transparent_55%)]"
        aria-hidden
      />

      <Container className="relative z-10 max-w-[1440px] px-6 lg:px-20">
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="relative z-20 min-w-0 pb-6 lg:pb-10">
            <h1
              id="contact-hero-heading"
              className="font-[var(--font-poppins)] text-[56px] font-bold leading-[1.1] text-balance text-white lg:text-[76px]"
            >
              {title}
            </h1>
          </div>

          <div className="relative z-20 min-w-0 w-full lg:mx-0 lg:ml-auto">
            <SafeImage
              src={heroImageSrc}
              alt={heroImageAlt}
              width={540}
              height={520}
              priority
              className="h-auto w-full max-w-full object-contain"
              sizes="(max-width: 1024px) 50vw, 540px"
            />
          </div>
        </div>
      </Container>

      <div className="relative z-0 -mt-1 w-full" aria-hidden>
        <svg
          className="block h-16 w-full sm:h-20 lg:h-28 xl:h-32"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="#ffffff" d="M0,88 Q720,4 1440,88 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
