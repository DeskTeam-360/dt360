import { companyContact } from "@/data/companyContact";
import { contactCompanyDetails } from "@/data/contact";

const CARD_BG = "bg-[rgba(255,255,255,0.6)]";

/** F14 — official public contact details on /contact. */
export function ContactCompanyDetails() {
  return (
    <article
      className={`relative overflow-hidden rounded-[24px] shadow-[0_8px_40px_rgba(17,16,76,0.08)] ${CARD_BG}`}
      aria-labelledby="contact-company-heading"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-0 z-10 h-[215px] w-[25px] -translate-y-1/2 rounded-r-[15px] bg-[#00c8f4] md:w-[39px]"
        aria-hidden
      />
      <div className="relative z-20 space-y-4 py-10 [padding-inline:calc(var(--spacing)*10)] md:py-12 md:[padding-inline:calc(var(--spacing)*20)]">
        <h2
          id="contact-company-heading"
          className="font-[var(--font-poppins)] text-[40px] font-bold leading-tight text-[#11104C] sm:text-[48px]"
        >
          {contactCompanyDetails.heading}
        </h2>
        <p className="font-[var(--font-montserrat)] text-[20px] font-bold text-[#11104C]">
          {companyContact.name}
        </p>
        <ul className="space-y-2 font-[var(--font-montserrat)] text-[18px] font-medium leading-[1.6] text-[#2a2f61]">
          <li>{companyContact.publicLocation}</li>
          <li>
            <a href={companyContact.phoneHref} className="transition hover:text-[#11104C]">
              {companyContact.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={companyContact.emailHref} className="transition hover:text-[#11104C]">
              {companyContact.emailDisplay}
            </a>
          </li>
        </ul>
      </div>
    </article>
  );
}
