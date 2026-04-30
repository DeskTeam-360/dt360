import { Fragment } from "react";
import { homeMarqueeItems } from "@/data/home";

function MarqueeSegment() {
  return (
    <>
      {homeMarqueeItems.map((item) => (
        <Fragment key={item.id}>
          <span className="inline-flex max-w-none shrink-0 items-baseline gap-0 whitespace-nowrap px-6 text-sm font-medium tracking-tight text-white sm:px-10 sm:text-[0.9375rem] md:text-base">
            <span className="font-bold">{item.leadBold}</span>
            <span>{item.rest}</span>
          </span>
          <span
            className="inline-block size-1.5 shrink-0 rounded-full bg-white sm:size-2"
            aria-hidden
          />
        </Fragment>
      ))}
    </>
  );
}

/** Running text gradient — pakai bersama `<section>` Social Proof (bukan landmark sendiri). */
export function SocialProofMarquee() {
  return (
    <div
      role="presentation"
      className="relative mt-10 w-full overflow-hidden sm:mt-12 lg:mt-14"
      style={{
        background: "linear-gradient(to right, #E3058D 0%, #7547C5 100%)",
      }}
    >
      <div className="relative flex w-max py-3 home-marquee-track sm:py-3.5 md:py-4">
        <div className="flex shrink-0 items-center">
          <MarqueeSegment />
        </div>
        <div className="flex shrink-0 items-center" aria-hidden>
          <MarqueeSegment />
        </div>
      </div>
    </div>
  );
}

/** Alias lama untuk impor konsisten opsional */
export function HomeMarquee() {
  return <SocialProofMarquee />;
}
