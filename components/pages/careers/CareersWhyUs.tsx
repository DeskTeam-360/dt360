import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { careersWhyUs } from "@/data/careers";

export function CareersWhyUs() {
  const d = careersWhyUs;

  return (
    <section className="relative overflow-hidden bg-[#02063B] py-12 text-white sm:py-16 lg:py-24">
      <SafeImage
        src={d.backgroundImage}
        alt=""
        fill
        quality={100}
        unoptimized
        sizes="100vw"
        className="h-full w-full object-cover object-center lg:object-fill"
        aria-hidden
      />

      <Container className="relative z-10 max-w-[1440px] !px-4 sm:!px-6 lg:!px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="pt-5 font-[var(--font-poppins)] text-[13px] font-bold uppercase leading-[1.4] tracking-[2px] text-[#F60996] sm:text-[15px] lg:pt-0 lg:text-[17px]">
            {d.eyebrow}
          </p>
          <h2 className="mt-3 font-[var(--font-poppins)] text-[26px] font-bold leading-[1.12] tracking-[-0.8px] sm:text-[34px] lg:text-[45px] lg:tracking-[-1.2px]">
            {d.titleBefore}
            <span className="text-[#F60996]">{d.titleAccent}</span>
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:mt-12 md:grid-cols-3 md:gap-5 lg:gap-6">
          {d.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-white/10 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] sm:p-7 lg:p-8"
              style={{
                background: "linear-gradient(90deg, #1e1a75 0%, #1e1a75 55%, #160f61 100%)",
              }}
            >
              <SafeImage
                src={card.icon}
                alt=""
                width={card.iconWidth}
                height={card.iconHeight}
                className="mb-4 h-auto w-auto max-h-[64px] max-w-[80px] object-contain sm:mb-5 sm:max-h-none sm:max-w-none"
                aria-hidden
              />
              <h3 className="font-[var(--font-poppins)] text-[17px] font-bold leading-[1.35] tracking-[-0.4px] text-white sm:text-[19px] lg:text-[20px]">
                {card.title}
              </h3>
              <p className="mt-2 font-[var(--font-inter)] text-[13px] font-semibold leading-[1.6] tracking-normal text-white sm:mt-3 sm:text-[14px] lg:text-[15px]">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
