import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { howItWorksTaskSection } from "@/data/howItWorks";

const STEP_ICON_SRCS = [
  "/images/how it works/how-it-works-step-1.png",
  "/images/how it works/how-it-works-step-2.png",
  "/images/how it works/how-it-works-step-3.png",
] as const;

export function HowItWorksTaskSteps() {
  const { titleBefore, titleHighlight, steps } = howItWorksTaskSection;

  return (
    <section
      className="relative z-10 bg-white pb-20 pt-0 max-md:bg-transparent md:pt-6 lg:pb-28 lg:pt-10"
      aria-labelledby="how-it-works-task-steps-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-40 bg-gradient-to-b from-white/5 to-transparent md:block"
        aria-hidden
      />
      <Container className="relative z-20 max-w-[1440px] md:mt-[calc(calc(var(--spacing)*80)*-1)] lg:-mt-[calc(var(--spacing)*140)] lg:mx-0 lg:max-w-none lg:px-0 [@media(min-width:1441px)]:mx-auto [@media(min-width:1441px)]:max-w-[1440px] [@media(min-width:1441px)]:px-10">
        <h2
          id="how-it-works-task-steps-heading"
          className="type-rule-h2 hidden text-center font-semibold tracking-tight text-white md:block md:mt-[calc(var(--spacing)*6)] lg:mt-[calc(var(--spacing)*16)]"
        >
          {titleBefore}
          <span className="text-[#f336b6]">{titleHighlight}</span>
        </h2>
        <div className="relative grid grid-cols-1 gap-6 max-md:-mx-4 max-md:bg-white max-md:px-4 max-md:py-8 sm:max-md:-mx-6 sm:max-md:px-6 md:mt-16 md:mx-0 md:bg-transparent md:px-0 md:py-0 md:grid-cols-1 lg:mt-12 lg:grid-cols-3 lg:gap-8">
          {steps.map((step, i) => {
            const iconSrc = STEP_ICON_SRCS[i] ?? STEP_ICON_SRCS[2];
            return (
              <article
                key={step.id}
                className={`flex min-h-[320px] flex-col py-15 px-10 pb-0 text-white shadow-xl ${step.gradientClass}`}
              >
                <h3 className="text-[48px] font-semibold leading-snug text-center">{step.title}</h3>
                <p className="mt-4 whitespace-pre-line text-[18px] font-medium leading-[1.9em] text-center text-white/95 pb-10">{step.body}</p>
                <div className="-mx-10 flex flex-1">
                  <div
                    className={`flex h-full w-full items-center justify-center border-t border-white/25 px-8 py-10 ${
                      i === 0 ? "bg-[#F6663E]" : i === 1 ? "bg-[#E95595]" : "bg-[#5432B4]"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-[20px]">
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
