import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";

const bullets = [
  "Marketing agencies extending delivery bandwidth",
  "Digital shops stacking production seats without recruiters",
  "Freelancers scaling retainers behind a branded team",
  "Partners consolidating vendors under one SLA",
];

export function WhoItsFor() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28 2xl:py-36">
      <SafeImage
        src="/images/Service - Testimonial Graphic BG Left.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute left-[calc(var(--spacing)*-50)] top-[calc(var(--spacing)*-25)] hidden h-auto w-[300px] opacity-85 sm:block lg:w-[420px]"
      />
      <SafeImage
        src="/images/Service - Testimonial Graphic Radial Red.png"
        alt=""
        width={500}
        height={500}
        className="pointer-events-none absolute -right-24 top-[-10%] hidden h-auto w-[300px] opacity-70 sm:block lg:w-[420px]"
      />
      <SafeImage
        src="/images/Service - Testimonial Graphic BG Right.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute right-[calc(var(--spacing)*-75)] top-[-30%] hidden h-auto w-[45%] opacity-85 sm:block"
      />
      <SafeImage
        src="/images/Service - Testimonial Graphic Oval Purple.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute left-[-10px] top-[5%] z-[1] hidden h-auto w-[45%] opacity-85 sm:block"
      />
      <Container className="relative z-10 max-w-[1200px] !px-10 lg:!px-20">
        <h2 className="max-w-xl text-center text-3xl font-extrabold leading-tight text-[#11114d] sm:text-4xl lg:mx-auto lg:max-w-2xl lg:text-[52px]">
          <span className="text-[#e62a98]">Who </span> It&apos;s For
        </h2>
        <div className="mt-12 grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20 xl:gap-24">
          <div className="space-y-3 sm:space-y-4">
            {bullets.map((item) => (
              <div
                key={item}
                className="relative rounded-2xl border border-white bg-gradient-to-r from-white/12 to-[#e3058d]/12 py-3 pl-14 pr-3 sm:py-4 sm:pl-16 sm:pr-4"
              >
                <SafeImage
                  src="/images/Service - Checklist.png"
                  alt=""
                  width={40}
                  height={40}
                  className="absolute left-[-18px] top-1/2 h-[40px] w-[40px] -translate-y-1/2"
                />
                <p className="text-base font-semibold leading-relaxed text-[#1b1f4f] sm:text-lg lg:text-[24px] lg:leading-tight">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div className="relative mx-auto w-full max-w-[560px]">
            <SafeImage
              src="/images/White Label - Who It's For.png"
              alt="Who white label partnerships illustration"
              width={820}
              height={620}
              className="relative z-[2] h-auto w-full drop-shadow-xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
