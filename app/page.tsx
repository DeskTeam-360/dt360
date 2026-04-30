import { Hero } from "@/components/pages/home/Hero";
import { InsourcingBetter } from "@/components/pages/home/InsourcingBetter";
import { RotateProblemCarousel } from "@/components/pages/home/RotateProblemCarousel";
import { TeamMembers } from "@/components/pages/home/TeamMembers";
import { StartBusiness } from "@/components/pages/home/StartBusiness";
import { TrustedBy } from "@/components/pages/home/TrustedBy";
import { EverySkillGrid } from "@/components/pages/home/EverySkillGrid";
import { HowItWorksSteps } from "@/components/pages/home/HowItWorksSteps";
import { SocialProofTestimonials } from "@/components/pages/home/SocialProofTestimonials";
import { Pricing } from "@/components/pages/home/Pricing";
import { FAQ } from "@/components/pages/home/FAQ";
import { LastCTA } from "@/components/pages/home/LastCTA";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="bg-[#11104C] pt-16 lg:pt-[72px]">
        <Hero />
      </div>
      <TeamMembers />
      <TrustedBy />
      <StartBusiness />
      <RotateProblemCarousel />
      <InsourcingBetter />
      <EverySkillGrid />
      <HowItWorksSteps />
      <SocialProofTestimonials />
      <Pricing />
      <FAQ />
      <LastCTA />
    </main>
  );
}
