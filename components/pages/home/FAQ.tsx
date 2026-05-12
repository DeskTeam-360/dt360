import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { faqSection } from "@/data/home";
import { FAQAccordionList } from "./FAQAccordionList";

export function FAQ() {
  const { headingStart, headingHighlight, items } = faqSection;

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-[#11104C] py-20 sm:py-24 lg:py-[122px]"
      aria-label="Frequently asked questions"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[902px] w-[921px] -translate-x-[72%] -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(237,141,83,0.4) 0%, rgba(244,142,80,0) 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 -z-[1] h-[1411px] w-[1382px] translate-x-[38%] translate-y-[42%]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,200,244,0.4) 0%, rgba(1,211,252,0) 100%)",
        }}
        aria-hidden
      />

      <Container className="relative z-[1] max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="order-2 lg:order-1">
            <Image
              src="/images/home-faq-imageleft1.png"
              alt="FAQ illustration with design and development tools."
              width={900}
              height={980}
              className="h-auto w-full max-w-[34rem]"
              sizes="(max-width: 1024px) 90vw, 560px"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-balance text-white">
              <span>{headingStart} </span>
              <span className="text-[#E3058D]">{headingHighlight}</span>
            </h2>

            <FAQAccordionList items={items} />
          </div>
        </div>
      </Container>
    </section>
  );
}
