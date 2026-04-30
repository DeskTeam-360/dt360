import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";

const platforms = [
  { src: "/images/Social - Platform FB.png", alt: "Facebook" },
  { src: "/images/Social - Platform IG.png", alt: "Instagram" },
  { src: "/images/Social - Platform TikTok.png", alt: "TikTok" },
  { src: "/images/Social - Platform X.png", alt: "X" },
  { src: "/images/Social - Platform LinkedIn.png", alt: "LinkedIn" },
  { src: "/images/Social - Platform YouTube.png", alt: "YouTube" },
];

export function PlatformsSupported() {
  return (
    <section className="relative overflow-hidden bg-[#fbf8ff] py-16 sm:py-20 lg:py-24">
      <SafeImage
        src="/images/Service - Testimonial Graphic BG Left.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute left-[calc(var(--spacing)*-50)] top-[calc(var(--spacing)*-18)] hidden h-auto w-[280px] opacity-80 sm:block lg:w-[360px]"
      />
      <SafeImage
        src="/images/Service - Testimonial Graphic Radial Red.png"
        alt=""
        width={500}
        height={500}
        className="pointer-events-none absolute -right-20 top-[-18%] hidden h-auto w-[280px] opacity-70 sm:block lg:w-[360px]"
      />
      <SafeImage
        src="/images/Service - Testimonial Graphic BG Right.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute right-[calc(var(--spacing)*-70)] top-[-35%] hidden h-auto w-[42%] opacity-80 sm:block"
      />
      <SafeImage
        src="/images/Service - Testimonial Graphic Oval Purple.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute left-[-30px] top-[8%] z-[1] hidden h-auto w-[40%] opacity-80 sm:block"
      />
      <Container className="relative z-10 max-w-[1240px] !px-10 lg:!px-20">
        <h2 className="text-center text-3xl font-extrabold tracking-wide text-[#11114d] sm:text-4xl lg:text-[56px]">
          PLATFORMS SUPPORTED
        </h2>
        <div className="mx-auto mt-16 grid max-w-[900px] grid-cols-3 items-center justify-items-center gap-6 sm:gap-8 lg:mt-20 lg:grid-cols-6 lg:gap-10">
          {platforms.map((platform) => (
            <SafeImage
              key={platform.alt}
              src={platform.src}
              alt={platform.alt}
              width={78}
              height={78}
              className="h-auto w-[44px] object-contain sm:w-[52px] lg:w-[58px]"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
