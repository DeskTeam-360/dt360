import { Hero } from "@/components/pages/home/Hero";
import { TeamMembers } from "@/components/pages/home/TeamMembers";
import { StartBusiness } from "@/components/pages/home/StartBusiness";
import { TrustedBy } from "@/components/pages/home/TrustedBy";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="bg-[#11104C] pt-16 lg:pt-[72px]">
        <Hero />
      </div>
      <TeamMembers />
      <TrustedBy />
      <StartBusiness />
    </main>
  );
}
