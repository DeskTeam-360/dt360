import { Hero } from "@/components/pages/home/Hero";
import { TeamMembers } from "@/components/pages/home/TeamMembers";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="bg-[#0b0d2a] pt-16 lg:pt-[72px]">
        <Hero />
      </div>
      <TeamMembers />
    </main>
  );
}
