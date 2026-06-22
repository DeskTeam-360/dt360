import { GhlBookingEmbed } from "@/components/shared/GhlBookingEmbed";
import { bookACallForm } from "@/data/bookACall";

const { bookingIframeSrc, bookingIframeId, bookingEmbedScriptSrc } = bookACallForm;

/** Lead Connector booking widget for Book a Call. */
export function BookACallBookingEmbed({ className = "" }: { className?: string }) {
  return (
    <GhlBookingEmbed
      className={className}
      config={{
        bookingIframeSrc,
        bookingIframeId,
        bookingEmbedScriptSrc,
        scriptDatasetKey: "book-a-call",
      }}
    />
  );
}
