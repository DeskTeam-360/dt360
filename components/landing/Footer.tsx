import Link from "next/link";
import {
  footerBrand,
  footerCompanyLinks,
  footerLegalLinks,
  footerServiceLinks,
  footerSocialLinks,
  type SocialNetwork,
} from "./data";
import { LogoMark } from "./LogoMark";

function SocialIcon({ network }: { network: SocialNetwork }) {
  const common = "size-5";
  switch (network) {
    case "instagram":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0 2A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9a3.5 3.5 0 003.5-3.5v-9A3.5 3.5 0 0016.5 4h-9zm4.5 3.25A4.75 4.75 0 1112 17a4.75 4.75 0 010-9.5zm0 2a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5zM17.8 6.3a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M6.5 6.5h2.2V11h5.1V6.5H16v11h-2.2v-5.2H8.7V17.5H6.5V6.5zM4.75 3.5A1.25 1.25 0 103 4.75 1.25 1.25 0 014.75 3.5zM3.5 17.5V7h2.5v10.5H3.5z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M13.5 22v-8.2h2.7l.4-3.2h-3.1V8.6c0-.9.25-1.5 1.6-1.5H17V4.1c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5V11H7v3.2h3V22h3.5z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#060833] text-white">
      <a
        href="#top"
        className="absolute right-4 top-0 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#e11d8c] text-white shadow-lg shadow-pink-900/30 transition hover:bg-[#c9167a] sm:right-8 lg:right-12"
        aria-label="Kembali ke atas"
      >
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pb-12 lg:pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="space-y-5">
            <Link href="#" className="inline-flex items-center gap-2">
              <LogoMark className="size-10" />
              <span className="text-xl font-bold tracking-tight">{footerBrand.name}</span>
            </Link>
            <p className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
              {footerBrand.taglineLine1}
              <br />
              {footerBrand.taglineLine2}
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-bold tracking-wide">Services</h2>
            <ul className="space-y-2.5">
              {footerServiceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition hover:text-white hover:underline underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-bold tracking-wide">Company</h2>
            <ul className="space-y-2.5">
              {footerCompanyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition hover:text-white hover:underline underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-sm font-bold tracking-wide">Follow Us on</h2>
              <ul className="flex gap-3">
                {footerSocialLinks.map((s) => (
                  <li key={s.network}>
                    <Link
                      href={s.href}
                      aria-label={s.label}
                      className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/50 hover:bg-white/10"
                    >
                      <SocialIcon network={s.network} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="flex flex-col gap-2">
              {footerLegalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-slate-400 transition hover:text-slate-200 hover:underline underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-slate-400 underline decoration-slate-500 underline-offset-4">
            {year} {footerBrand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
