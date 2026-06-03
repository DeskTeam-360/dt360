"use client";

import { Container } from "@/components/shared/Container";
import { ServiceSafeImage } from "@/components/pages/service/shared/ServiceSafeImage";
import { ServiceHeroIncludedChecklist } from "@/components/pages/service/shared/ServiceHeroIncludedChecklist";

const includedItems = [
  "Ad creatives for Facebook, Instagram, Google, and LinkedIn",
  "Social media graphics - feed posts, carousels, stories, reels covers",
  "Logos and branding materials",
  "Ebooks, lead magnets, and workbooks",
  "Presentation decks and pitch decks",
  "Print materials - flyers, brochures, business cards, banners",
  "Infographics and data visualization",
  "Motion graphics and GIF animations",
  "Canva template design and customization"
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(#02063B_0%,#02063B_50%,#E6236D_100%)] pb-10 pt-32 text-white sm:pb-12 xl:pt-40 xl:pb-14 2xl:pb-16">
      <ServiceSafeImage
        src="/images/Service - Ellipse Red.png"
        alt=""
        width={380}
        height={380}
        className="pointer-events-none absolute -right-12 -top-12 z-[1] h-auto w-[230px] opacity-90 sm:w-[300px] xl:w-[360px]"
      />
      <ServiceSafeImage
        src="/images/Service - Ellipse Blue.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute -left-24 top-[calc(var(--spacing)*30)] z-[5] h-auto w-[260px] opacity-90 sm:w-[320px] xl:w-[390px]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(220,56,255,0.32),transparent_40%),radial-gradient(circle_at_0%_100%,rgba(61,43,190,0.45),transparent_48%)]"
        aria-hidden
      />
      <Container className="relative z-10 max-w-[1440px] !px-10 xl:!px-20">
        <div className="grid items-center gap-8 pb-8 sm:pb-8 xl:grid-cols-2 xl:gap-12 xl:pb-10 2xl:gap-16 2xl:pb-12">
          <div className="w-full min-w-0">
            <h1 className="type-rule-h1 leading-[1.03] tracking-tight text-white">
              Unlimited <span className="text-[#ef2f9e]">Graphic Design</span>
            </h1>
            <p className="type-rule-h4 mt-4 leading-tight text-white">
              One Flat Rate. No Surprises
            </p>
            <p className="type-rule-p mt-4 w-full max-w-none text-white/85">
              You should not have to negotiate a quote every time you need a cool graphic. With DeskTeam360, you
              get dedicated design team - professional, consistent, and ready for whatever you throw at them, all
              for one flat monthly rate.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[min(100%,480px)]">
            <div
              className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle,rgba(251,98,183,0.45)_0%,rgba(71,56,206,0.15)_55%,transparent_75%)] blur-2xl"
              aria-hidden
            />
            <ServiceSafeImage
              src="/images/Service - Graphic Hero.png"
              alt="Hero illustration for graphic design service"
              width={820}
              height={620}
              priority
              sizes="(max-width: 1023px) 90vw, 820px"
              className="relative z-10 h-auto w-full"
            />
          </div>
        </div>
      </Container>
      <ServiceSafeImage
        src="/images/Service - Ellipse Blue.png"
        alt=""
        width={460}
        height={460}
        className="pointer-events-none absolute right-[calc(var(--spacing)*0)] top-[80%] z-[1] hidden h-auto w-[320px] rotate-180 opacity-85 xl:block"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,47,179,0.16),transparent_45%)]" aria-hidden />
      <Container className="relative z-10 max-w-[1440px] !px-10 xl:!px-20 pb-6 sm:pb-8 xl:pb-10">
        <div className="grid grid-cols-1 items-start gap-x-16 gap-y-12 sm:gap-y-16 xl:grid-cols-2 xl:gap-x-28 xl:gap-y-24 2xl:gap-x-32 2xl:gap-y-28">
          <h2 className="type-rule-h2 col-span-full w-full max-w-none min-w-0 leading-tight text-white xl:max-w-2xl xl:leading-[1.02]">
            We Handle All of Your <span className="text-[#f6b22e]">Graphic Design</span> Needs
          </h2>
          <div className="flex w-full justify-center">
            <ServiceSafeImage
              src="/images/Service - Graphic Whats Included.png"
              alt="Graphic design workstation illustration"
              width={760}
              height={620}
              sizes="(max-width: 1023px) 100vw, 620px"
              className="h-auto w-full max-w-[620px]"
            />
          </div>
          <ServiceHeroIncludedChecklist items={includedItems} />
        </div>
      </Container>
    </section>
  );
}
