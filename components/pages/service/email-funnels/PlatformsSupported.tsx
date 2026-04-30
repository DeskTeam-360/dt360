import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";

const platforms = [
  { src: "/images/Email - Platform HighLevel.png", alt: "HighLevel" },
  { src: "/images/Email - Platform HubSpot.png", alt: "HubSpot" },
  { src: "/images/Email - Platform KIT.png", alt: "KIT" },
  { src: "/images/Email - Platform ClickFunnels.png", alt: "ClickFunnels" },
  { src: "/images/Email - Platform mailchimp.png", alt: "Mailchimp" },
  { src: "/images/Email - Platform ActiveCampaign.png", alt: "ActiveCampaign" },
  { src: "/images/Email - Platform klaviyo.png", alt: "Klaviyo" },
  { src: "/images/Email - Platform Keap.png", alt: "Keap" },
  { src: "/images/Email - Platform Kartra.png", alt: "Kartra" },
];

const logoClassName =
  "h-[52px] w-auto object-contain sm:h-[60px] lg:h-[68px]";

export function PlatformsSupported() {
  const desktopFirstRow = platforms.slice(0, 5);
  const desktopSecondRow = platforms.slice(5);

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

        {/* Mobile + tablet: 1 per row → md: 3 per row */}
        <div className="mx-auto mt-16 grid max-w-[1100px] grid-cols-1 items-center justify-items-center gap-x-10 gap-y-8 md:grid-cols-3 lg:mt-20 lg:hidden">
          {platforms.map((platform) => (
            <SafeImage
              key={platform.alt}
              src={platform.src}
              alt={platform.alt}
              width={720}
              height={280}
              className={logoClassName}
            />
          ))}
        </div>

        {/* Desktop (reference): row of 5, then centered row of 4 */}
        <div className="mx-auto mt-16 hidden max-w-[1100px] flex-col items-center gap-10 lg:mt-20 lg:flex">
          <div className="grid w-full grid-cols-5 items-center justify-items-center gap-x-6 gap-y-8 lg:gap-x-10">
            {desktopFirstRow.map((platform) => (
              <SafeImage
                key={platform.alt}
                src={platform.src}
                alt={platform.alt}
                width={720}
                height={280}
                className={logoClassName}
              />
            ))}
          </div>
          <div className="flex w-full flex-wrap justify-center gap-x-8 gap-y-8 lg:gap-x-12">
            {desktopSecondRow.map((platform) => (
              <SafeImage
                key={platform.alt}
                src={platform.src}
                alt={platform.alt}
                width={720}
                height={280}
                className={logoClassName}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
