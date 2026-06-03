import { MarketingSafeImage } from "@/components/shared/MarketingSafeImage";
import { howItWorksTaskSection } from "@/data/howItWorks";

export function HowItWorksTaskVideo() {
  const { video } = howItWorksTaskSection;
  const {
    ornamentLeftSrc,
    ornamentLeftAlt,
    ornamentRightSrc,
    ornamentRightAlt,
    embedSrc,
    ariaLabel,
  } = video;

  return (
    <div
      id="how-it-works-video"
      className="relative mx-auto w-full max-w-[860px] scroll-mt-28"
    >
      {/* Ornaments — anchor ke viewport (bukan container 860px) */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-[1] hidden h-full w-screen -translate-x-1/2 md:block"
        aria-hidden
      >
        <div
          className="absolute w-[482px] max-w-[482px]"
          style={{ left: "-11em", top: "10em" }}
        >
          <MarketingSafeImage
            src={ornamentLeftSrc}
            alt={ornamentLeftAlt}
            width={482}
            height={475}
            className="h-auto w-full object-contain"
            sizes="482px"
          />
        </div>

        <div
          className="absolute w-[752px] max-w-[752px]"
          style={{ bottom: 0, right: "-22em" }}
        >
          <MarketingSafeImage
            src={ornamentRightSrc}
            alt={ornamentRightAlt}
            width={752}
            height={743}
            className="h-auto w-full object-contain"
            sizes="752px"
          />
        </div>
      </div>

      <div className="relative z-10 w-full overflow-hidden rounded-[20px] shadow-[0_24px_64px_rgba(0,0,0,0.38)]">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 size-full border-0"
            src={embedSrc}
            allowFullScreen
            allow="clipboard-write"
            title={ariaLabel}
          />
        </div>
      </div>
    </div>
  );
}
