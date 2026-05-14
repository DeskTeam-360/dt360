import type { Metadata } from "next";
import { getShowcaseData } from "@/lib/wordpress";
import { ShowcaseContent } from "@/components/pages/showcase/ShowcaseContent";

export const metadata: Metadata = {
  title: "Showcase",
  description: "See real client work delivered by the DeskTeam360 team.",
};

export default async function ShowcasePage() {
  const { allItems, categories, itemsByCategory } = await getShowcaseData();

  return (
    <main className="flex flex-col overflow-x-clip bg-white">
      <ShowcaseContent
        categories={categories}
        itemsByCategory={itemsByCategory}
        allItems={allItems}
      />
    </main>
  );
}
