import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { HeroIllustration } from "./HeroIllustration";

export function DeskTeamHome() {
  return (
    <div className="min-h-screen bg-[#0a1d47] text-white">
      <SiteNavbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(99,102,241,0.18),transparent_55%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10 lg:px-8 lg:py-24">
            <div className="max-w-xl">
              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
                Stop Outsourcing
                <br />
                Start Insourcing
              </h1>
              <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg">
                AI specialists, developers, designers, and video editors — all working together in one office,
                not scattered across Upwork. Flat-rate subscription. US-based account manager. Zero hiring
                headaches. So you never manage another vendor again.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-[#e11d74] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-900/25 transition hover:bg-[#c91662]"
                >
                  Book a call
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  See how it works
                </a>
              </div>
            </div>
            <HeroIllustration />
          </div>
        </section>
      </main>
    </div>
  );
}
