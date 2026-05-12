import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { howItWorksRealTeam } from "@/data/howItWorks";

export function HowItWorksRealTeam() {
  const { titleBefore, titleHighlight, bullets, photoSrc, photoAlt, stripMembers } = howItWorksRealTeam;

  return (
    <section className="bg-white pb-0 pt-20 lg:pt-28" aria-labelledby="how-it-works-real-team-heading">
      <Container className="max-w-[1440px] lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,48%)_minmax(0,52%)] lg:gap-16">
          <div>
            <h2 id="how-it-works-real-team-heading" className="type-rule-h2 font-extrabold tracking-tight text-[#101651]">
              {titleBefore}
              <span className="text-[#E3058D]">{titleHighlight}</span>
            </h2>
            <ul className="mt-8 space-y-4">
              {bullets.map((line) => (
                <li key={line} className="flex gap-3 text-lg font-medium leading-snug text-[#2a2f61]">
                  <CircleCheck className="mt-0.5 size-6 shrink-0 fill-[#22c55e] text-white" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="rounded-[28px] bg-gradient-to-br from-[#c026d3] via-[#a855f7] to-[#e11d48] p-[10px] shadow-2xl">
              <div className="overflow-hidden rounded-[22px] bg-[#11104C]">
                <SafeImage
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
        </div>
      </Container>

      <div className="mt-14 bg-gradient-to-r from-[#5b21b6] via-[#7c3aed] to-[#db2777] py-10 lg:py-12">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-8 px-5 lg:gap-12 lg:px-10">
          {stripMembers.map((m) => (
            <div key={m.id} className="flex w-[140px] flex-col items-center text-center sm:w-[150px]">
              <div className="relative size-24 overflow-hidden rounded-full border-4 border-white/90 shadow-lg sm:size-28">
                <Image src={m.imageSrc} alt="" fill className="object-cover" sizes="112px" />
              </div>
              <p className="mt-3 text-sm font-bold tracking-wide text-white">{m.name}</p>
              <p className="mt-1 text-xs font-semibold uppercase leading-tight text-white/85">{m.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
