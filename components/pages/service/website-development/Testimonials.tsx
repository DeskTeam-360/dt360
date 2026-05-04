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

      <Container className="relative z-10 max-w-[1200px] !px-10 lg:!px-20">
        <h2 className="text-center text-3xl font-extrabold leading-tight text-[#1a1a4b] sm:text-4xl lg:text-[3rem] lg:leading-[1.08] 2xl:text-[3.25rem]">
          From <span className="text-[#e62a98]">7-Year-Old Website</span> to 200+ Monthly Recurring Students
        </h2>
        <p className="mx-auto mt-6 max-w-[820px] text-center text-base font-semibold leading-relaxed text-[#1a1a4b]/90 sm:text-lg lg:text-xl">
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
              <p className="text-base italic leading-relaxed sm:text-lg lg:text-[30px] lg:leading-[1.12]">
                &ldquo;There&apos;s no way in hell I could&apos;ve done it without your team, so thank you for saving my
                sanity.&rdquo;
              </p>
              <p className="text-sm font-bold text-[#1a1a4b] sm:text-lg lg:text-[26px] lg:leading-tight">
                Luke Dalien, Special Ed Resource
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
