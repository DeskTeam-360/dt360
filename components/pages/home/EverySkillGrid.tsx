import type { CSSProperties } from "react";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";

/** Satu jenis rounded “leaf”: 3 sudut tebal, 1 tajam (0) — radius ~2.5rem (40px) */
const r = "2.5rem";

/** Semua sel grid mengikuti ukuran yang sama: di md+ lebar kolom = tinggi (bangun persegi seperti sel logo) */
const gridCellSizeClass =
  "w-full min-w-0 min-h-[10rem] sm:min-h-[11rem] md:min-h-0 md:aspect-square";

type Cell =
  | { kind: "logo" }
  | {
      kind: "card";
      id: string;
      title: string;
      description: string;
      bg: string;
      text: "light" | "dark";
    };

const cells: Cell[] = [
  {
    kind: "logo",
  },
  {
    kind: "card",
    id: "ai-automation",
    title: "AI &\nAutomation",
    description:
      "AI Agent setup, AI Training, Chatbot setup, workflow automation, process optimization - scale without headcount",
    bg: "bg-[#1D1B67]",
    text: "light",
  },
  {
    kind: "card",
    id: "web-design",
    title: "Web Design &\nDevelopment",
    description:
      "WordPress, React, and other CMSs, landing pages, redesigns, bug fixes, WooCommerce, custom features",
    bg: "bg-[#7243B5]",
    text: "light",
  },
  {
    kind: "card",
    id: "graphic-design",
    title: "Graphic\nDesign",
    description:
      "Ad creatives, social graphics, branding, print materials, pitch decks, presentations",
    bg: "bg-[#D80B8C]",
    text: "light",
  },
  {
    kind: "card",
    id: "video-editing",
    title: "Video\nEditing",
    description:
      "YouTube content, short-form reels, ad cuts, thumbnails, motion graphics",
    bg: "bg-[#E1DFF6]",
    text: "dark",
  },
  {
    kind: "card",
    id: "email-funnels",
    title: "Email &\nFunnels",
    description:
      "Campaign builds, automation sequences, drip nurture, newsletter design, A/B testing",
    bg: "bg-[#ED643B]",
    text: "light",
  },
  {
    kind: "card",
    id: "crm-marketing",
    title: "CRM &\nMarketing Tech",
    description:
      "GoHighLevel, HubSpot, and other CRMs, Zapier, Make, ActiveCampaign, and other email software, integrations, API work",
    bg: "bg-[#D1CCF2]",
    text: "dark",
  },
  {
    kind: "card",
    id: "social-media",
    title: "Social Media\nContent",
    description:
      "Branded graphics, carousel posts, story templates, scheduling-ready assets",
    bg: "bg-[#7A4EBF]",
    text: "light",
  },
  {
    kind: "card",
    id: "maintenance",
    title: "Website\nMaintenance",
    description: "Core updates, security monitoring, speed optimization, backups - always current",
    bg: "bg-[#21206A]",
    text: "light",
  },
];

function ServiceCardContent({
  title,
  description,
  text,
}: {
  title: string;
  description: string;
  text: "light" | "dark";
}) {
  return (
    <>
      <h3
        className={cn(
          "whitespace-pre-line text-2xl font-bold leading-tight tracking-tight sm:text-3xl",
          text === "light" ? "text-white" : "text-[#101651]",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-3 text-sm leading-relaxed sm:text-base",
          text === "light" ? "text-white/95" : "text-[#2a2f61]",
        )}
      >
        {description}
      </p>
    </>
  );
}

export function EverySkillGrid() {
  return (
    <section
      id="every-skill"
      className="relative overflow-x-hidden pb-20 pt-12 sm:pb-24 sm:pt-14 lg:pb-28 lg:pt-16"
      style={{
        background: "linear-gradient(90deg, #FFFFFF 0%, #DDE8FF 49%, #FFFFFF 100%)",
      }}
    >
      <div className="absolute inset-x-0 top-0 z-0 -translate-y-[98%] text-white" aria-hidden>
        <svg
          className="block h-14 w-full sm:h-16 lg:h-[4.5rem]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="currentColor" d="M0,78 Q720,8 1440,78 L1440,100 L0,100 Z" />
        </svg>
      </div>

      <Container className="relative z-10 max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-10">
          <h2 className="max-w-xl text-balance text-4xl font-bold leading-[1.04] tracking-tight text-[#101651] sm:text-5xl lg:text-6xl">
            Every Skill You Need. <span className="text-[#D80B8C]">One Team.</span> One Bill
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-[#2a2f61] sm:text-lg">
            DeskTeam360 replaces freelancer chaos with a dedicated team that already knows how to work together - all
            managed by a US-based account manager so you never have to coordinate anything.
          </p>
        </div>

        {/* 3x3: satu kolom di mobile, 3 kolom mulai md (tablet) ke atas — gap memisahkan tile seperti desain */}
        <div className="mt-10 grid min-h-0 grid-cols-1 gap-[6px] sm:mt-12 md:grid-cols-3">
          {cells.map((item) => {
            if (item.kind === "logo") {
              return (
                <div
                  key="logo-cell"
                  className={cn("flex h-full items-center justify-center overflow-hidden bg-white p-3 sm:p-4", gridCellSizeClass)}
                  style={
                    {
                      // tajam: kiri atas + kanan bawah — lainnya membulat
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: r,
                      borderBottomLeftRadius: r,
                      borderBottomRightRadius: 0,
                    } as CSSProperties
                  }
                >
                  <Image
                    src="/images/home-everyskill-logo-big.png"
                    alt="DeskTeam360"
                    width={480}
                    height={300}
                    className="h-[90%] w-auto max-h-full object-contain"
                    sizes="(max-width: 768px) 75vw, 480px"
                  />
                </div>
              );
            }
            return (
              <article
                key={item.id}
                className={cn(
                  "relative flex h-full flex-col overflow-hidden p-4 sm:p-5",
                  gridCellSizeClass,
                  item.bg,
                )}
                style={
                  {
                    // apply rounded via inline where template literal + TailwindJIT could miss dynamic strings
                    // Baris 1 — kolom 2 & 3: tajam kanan atas + kiri bawah
                    ...(item.id === "ai-automation" && {
                      borderTopLeftRadius: r,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: r,
                      borderBottomLeftRadius: 0,
                    }),
                    ...(item.id === "web-design" && {
                      // tajam: kiri atas + kanan bawah
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: r,
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: r,
                    }),
                    // Baris 2 — kolom 1: tajam kanan atas + kiri bawah
                    ...(item.id === "graphic-design" && {
                      borderTopLeftRadius: r,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: r,
                      borderBottomLeftRadius: 0,
                    }),
                    // Baris 2 — kolom 2: tajam kiri atas + kanan bawah
                    ...(item.id === "video-editing" && {
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: r,
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: r,
                    }),
                    // Baris 2 — kolom 3: tajam kiri bawah + kanan atas
                    ...(item.id === "email-funnels" && {
                      borderTopLeftRadius: r,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: r,
                      borderBottomLeftRadius: 0,
                    }),
                    // Baris 3 — kolom 1: tajam kiri atas + kanan bawah
                    ...(item.id === "crm-marketing" && {
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: r,
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: r,
                    }),
                    // Baris 3 — kolom 2: tajam kiri bawah + kanan atas
                    ...(item.id === "social-media" && {
                      borderTopLeftRadius: r,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: r,
                      borderBottomLeftRadius: 0,
                    }),
                    // Baris 3 — kolom 3: tajam kiri atas + kanan bawah
                    ...(item.id === "maintenance" && {
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: r,
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: r,
                    }),
                  } as CSSProperties
                }
              >
                {/* Aksen tekstur halus (opsional, meniru blob di mockup) */}
                {(item.id === "graphic-design" || item.id === "email-funnels" || item.id === "social-media") && (
                  <div
                    className="pointer-events-none absolute bottom-2 right-2 h-24 w-24 rounded-full bg-white/10 blur-sm sm:bottom-3 sm:right-3 sm:h-28 sm:w-28"
                    aria-hidden
                  />
                )}
                <div className="relative z-[1] flex min-h-0 min-w-0 flex-1 flex-col justify-start overflow-y-auto [scrollbar-width:thin]">
                  <ServiceCardContent title={item.title} description={item.description} text={item.text} />
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
