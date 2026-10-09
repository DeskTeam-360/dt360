/**
 * Hero art for Gate 5 prose pages.
 * Smaller source assets use upscaled HD copies under /images/gate5-hero-hd/.
 */

export type Gate5HeroArt = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Keyed by Gate 5 service slug (`getGate5ServicePage`). */
export const GATE5_SERVICE_HERO_ART: Record<string, Gate5HeroArt> = {
  "ai-automation": {
    src: "/images/Service - AI & Automation - Hero.png",
    alt: "Hero illustration for AI and automation service",
    width: 1087,
    height: 1093,
  },
  "crm-automation": {
    src: "/images/gate5-hero-hd/crm-hero-hd.png",
    alt: "Hero illustration for CRM and automation service",
    width: 1075,
    height: 1200,
  },
  "email-funnels": {
    src: "/images/gate5-hero-hd/email-hero-hd.png",
    alt: "Hero illustration for email and funnels service",
    width: 1174,
    height: 1200,
  },
  "graphic-design": {
    src: "/images/gate5-hero-hd/graphic-hero-hd.png",
    alt: "Hero illustration for graphic design service",
    width: 1200,
    height: 1066,
  },
  "social-media-content": {
    src: "/images/gate5-hero-hd/social-hero-hd.png",
    alt: "Hero illustration for social media content service",
    width: 1200,
    height: 1110,
  },
  "video-editing": {
    src: "/images/gate5-hero-hd/video-hero-hd.png",
    alt: "Hero illustration for video editing service",
    width: 1178,
    height: 1208,
  },
  "web-design-development": {
    src: "/images/gate5-hero-hd/web-development-hero-hd.png",
    alt: "Hero illustration for web design and development service",
    width: 1436,
    height: 1206,
  },
  "website-maintenance": {
    src: "/images/gate5-hero-hd/maintenance-hero-hd.png",
    alt: "Hero illustration for website maintenance service",
    width: 1140,
    height: 1224,
  },
  "white-label": {
    src: "/images/Service - White Label - hero.png",
    alt: "Hero illustration for white label services",
    width: 1047,
    height: 820,
  },
};

/** Keyed by Gate 5 static page key (`getGate5StaticPage`). */
export const GATE5_STATIC_HERO_ART: Record<string, Gate5HeroArt> = {
  "small-business": {
    src: "/images/gate5-hero-hd/web-development-hero-hd.png",
    alt: "Hero illustration for small business production team",
    width: 1436,
    height: 1206,
  },
  "white-label-marketing": {
    src: "/images/Service - White Label - hero.png",
    alt: "Hero illustration for white label marketing help",
    width: 1047,
    height: 820,
  },
};

export function getGate5ServiceHeroArt(slug: string): Gate5HeroArt | undefined {
  return GATE5_SERVICE_HERO_ART[slug];
}

export function getGate5StaticHeroArt(key: string): Gate5HeroArt | undefined {
  return GATE5_STATIC_HERO_ART[key];
}
