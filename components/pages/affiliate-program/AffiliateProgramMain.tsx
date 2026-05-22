import { Container } from "@/components/shared/Container";
import { HeroCtaLink } from "@/components/shared/HeroCtaLink";
import { SafeImage } from "@/components/shared/SafeImage";
import {
  affiliateAssets,
  affiliateProgramEasyAccess,
  affiliateProgramHowItWorks,
  affiliateProgramPartner,
} from "@/data/affiliateProgram";
import { cn } from "@/lib/utils";

const CARD_BG = "bg-[rgba(255,255,255,0.6)]";

function AffiliateFeatureCard({
  title,
  body,
  imageSrc,
  imageAlt,
  accentSide,
  imageSide,
}: {
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  accentSide: "left" | "right";
  imageSide: "left" | "right";
}) {
  const accentClass =
    accentSide === "left"
      ? "left-0 rounded-r-[15px] bg-[#e3058d]"
      : "right-0 rounded-l-[15px] bg-[#7547c5]";

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[24px] shadow-[0_8px_40px_rgba(17,16,76,0.08)]",
        CARD_BG,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute top-1/2 z-10 h-[215px] w-[39px] -translate-y-1/2",
          accentClass,
        )}
        aria-hidden
      />
      <div className="relative z-20 grid items-center gap-8 py-10 [padding-inline:calc(var(--spacing)*20)] lg:grid-cols-2 lg:gap-12 lg:py-12">
        <div
          className={cn(
            "flex justify-center",
            imageSide === "left" ? "order-1 lg:justify-start" : "order-2 lg:order-2 lg:justify-end",
          )}
        >
          <SafeImage
            src={imageSrc}
            alt={imageAlt}
            width={420}
            height={320}
            className="h-auto w-full max-w-[360px] object-contain md:max-w-full lg:max-w-[400px]"
            sizes="(max-width: 1024px) 85vw, 400px"
          />
        </div>
        <div className={cn(imageSide === "right" ? "order-1 lg:order-1" : "order-2 lg:order-2")}>
          <h3 className="type-rule-h3 text-[#11104C]">{title}</h3>
          <p className="type-rule-p mt-4 text-pretty text-[#2a2f61]">{body}</p>
        </div>
      </div>
    </article>
  );
}

export function AffiliateProgramMain() {
  const { eyebrow, title, body, ctaLabel, ctaHref, coinImageSrc, coinImageAlt } =
    affiliateProgramPartner;

  return (
    <section className="relative overflow-x-hidden bg-white pb-[5em] pt-0" aria-label="Affiliate program details">
      {/* Segitiga terbalik (#02063B) — kanan */}
      <div className="relative z-20 mb-[5em] w-full">
        <div
          className="relative right-[32%] ml-auto block h-[calc(var(--spacing)*15)] w-[195px] bg-[#02063B] [clip-path:polygon(0_0,100%_0,50%_100%)] md:right-[35%] md:h-[calc(var(--spacing)*25)] md:w-[310px] lg:right-[18%]"
          aria-hidden
        />
      </div>

      {/* Radial pink — right edge, half visible */}
      <div
        className="pointer-events-none absolute top-[15em] right-0 z-0 h-[1062px] w-[1062px] max-w-none translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, #e3058d 0%, #e3058d 0%, rgba(227, 5, 141, 0) 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-[1062px] w-[1062px] max-w-none -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, #00C8F4 0%, #00C8F4 0%, rgba(1, 211, 252, 0) 70%)",
        }}
        aria-hidden
      />

      {/* Become a partner — yellow panel flush to viewport left */}
      <div className="relative z-10 min-h-[520px] pt-4 md:min-h-0 lg:pt-8">
        {/* Ornamen kanan — di bawah segitiga, sejajar Become a Partner */}
        <SafeImage
          src={affiliateAssets.ornament}
          alt=""
          width={360}
          height={480}
          className="pointer-events-none absolute -top-[15em] -right-[10em] z-[15] h-auto w-[min(320px,32vw)] max-w-[360px] object-contain"
          sizes="(max-width: 1024px) 40vw, 360px"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-0 left-0 z-0 h-[30%] w-[20%] translate-y-0 rounded-r-[35px] bg-[#FFEDC0] md:h-[425px] md:w-[min(88vw,327px)] lg:top-1/2 lg:h-[425px] lg:-translate-y-1/2 lg:w-[25%] lg:max-w-none min-[2560px]:w-[33%]"
          aria-hidden
        />
        <Container className="max-w-[1440px] px-6 lg:px-20">
          <div className="grid items-center gap-10 md:justify-items-center lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:justify-items-stretch lg:gap-16">
            <div className="relative z-10 min-h-[320px] w-full sm:min-h-[380px] lg:min-h-[425px]">
              <div className="flex w-full justify-center lg:justify-start lg:pl-6">
                <SafeImage
                  src={coinImageSrc}
                  alt={coinImageAlt}
                  width={420}
                  height={425}
                  className="h-auto w-full max-w-[320px] object-contain sm:max-w-[380px] lg:max-w-[420px]"
                  sizes="(max-width: 1024px) 80vw, 420px"
                />
              </div>
            </div>

            <div className="lg:py-6">
              <p className="type-rule-h3 uppercase tracking-wide text-[#E3058D]">{eyebrow}</p>
              <h2 className="type-rule-h4 mt-4 text-balance text-[#11104C]">{title}</h2>
              <p className="type-rule-p mt-6 text-pretty text-[#2a2f61]">{body}</p>
              <div className="mt-8">
                <HeroCtaLink href={ctaHref} variant="secondary" className="sm:min-w-[220px]">
                  {ctaLabel}
                </HeroCtaLink>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="relative z-10 mt-14 max-w-[1440px] px-6 lg:mt-20 lg:px-20">
        <div className="space-y-8 lg:space-y-10">
          <AffiliateFeatureCard
            title={affiliateProgramHowItWorks.title}
            body={affiliateProgramHowItWorks.body}
            imageSrc={affiliateProgramHowItWorks.imageSrc}
            imageAlt={affiliateProgramHowItWorks.imageAlt}
            accentSide="left"
            imageSide="right"
          />
          <div className="mb-[20px]">
            <AffiliateFeatureCard
              title={affiliateProgramEasyAccess.title}
              body={affiliateProgramEasyAccess.body}
              imageSrc={affiliateProgramEasyAccess.imageSrc}
              imageAlt={affiliateProgramEasyAccess.imageAlt}
              accentSide="right"
              imageSide="left"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
