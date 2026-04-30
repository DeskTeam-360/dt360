import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { pricingSection } from "@/data/home";
import { PricingPlanCardComponent } from "./PricingPlanCard";

export function Pricing() {
  const { headlineLine1, headlineHighlight, headlineLine2, subheading, ctaLabel, plans } =
    pricingSection;

  return (
    <section id="pricing" className="bg-white pt-14 sm:pt-16 lg:pt-20" aria-labelledby="pricing-heading">
      <Container className="max-w-7xl pb-12">
        <h2
          id="pricing-heading"
          className="mx-auto max-w-4xl text-balance text-center text-4xl font-bold leading-[1.08] tracking-tight text-[#101651] sm:text-5xl lg:text-[3.25rem]"
        >
          <span className="block sm:inline">{headlineLine1} </span>
          <span className="block text-[#E3058D] sm:inline">{headlineHighlight} </span>
          <span className="block sm:inline">{headlineLine2}</span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-zinc-600 sm:mt-8 sm:text-lg">
          {subheading}
        </p>

        <div className="mb-12 mt-12 grid gap-6 sm:mt-14 md:grid-cols-3 md:gap-7 lg:mt-16 lg:gap-8">
          {plans.map((plan) => (
            <PricingPlanCardComponent key={plan.id} plan={plan} ctaLabel={ctaLabel} />
          ))}
        </div>

      </Container>

      <div className="relative mt-12 w-full bg-[#7547C5] pb-12 pt-8 text-white sm:pt-10">
        <div
          className="pointer-events-none absolute inset-x-0 -top-[45px] h-[68px]"
          style={{
            backgroundImage: "url('/images/Home-pricing-border-top.png')",
            backgroundPosition: "top center",
            backgroundSize: "100% 68px",
            backgroundRepeat: "repeat-x",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 -bottom-[45px] z-[1] h-[68px]"
          style={{
            backgroundImage: "url('/images/Home-pricing-border-bottom.png')",
            backgroundPosition: "bottom center",
            backgroundSize: "100% 68px",
            backgroundRepeat: "repeat-x",
          }}
          aria-hidden
        />
        <Container className="max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
            <div className="flex items-center gap-4 sm:gap-6">
              <Image
                src="/images/Home-pricing-banner-risk.png"
                alt="Risk-free guarantee icon."
                width={110}
                height={110}
                className="h-auto w-14 shrink-0 sm:w-16 lg:w-20"
              />
              <h3 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                <span className="block">
                  Try It <span className="font-bold">Risk-Free</span>
                </span>
                <span className="block font-normal">for 30 Days</span>
              </h3>
            </div>

            <p className="max-w-2xl text-lg leading-relaxed text-white/95">
              Not the right fit? Full refund within the first 30 days. No awkward conversations. No
              cancellation hoops. No contracts - ever. Cancel any month, for any reason. We&apos;ve been at
              this since 2018. We don&apos;t need lock-in contracts to keep people. We keep them by doing work
              they can&apos;t get anywhere else.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
