import Image from "next/image";

const platformLogos = [
  { src: "/images/dt360-WordPress-logo.png", alt: "WordPress", width: 218, height: 53 },
  { src: "/images/dt360-webflow-logo.png", alt: "Webflow", width: 211, height: 50 },
  { src: "/images/dt360-gohighlevel-logo.png", alt: "GoHighLevel", width: 79, height: 54 },
  { src: "/images/dt360-woocommerce-logo.png", alt: "WooCommerce", width: 170, height: 48 },
  { src: "/images/dt360-shopify-logo.png", alt: "Shopify", width: 130, height: 53 },
];

/** Overlapping card between hero and next section (matches main Services page). */
export function ServicesPlatformsSupportedBridge() {
  return (
    <div className="relative z-20 -mt-[72px] px-5 md:px-10 lg:-mt-[88px] lg:px-10">
      <div className="mx-auto w-full max-w-[1440px] rounded-[28px] border border-[#d8dbef] bg-white p-[40px] shadow-[0_0_22px_rgba(189,200,252,0.75),0_16px_40px_rgba(16,22,81,0.18)]">
        <h2 className="text-center text-2xl font-extrabold tracking-[0.14em] text-[#3f4f9a]">PLATFORMS SUPPORTED</h2>
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
  );
}
