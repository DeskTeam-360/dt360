import type { Metadata } from "next";
import { BookACallHero } from "@/components/pages/book-a-call/BookACallHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Book a Call",
  description: `Schedule a free strategy call with ${siteConfig.name}.`,
};

export default function BookACallPage() {
  return (
    <main className="relative flex min-w-0 flex-col overflow-x-hidden overflow-y-visible">
      <BookACallHero />
    </main>
  );
}