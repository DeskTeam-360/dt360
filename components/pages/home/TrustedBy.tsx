import Image from "next/image";
import { Container } from "@/components/shared/Container";
import type { TrustedByLogo } from "@/data/home";
import { trustedByContent, trustedByLogos } from "@/data/home";
import { cn } from "@/lib/utils";

function LogoRow({
  logos,
  ariaHidden,
  dupIndex,
}: {
  logos: TrustedByLogo[];
  ariaHidden?: boolean;
  /** Segmen salinan (untuk key unik); undefined = segmen pertama. */
  dupIndex?: number;
}) {
  return (
    <ul
      className={cn(
        "flex shrink-0 list-none items-center gap-x-14 gap-y-8 px-8 sm:gap-x-16 sm:px-12 lg:gap-x-20",
      )}
      aria-hidden={ariaHidden ? true : undefined}
      aria-label={ariaHidden ? undefined : "Client logos"}
    >
      {logos.map((logo) => (
        <li
          key={dupIndex != null ? `${logo.id}-seg${dupIndex}` : logo.id}
          className="flex shrink-0 items-center justify-center"
        >
          <div className="origin-center transition-transform duration-300 ease-out hover:scale-[1.3] motion-reduce:transition-none motion-reduce:hover:scale-100">
            <Image
              src={logo.imageSrc}
              alt={ariaHidden ? "" : logo.alt}
              width={220}
              height={56}
              className="h-10 w-auto max-w-[11rem] object-contain opacity-90 sm:h-12 sm:max-w-[13rem]"
              sizes="(max-width: 768px) 140px, 220px"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

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
      </Container>

      {/* Marquee + fade: lebar viewport penuh (keluar dari max-w container). */}
      <div
        className="relative left-1/2 mt-12 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden py-6 sm:mt-14 sm:py-8"
        role="presentation"
        aria-label="Client logos marquee"
      >
        {/* Tepi: satu warna dasar area logo (~#f4f7f9) → transparan (tanpa putih #fff agar tidak “ngeblok”). */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-28 lg:w-40"
          style={{
            background:
              "linear-gradient(to right, rgb(244 247 249) 0%, rgba(244,247,249,0.92) 22%, rgba(244,247,249,0.55) 55%, rgba(244,247,249,0.12) 88%, rgba(244,247,249,0) 100%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 sm:w-28 lg:w-40"
          style={{
            background:
              "linear-gradient(to left, rgb(244 247 249) 0%, rgba(244,247,249,0.92) 22%, rgba(244,247,249,0.55) 55%, rgba(244,247,249,0.12) 88%, rgba(244,247,249,0) 100%)",
          }}
          aria-hidden
        />
        <div className="flex w-max shrink-0 trusted-by-marquee-track">
          <LogoRow logos={trustedByLogos} />
          <LogoRow logos={trustedByLogos} ariaHidden dupIndex={1} />
          <LogoRow logos={trustedByLogos} ariaHidden dupIndex={2} />
          <LogoRow logos={trustedByLogos} ariaHidden dupIndex={3} />
          <LogoRow logos={trustedByLogos} ariaHidden dupIndex={4} />
          <LogoRow logos={trustedByLogos} ariaHidden dupIndex={5} />
        </div>
      </div>
    </section>
  );
}
