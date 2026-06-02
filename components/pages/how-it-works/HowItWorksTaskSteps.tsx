import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { howItWorksTaskSection } from "@/data/howItWorks";
import { cn } from "@/lib/utils";

const STEP_ICON_SRCS = [
  "/images/how it works/how-it-works-step-1.png",
  "/images/how it works/how-it-works-step-2.png",
  "/images/how it works/how-it-works-step-3.png",
] as const;

const STEP_FOOTER_BG = ["bg-[#F6663E]", "bg-[#E95595]", "bg-[#5432B4]"] as const;

export function HowItWorksTaskSteps() {
  const { titleBefore, titleHighlight, steps } = howItWorksTaskSection;

  return (
    <section
      className="relative z-10 bg-transparent pt-0 max-lg:bg-white max-lg:pb-0 lg:bg-white lg:pb-28 lg:pt-10"
      aria-labelledby="how-it-works-task-heading"
    >
      <Container className="relative z-20 max-w-[1440px] -mt-[300px] md:-mt-[calc(calc(var(--spacing)*80)*-1)] lg:-mt-[calc(var(--spacing)*70)] lg:mx-0 lg:max-w-none lg:px-0 [@media(min-width:1441px)]:mx-auto [@media(min-width:1441px)]:max-w-[1440px] [@media(min-width:1441px)]:px-10">
        {/* Title — full-bleed navy di mobile/tablet agar tidak ada strip putih/hitam di samping */}
        <div className="relative z-30 w-screen max-w-none -translate-x-1/2 bg-[#02063B] px-4 pb-4 pt-2 left-1/2 lg:static lg:w-auto lg:translate-x-0 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0">
          <h2
            id="how-it-works-task-heading"
            className="type-rule-h2 text-center font-semibold tracking-tight text-white md:mt-[calc(var(--spacing)*6)] lg:mt-[calc(var(--spacing)*16)]"
          >
            {titleBefore}
            <span className="text-[#f336b6]">{titleHighlight}</span>
          </h2>
        </div>

        {/* Step cards — full-bleed putih di mobile/tablet; overlap hero di desktop */}
        <div className="relative z-10 mt-4 grid grid-cols-1 gap-6 w-screen max-w-none -translate-x-1/2 left-1/2 bg-white px-4 pb-16 pt-4 md:mt-16 md:pb-24 md:grid-cols-1 lg:static lg:mt-12 lg:w-auto lg:translate-x-0 lg:grid-cols-3 lg:gap-8 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0">
          {steps.map((step, i) => {
            const iconSrc = STEP_ICON_SRCS[i] ?? STEP_ICON_SRCS[2];
            return (
              <article
                key={step.id}
                className={cn(
                  "flex min-h-[320px] flex-col px-10 pb-0 pt-15 text-white shadow-xl md:min-h-[480px]",
                  step.gradientClass,
                )}
              >
                <div className="flex flex-1 flex-col">
                  <h3 className="type-rule-h3 text-center font-semibold leading-snug">{step.title}</h3>
                  <p className="type-rule-p mt-4 flex-1 whitespace-pre-line text-center leading-[1.9em] text-white/95">
                    {step.body}
                  </p>
                </div>
                <div className="-mx-10 mt-auto">
                  <div
                    className={cn(
                      "flex min-h-[140px] w-full items-center justify-center border-t border-white/25 px-8 py-10",
                      STEP_FOOTER_BG[i] ?? STEP_FOOTER_BG[2],
                    )}
                  >
                    <div className="flex items-center justify-center gap-5">
                      <SafeImage
                        src={iconSrc}
                        alt={`${step.stepLabel} icon`}
                        width={80}
                        height={80}
                        unoptimized
                        className="h-auto w-auto max-h-[80px] object-contain"
                      />
                      <span className="shrink-0 whitespace-nowrap text-[32px] font-semibold">{step.stepLabel}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
