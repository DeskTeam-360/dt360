import Image from "next/image";
import { contactOfficeHours } from "@/data/contact";

const CARD_BG = "bg-[rgba(255,255,255,0.6)]";

export function ContactOfficeHours() {
  const { titleLine1, titleLine2, daysLabel, hoursLine1, hoursLine2, calendarIconSrc, clockIconSrc } =
    contactOfficeHours;

  return (
    <article
      className={`relative overflow-hidden rounded-[24px] shadow-[0_8px_40px_rgba(17,16,76,0.08)] ${CARD_BG}`}
    >
      <div
        className="pointer-events-none absolute top-1/2 left-0 z-10 h-[215px] w-[25px] -translate-y-1/2 rounded-r-[15px] bg-[#e3058d] md:w-[39px]"
        aria-hidden
      />
      <div className="relative z-20 grid items-stretch gap-8 py-10 [padding-inline:calc(var(--spacing)*10)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-10 md:py-12 md:[padding-inline:calc(var(--spacing)*20)] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.4fr)] lg:gap-10">
        <h2 className="font-[var(--font-poppins)] text-[40px] font-bold leading-tight text-[#11104C] sm:text-[48px] md:self-center">
          <span className="lg:hidden">
            {titleLine1} {titleLine2}
          </span>
          <span className="hidden lg:block">
            <span className="block">{titleLine1}</span>
            <span className="block">{titleLine2}</span>
          </span>
        </h2>

        <div className="hidden w-px shrink-0 self-stretch bg-[#D1D5DB] lg:block" aria-hidden />

        <div className="space-y-6 md:col-start-2 md:row-start-1 lg:col-start-3 lg:row-start-1">
          <div className="flex items-center gap-4">
            <Image
              src={calendarIconSrc}
              alt=""
              width={48}
              height={48}
              className="size-10 shrink-0 object-contain sm:size-12"
              aria-hidden
            />
            <p className="font-[var(--font-montserrat)] text-[22px] font-bold leading-snug text-[#11104C] sm:text-[24px]">
              {daysLabel}
            </p>
          </div>
          <div className="flex items-start gap-4">
            <Image
              src={clockIconSrc}
              alt=""
              width={48}
              height={48}
              className="size-10 shrink-0 object-contain sm:size-12"
              aria-hidden
            />
            <div className="font-[var(--font-montserrat)] text-[18px] font-semibold leading-[1.6] text-[#2a2f61] sm:text-[20px]">
              <p>{hoursLine1}</p>
              <p>{hoursLine2}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
