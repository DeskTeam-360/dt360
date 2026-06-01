import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";

export function Testimonials() {
  return (
    <section
      className="relative overflow-x-clip bg-[linear-gradient(180deg,#f9f6ff_0%,#f9f6ff_38%,rgba(249,246,255,0.75)_52%,rgba(249,246,255,0.2)_68%,transparent_88%)] pb-20 pt-27 sm:pb-12 sm:pt-40 lg:pb-14 lg:pt-48 2xl:pb-16 2xl:pt-52"
    >
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
        className="pointer-events-none absolute left-[-10px] top-[5%] z-[1] hidden h-auto w-[45%] opacity-85 sm:block"
      />

      <Container className="relative z-10 max-w-[1440px] !px-10 pb-12 sm:pb-28 lg:!px-20">
      <h2 className="type-rule-h2 font-bold text-center leading-tight text-[#1B1464] lg:leading-[1.08]">
          From <span className="text-[#E3058D]">7-Year-Old Website</span> to 200+ Monthly Recurring Students
        </h2>
        <p className="type-rule-p !font-semibold mx-auto mt-6 max-w-[820px] text-center text-[#000]/90">
          Special Ed Resource had the same website for 7 years. Luke Dalien sent us a task. We rebuilt it. Within
          months, they went from zero recurring digital revenue to 200+ monthly paying students.
        </p>

        <div className="relative z-30 mx-auto mt-16 max-w-[1040px] sm:mt-18 lg:mt-20">
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
            <div className="flex w-full flex-col gap-[10px] rounded-2xl bg-[linear-gradient(180deg,#5F69AD_0%,#FFA2DB_100%)] px-6 py-8 text-white shadow-[0_20px_50px_rgba(26,26,75,0.2)] sm:px-8 sm:py-10 lg:max-w-[720px] lg:px-[50px] lg:py-[40px]">
              <p className="type-rule-p font-montserrat !text-[28px] !font-semibold italic leading-relaxed sm:!text-[32px] lg:leading-[1.6]">
                &ldquo;There&apos;s no way in hell I could&apos;ve done it without your team, so thank you for saving my
                sanity.&rdquo;
              </p>
              <p className="type-rule-p font-montserrat !text-[22px] !font-bold text-[#3F4A83] pt-2 sm:!text-[28px] lg:leading-tight">
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
          className="pointer-events-none absolute z-[1] bottom-18 -left-14 h-auto w-auto max-w-[min(100px,26vw)] max-md:z-50 max-md:left-3 max-md:-bottom-10 sm:z-[1] sm:-left-10 sm:bottom-16 sm:max-w-[min(118px,28vw)] md:-left-[1rem] md:w-[16%] md:max-w-[220px] md:min-w-[120px] lg:-left-[1rem] lg:bottom-18 lg:w-[10%] lg:max-w-[190px] lg:min-w-[110px]"
        />
        <SafeImage
          src="/images/Service - Graphic Design.png"
          alt=""
          width={512}
          height={512}
          className="pointer-events-none absolute z-[1] bottom-25 -right-14 h-auto w-auto max-w-[min(100px,26vw)] max-md:z-50 max-md:right-0 max-md:-bottom-10 sm:z-[1] sm:-right-10 sm:bottom-23 sm:max-w-[min(118px,28vw)] md:right-0 md:w-[16%] md:max-w-[220px] md:min-w-[120px] lg:right-0 lg:bottom-25 lg:w-[10%] lg:max-w-[190px] lg:min-w-[110px]"
        />
      </Container>
    </section>
  );
}
