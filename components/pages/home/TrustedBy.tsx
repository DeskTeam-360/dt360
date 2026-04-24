import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { trustedByContent, trustedByLogos } from "@/data/home";

export function TrustedBy() {
  const { headlineLine1, headlineHighlight, headlineLine2After } = trustedByContent;

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="trusted-by-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_0%,#e6edf5_50%,#f3f4f6_100%)]"
        aria-hidden
      />
      <Container className="relative max-w-7xl">
        <h2
          id="trusted-by-heading"
          className="mx-auto max-w-4xl text-center text-lg font-medium leading-snug text-zinc-800 sm:text-xl sm:leading-snug"
        >
          <span className="block">{headlineLine1}</span>
          <span className="mt-2 block text-zinc-800">
            <span className="font-semibold text-[#3b82f6]">{headlineHighlight}</span>
            {headlineLine2After}
          </span>
        </h2>

        <ul
          className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-10 sm:mt-14 md:justify-between lg:gap-x-12"
          aria-label="Client logos"
        >
          {trustedByLogos.map((logo) => (
            <li key={logo.id} className="flex shrink-0 items-center justify-center">
              <Image
                src={logo.imageSrc}
                alt={logo.alt}
                width={220}
                height={56}
                className="h-10 w-auto max-w-[11rem] object-contain opacity-90 sm:h-12 sm:max-w-[13rem]"
                sizes="(max-width: 768px) 140px, 220px"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
