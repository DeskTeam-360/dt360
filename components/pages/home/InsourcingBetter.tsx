import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { insourcingBetterSection, type InsourcingBentoCard } from "@/data/home";
import { cn } from "@/lib/utils";

function gridPlacementClass(placement: InsourcingBentoCard["placement"]): string {
  switch (placement) {
    case "tall-left":
      return "lg:col-start-1 lg:row-start-1 lg:row-span-2";
    case "wide-magenta":
      return "lg:col-start-2 lg:col-span-2 lg:row-start-1";
    case "compact":
      return "lg:col-start-2 lg:row-start-2";
    case "compact-icon":
      return "lg:col-start-3 lg:row-start-2";
    case "wide-orange":
      return "lg:col-start-1 lg:col-span-2 lg:row-start-3";
    case "compact-bottom":
      return "lg:col-start-3 lg:row-start-3";
    default:
      return "";
  }
}

function toneClass(tone: InsourcingBentoCard["tone"]): string {
  switch (tone) {
    case "dark":
      return "bg-[#1E1D76] shadow-lg shadow-black/20";
    case "magenta":
      return "bg-[#c90079] shadow-lg shadow-black/25";
    case "orange":
      return "bg-[#f06a44] shadow-lg shadow-black/25";
    default:
      return "";
  }
}

function BentoMedia({
  src,
  alt,
  className,
  sizes,
  priority,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  /** For the left card: align illustration to the left. */
  objectPosition?: "center" | "left";
}) {
  return (
    <div className={cn("relative w-full shrink-0 overflow-visible rounded-2xl bg-transparent", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "rounded-2xl object-contain",
          objectPosition === "left" ? "object-left object-top" : "object-bottom",
        )}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

function BentoCard({ card }: { card: InsourcingBentoCard }) {
  const grid = gridPlacementClass(card.placement);
  const isTallLeft = card.placement === "tall-left";
  const isWideMagenta = card.placement === "wide-magenta";
  const isWideOrange = card.placement === "wide-orange";
  /** Text + photo content only in right white panel; left orange area empty. */
  const isWideOrangeWhitePanel = card.placement === "wide-orange" && card.id === "us-managers";
  const tone = isTallLeft ? "bg-[#1E1D76] shadow-lg shadow-black/20" : toneClass(card.tone);
  const body = (
    <p
      className={cn(
        "type-rule-p text-left text-pretty text-white/90",
        isTallLeft && "max-w-prose",
      )}
    >
      {card.description}
    </p>
  );
  const title = (
    <h4
      className={cn(
        "type-rule-h4 text-left tracking-tight text-balance text-white",
        isTallLeft && "leading-snug lg:leading-tight",
      )}
    >
      {card.title}
    </h4>
  );

  const wideMagentaEmpty =
    isWideMagenta && !card.title && !card.description && !card.mediaSrc;
  const wideOrangeEmpty =
    isWideOrange && !card.title && !card.description && !card.mediaSrc;

  return (
    <article
      className={cn(
        tone,
        grid,
        "relative z-0 origin-center transform-gpu transition-transform duration-300 ease-out hover:z-[8] hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100",
        (isWideMagenta || isWideOrange) && "lg:z-[1] lg:hover:z-[12]",
        isTallLeft
          ? "grid items-stretch justify-items-stretch gap-0 overflow-visible rounded-3xl p-0 pt-4 max-lg:grid-rows-[auto_auto] max-lg:gap-0 sm:pt-5 lg:min-h-0 lg:max-h-[min(42rem,90vh)] lg:grid-rows-[minmax(0,1fr)_auto] lg:gap-0"
          : cn(
              "flex h-full min-h-0 flex-col items-stretch justify-start overflow-visible p-0 text-left",
              isWideMagenta
                ? cn(
                    "rounded-2xl lg:w-[calc(100%+theme(spacing.6)-1em)] lg:rounded-[1rem] lg:mr-[calc(-1*(theme(spacing.6)-1em))]",
                    wideMagentaEmpty && "min-h-[14rem] lg:min-h-[18rem]",
                  )
                : isWideOrange
                  ? cn(
                      "rounded-2xl lg:w-[calc(100%+theme(spacing.6)-1em)] lg:rounded-[1rem] lg:ml-[calc(-1*(theme(spacing.6)-1em))]",
                      wideOrangeEmpty && "min-h-[14rem] lg:min-h-[18rem]",
                    )
                  : "rounded-2xl lg:rounded-[1rem]",
            ),
      )}
    >
      {card.placement === "tall-left" ? (
        <>
          <div className="relative flex min-h-[14rem] w-full min-w-0 flex-col items-start justify-center self-stretch overflow-visible rounded-t-3xl bg-[#1E1D76] p-0 sm:min-h-[16rem] lg:h-full lg:min-h-0">
            {card.mediaSrc ? (
              <BentoMedia
                src={card.mediaSrc}
                alt={card.mediaAlt ?? ""}
                objectPosition="left"
                className="aspect-[16/11] max-h-[18rem] w-full max-w-full sm:max-h-[20rem] lg:aspect-auto lg:h-full lg:min-h-[12rem] lg:max-h-none lg:flex-1"
                sizes="(max-width: 1024px) 92vw, 400px"
                priority
              />
            ) : (
              <div
                className="aspect-[16/11] max-h-[18rem] rounded-xl bg-black/15 sm:max-h-[20rem] lg:flex-1 lg:max-h-none lg:min-h-[12rem]"
                aria-hidden
              />
            )}
          </div>
          <div className="flex w-full min-w-0 flex-col items-start gap-3 px-8 pt-1 pb-6 sm:gap-3.5 sm:pt-0 sm:pb-8 lg:gap-4 lg:px-10 lg:pt-0 lg:pb-9">
            {title}
            {body}
          </div>
        </>
      ) : null}

      {card.placement === "wide-magenta" && (card.title || card.description || card.mediaSrc) ? (
        <div className="box-border flex h-full min-h-0 w-full max-w-6xl min-w-0 flex-1 flex-col items-start justify-start lg:min-h-0">
          <div className="w-full min-w-0 max-w-[min(100%,calc(1440px*0.62))] shrink-0 px-8 py-5 max-lg:pb-3 lg:py-8 lg:px-0 lg:pl-10">
            <div className="grid w-full min-w-0 grid-cols-1 items-start gap-3 max-lg:gap-3 sm:gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
              {(card.title || card.description) && (
                <div className="flex min-w-0 flex-col items-start justify-center gap-3 sm:gap-3.5 lg:gap-4">
                  {card.title ? title : null}
                  {card.description ? body : null}
                </div>
              )}
              {card.mediaSrc ? (
                <div className="relative w-full min-w-0 overflow-visible max-lg:min-h-0 lg:h-full lg:min-h-0">
                  <div className="relative aspect-[16/9] w-full max-lg:aspect-[5/3] lg:absolute lg:top-1/2 lg:left-0 lg:h-full lg:w-full lg:max-w-none lg:-translate-y-1/2 lg:aspect-auto">
                    <Image
                      src={card.mediaSrc}
                      alt={card.mediaAlt ?? ""}
                      fill
                      className="object-contain object-left max-lg:object-center"
                      sizes="(max-width: 1024px) 96vw, 480px"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {card.placement === "compact" ? (
        <div className="flex h-full min-h-0 w-full flex-col items-start justify-center gap-3 px-8 py-6 sm:gap-3.5 sm:py-8 lg:gap-4 lg:px-10 lg:py-8">
          {title}
          {body}
        </div>
      ) : null}

      {card.placement === "compact-icon" ? (
        <div className="flex h-full min-h-0 w-full flex-col items-stretch justify-center gap-3 px-8 py-6 sm:gap-3.5 sm:py-8 lg:gap-4 lg:px-10 lg:py-8">
          {card.mediaSrc ? (
            <div className="flex w-full shrink-0 justify-center">
              <BentoMedia
                src={card.mediaSrc}
                alt={card.mediaAlt ?? ""}
                className="aspect-[2.5/1] max-h-[6rem] w-full max-w-xs sm:max-h-[6.5rem] lg:max-h-[6.25rem]"
                sizes="(max-width: 1024px) 88vw, 280px"
              />
            </div>
          ) : null}
          <div className="flex min-h-0 w-full flex-col items-start gap-3">
            {title}
            {body}
          </div>
        </div>
      ) : null}

      {card.placement === "wide-orange" ? (
        <div
          className={cn(
            "flex min-h-[14rem] h-full w-full flex-1 flex-col lg:min-h-0 lg:flex-row lg:items-stretch",
          )}
        >
         
          {/* Right white block — max-width 62% of 1440px reference container */}
          <div
            className={cn(
              "flex h-full w-full min-w-0 max-w-[min(100%,calc(1440px*0.62))] shrink-0 flex-col px-8 pt-8 lg:px-0 lg:pl-10",
              isWideOrangeWhitePanel && card.mediaSrc ? "pb-0" : "pb-8",
              "min-h-[10rem] sm:min-h-[12rem] lg:min-h-full",
              "rounded-b-[1rem] lg:rounded-b-none lg:rounded-r-[1rem]",
            )}
          >
            <div className="flex h-full min-h-0 w-full flex-1 flex-col">
              {isWideOrangeWhitePanel && card.mediaSrc ? (
                <div className="grid h-full min-h-0 w-full min-w-0 flex-1 grid-cols-1 grid-rows-[auto_minmax(14rem,1fr)] items-stretch gap-6 sm:gap-6 lg:grid-cols-2 lg:grid-rows-none lg:gap-8">
                  <div className="flex min-h-0 min-w-0 flex-col justify-center gap-3 pb-8 sm:gap-3.5 lg:gap-4 lg:pb-8">
                    {card.title ? (
                      <h4 className="type-rule-h4 text-left tracking-tight text-balance text-white">
                        {card.title}
                      </h4>
                    ) : null}
                    {card.description ? (
                      <p className="type-rule-p text-left text-pretty text-white/90">{card.description}</p>
                    ) : null}
                  </div>
                  <div className="relative min-h-[14rem] w-full min-w-0 self-stretch overflow-visible lg:h-full lg:min-h-0">
                    <Image
                      src={card.mediaSrc}
                      alt={card.mediaAlt ?? ""}
                      fill
                      className="object-contain object-bottom"
                      sizes="(max-width: 1024px) 96vw, 480px"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid h-full min-h-[8rem] grid-cols-1 gap-0 lg:grid-cols-2">
                  <div className="bg-[#f5f7ff]" aria-hidden />
                  <div className="bg-[#eef2ff]" aria-hidden />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {card.placement === "compact-bottom" ? (
        <div className="flex h-full min-h-0 w-full flex-col items-start justify-center gap-3 px-8 py-6 sm:gap-3.5 sm:py-8 lg:gap-4 lg:px-10 lg:py-8">
          {title}
          {body}
        </div>
      ) : null}
    </article>
  );
}

export function InsourcingBetter() {
  const { titleLine1, titleLine2, subheading, cards } = insourcingBetterSection;

  return (
    <section
      id="insourcing-better"
      className="relative overflow-x-hidden bg-[#11104C] py-16 sm:py-20 lg:pt-24 lg:pb-[200px]"
      aria-labelledby="insourcing-better-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(56rem_34rem_at_-10%_34%,rgba(96,118,255,0.48)_0%,rgba(56,79,214,0.28)_36%,rgba(17,16,76,0)_69%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-3 z-0 hidden justify-between px-0 sm:top-5 lg:flex">
        <Image
          src="/images/home-InsourcingBetter-title-left.png"
          alt=""
          width={220}
          height={180}
          className="-translate-x-[40px] translate-y-[40px] opacity-95"
          aria-hidden
        />
        <Image
          src="/images/home-InsourcingBetter-title-right.png"
          alt=""
          width={180}
          height={180}
          className="translate-x-[40px] opacity-95"
          aria-hidden
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-0 hidden justify-between px-0 sm:bottom-8 lg:flex">
        <Image
          src="/images/home-InsourcingBetter-bottom-left.png"
          alt=""
          width={180}
          height={180}
          className="translate-x-[100px] opacity-95"
          aria-hidden
        />
        <Image
          src="/images/home-InsourcingBetter-bottom-right.png"
          alt=""
          width={180}
          height={180}
          className="-translate-x-[40px] opacity-95"
          aria-hidden
        />
      </div>
      <Container className="relative max-w-7xl">
        <h2
          id="insourcing-better-heading"
          className="mx-auto max-w-4xl text-center tracking-tight text-white"
        >
          <span className="block">{titleLine1}</span>
          <span className="mt-2 block text-white lg:mt-3">{titleLine2}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-6xl text-pretty text-center text-base leading-relaxed text-white/85 sm:mt-8 sm:text-lg sm:leading-relaxed">
          {subheading}
        </p>

        {/* Row height follows content (auto), not min-h / 1fr — avoid stretched grid rows */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-5 lg:items-stretch">
          {cards.map((card) => (
            <BentoCard key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
