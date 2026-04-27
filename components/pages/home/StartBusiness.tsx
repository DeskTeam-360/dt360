import Image from "next/image";
import Script from "next/script";
import { Container } from "@/components/shared/Container";
import { startBusinessContent } from "@/data/home";

const DOTLOTTIE_WC_SCRIPT =
  "https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.10/dist/dotlottie-wc.js";
const START_BUSINESS_LOTTIE_SRC =
  "https://lottie.host/0891252a-8126-4075-a997-0e28d864c2a3/2NhMkeS4xT.lottie";

export function StartBusiness() {
  const {
    headlineBefore,
    headlineHighlight,
    headlineAfter,
    subheading,
    illustrationAlt,
    decorTopLeftSrc,
    decorTopRightSrc,
  } = startBusinessContent;

  return (
    <section
      id="start-business"
      className="overflow-x-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="start-business-heading"
    >
      <Container className="max-w-7xl">
        {/* Tinggi = hanya judul + subjudul → dekor tidak turun ke ilustrasi */}
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 left-1/2 z-0 w-screen -translate-x-1/2 overflow-hidden"
            aria-hidden
          >
            <div className="absolute left-0 top-0 flex h-full w-[min(26vw,180px)] max-w-[180px] items-start sm:w-[min(24vw,200px)] sm:max-w-[200px] lg:max-w-[220px]">
              <Image
                src={decorTopLeftSrc}
                alt=""
                width={220}
                height={220}
                className="max-h-full w-full object-contain object-left-top opacity-90"
                sizes="(max-width: 640px) 26vw, 220px"
              />
            </div>
            <div className="absolute right-0 top-1 flex h-full w-[min(24vw,170px)] max-w-[170px] items-start justify-end sm:top-2 sm:w-[min(22vw,190px)] sm:max-w-[190px] lg:max-w-[210px]">
              <Image
                src={decorTopRightSrc}
                alt=""
                width={210}
                height={210}
                className="max-h-full w-full object-contain object-right-top opacity-90"
                sizes="(max-width: 640px) 24vw, 210px"
              />
            </div>
          </div>

          <h2
            id="start-business-heading"
            className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold leading-tight tracking-tight text-[#0f1030] sm:text-4xl sm:leading-[1.12] lg:text-[2.65rem] lg:leading-[1.08]"
          >
            {headlineBefore}
            <span className="text-[#e4277a]">{headlineHighlight}</span>
            {headlineAfter}
          </h2>
          <p className="relative z-10 mx-auto mt-6 max-w-3xl text-pretty text-center text-base leading-relaxed text-zinc-700 sm:mt-8 sm:text-lg sm:leading-relaxed">
            {subheading}
          </p>
        </div>

        <Script
          id="dotlottie-wc-start-business"
          src={DOTLOTTIE_WC_SCRIPT}
          type="module"
          strategy="afterInteractive"
        />

        <div className="relative z-10 mx-auto mt-10 w-full max-w-5xl sm:mt-14 lg:max-w-6xl">
          <div
            className="relative w-full"
            role="img"
            aria-label={illustrationAlt}
          >
            <dotlottie-wc
              src={START_BUSINESS_LOTTIE_SRC}
              className="block h-auto w-full"
              style={{ width: "100%", height: "auto" }}
              autoplay
              loop
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
