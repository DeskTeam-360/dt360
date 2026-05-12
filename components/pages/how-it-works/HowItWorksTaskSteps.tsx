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
      className="relative bg-white pb-20 pt-16 lg:pb-28 lg:pt-10"
      aria-labelledby="how-it-works-task-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/5 to-transparent"
        aria-hidden
      />
      <Container className="relative z-20 -mt-20 max-w-[1440px] lg:-mt-110 lg:mx-0 lg:max-w-none lg:px-0 [@media(min-width:1441px)]:mx-auto [@media(min-width:1441px)]:max-w-[1440px] [@media(min-width:1441px)]:px-10">
        <h2
          id="how-it-works-task-heading"
          className="type-rule-h2 text-center font-semibold tracking-tight text-white pb-5"
        >
          {titleBefore}
          <span className="text-[#E3058D]">{titleHighlight}</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
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
