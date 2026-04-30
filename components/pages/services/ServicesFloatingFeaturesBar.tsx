import Image from "next/image";
import { servicesFloatingFeatures } from "@/data/servicesPage";

export function ServicesFloatingFeaturesBar() {
  return (
    <section
      className="relative z-20 mt-[10px] rounded-l-[10px] bg-[#1a1b4b] md:mt-[10px] lg:mt-[10px] -mb-[160px]"
      style={{
        marginLeft: "max(0px, calc((100vw - 72rem) / 2 + 2.5rem - 80px))",
        width: "calc(100% - max(0px, calc((100vw - 72rem) / 2 + 2.5rem - 80px)) + 40px)",
      }}
      aria-labelledby="services-floating-features-heading"
    >
      <div className="w-full max-w-7xl overflow-hidden rounded-[22px] rounded-r-none shadow-[0_20px_50px_-12px_rgba(16,22,81,0.45)]">
        <div className="grid grid-cols-1 divide-y divide-white/15 lg:grid-cols-3 lg:divide-y-0">
          {servicesFloatingFeatures.map((item, index) => (
            <div key={item.id} className="relative flex items-center gap-4 px-6 py-6 text-left sm:px-8 lg:gap-5 lg:py-7">
              {index > 0 ? (
                <span
                  className="pointer-events-none absolute left-0 top-1/2 hidden h-1/2 w-px -translate-y-1/2 bg-white/15 lg:block"
                  aria-hidden
                />
              ) : null}
              <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-xl">
                {item.iconSrc ? (
                  <Image src={item.iconSrc} alt="" width={123} height={123} className="h-[123px] min-h-[123px] w-auto object-contain" />
                ) : (
                  <span className="text-[11px] font-medium uppercase tracking-wide text-white/35">Icon</span>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-[20px] font-bold leading-[1.1] text-white">{item.title}</h3>
                <p className="mt-2 text-[17px] leading-[1.35] text-white/86">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


