import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function HaveQuestionsCTA() {
  return (
    <section className="relative w-full overflow-hidden pt-[10px] bg-[#f8fafe]">
      {/* Background with torn paper edge */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <SafeImage
          src="/images/case-studies/Background - book a call.png"
          alt="Book a call background"
          fill
          className="object-cover object-top"
        />
      </div>

      <Container className="relative z-10 flex flex-col items-center justify-between gap-12 pt-20 pb-8 md:flex-row md:pt-28 md:pb-12 lg:pt-32 lg:pb-16">
        {/* Left side text and button */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="type-rule-h2 font-heading font-semibold text-white mb-6 md:mb-10">
            Have Questions?
          </h2>
          <Link
            href="/book-a-call"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3 text-[18px] font-bold text-[#11104c] transition-transform hover:scale-105 md:px-8 md:py-4 md:text-[20px]"
          >
            Book a Call
            <ChevronRight className="h-5 w-5 text-[#11104c] transition-transform group-hover:translate-x-1 md:h-6 md:w-6" />
          </Link>
        </div>

        {/* Right side Jeremy image */}
        <div className="relative h-[150px] w-[150px] shrink-0 sm:h-[200px] sm:w-[200px] md:h-[260px] md:w-[260px] lg:h-[320px] lg:w-[320px]">
          <SafeImage
            src="/images/case-studies/Jeremy Image.png"
            alt="Jeremy"
            fill
            className="object-contain"
          />
        </div>
      </Container>
    </section>
  );
}
