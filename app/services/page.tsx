import Image from "next/image";
import Link from "next/link";
import { ServicesPlatformsSupportedBridge } from "@/components/pages/services/ServicesPlatformsSupportedBridge";
import { ServicesFloatingFeaturesBar } from "@/components/pages/services/ServicesFloatingFeaturesBar";
import { ServicesFaqSection } from "@/components/pages/services/ServicesFaqSection";
import { ServicesHowItWorks } from "@/components/pages/services/ServicesHowItWorks";
import { ServicesPricingSection } from "@/components/pages/services/ServicesPricingSection";
import { SocialProofTestimonialCarousel } from "@/components/pages/home/SocialProofTestimonialCarousel";
import { getHomeTestimonials } from "@/lib/wordpress";

/** Asset filename: `Service Box - {title}.webp` — encode for a safe URL (spaces, parentheses, etc.) */
function serviceBoxWebpPath(serviceTitle: string) {
  return `/images/${encodeURIComponent(`Service Box - ${serviceTitle}.webp`)}`;
}

const coreServiceCards = [
  {
    no: "01",
    title: "Web Design & Development",
    bg: "from-[#7c3aed] via-[#3b2e95] to-[#081c73]",
    href: "/services/web-design-development",
  },
  {
    no: "02",
    title: "Graphic Design",
    bg: "from-[#f9b15e] via-[#ef8a3a] to-[#db6e2f]",
    href: "/services/graphic-design",
  },
  {
    no: "03",
    title: "Video Editing",
    bg: "from-[#ea4b99] via-[#8d3d9f] to-[#162d7e]",
    href: "/services/video-editing",
  },
  {
    no: "04",
    title: "Email & Funnels",
    bg: "from-[#5fc7c6] via-[#2f9faa] to-[#0e6284]",
    href: "/services/email-funnels",
  },
  {
    no: "05",
    title: "CRM & Automation",
    bg: "from-[#8f6ef3] via-[#5144b8] to-[#1a2d83]",
    href: "/services/crm-automation",
  },
  {
    no: "06",
    title: "Social Media Content",
    bg: "from-[#f7b462] via-[#ec8d45] to-[#de6f31]",
    href: "/services/social-media-content",
  },
  {
    no: "07",
    title: "Website Maintenance",
    bg: "from-[#64ade5] via-[#2c7ec7] to-[#0a4f96]",
    href: "/services/website-maintenance",
  },
  {
    no: "08",
    title: "AI & Automation",
    bg: "from-[#a07af5] via-[#6546bd] to-[#36246f]",
    href: "/services/ai-automation",
  },
  {
    no: "09",
    title: "White Label (for Agencies)",
    bg: "from-[#ec85c8] via-[#9155b2] to-[#16307c]",
    href: "/services/white-label",
  },
] as const;

const coreServices = coreServiceCards.map((s) => ({
  ...s,
  icon: serviceBoxWebpPath(s.title),
}));

/** White overlay position + corner radius pointing toward card center */
const SERVICE_OVERLAY_POSITION_CLASS: Partial<Record<string, string>> = {
  "04": "bottom-0 right-0 rounded-tl-[52px] md:rounded-tl-[58px]",
  "05": "top-0 right-0 rounded-bl-[52px] md:rounded-bl-[58px]",
  "06": "bottom-0 right-0 rounded-tl-[52px] md:rounded-tl-[58px]",
  "07": "top-0 right-0 rounded-bl-[52px] md:rounded-bl-[58px]",
  "08": "bottom-0 right-0 rounded-tl-[52px] md:rounded-tl-[58px]",
  "09": "bottom-0 left-0 rounded-tr-[52px] md:rounded-tr-[58px]",
};

const OVERLAY_LAYER_CLASS =
  "pointer-events-none absolute z-0 h-[28%] min-h-[76px] w-[38%] min-w-[108px] bg-[color-mix(in_oklab,#ffffff82_24%,transparent)] backdrop-blur-[1px] xl:h-[26%] xl:w-[36%]";

/** ISR — testimonial carousel stays in sync with WP (same as homepage). */
export const revalidate = 600;

export default async function ServicesPage() {
  const testimonials = await getHomeTestimonials();

  return (
    <main className="relative min-w-0 overflow-x-hidden bg-white">
      {/* Hero: platforms card moved; keep vertical overflow visible */}
      <section className="relative isolate z-10 overflow-x-hidden px-5 pb-[130px] pt-30 md:px-10 sm:pt-32 xl:px-10 xl:pb-[80px] xl:pt-[120px] min-[2560px]:pb-[64px]">
        <Image
          src="/images/dt360-bg-hero-section.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_100%] min-[2560px]:object-[50%_92%]"
        />
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-10 xl:flex-row xl:items-center xl:gap-6">
          <div className="max-w-xl text-white">
            <h1 className="type-rule-h1 font-extrabold leading-[1.05] tracking-tight text-white">
              <span className="text-[#f336b6]">All Services</span>
              <br />
              One Team
              <br />
              One Flat Rate
            </h1>
            <p className="mt-6 text-2xl font-semibold leading-snug text-white/95 text-balance">
              Stop Paying $50/hr for Web&nbsp;Work That Takes 3&nbsp;Weeks
            </p>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/85 pb-12">
            There&apos;s a better way to get web work done. Not cheaper freelancers. Not a retainer agency with a 10-person email chain. A flat-rate, dedicated web team that knows your brand and turns tasks around in 1-3 days.
            </p>
          </div>
          <div
            className="relative z-[1300] mx-auto mb-[-65px] w-full self-end xl:mx-0 xl:w-[50%]"
          >
            <Image
              src="/images/Main Service - Hero.png"
              alt="DT360 services team illustration"
              width={736}
              height={758}
              priority
              sizes="(max-width: 1279px) 100vw, 736px"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <ServicesPlatformsSupportedBridge />

      <section className="relative z-10 mt-[-76px] overflow-x-hidden bg-white px-5 pb-[80px] pt-[148px] md:px-10 md:pt-[160px] xl:px-10 xl:pb-[80px] xl:pt-[180px]">
        <Image
          src="/images/dt360-topbubble.png"
          alt=""
          width={540}
          height={714}
          className="pointer-events-none absolute right-0 top-0 h-auto w-[260px] opacity-95 md:w-[340px] xl:w-[440px]"
        />
        <Image
          src="/images/dt360-bottom-bubble.png"
          alt=""
          width={382}
          height={576}
          className="pointer-events-none absolute bottom-0 left-0 h-auto w-[220px] opacity-95 md:w-[280px] xl:w-[340px]"
        />

        <div className="relative mx-auto max-w-[1440px]">
          <div className="text-center">
            <h2 className="font-extrabold leading-tight tracking-tight text-[#101651]">
              <span className="text-[#E3058D]">Core Services,</span> Everything<br />You Need to Scale
            </h2>
            <p className="mt-4 text-xl font-semibold text-[#1a1a1a]">
              Pick the plan that fits. We handle the rest.
            </p>
          </div>

          <div className="mt-12 grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
            {coreServices.map((service, index) => {
              const overlayPosition = SERVICE_OVERLAY_POSITION_CLASS[service.no];
              return (
                <article
                  key={service.no}
                  className={`group flex h-full flex-col rounded-[70px] bg-gradient-to-b p-8 text-white transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] ${
                    index % 2 === 0 ? "rounded-tl-none rounded-br-none" : "rounded-tr-none rounded-bl-none"
                  } ${overlayPosition ? "relative overflow-hidden" : ""} ${service.bg}`}
                >
                  {overlayPosition && (
                    <div className={`${OVERLAY_LAYER_CLASS} ${overlayPosition}`} aria-hidden />
                  )}
                  <div
                    className={
                      overlayPosition
                        ? "relative z-10 flex h-full min-h-0 flex-col max-md:items-center md:items-start"
                        : "flex h-full min-h-0 flex-col max-md:items-center md:items-start"
                    }
                  >
                    <div className="mt-6 flex h-[200px] w-full items-center justify-center">
                      <Image
                        src={service.icon}
                        alt={`${service.title} icon`}
                        width={200}
                        height={200}
                        sizes="200px"
                        className="h-[200px] w-[200px] object-contain transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-110 group-hover:rotate-2"
                      />
                    </div>
                    <h4 className="mt-6 text-center font-bold leading-tight md:text-left">{service.title}</h4>
                    <Link
                      href={service.href}
                      className="mt-auto w-fit pt-3 text-[18px] font-semibold transition duration-300 ease-out hover:translate-x-1"
                    >
                      View Service &gt;&gt;
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <div className="py-8 md:py-[80px]">
        <ServicesFloatingFeaturesBar />
      </div>

      <section
        className="relative z-10 overflow-x-hidden bg-white pb-[80px] pt-[220px] md:pb-[90px] md:pt-[230px] xl:pb-[100px] xl:pt-[240px]"
        aria-labelledby="services-testimonials-heading"
      >
        <div
          className="pointer-events-none absolute left-[-240px] top-[-220px] aspect-square h-[90%] rounded-full bg-[radial-gradient(circle,rgba(170,239,255,0.85)_0%,rgba(170,239,255,0.35)_45%,rgba(170,239,255,0)_75%)] min-[2560px]:top-[-10px] min-[2560px]:aspect-auto min-[2560px]:h-full min-[2560px]:w-[45vw]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1440px] px-5 text-center md:px-10 xl:px-10">
          <h2 id="services-testimonials-heading" className="font-extrabold leading-tight tracking-tight text-[#101651]">
            <span className="text-[#E3058D]">Proven Results</span>
            <br />
            Real Business
          </h2>
        </div>
        <div className="mt-10 w-full md:mt-12">
          <SocialProofTestimonialCarousel items={testimonials} />
        </div>
      </section>

      <ServicesHowItWorks />

      <ServicesPricingSection />

      <ServicesFaqSection />
    </main>
  );
}
