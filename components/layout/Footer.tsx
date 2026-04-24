import Link from "next/link";
import { Container } from "@/components/shared/Container";
import {
  footerCompany,
  footerLegal,
  footerServices,
  footerSocial,
  type FooterSocial,
} from "@/data/footer";
import { siteConfig } from "@/config/site";
import { DeskTeamLogo } from "./DeskTeamLogo";
import { FooterScrollTop } from "./FooterScrollTop";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#11104C] text-white">
      <Container className="relative max-w-7xl pb-8 pt-16 sm:pb-10 sm:pt-20 lg:pb-12 lg:pt-24">
        <FooterScrollTop />

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8 xl:gap-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <DeskTeamLogo />
            <p className="mt-6 max-w-xs text-2xl font-bold leading-tight tracking-tight sm:text-[1.65rem] sm:leading-snug">
              Stop Outsourcing
              <br />
              Start Insourcing
            </p>
          </div>

          <nav aria-label="Services">
            <h3 className="text-base font-bold text-white">Services</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/85 sm:text-[0.9375rem]">
              {footerServices.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="text-base font-bold text-white">Company</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/85 sm:text-[0.9375rem]">
              {footerCompany.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-base font-bold text-white">Follow Us on</h3>
            <ul className="mt-5 flex flex-wrap gap-3" aria-label="Social media">
              {footerSocial.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-11 items-center justify-center rounded-full bg-white text-[#11104C] transition hover:bg-white/90"
                    aria-label={item.label}
                  >
                    <SocialIcon icon={item.icon} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
            <ul className="mt-8 space-y-2.5 text-sm text-white/80">
              {footerLegal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/25 pt-8 text-center text-sm text-white/90 sm:mt-14 sm:pt-9">
          {year} {siteConfig.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

function SocialIcon({ icon, className }: { icon: FooterSocial["icon"]; className?: string }) {
  switch (icon) {
    case "instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    default:
      return null;
  }
}
