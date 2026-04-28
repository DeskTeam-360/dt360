import Image from "next/image";
import Link from "next/link";

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

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <section className="relative isolate z-20 overflow-hidden px-5 pb-[40px] pt-[60px] md:px-10 lg:px-10 lg:pb-[80px] lg:pt-[120px]">
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
              <span className="text-[#f336b6]">All 9 Services</span>
              <br />
              One Team.
              <br />
              One Flat Rate
            </h1>
            <p className="mt-6 text-2xl font-semibold leading-snug text-white/95">
              Stop Paying $50/hr for Web Work That Takes 3 Weeks
            </p>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/85">
              There&apos;s a better way to get web work done. Not cheaper freelancers. Not a retainer
              agency with a 10-person email chain. A flat-rate, dedicated web team that knows your
              brand and turns tasks around in 1-3 days.
            </p>
          </div>
          <div
            className="relative z-[1300] mx-auto mb-[-133px] w-full self-end lg:mx-0 lg:w-[50%]"
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

        <div className="relative z-[1200] mx-auto -mb-[120px] mt-[60px] w-full max-w-6xl rounded-[28px] border border-[#d8dbef] bg-white p-[40px] shadow-[0_0_22px_rgba(189,200,252,0.75),0_16px_40px_rgba(16,22,81,0.18)]">
          <h2 className="text-center text-2xl font-extrabold tracking-[0.14em] text-[#3f4f9a]">
            PLATFORMS SUPPORTED
          </h2>
          <div className="mt-[40px] flex flex-wrap items-center justify-center gap-[40px] lg:flex-nowrap">
            {platformLogos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-[36px] w-auto max-w-full shrink object-contain transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden bg-white px-5 pb-[80px] pt-[160px] md:px-10 lg:px-10">
        <Image
          src="/images/dt360-topbubble.png"
          alt=""
          width={540}
          height={714}
          className="pointer-events-none absolute right-0 top-0 h-auto w-[190px] opacity-95 md:w-[240px] lg:w-[300px]"
        />
        <Image
          src="/images/dt360-bottom-bubble.png"
          alt=""
          width={382}
          height={576}
          className="pointer-events-none absolute bottom-0 left-0 h-auto w-[150px] opacity-95 md:w-[190px] lg:w-[220px]"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-[64px] font-extrabold leading-tight tracking-tight text-[#101651]">
              <span className="text-[#ef2fa9]">9 Core Services.</span> Everything You Need to Scale
            </h2>
            <p className="mt-4 text-xl font-semibold text-[#1a1a1a]">
              Pick the plan that fits. We handle the rest.
            </p>
          </div>

          <div className="mt-12 grid auto-rows-fr grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service, index) => (
              <article
                key={service.no}
                className={`group flex h-full flex-col rounded-[70px] bg-gradient-to-b p-8 text-white transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] ${
                  index % 2 === 0 ? "rounded-tr-none rounded-bl-none" : "rounded-tl-none rounded-br-none"
                } ${service.bg}`}
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
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}