import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#f9f6ff] py-20 sm:py-24 lg:py-28 2xl:py-36">
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
        <h2 className="text-center text-3xl font-extrabold leading-tight text-[#11114d] sm:text-4xl lg:text-[3.15rem] lg:leading-[1.02] 2xl:text-6xl">
          <span className="text-[#e62a98]">Saving $20,000/Month</span> in
          <br />
          Contractor Costs
        </h2>

        <div className="mx-auto mt-12 max-w-[1040px] sm:mt-14">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-12">
            <div className="relative h-[228px] w-[228px] shrink-0 sm:h-[238px] sm:w-[238px] lg:h-[246px] lg:w-[246px]">
              <SafeImage
                src="/images/Service - Testimonial Quotes.png"
                alt=""
                width={104}
                height={88}
                className="absolute left-[calc(var(--spacing)*-10)] top-[10%] z-20 h-auto w-[86px] opacity-70 sm:w-[104px]"
              />
              <div className="relative z-10 h-full w-full overflow-hidden rounded-full">
                <SafeImage
                  src="/images/Service - Graphic Testimonial Person.png"
                  alt="Portrait of testimonial speaker"
                  fill
                  sizes="250px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-[10px] rounded-2xl bg-[linear-gradient(135deg,#7976BA_0%,#E595BB_100%)] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-[50px] lg:py-[40px]">
              <p className="text-base italic leading-relaxed sm:text-lg lg:text-[34px] lg:leading-[1.06]">
                “I&apos;m saving at least $20,000 monthly compared to what I was paying individual contractors - and the
                quality and reliability is better.”
              </p>
              <p className="text-sm text-[#1b2272] sm:text-lg lg:text-[28px] lg:leading-none">
                <span className="font-bold">Gaynor Meilke,</span>{" "}
                <span className="font-normal">Charisma Ink</span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
