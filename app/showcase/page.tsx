import type { Metadata } from "next";
import { ShowcaseHero } from "@/components/pages/showcase/ShowcaseHero";

export const metadata: Metadata = {
  title: "Showcase",
  description: "See real client work delivered by the DeskTeam360 team.",
};

export default function ShowcasePage() {
  return (
    <main className="flex flex-col bg-white">
      <ShowcaseHero />
    </main>
  );
}
