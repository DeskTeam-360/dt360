import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { careersValues } from "@/data/careers";

export function CareersValues() {
  const d = careersValues;

  return (
    <section className="relative bg-white pb-16 pt-10 sm:pb-24 sm:pt-14">
      <Container className="max-w-[1440px] !px-6 lg:!px-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-[529px] lg:mx-0">
            <div className="relative aspect-[529/397] w-full">
              <SafeImage
                src={d.image}
                alt={d.imageAlt}
                fill
                quality={75}
                optimized
                sizes="(max-width: 1023px) min(100vw, 529px), 529px"
                className="object-contain object-center"
              />
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="font-[var(--font-poppins)] text-[28px] font-bold leading-[1.2] tracking-[-0.8px] text-[#080F40] sm:text-[32px] lg:text-[36px] lg:tracking-[-1px]">
              {d.titleBefore}
              <span className="text-[#F60996]">{d.titleAccent}</span>
            </h2>
            <p className="mt-5 max-w-[520px] font-[var(--font-inter)] text-[14px] font-normal leading-[1.6] tracking-normal text-[#242C55] sm:text-[15px]">
              {d.body}
            </p>
            <ul className="mt-8 space-y-5">
              {d.points.map((point) => (
                <li
                  key={point.text}
                  className="flex items-center gap-4 font-[var(--font-inter)] text-[14px] font-normal leading-[1.6] text-[#242C55] sm:text-[15px]"
                >
                  <SafeImage
                    src={point.icon}
                    alt=""
                    width={57}
                    height={67}
                    className="h-[66.43px] w-[56.45px] shrink-0 object-contain"
                    aria-hidden
                  />
                  <span className="font-semibold text-[#080F40]">{point.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
