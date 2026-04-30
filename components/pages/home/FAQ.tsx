import { Container } from "@/components/shared/Container";

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-[#11104C] py-16 sm:py-20 lg:py-24"
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

      <Container className="max-w-7xl">
        <div className="min-h-[320px]" />
      </Container>
    </section>
  );
}
