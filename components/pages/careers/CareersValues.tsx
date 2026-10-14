import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { careersValues } from "@/data/careers";

export function CareersValues() {
  const d = careersValues;

  return (
    <section className="relative bg-white pb-8 pt-[15px] sm:pb-10">
      <Container className="max-w-[1440px] !px-6 lg:!px-20">
        <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="relative mx-auto w-full max-w-[640px] lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[529/397] w-full">
              <SafeImage
                src={d.image}
                alt={d.imageAlt}
                fill
                quality={75}
                optimized
                sizes="(max-width: 1023px) min(100vw, 640px), 720px"
                className="object-contain object-center"
              />
            </div>
          </div>

          <div className="min-w-0">
            {/* H2 ≈ H1 − 3px (48 → 45 desktop) */}
            <h2 className="font-[var(--font-poppins)] text-[29px] font-bold leading-[1.12] tracking-[-0.8px] text-[#080F40] sm:text-[37px] lg:text-[45px] lg:tracking-[-1.2px]">
              {d.titleBefore}
              <span className="text-[#F60996]">{d.titleAccent}</span>
            </h2>
            <p className="mt-5 max-w-[520px] font-[var(--font-inter)] text-[14px] font-semibold leading-[1.6] tracking-normal text-[#080F40] sm:text-[15px]">
              {d.body}
            </p>
            <ul className="mt-8 space-y-5">
              {d.points.map((point) => (
                <li
                  key={point.text}
                  className="flex items-center gap-4 font-[var(--font-inter)] text-[14px] font-semibold leading-[1.6] text-[#080F40] sm:text-[15px]"
                >
                  <SafeImage
                    src={point.icon}
                    alt=""
                    width={57}
                    height={67}
                    className="h-[66.43px] w-[56.45px] shrink-0 object-contain"
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
