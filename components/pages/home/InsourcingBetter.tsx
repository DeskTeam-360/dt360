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
  /** Untuk kartu kiri: ilustrasi rata kiri. */
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
          objectPosition === "left" ? "object-left object-top" : "object-center",
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
  const tone = isTallLeft ? "bg-[#1E1D76] shadow-lg shadow-black/20" : toneClass(card.tone);
  const body = (
    <p
      className={cn(
        "text-sm leading-relaxed text-white/90 sm:text-[0.9375rem]",
        isTallLeft ? "text-left" : "text-center",
      )}
    >
      {card.description}
    </p>
  );
  const title = (
    <h3
      className={cn(
        "font-bold leading-snug tracking-tight text-white",
        isTallLeft ? "text-left text-2xl" : "text-center text-xl sm:text-2xl",
      )}
    >
      {card.title}
    </h3>
  );

  return (
    <article
      className={cn(
        tone,
        grid,
        isTallLeft
          ? "grid items-stretch justify-items-stretch gap-5 overflow-visible rounded-3xl p-0 max-lg:grid-rows-[auto_auto] max-lg:gap-5 lg:min-h-[30rem] lg:max-h-[min(42rem,90vh)] lg:grid-rows-2 lg:gap-6 lg:self-start"
          : cn(
              "flex h-full min-h-0 flex-col items-center justify-center overflow-visible p-0 text-center",
              isWideMagenta
                ? "rounded-2xl lg:z-[1] lg:w-[calc(100%+theme(spacing.6)+max(0px,(100vw-80rem)/2))] lg:rounded-l-[1rem] lg:rounded-r-none lg:mr-[calc(-1*(theme(spacing.6)+max(0px,(100vw-80rem)/2))))]"
                : "rounded-2xl lg:rounded-[1rem]",
            ),
      )}
    >
      {card.placement === "tall-left" ? (
        <>
          <div className="relative flex min-h-[14rem] w-full min-w-0 flex-col items-start justify-center self-stretch overflow-visible rounded-t-2xl bg-[#1E1D76] p-0 sm:min-h-[16rem] lg:h-full lg:min-h-0">
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
          <div className="flex w-full min-w-0 flex-col items-start gap-2.5 p-4 lg:gap-3">
            {title}
            {body}
          </div>
        </>
      ) : null}

      {card.placement === "wide-magenta" ? (
        <div className="grid h-full min-h-0 w-full gap-6 lg:min-h-0 lg:grid-cols-2 lg:items-center lg:justify-items-center lg:gap-8">
          <div className="flex min-w-0 max-w-lg flex-col items-center justify-center gap-3 px-2 lg:gap-3.5">
            {title}
            {body}
          </div>
          {card.mediaSrc ? (
            <BentoMedia
              src={card.mediaSrc}
              alt={card.mediaAlt ?? ""}
              className="aspect-[5/4] max-h-[16rem] w-full max-w-md sm:max-h-[17rem] lg:max-h-[15rem] xl:max-h-[17rem]"
              sizes="(max-width: 1024px) 92vw, 440px"
            />
          ) : (
            <div className="aspect-[5/4] max-h-[16rem] rounded-2xl bg-black/10 sm:max-h-[17rem] lg:max-h-[15rem]" aria-hidden />
          )}
        </div>
      ) : null}

      {card.placement === "compact" ? (
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 px-2 lg:gap-3.5">
          {title}
          {body}
        </div>
      ) : null}

      {card.placement === "compact-icon" ? (
        <div className="flex w-full flex-col items-center justify-center gap-3 px-2 lg:gap-3.5">
          {card.mediaSrc ? (
            <BentoMedia
              src={card.mediaSrc}
              alt={card.mediaAlt ?? ""}
              className="aspect-[2.5/1] max-h-[6rem] w-full max-w-xs sm:max-h-[6.5rem] lg:max-h-[6.25rem]"
              sizes="(max-width: 1024px) 88vw, 280px"
            />
          ) : null}
          <div className="flex w-full max-w-md flex-col items-center gap-3 lg:gap-3.5">
            {title}
            {body}
          </div>
        </div>
      ) : null}

      {card.placement === "wide-orange" ? (
        <div className="grid h-full min-h-0 w-full gap-6 lg:grid-cols-2 lg:items-center lg:justify-items-center lg:gap-8">
          <div className="flex min-w-0 max-w-lg flex-col items-center justify-center gap-3 px-2 lg:gap-3.5">
            {title}
            {body}
          </div>
          {card.mediaSrc ? (
            <BentoMedia
              src={card.mediaSrc}
              alt={card.mediaAlt ?? ""}
              className="mx-auto aspect-[4/5] w-full max-w-[13rem] max-h-[17rem] sm:max-w-[14rem] sm:max-h-[18rem] lg:max-h-[16rem] lg:max-w-[15rem] xl:max-h-[18rem] xl:max-w-[16rem]"
              sizes="(max-width: 1024px) 92vw, 280px"
            />
          ) : (
            <div
              className="mx-auto aspect-[4/5] max-h-[17rem] max-w-[13rem] rounded-2xl bg-black/10 sm:max-h-[18rem] sm:max-w-[14rem] lg:mx-0"
              aria-hidden
            />
          )}
        </div>
      ) : null}

      {card.placement === "compact-bottom" ? (
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 px-2 lg:gap-3.5">
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
      className="relative overflow-x-hidden bg-[#11104C] py-16 sm:py-20 lg:py-24"
      aria-labelledby="insourcing-better-heading"
    >
      <Container className="relative max-w-7xl">
        <h2
          id="insourcing-better-heading"
          className="mx-auto max-w-4xl text-center text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]"
        >
          <span className="block">{titleLine1}</span>
          <span className="mt-2 block text-white lg:mt-3">{titleLine2}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-pretty text-center text-base leading-relaxed text-white/85 sm:mt-8 sm:text-lg sm:leading-relaxed">
          {subheading}
        </p>

        {/* Tinggi baris mengikuti konten (auto), bukan min-h / 1fr — hindari grid “melar” tinggi */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-5 lg:items-stretch">
          {cards.map((card) => (
            <BentoCard key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
