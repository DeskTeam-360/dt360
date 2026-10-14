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
            <h2 className="font-[var(--font-poppins)] text-[36px] font-semibold leading-[1.15] text-[#11104C] sm:text-[48px] lg:text-[56px]">
              {d.titleBefore}
              <span className="text-[#E3058D]">{d.titleAccent}</span>
            </h2>
            <p className="mt-5 font-[var(--font-montserrat)] text-[18px] font-medium leading-[1.8] text-[#11104C]/80">
              {d.body}
            </p>
            <ul className="mt-8 space-y-4">
              {d.points.map((point) => (
                <li
                  key={point.text}
                  className="flex items-start gap-3 font-[var(--font-montserrat)] text-[17px] font-semibold leading-snug text-[#11104C]"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E3058D]/10">
                    <SafeImage
                      src={point.icon}
                      alt=""
                      width={22}
                      height={22}
                      className="h-[22px] w-[22px] object-contain"
                      aria-hidden
                    />
                  </span>
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
