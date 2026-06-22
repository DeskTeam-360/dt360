import type { Metadata } from "next";
import { BookACallBookingEmbed } from "@/components/pages/book-a-call/BookACallBookingEmbed";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Book a Call",
  description: `Schedule a free strategy call with ${siteConfig.name}.`,
};

export default function BookACallPage() {
  return (
    <main className="relative min-w-0 bg-[#F5F8FF] pt-24 pb-12 lg:pt-28">
      <BookACallBookingEmbed />
    </main>
  );
}
