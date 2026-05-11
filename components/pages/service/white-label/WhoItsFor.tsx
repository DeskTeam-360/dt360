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
    <section className="relative overflow-hidden bg-white pt-20 pb-12 sm:pt-24 sm:pb-14 lg:pt-28 lg:pb-16 2xl:pt-36 2xl:pb-20">
      <SafeImage
        src="/images/Service - Testimonial Graphic BG Left.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute left-[calc(var(--spacing)*-50)] top-[calc(var(--spacing)*-20)] hidden h-auto w-[10vw] opacity-60 sm:block lg:w-[20vw]"
      />
      <SafeImage
        src="/images/Service - Testimonial Graphic Radial Red.png"
        alt=""
        width={600}
        height={600}
        className="pointer-events-none absolute right-[-8%] top-[-20%] hidden h-auto w-[20vw] opacity-50 sm:block lg:w-[30vw]"
      />
      <SafeImage
        src={`/images/${encodeURIComponent("bubble service testimonial.png")}`}
        alt=""
        width={140}
        height={220}
        className="pointer-events-none absolute right-[0] top-[10%] hidden h-auto w-[15%] opacity-100 sm:block"
      />
      <SafeImage
        src="/images/Service - Testimonial Graphic Oval Purple.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute z-[1] hidden h-auto w-[45%] opacity-85 sm:block sm:max-lg:left-[-10px] sm:max-lg:top-[5%] lg:max-[2559px]:left-[-15em] lg:max-[2559px]:top-[10em] min-[2560px]:left-[-10px] min-[2560px]:top-[5%] min-[2560px]:w-[30%]"
      />
      <Container className="relative z-10 max-w-[1440px] !px-10 lg:!px-20">
        <h2 className="type-rule-h2 font-bold max-w-xl text-center leading-tight text-[#11114d] lg:mx-auto lg:max-w-2xl">
          <span className="text-[#E3058D]">Who </span> It&apos;s For
        </h2>
        <div className="relative mt-12 grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20 xl:gap-24">
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
                <p className="type-rule-h5 leading-relaxed font-light text-[#1b1f4f] lg:leading-tight">
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
