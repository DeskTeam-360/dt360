import { CalendarCheck, Trash2 } from "lucide-react";
import { DemoVideoPlaceholder } from "@/components/pages/demo-call-scheduled-thank-you/DemoVideoPlaceholder";
import { Container } from "@/components/shared/Container";
import { MarketingSafeImage } from "@/components/shared/MarketingSafeImage";
import { demoCallScheduledThankYouPage } from "@/data/demoCallScheduledThankYou";
import { cn } from "@/lib/utils";

const accentOrange = "text-[#FF7A32]";
const stepPurple = "text-[#7B3FE4]";

function StepBadge({ label }: { label: string }) {
  const { stepBadgeBgSrc } = demoCallScheduledThankYouPage;
  return (
    <span
      className="inline-flex w-fit items-center px-8 py-4 font-[var(--font-poppins)] text-[24px] font-bold leading-none sm:px-10 sm:py-5 sm:text-[28px] lg:text-[32px]"
      style={{
        backgroundImage: `url('${stepBadgeBgSrc}')`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <span className={stepPurple}>{label}</span>
    </span>
  );
}

function StepTitle({
  before,
  accent,
}: {
  before: string;
  accent?: string;
}) {
  return (
    <h2 className="max-w-xl font-[var(--font-poppins)] text-[26px] font-bold leading-[1.2] text-[#11104C] sm:text-[30px] lg:text-[34px]">
      {before}
      {accent ? <span className={accentOrange}>{accent}</span> : null}
    </h2>
  );
}

export function DemoCallScheduledThankYouContent() {
  const { hero, stepsIntro, steps } = demoCallScheduledThankYouPage;
  const [step1, step2, step3] = steps;

  return (
    <>
      {/* Section 1 — confirmation + hero video */}
      <section
        className="bg-white pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24"
        aria-labelledby="demo-thank-you-hero-heading"
      >
        <Container className="max-w-[900px] text-center">
          <h1
            id="demo-thank-you-hero-heading"
            className="font-[var(--font-poppins)] text-[36px] font-bold leading-[1.15] text-[#11104C] sm:text-[44px] lg:text-[52px]"
          >
            {hero.title}
          </h1>
          <p className="type-rule-p mt-5 text-[#11104C]/90 sm:mt-6">{hero.subtitle}</p>
          <div className="mt-10 sm:mt-12">
            <DemoVideoPlaceholder
              variant="framed"
              label={hero.videoLabel}
              ariaLabel={hero.videoAriaLabel}
            />
          </div>
        </Container>
      </section>

      {/* Steps intro + Step 1 */}
      <section
        className="relative overflow-x-hidden bg-[#F5F8FF] pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24"
        aria-labelledby="demo-thank-you-steps-heading"
      >
        <div
          className="pointer-events-none absolute right-[-20%] top-[-10%] h-[min(600px,70vw)] w-[min(600px,70vw)] bg-[radial-gradient(circle_at_center,rgba(227,5,141,0.12)_0%,transparent_55%)] blur-3xl"
          aria-hidden
        />
        <Container className="relative max-w-[1200px]">
          <h2
            id="demo-thank-you-steps-heading"
            className="mx-auto max-w-4xl text-center font-[var(--font-poppins)] text-[28px] font-bold leading-[1.2] text-[#11104C] sm:text-[34px] lg:text-[40px]"
          >
            {stepsIntro.beforeAccent}
            <span className={accentOrange}>{stepsIntro.accentSteps}</span>
            {stepsIntro.middle}
            <span className={accentOrange}>{stepsIntro.accentCall}</span>
          </h2>

          {step1 ? (
            <div className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
              <div className="order-1 lg:order-1">
                <StepBadge label={step1.stepLabel} />
                <div className="mt-6">
                  <StepTitle before={step1.titleBefore} accent={step1.titleAccent} />
                </div>
                <p className="type-rule-p mt-5 max-w-lg text-[#11104C]/90">{step1.body}</p>
              </div>
              <div className="order-2 lg:order-2">
                <DemoVideoPlaceholder ariaLabel={step1.videoAriaLabel} />
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      {/* Step 2 — video left, text right */}
      {step2 ? (
        <section className="bg-white py-14 sm:py-16 lg:py-20" aria-labelledby="demo-thank-you-step-2-heading">
          <Container className="max-w-[1200px]">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="relative order-2 lg:order-1">
                <div
                  className="pointer-events-none absolute -bottom-3 -left-3 h-[calc(100%+12px)] w-[calc(100%+12px)] rounded-[24px] bg-[linear-gradient(135deg,#E3058D_0%,#9B7DFF_100%)] opacity-80"
                  aria-hidden
                />
                <DemoVideoPlaceholder
                  ariaLabel={step2.videoAriaLabel}
                  className="relative z-10 ring-4 ring-white"
                />
              </div>
              <div className="order-1 lg:order-2">
                <StepBadge label={step2.stepLabel} />
                <div className="mt-6" id="demo-thank-you-step-2-heading">
                  <StepTitle before={step2.titleBefore} accent={step2.titleAccent} />
                </div>
                <p className="type-rule-p mt-5 max-w-lg text-[#11104C]/90">{step2.body}</p>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Step 3 — text left, illustration right */}
      {step3 ? (
        <section
          className="relative overflow-x-hidden bg-[#F5F8FF] pb-20 pt-14 sm:pb-24 sm:pt-16 lg:pb-28"
          aria-labelledby="demo-thank-you-step-3-heading"
        >
          <div
            className="pointer-events-none absolute bottom-0 left-[-15%] h-[min(500px,60vw)] w-[min(500px,60vw)] bg-[radial-gradient(circle_at_center,rgba(0,200,244,0.15)_0%,transparent_55%)] blur-3xl"
            aria-hidden
          />
          <Container className="relative max-w-[1200px]">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="order-1">
                <StepBadge label={step3.stepLabel} />
                <div className="mt-6" id="demo-thank-you-step-3-heading">
                  <StepTitle before={step3.titleBefore} accent={step3.titleAccent} />
                </div>
                <ul className="mt-6 space-y-4">
                  {step3.bullets?.map((bullet) => (
                    <li key={bullet.text} className="flex items-start gap-3">
                      {bullet.icon === "trash" ? (
                        <Trash2 className="mt-0.5 size-6 shrink-0 text-[#E3058D]" aria-hidden />
                      ) : (
                        <CalendarCheck className="mt-0.5 size-6 shrink-0 text-[#FF7A32]" aria-hidden />
                      )}
                      <span
                        className={cn(
                          "type-rule-p text-[#11104C]/90",
                          "bold" in bullet && bullet.bold && "font-semibold text-[#11104C]",
                        )}
                      >
                        {bullet.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-2 flex justify-center lg:justify-end">
                <MarketingSafeImage
                  src={step3.illustrationSrc}
                  alt={step3.illustrationAlt}
                  width={560}
                  height={480}
                  className="h-auto w-full max-w-[480px] object-contain drop-shadow-[0_20px_40px_rgba(17,16,76,0.12)]"
                  sizes="(max-width: 1024px) 88vw, 420px"
                />
              </div>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
