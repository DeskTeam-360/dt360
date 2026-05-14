import type { Metadata } from "next";
import { getShowcaseData } from "@/lib/wordpress";
import { ShowcaseHero } from "@/components/pages/showcase/ShowcaseHero";

export const metadata: Metadata = {
  title: "Showcase",
  description: "See real client work delivered by the DeskTeam360 team.",
};

export default async function ShowcasePage() {
  const { allItems, categories, itemsByCategory } = await getShowcaseData();

  return (
    <main className="flex flex-col overflow-x-visible bg-white">
      <ShowcaseHero
        categories={categories}
        itemsByCategory={itemsByCategory}
        allItems={allItems}
      />
      <section className="bg-[#EEEEEE]">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 lg:px-12 xl:px-14 min-[1440px]:px-20">
          {/* Konten section berikutnya */}
        </div>
      </section>
    </main>
  );
}
