import Image from "next/image";
import Link from "next/link";
import { ServicesFloatingFeaturesBar } from "@/components/pages/services/ServicesFloatingFeaturesBar";
import { ServicesFaqSection } from "@/components/pages/services/ServicesFaqSection";
import { ServicesHowItWorks } from "@/components/pages/services/ServicesHowItWorks";
import { ServicesPricingSection } from "@/components/pages/services/ServicesPricingSection";
import { ServicesTestimonialsCarousel } from "@/components/pages/services/ServicesTestimonialsCarousel";
import { servicesTestimonials } from "@/data/servicesPage";

const platformLogos = [
  { src: "/images/dt360-wordpress-logo.png", alt: "WordPress", width: 218, height: 53 },
  { src: "/images/dt360-webflow-logo.png", alt: "Webflow", width: 211, height: 50 },
  { src: "/images/dt360-gohighlevel-logo.png", alt: "GoHighLevel", width: 79, height: 54 },
  { src: "/images/dt360-woocommerce-logo.png", alt: "WooCommerce", width: 170, height: 48 },
  { src: "/images/dt360-shopify-logo.png", alt: "Shopify", width: 130, height: 53 },
];

const coreServices = [
  {
    no: "01",
    title: "Web Design & Development",
    bg: "from-[#7c3aed] via-[#3b2e95] to-[#081c73]",
    icon: "/images/dt360-web-dev-logo.png",
    href: "#",
  },
  { no: "02", title: "Graphic Design", bg: "from-[#f9b15e] via-[#ef8a3a] to-[#db6e2f]", icon: "/images/dt360-graphic-design-logo.png", href: "#" },
  { no: "03", title: "Video Editing", bg: "from-[#ea4b99] via-[#8d3d9f] to-[#162d7e]", icon: "/images/dt360-video-editing-logo.png", href: "#" },
  { no: "04", title: "Email & Funnels", bg: "from-[#5fc7c6] via-[#2f9faa] to-[#0e6284]", icon: "/images/dt360-email-funnel-logo.png", href: "#" },
  { no: "05", title: "CRM & Automation", bg: "from-[#8f6ef3] via-[#5144b8] to-[#1a2d83]", icon: "/images/dt360-crm-logo.png", href: "#" },
  {
    no: "06",
    title: "Social Media Content",
    bg: "from-[#f7b462] via-[#ec8d45] to-[#de6f31]",
    icon: "/images/dt360-social-media-content-logo.png",
    href: "#",
  },
  {
    no: "07",
    title: "Website Maintenance",
    bg: "from-[#64ade5] via-[#2c7ec7] to-[#0a4f96]",
    icon: "/images/dt360-website-maintenance-logo.png",
    href: "#",
  },
  { no: "08", title: "AI & Automation", bg: "from-[#a07af5] via-[#6546bd] to-[#36246f]", icon: "/images/dt360-ai-automation-logo.png", href: "#" },
  { no: "09", title: "White label (for Agencies)", bg: "from-[#ec85c8] via-[#9155b2] to-[#16307c]", icon: "/images/dt360-whitelabel-logo.png", href: "#" },
];

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
  "pointer-events-none absolute z-0 h-[28%] min-h-[76px] w-[38%] min-w-[108px] bg-[color-mix(in_oklab,#ffffff82_24%,transparent)] backdrop-blur-[1px] lg:h-[26%] lg:w-[36%]";

export default function ServicesPage() {
  return (
    <main className="relative bg-white">
      {/* Hero: platforms card moved; keep vertical overflow visible */}
      <section className="relative isolate z-10 overflow-x-hidden px-5 pb-[40px] pt-[60px] md:px-10 lg:px-10 lg:pb-[80px] lg:pt-[120px]">
        <Image
          src="/images/dt360-bg-hero-section.png"
          alt=""
          fill
          priority
          className="object-cover object-bottom"
          style={{ objectPosition: "bottom center" }}
        />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-6">
          <div className="max-w-xl text-white">
            <h1 className="text-[70px] font-extrabold leading-[1.05] tracking-tight">
              <span className="text-[#f336b6]">All Services</span>
              <br />
              One Team
              <br />
              One Flat Rate
            </h1>
            <p className="mt-6 text-2xl font-semibold leading-snug text-white/95">
            Stop Paying $50/hr for Web Work That Takes 3 Weeks
            </p>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/85">
            There&apos;s a better way to get web work done. Not cheaper freelancers. Not a retainer agency with a 10-person email chain. A flat-rate, dedicated web team that knows your brand and turns tasks around in 1-3 days.
            </p>
          </div>
          <div
            className="relative z-[1300] mx-auto mb-[-65px] w-full self-end lg:mx-0 lg:w-[50%]"
          >
            <Image
              src="/images/dt360-service-hero-image.png"
              alt="DT360 services team illustration"
              width={736}
              height={758}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* Bridge between hero & section 2: keep z-20 > z-10 above white layer */}
      <div className="relative z-20 -mt-[72px] px-5 md:px-10 lg:-mt-[88px] lg:px-10">
        <div className="mx-auto w-full max-w-6xl rounded-[28px] border border-[#d8dbef] bg-white p-[40px] shadow-[0_0_22px_rgba(189,200,252,0.75),0_16px_40px_rgba(16,22,81,0.18)]">
          <h2 className="text-center text-2xl font-extrabold tracking-[0.14em] text-[#3f4f9a]">
            PLATFORMS SUPPORTED
          </h2>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-[40px] lg:flex-nowrap">
            {platformLogos.map((logo) => (
              <div
                key={logo.alt}
                className="flex min-w-0 flex-1 basis-[calc(50%-20px)] items-center justify-center sm:basis-[160px] lg:basis-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 160px, 45vw"
                  className="h-12 w-full object-contain object-center transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 sm:h-14"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="relative z-10 mt-[-76px] overflow-x-hidden bg-white px-5 pb-[80px] pt-[148px] md:px-10 md:pt-[160px] lg:px-10 lg:pb-[80px] lg:pt-[180px]">
        <Image
          src="/images/dt360-topbubble.png"
          alt=""
          width={540}
          height={714}
          className="pointer-events-none absolute right-0 top-0 h-auto w-[260px] opacity-95 md:w-[340px] lg:w-[440px]"
        />
        <Image
          src="/images/dt360-bottom-bubble.png"
          alt=""
          width={382}
          height={576}
          className="pointer-events-none absolute bottom-0 left-0 h-auto w-[220px] opacity-95 md:w-[280px] lg:w-[340px]"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-[64px] font-extrabold leading-tight tracking-tight text-[#101651]">
              <span className="text-[#ef2fa9]">Core Services,</span> Everything<br />You Need to Scale
            </h2>
            <p className="mt-4 text-xl font-semibold text-[#1a1a1a]">
              Pick the plan that fits. We handle the rest.
            </p>
          </div>

          <div className="mt-12 grid auto-rows-fr grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
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
                        ? "relative z-10 flex h-full min-h-0 flex-col"
                        : "flex h-full min-h-0 flex-col"
                    }
                  >
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-black/25 text-2xl font-extrabold leading-none">
                      {service.no}
                    </span>
                    <div className="mt-6 flex h-[200px] w-full items-center justify-center">
                      <Image
                        src={service.icon}
                        alt={`${service.title} icon`}
                        width={200}
                        height={200}
                        className="h-[200px] w-[200px] object-contain transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-110 group-hover:rotate-2"
                      />
                    </div>
                    <h3 className="mt-6 max-w-[14ch] text-[36px] font-bold leading-tight">{service.title}</h3>
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

      <div className="py-[80px]">
        <ServicesFloatingFeaturesBar />
      </div>

      <section
        className="relative z-10 overflow-x-hidden bg-white pb-[80px] pt-[220px] md:pb-[90px] md:pt-[230px] lg:pb-[100px] lg:pt-[240px]"
        aria-labelledby="services-testimonials-heading"
      >
        <div
          className="pointer-events-none absolute left-[-240px] top-[-220px] aspect-square h-[90%] rounded-full bg-[radial-gradient(circle,rgba(170,239,255,0.85)_0%,rgba(170,239,255,0.35)_45%,rgba(170,239,255,0)_75%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 text-center md:px-10 lg:px-10">
          <h2 id="services-testimonials-heading" className="text-[64px] font-extrabold leading-tight tracking-tight text-[#101651]">
            <span className="text-[#ef2fa9]">Proven Results</span>
            <br />
            Real Business
          </h2>
        </div>
        <ServicesTestimonialsCarousel items={servicesTestimonials} />
      </section>

      <ServicesHowItWorks />

      <ServicesPricingSection />

      <ServicesFaqSection />
    </main>
  );
}
