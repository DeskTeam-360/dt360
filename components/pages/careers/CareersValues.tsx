import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { careersValues } from "@/data/careers";

function CheckIcon() {
  return (
    <span
      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E3058D]/10 text-[#E3058D]"
      aria-hidden
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function CareersValues() {
  const d = careersValues;

  return (
    <section className="relative bg-white pb-16 pt-4 sm:pb-24 sm:pt-8">
      <Container className="max-w-[1440px] !px-6 lg:!px-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-[480px] lg:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[42%_48%_45%_50%/50%_45%_48%_42%] shadow-[0_24px_48px_rgba(17,16,76,0.18)]">
              <SafeImage
                src={d.image}
                alt={d.imageAlt}
                fill
                quality={75}
                optimized
                sizes="(max-width: 1023px) min(100vw, 480px), 480px"
                className="object-cover object-center"
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
                  key={point}
                  className="flex items-start gap-3 font-[var(--font-montserrat)] text-[17px] font-semibold leading-snug text-[#11104C]"
                >
                  <CheckIcon />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
