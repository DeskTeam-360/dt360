import Image from "next/image";
import { Fragment } from "react";
import { CircleCheck } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { MarketingSafeImage } from "@/components/shared/MarketingSafeImage";
import { howItWorksRealTeam } from "@/data/howItWorks";
import { cn } from "@/lib/utils";

const planCards = [
  {
    label: "Every plan\nincludes:",
    bg: "#4F0FB3",
    type: "label" as const,
  },
  {
    label: "1 North American\nAccount Manager.",
    imageSrc: "/images/Strip Row - JD.png",
    bg: "#6312AD",
    type: "card" as const,
  },
  {
    label: "1 Team Leader.",
    imageSrc: "/images/How it works - TL Strip.png",
    bg: "#8815A2",
    type: "card" as const,
  },
  {
    label: "2 Designers\n2 Developers\n2 Technical VAs",
    imageSrc: "/images/How it works - Dev Strip.png",
    bg: "#A4199A",
    type: "card" as const,
  },
  {
    label: "Plus weekly AMA\ncalls with Jeremy\nKenerson.",
    imageSrc: "/images/Strip Row - Jeremy.png",
    bg: "#E43775",
    type: "card" as const,
  },
];

export function HowItWorksRealTeam() {
  const { titleLine1, titleLine2, titleLine3, quote, bullets, photoSrc, photoAlt } = howItWorksRealTeam;

  return (
    <div className="bg-transparent pb-0 pt-8 lg:pt-28">
      <Container className="max-w-[1440px] lg:px-10">
        <div className="grid items-stretch gap-12 lg:grid-cols-[minmax(0,48%)_minmax(0,52%)] lg:gap-16">
          <div>
            <h2
              id="how-it-works-real-team-heading"
              className="tracking-tight text-center lg:text-left"
            >
              <span className="block type-rule-h2 text-[#101651]">{titleLine1}</span>
              <span className="block type-rule-h2 text-[#7547C5]">{titleLine2}</span>
              <span className="block type-rule-h2 text-[#E3058D]">{titleLine3}</span>
            </h2>
            <ul className="mt-8 space-y-4">
              {bullets.map((line) => (
                <li key={line} className="type-rule-p flex gap-3 text-[#2a2f61]">
                  <CircleCheck className="mt-0.5 size-6 shrink-0 fill-[#22c55e] text-white" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex h-full flex-col justify-end gap-6">
            {/* Quote row */}
            <div className="flex items-stretch gap-0 rounded-xl bg-transparent px-6 py-5">
              <div className="w-1 shrink-0 rounded-full bg-[#ED63B7]" />
              <p className="pl-5 text-[18px] font-bold leading-[1.6] text-[#11104C]">
                {quote}
              </p>
            </div>

            {/* Photo */}
            <div className="overflow-hidden rounded-[22px] shadow-none">
              <MarketingSafeImage
                src={photoSrc}
                alt={photoAlt}
                width={900}
                height={600}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Every plan includes — cards row */}
      <Container className="mt-14 max-w-[1440px] px-5 lg:px-10">
        <div className="relative flex flex-col lg:flex-row lg:items-stretch">
          {planCards.map((card, i) => (
            <Fragment key={i}>
              <div
                className={cn(
                  "relative flex min-h-0 w-full flex-col items-center justify-center gap-3 rounded-[20px] px-5 py-5 text-center text-white",
                  "lg:min-w-0 lg:flex-row lg:items-center lg:gap-3 lg:text-left",
                  card.type === "label"
                    ? "font-bold lg:flex-[0.6] lg:px-3 lg:py-6"
                    : "lg:flex-1 lg:px-4 lg:py-6",
                )}
                style={{ backgroundColor: card.bg }}
              >
                {i > 0 ? (
                  <div
                    className="pointer-events-none absolute top-[15%] left-0 z-10 hidden h-[70%] w-[2px] -translate-x-1/2 rounded-full bg-white lg:block"
                    aria-hidden
                  />
                ) : null}
                {card.type === "card" && card.imageSrc && (
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-full lg:size-14">
                    <Image src={card.imageSrc} alt="" fill className="object-cover" sizes="64px" />
                  </div>
                )}
                <span className="text-[18px] font-bold leading-tight whitespace-pre-line">
                  {card.label}
                </span>
              </div>
              {i < planCards.length - 1 ? (
                <div
                  className="mx-auto h-[2px] w-[70%] shrink-0 rounded-full bg-white lg:hidden"
                  aria-hidden
                />
              ) : null}
            </Fragment>
          ))}
        </div>
      </Container>
    </div>
  );
}
