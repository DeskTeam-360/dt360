import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function HaveQuestionsCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-[10px]">
      {/* Gradient CTA — height follows content; image cropped at bottom (no white fringe) */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <SafeImage
            src="/images/case-studies/Background - book a call.png"
            alt=""
            fill
            unoptimized
            className="scale-[1.03] object-cover object-top"
            sizes="100vw"
            aria-hidden
          />
        </div>

        <Container className="relative z-10 flex flex-col items-center gap-10 px-6 pb-12 pt-35 sm:gap-12 md:flex-row md:items-center md:justify-between md:gap-12 md:px-8 md:py-0 md:pt-28 md:pb-14 lg:px-12 lg:pt-32 lg:pb-16">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h2 className="type-rule-h2 mb-6 font-heading font-semibold text-white md:mb-4">
              Have Questions?
            </h2>
            <p className="type-rule-p mb-6 max-w-[44rem] text-white/90 md:mb-8">
              Let&apos;s map out the tasks you want off your plate. Book a short, no-obligation call
              to see how our flat-rate team can fit into your workflow.
            </p>
            <Link
              href="/book-a-call"
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3 text-[18px] font-bold text-[#11104c] transition-transform hover:scale-105 md:px-8 md:py-4 md:text-[20px]"
            >
              Book a Call
              <ChevronRight className="h-5 w-5 text-[#11104c] transition-transform group-hover:translate-x-1 md:h-6 md:w-6" />
            </Link>
          </div>

          <div className="relative mx-auto h-[150px] w-[150px] shrink-0 sm:h-[200px] sm:w-[200px] md:mx-0 md:h-[260px] md:w-[260px] lg:h-[320px] lg:w-[320px]">
            <SafeImage
              src="/images/case-studies/Jeremy Image.png"
              alt="Jeremy"
              fill
              className="object-contain"
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
