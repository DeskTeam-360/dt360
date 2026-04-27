import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { howItWorksSection } from "@/data/home";

export function HowItWorksSteps() {
  const { titleLine1, titleLine2, steps } = howItWorksSection;

  return (
    <section
      id="how-it-works-steps"
      className="relative overflow-x-hidden py-16 sm:py-20 lg:py-24"
      style={{
        backgroundColor: "#11104C",
        backgroundImage:
          "radial-gradient(30vw 30vw at 100% 50%, rgba(0,200,244,0.4) 0%, rgba(0,200,244,0) 100%), radial-gradient(60rem 34rem at -40% -40%, rgba(104,133,255,0.46) 0%, rgba(79,92,217,0.18) 38%, rgba(17,16,76,0) 72%)",
      }}
      aria-labelledby="how-it-works-steps-heading"
    >
      <Container className="relative z-10 max-w-7xl">
        <h2
          id="how-it-works-steps-heading"
          className="mx-auto max-w-4xl text-center text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.1rem]"
        >
          <span className="block">{titleLine1}</span>
          <span className="block">{titleLine2}</span>
        </h2>

        <div className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-3 lg:items-center lg:gap-14">
          <div className="relative mx-auto w-full max-w-[34rem] lg:col-span-2 lg:max-w-none">
            <div
              className="pointer-events-none absolute left-[34%] top-[calc(64%+50px)] z-0 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(237,141,83,0.34) 0%, rgba(237,141,83,0.18) 32%, rgba(244,142,80,0) 50%)",
              }}
              aria-hidden
            />
            <Image
              src="/images/Home-HowItWorksStep-Gear.png"
              alt="How it works step wheel illustration with user icon."
              width={900}
              height={980}
              className="relative z-[1] h-auto w-full"
              sizes="(max-width: 1024px) 92vw, 560px"
              priority={false}
            />
          </div>

          <div className="mx-auto grid w-full max-w-3xl gap-6 sm:gap-7 lg:col-span-1">
            {steps.map((step) => (
              <article key={step.id} className="flex gap-5 sm:gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/70 text-5xl font-bold leading-none text-white sm:h-[5.5rem] sm:w-[5.5rem] sm:text-6xl">
                  {step.number}
                </div>
                <div className="pt-1">
                  <h3 className="text-3xl font-bold leading-tight text-white sm:text-[2.05rem]">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-white/88 sm:text-lg">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
