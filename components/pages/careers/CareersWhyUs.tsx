import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { careersWhyUs } from "@/data/careers";

export function CareersWhyUs() {
  const d = careersWhyUs;

  return (
    <section className="relative overflow-hidden bg-[#02063B] py-16 text-white sm:py-24">
      <SafeImage
        src={d.backgroundImage}
        alt=""
        fill
        quality={100}
        unoptimized
        sizes="100vw"
        className="object-fill object-center"
        aria-hidden
      />

      <Container className="relative z-10 max-w-[1440px] !px-6 lg:!px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-[var(--font-poppins)] text-[17px] font-bold uppercase leading-[1.4] tracking-[2px] text-[#F60996]">
            {d.eyebrow}
          </p>
          <h2 className="mt-3 font-[var(--font-poppins)] text-[29px] font-bold leading-[1.12] tracking-[-0.8px] sm:text-[37px] lg:text-[45px] lg:tracking-[-1.2px]">
            {d.titleBefore}
            <span className="text-[#F60996]">{d.titleAccent}</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {d.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-white/10 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
              style={{
                // 70% left #1e1a75 → 30% right #160f61 as a soft gradient
                background: "linear-gradient(90deg, #1e1a75 0%, #1e1a75 55%, #160f61 100%)",
              }}
            >
              <SafeImage
                src={card.icon}
                alt=""
                width={card.iconWidth}
                height={card.iconHeight}
                className="mb-5 h-auto w-auto max-w-none object-contain"
                aria-hidden
              />
              <h3 className="font-[var(--font-poppins)] text-[16px] font-semibold leading-[1.35] tracking-[-0.4px] text-white sm:text-[17px]">
                {card.title}
              </h3>
              <p className="mt-3 font-[var(--font-inter)] text-[14px] font-semibold leading-[1.6] tracking-normal text-white sm:text-[15px]">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
