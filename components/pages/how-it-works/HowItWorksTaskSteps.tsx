import { MessageCircle, PanelsTopLeft, Rocket } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { howItWorksTaskSection } from "@/data/howItWorks";

const STEP_ICONS = [MessageCircle, PanelsTopLeft, Rocket] as const;

export function HowItWorksTaskSteps() {
  const { titleBefore, titleHighlight, steps } = howItWorksTaskSection;

  return (
    <section
      className="relative bg-gradient-to-b from-[#1a1768] via-[#16124f] to-[#110e42] pb-20 pt-16 lg:pb-28 lg:pt-10"
      aria-labelledby="how-it-works-task-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/5 to-transparent"
        aria-hidden
      />
      <Container className="relative z-10 max-w-[1440px] lg:px-10">
        <h2
          id="how-it-works-task-heading"
          className="type-rule-h2 text-center font-extrabold tracking-tight text-white"
        >
          {titleBefore}
          <span className="text-[#E3058D]">{titleHighlight}</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? Rocket;
            return (
              <article
                key={step.id}
                className={`flex min-h-[320px] flex-col rounded-[32px] p-8 text-white shadow-xl ${step.gradientClass}`}
              >
                <h3 className="text-2xl font-bold leading-snug">{step.title}</h3>
                <p className="mt-4 flex-1 text-base font-medium leading-relaxed text-white/95">{step.body}</p>
                <div className="mt-8 flex items-center gap-3 border-t border-white/25 pt-6">
                  <span className="flex size-11 items-center justify-center rounded-full bg-black/15">
                    <Icon className="size-6 text-white" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="text-lg font-bold">{step.stepLabel}</span>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
