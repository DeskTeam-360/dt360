import { Fragment } from "react";
import { homeMarqueeItems } from "@/data/home";

function MarqueeSegment() {
  return (
    <>
      {homeMarqueeItems.map((item) => (
        <Fragment key={item.id}>
          <span className="inline-flex max-w-none shrink-0 items-baseline gap-2 whitespace-nowrap px-6 text-[20px] leading-[30px] font-medium tracking-tight text-white sm:gap-2.5 sm:px-10">
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

/** Running text gradient — use inside `<section>` Social Proof (not its own landmark). */
export function SocialProofMarquee() {
  return (
    <div
      role="presentation"
      className="relative mt-10 w-full overflow-hidden sm:mt-12 lg:mt-14"
      style={{
        background: "linear-gradient(to right, #E3058D 0%, #7547C5 100%)",
      }}
    >
      <div className="relative flex h-[106px] w-max items-center home-marquee-track">
        <div className="flex shrink-0 items-center gap-6 sm:gap-8">
          <MarqueeSegment />
        </div>
        <div className="flex shrink-0 items-center gap-6 sm:gap-8" aria-hidden>
          <MarqueeSegment />
        </div>
      </div>
    </div>
  );
}

/** Legacy alias for optional consistent imports */
export function HomeMarquee() {
  return <SocialProofMarquee />;
}
