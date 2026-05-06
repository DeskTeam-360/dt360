import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";

export function Testimonials() {
  return (
    <section
      className="relative overflow-x-hidden overflow-y-visible bg-[linear-gradient(180deg,#f9f6ff_0%,#f9f6ff_38%,rgba(249,246,255,0.75)_52%,rgba(249,246,255,0.2)_68%,transparent_88%)] pb-10 pt-36 sm:pb-12 sm:pt-40 lg:pb-14 lg:pt-48 2xl:pb-16 2xl:pt-52"
    >
      <SafeImage
        src="/images/Service - Testimonial Graphic BG Left.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute left-[calc(var(--spacing)*-50)] top-[calc(var(--spacing)*-20)] hidden h-auto w-[280px] opacity-60 sm:block lg:w-[380px]"
      />
      <SafeImage
        src="/images/Service - Testimonial Graphic Radial Red.png"
        alt=""
        width={500}
        height={500}
        className="pointer-events-none absolute -right-20 top-[-8%] hidden h-auto w-[280px] opacity-50 sm:block lg:w-[360px]"
      />
      <SafeImage
        src="/images/Service - Testimonial Graphic BG Right.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute right-[calc(var(--spacing)*-70)] top-[-25%] hidden h-auto w-[42%] opacity-55 sm:block"
      />
      <SafeImage
        src="/images/Service - Testimonial Graphic Oval Purple.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute left-[-20px] top-[12%] z-[1] hidden h-auto w-[40%] opacity-55 sm:block"
      />

      <Container className="relative z-10 mb-[-350px] pb-[500px] sm:mb-0 sm:pb-0 max-w-[1440px] !px-10 lg:!px-20">
        <h2 className="type-rule-h2 text-center leading-tight text-[#1a1a4b] lg:leading-[1.08]">
          From <span className="text-[#e62a98]">7-Year-Old Website</span> to 200+ Monthly Recurring Students
        </h2>
        <p className="type-rule-p !font-semibold mx-auto mt-6 max-w-[820px] text-center text-[#1a1a4b]/90">
          Special Ed Resource had the same website for 7 years. Luke Dalien sent us a task. We rebuilt it. Within
          months, they went from zero recurring digital revenue to 200+ monthly paying students.
        </p>

        <div className="relative z-30 mx-auto mt-12 max-w-[1040px] sm:mt-14 lg:mt-16">
          <div className="relative z-30 flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-12">
            <div className="relative h-[228px] w-[228px] shrink-0 sm:h-[238px] sm:w-[238px] lg:h-[246px] lg:w-[246px]">
              <SafeImage
                src="/images/Service - Testimonial Quotes.png"
                alt=""
                width={104}
                height={88}
                className="absolute left-[calc(var(--spacing)*-10)] top-[8%] z-20 h-auto w-[86px] opacity-80 sm:w-[104px]"
              />
              <div className="relative z-10 h-full w-full overflow-hidden rounded-full">
                <SafeImage
                  src="/images/Service/web-development-testimonial-portrait.png"
                  alt="Luke Dalien, Special Ed Resource"
                  fill
                  sizes="250px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-[10px] rounded-2xl bg-[linear-gradient(135deg,#7e78d2_0%,#e8a8c8_55%,#f2a1c2_100%)] px-6 py-8 text-white shadow-[0_20px_50px_rgba(26,26,75,0.2)] sm:px-8 sm:py-10 lg:max-w-[720px] lg:px-[50px] lg:py-[40px]">
              <p className="type-rule-p font-montserrat !text-[32px] !font-semibold italic leading-relaxed lg:leading-[1.6]">
                &ldquo;There&apos;s no way in hell I could&apos;ve done it without your team, so thank you for saving my
                sanity.&rdquo;
              </p>
              <p className="type-rule-p font-montserrat !text-[28px] !font-bold text-[#1a1a4b] lg:leading-tight pt-2">
                Luke Dalien, Special Ed Resource
              </p>
            </div>
          </div>
        </div>

        <SafeImage
          src="/images/Service - Graphic Code.png"
          alt=""
          width={512}
          height={512}
          className="pointer-events-none absolute z-[1] -bottom-12 left-[calc(var(--spacing)_*_0)] h-auto w-auto max-w-[min(100px,26vw)] sm:-left-10 sm:-bottom-14 sm:max-w-[min(118px,28vw)] md:-left-[1rem] md:w-[16%] md:max-w-[220px] md:min-w-[120px] lg:-left-[1rem] lg:-bottom-16 lg:w-[10%] lg:max-w-[190px] lg:min-w-[110px]"
        />
        <SafeImage
          src="/images/Service - Graphic Design.png"
          alt=""
          width={512}
          height={512}
          className="pointer-events-none absolute z-[1] -bottom-12 right-[calc(var(--spacing)_*_0)] h-auto w-auto max-w-[min(100px,26vw)] sm:-right-10 sm:-bottom-14 sm:max-w-[min(118px,28vw)] md:right-0 md:w-[16%] md:max-w-[220px] md:min-w-[120px] lg:right-0 lg:-bottom-16 lg:w-[10%] lg:max-w-[190px] lg:min-w-[110px]"
        />
      </Container>
    </section>
  );
}
