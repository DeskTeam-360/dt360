import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";

export function CaseStudy() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28 2xl:py-36">
      {/* Bottom-left: red radial behind decorative image (~10% larger) — visible all breakpoints */}
      <SafeImage
        src="/images/Service - Testimonial Graphic Radial Red.png"
        alt=""
        width={500}
        height={500}
        className="pointer-events-none absolute bottom-[-6%] left-[-6%] z-0 block h-auto w-[min(42vw,200px)] opacity-75 sm:bottom-[-8%] sm:left-[-4%] sm:w-[min(38vw,240px)] md:w-[264px] lg:bottom-[-6%] lg:left-[2%] lg:w-[330px]"
      />
      <SafeImage
        src="/images/Service - Testimonial Graphic BG Right.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute bottom-[-4%] left-[-12%] z-[1] block h-auto w-[min(68vw,280px)] -scale-x-100 opacity-90 sm:bottom-0 sm:left-[-18%] sm:w-[min(58vw,380px)] md:left-[calc(var(--spacing)*-40)] md:w-[min(55vw,420px)] lg:left-[calc(var(--spacing)*-50)] lg:w-[484px]"
      />
      {/* Top-right: cyan w-50%; negative right only from md+ so mobile/tablet stay inside overflow clip */}
      <SafeImage
        src="/images/White Label - Cyan Round BG.png"
        alt=""
        width={1600}
        height={900}
        className="pointer-events-none absolute top-0 z-0 h-auto w-1/2 max-w-none object-right object-top right-0 sm:right-[-3rem] md:right-[-10rem] lg:right-[-20rem]"
      />
      <SafeImage
        src="/images/White Label - Case Study Top Right Image.png"
        alt=""
        width={720}
        height={520}
        className="pointer-events-none absolute top-0 right-[-5rem] z-[1] h-auto max-w-none opacity-95 w-[min(52vw,200px)] sm:w-[min(46vw,260px)] md:w-[min(42vw,340px)] lg:top-[-5rem] lg:right-[-13rem] lg:w-[min(38vw,520px)]"
      />
      <Container className="relative z-10 max-w-[1200px] !px-10 lg:!px-20">
        <h2 className="text-center text-3xl font-extrabold tracking-wide text-[#11114d] sm:text-4xl lg:text-[46px]">
          CASE <span className="text-[#e62a98]">STUDY</span>
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
              <div className="relative z-10 h-full w-full overflow-hidden rounded-full border-4 border-white/80 shadow-lg">
                <SafeImage
                  src="/images/White Label - Case Study Person.png"
                  alt="Portrait for case study"
                  fill
                  sizes="250px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 rounded-2xl bg-[linear-gradient(135deg,#7976BA_0%,#E595BB_100%)] px-6 py-8 text-white shadow-xl sm:px-8 sm:py-10 lg:px-[50px] lg:py-[40px]">
              <p className="text-lg font-extrabold leading-tight sm:text-xl lg:text-[28px] lg:leading-snug">
                Duct Tape Marketing – From Capacity-Constrained to Full-Service
              </p>
              <p className="text-base leading-relaxed sm:text-lg lg:text-[22px] lg:leading-relaxed">
                DeskTeam360 cleared the backlog that was throttling new client work. By routing web, design, and campaign
                production through a white-label desk, the team expanded offer breadth without adding headcount - and
                clients still saw Duct Tape&apos;s brand on every deliverable.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
