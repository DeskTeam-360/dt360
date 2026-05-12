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
        className="pointer-events-none absolute left-[calc(var(--spacing)*-50)] top-[calc(var(--spacing)*-20)] hidden h-auto w-[10vw] opacity-60 sm:block lg:w-[20vw]"
      />
      <SafeImage
        src="/images/Service - Testimonial Graphic Radial Red.png"
        alt=""
        width={600}
        height={600}
        className="pointer-events-none absolute right-[-8%] top-[-20%] hidden h-auto w-[20vw] opacity-50 sm:block lg:w-[30vw]"
      />
      <SafeImage
        src={`/images/${encodeURIComponent("bubble service testimonial.png")}`}
        alt=""
        width={140}
        height={220}
        className="pointer-events-none absolute right-[0] top-[10%] hidden h-auto w-[15%] opacity-100 sm:block"
      />
      <SafeImage
        src="/images/Service - Testimonial Graphic Oval Purple.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute left-[-10px] top-[5%] z-[1] hidden h-auto w-[45%] opacity-85 sm:block"
      />
      <Container className="relative z-10 max-w-[1440px] !px-10 lg:!px-20">
        <h2 className="type-rule-h2 text-center font-bold tracking-wide text-[#1B1464]">
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
