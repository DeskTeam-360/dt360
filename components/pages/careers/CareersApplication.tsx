"use client";

import Script from "next/script";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { careersApplication } from "@/data/careers";

const CAREERS_FORM_SRC =
  "https://api.leadconnectorhq.com/widget/form/1EcVIiuDLZ5XS1eZ1xrq";
const CAREERS_FORM_IFRAME_ID = "inline-1EcVIiuDLZ5XS1eZ1xrq";
const CAREERS_FORM_EMBED_SCRIPT = "https://link.msgsndr.com/js/form_embed.js";
const CAREERS_FORM_HEIGHT = 993;

export function CareersApplication() {
  const d = careersApplication;

  return (
    <section
      id="apply"
      className="scroll-mt-28 relative z-0 isolate overflow-hidden bg-[#F60996] pt-[25px] pb-12 sm:py-16 lg:py-24"
    >
      <SafeImage
        src={d.backgroundImage}
        alt=""
        fill
        quality={100}
        unoptimized
        sizes="100vw"
        className="h-full w-full object-cover object-center lg:object-fill"
        aria-hidden
      />
      <Container className="relative z-10 max-w-[1440px] !px-[15px] sm:!px-6 lg:!px-20">
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="text-white lg:pt-8">
            <p className="font-[var(--font-poppins)] text-[13px] font-bold uppercase leading-[1.4] tracking-[2px] text-white sm:text-[15px] lg:text-[17px]">
              {d.eyebrow}
            </p>
            <h2 className="mt-3 max-w-[550px] font-[var(--font-poppins)] text-[26px] font-bold leading-[1.12] tracking-[-0.8px] sm:text-[34px] lg:text-[45px] lg:tracking-[-1.2px]">
              {d.titleBefore}
              <span className="text-[#fcb44e]">{d.titleAccent}</span>
            </h2>
            <p className="mt-4 max-w-[520px] font-[var(--font-inter)] text-[13px] font-semibold leading-[1.6] tracking-normal text-white sm:mt-5 sm:text-[14px] lg:text-[15px]">
              {d.body}
            </p>
            <div className="mt-6 hidden w-full max-w-[280px] sm:mt-8 sm:max-w-[340px] lg:block">
              <SafeImage
                src={d.handwrittenImage}
                alt={d.handwrittenImageAlt}
                width={d.handwrittenWidth}
                height={d.handwrittenHeight}
                className="h-auto w-full object-contain mix-blend-screen"
                quality={100}
                unoptimized
              />
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
              <iframe
                src={CAREERS_FORM_SRC}
                id={CAREERS_FORM_IFRAME_ID}
                title="Careers Page"
                data-layout='{"id":"INLINE"}'
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Careers Page"
                data-height={String(CAREERS_FORM_HEIGHT)}
                data-layout-iframe-id={CAREERS_FORM_IFRAME_ID}
                data-form-id="1EcVIiuDLZ5XS1eZ1xrq"
                data-cookie-consent="true"
                data-cookie-consent-provider="auto"
                className="block w-full border-0"
                style={{
                  width: "100%",
                  height: CAREERS_FORM_HEIGHT,
                  minHeight: CAREERS_FORM_HEIGHT,
                  border: "none",
                  borderRadius: 8,
                }}
              />
              <Script
                id="ghl-careers-form-embed"
                src={CAREERS_FORM_EMBED_SCRIPT}
                strategy="lazyOnload"
              />
            </div>
            <div className="mx-auto mt-6 w-full max-w-[280px] sm:mt-8 sm:max-w-[340px] lg:hidden">
              <SafeImage
                src={d.handwrittenImage}
                alt={d.handwrittenImageAlt}
                width={d.handwrittenWidth}
                height={d.handwrittenHeight}
                className="h-auto w-full object-contain mix-blend-screen"
                quality={100}
                unoptimized
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
