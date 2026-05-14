"use client";

import { useState } from "react";
import type { ShowcaseItem } from "@/data/showcase";
import { ShowcaseHero } from "./ShowcaseHero";
import { ShowcaseGallery } from "./ShowcaseGallery";

type Props = {
  categories: string[];
  itemsByCategory: Record<string, ShowcaseItem[]>;
  allItems: ShowcaseItem[];
};

export function ShowcaseContent({ categories, itemsByCategory, allItems }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] ?? "All Work");

  return (
    <>
      <ShowcaseHero
        categories={categories}
        itemsByCategory={itemsByCategory}
        allItems={allItems}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ShowcaseGallery
        allItems={allItems}
        activeCategory={activeCategory}
      />
    </>
  );
}
