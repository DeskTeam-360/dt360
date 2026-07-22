import type { Metadata } from "next";
import { HowItWorksDelegationResults } from "@/components/pages/how-it-works/HowItWorksDelegationResults";
import { getHomeTestimonials } from "@/lib/wordpress";
import { HowItWorksDontDo } from "@/components/pages/how-it-works/HowItWorksDontDo";
import { HowItWorksHero } from "@/components/pages/how-it-works/HowItWorksHero";
import { HowItWorksMeetGrid } from "@/components/pages/how-it-works/HowItWorksMeetGrid";
import { HowItWorksReadyCta } from "@/components/pages/how-it-works/HowItWorksReadyCta";
import { HowItWorksRealTeam } from "@/components/pages/how-it-works/HowItWorksRealTeam";
import { HowItWorksTaskSteps } from "@/components/pages/how-it-works/HowItWorksTaskSteps";
import { siteConfig } from "@/config/site";
import { withPageCanonical } from "@/lib/seo";

export const metadata: Metadata = withPageCanonical("/how-it-works", {
  title: "How It Works",
  description: `${siteConfig.name} — What we do, what we don't, and how tasks get done in days—not weeks.`,
});

/** ISR — testimonial carousel stays in sync with WP (same as homepage). */
export const revalidate = 600;

export default async function HowItWorksPage() {
  const testimonials = await getHomeTestimonials();

  return (
    <main className="min-w-0 overflow-x-hidden">
      <HowItWorksHero />
      <div className="mb-0 lg:mb-[-100px]">
        <HowItWorksTaskSteps />
      </div>
      <HowItWorksMeetGrid />
      <HowItWorksDontDo />
      <section
        className="relative isolate overflow-x-hidden bg-white"
        aria-labelledby="how-it-works-real-team-heading"
      >
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/How it works - Background Ornament.png')",
            right: "-20em",
          }}
          aria-hidden
        />
        <div className="relative z-10">
          <HowItWorksRealTeam />
          <HowItWorksDelegationResults testimonials={testimonials} />
        </div>
      </section>
      <HowItWorksReadyCta />
    </main>
  );
}
