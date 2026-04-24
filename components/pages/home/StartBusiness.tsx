import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { startBusinessContent } from "@/data/home";

export function StartBusiness() {
  const {
    headlineBefore,
    headlineHighlight,
    headlineAfter,
    subheading,
    illustrationSrc,
    illustrationAlt,
  } = startBusinessContent;

  return (
    <section
      id="start-business"
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="start-business-heading"
    >
      <Container className="max-w-7xl">
        <h2
          id="start-business-heading"
          className="mx-auto max-w-4xl text-center text-3xl font-bold leading-tight tracking-tight text-[#0f1030] sm:text-4xl sm:leading-[1.12] lg:text-[2.65rem] lg:leading-[1.08]"
        >
          {headlineBefore}
          <span className="text-[#e4277a]">{headlineHighlight}</span>
          {headlineAfter}
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-pretty text-center text-base leading-relaxed text-zinc-700 sm:mt-8 sm:text-lg sm:leading-relaxed">
          {subheading}
        </p>

        {/* Gambar lebar: fokus tengah, tepi kiri/kanan terpotong (abaikan blob samping) */}
        <div className="relative mx-auto mt-10 w-full max-w-5xl sm:mt-14 lg:max-w-6xl">
          <div className="relative aspect-[5/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[2/1]">
            <Image
              src={illustrationSrc}
              alt={illustrationAlt}
              fill
              className="object-cover object-[50%_45%] sm:object-[50%_42%]"
              sizes="(max-width: 1024px) 100vw, 1152px"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
