import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { careersValues } from "@/data/careers";

export function CareersValues() {
  const d = careersValues;

  return (
    <section className="relative bg-white pb-8 pt-4 sm:pb-10 sm:pt-[15px]">
      <Container className="max-w-[1440px] !px-4 sm:!px-6 lg:!px-20">
        <div className="grid items-center gap-6 md:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="relative mx-auto w-full max-w-[520px] md:max-w-[640px] lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[819/564] w-full">
              <SafeImage
                src={d.image}
                alt={d.imageAlt}
                fill
                quality={88}
                optimized
                sizes="(max-width: 767px) min(100vw, 520px), (max-width: 1023px) min(50vw, 640px), 720px"
                className="object-contain object-center"
              />
            </div>
          </div>

          <div className="min-w-0 text-center md:text-left">
            <h2 className="font-[var(--font-poppins)] text-[26px] font-bold leading-[1.12] tracking-[-0.8px] text-[#080F40] sm:text-[34px] lg:text-[45px] lg:tracking-[-1.2px]">
              {d.titleBefore}
              <span className="text-[#F60996]">{d.titleAccent}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] font-[var(--font-inter)] text-[13px] font-semibold leading-[1.6] tracking-normal text-[#080F40] sm:mt-5 sm:text-[14px] lg:text-[15px] md:mx-0">
              {d.body}
            </p>
            <ul className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
              {d.points.map((point) => (
                <li
                  key={point.text}
                  className="flex items-center gap-3 text-left font-[var(--font-inter)] text-[13px] font-semibold leading-[1.6] text-[#080F40] sm:gap-4 sm:text-[14px] lg:text-[15px]"
                >
                  <SafeImage
                    src={point.icon}
                    alt=""
                    width={57}
                    height={67}
                    className="h-[48px] w-[41px] shrink-0 object-contain sm:h-[66.43px] sm:w-[56.45px]"
                    aria-hidden
                  />
                  <span>{point.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
