import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { startBusinessContent } from "@/data/home";
const START_BUSINESS_VIDEO_SRC =
  "/images/home-startbusiness-DigitalCreativeProfessionalsWideWhite-HD.webm";

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
        {/* Height = heading + subheading only, so decor does not drop into the illustration */}
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

        <div className="relative z-10 mx-auto mt-10 w-full max-w-5xl sm:mt-14 lg:max-w-6xl">
          <video
            className="block h-auto w-full"
            aria-label={illustrationAlt}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={START_BUSINESS_VIDEO_SRC} type="video/webm" />
          </video>
        </div>
      </Container>
    </section>
  );
}
