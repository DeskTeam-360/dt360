import { Container } from "@/components/shared/Container";
import { ServiceSafeImage } from "@/components/pages/service/shared/ServiceSafeImage";

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#f9f6ff] py-20 sm:py-24 lg:py-28 2xl:py-36">
<ServiceSafeImage
        src="/images/Service - Testimonial Graphic BG Left.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute left-[calc(var(--spacing)*-50)] top-[calc(var(--spacing)*-20)] hidden h-auto w-[10vw] opacity-60 sm:block lg:w-[20vw]"
      />
      <ServiceSafeImage
        src="/images/Service - Testimonial Graphic Radial Red.png"
        alt=""
        width={600}
        height={600}
        className="pointer-events-none absolute right-[-8%] top-[-20%] hidden h-auto w-[20vw] opacity-50 sm:block lg:w-[30vw]"
      />
      <ServiceSafeImage
        src={`/images/${encodeURIComponent("bubble service testimonial.png")}`}
        alt=""
        width={140}
        height={220}
        className="pointer-events-none absolute right-[0] top-[10%] hidden h-auto w-[15%] opacity-100 sm:block"
      />
      <ServiceSafeImage
        src="/images/Service - Testimonial Graphic Oval Purple.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute left-[-10px] top-[5%] z-[1] hidden h-auto w-[45%] opacity-85 sm:block"
      />
      <Container className="relative z-10 max-w-[1440px] !px-10 lg:!px-20">
        <h2 className="type-rule-h2 font-bold text-center leading-tight text-[#1B1464] lg:leading-[1.08]">
          From 1 Webinar to <span className="text-[#E3058D]">10 Pieces</span>
          <br />
          of Content
        </h2>

        <div className="mx-auto mt-12 max-w-[1040px] sm:mt-14">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-12">
            <div className="relative h-[228px] w-[228px] shrink-0 sm:h-[238px] sm:w-[238px] lg:h-[246px] lg:w-[246px]">
              <ServiceSafeImage
                src="/images/Service - Testimonial Quotes.png"
                alt=""
                width={104}
                height={88}
                className="absolute left-[calc(var(--spacing)*-10)] top-[10%] z-20 h-auto w-[86px] opacity-70 sm:w-[104px]"
              />
              <div className="relative z-10 h-full w-full overflow-hidden rounded-full">
                <ServiceSafeImage
                  src="/images/Service - Video Testimonial Person.png"
                  alt="Portrait of testimonial clients"
                  fill
                  sizes="250px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-[10px] rounded-2xl bg-[linear-gradient(180deg,#5F69AD_0%,#FFA2DB_100%)] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-[50px] lg:py-[40px]">
            <p className="type-rule-p font-montserrat !text-[28px] !font-semibold italic leading-relaxed sm:!text-[32px] lg:leading-[1.6]">
                “DeskTeam360 takes our webinar recordings and turns them into YouTube videos, social clips, and ad
                creatives. What used to take me 8 hours now takes 15 minutes to brief.”
              </p>
              <p className="type-rule-p font-montserrat !text-[22px] !font-bold text-[#3F4A83] pt-2 sm:!text-[28px] lg:leading-tight">
                Multiple DeskTeam360 clients
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
