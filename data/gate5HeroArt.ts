/**
 * Hero art for Gate 5 prose pages — reuses existing service illustrations.
 */

export type Gate5HeroArt = {
  src: string;
  alt: string;
};

/** Keyed by Gate 5 service slug (`getGate5ServicePage`). */
export const GATE5_SERVICE_HERO_ART: Record<string, Gate5HeroArt> = {
  "ai-automation": {
    src: "/images/Service%20-%20AI%20%26%20Automation%20-%20Hero.png",
    alt: "Hero illustration for AI and automation service",
  },
  "crm-automation": {
    src: "/images/CRM - Hero.png",
    alt: "Hero illustration for CRM and automation service",
  },
  "email-funnels": {
    src: "/images/Email - Hero.png",
    alt: "Hero illustration for email and funnels service",
  },
  "graphic-design": {
    src: "/images/Service - Graphic Hero.png",
    alt: "Hero illustration for graphic design service",
  },
  "social-media-content": {
    src: "/images/Social-Hero-1.png",
    alt: "Hero illustration for social media content service",
  },
  "video-editing": {
    src: "/images/Service - Video Hero.png",
    alt: "Hero illustration for video editing service",
  },
  "web-design-development": {
    src: "/images/web-development-hero.png",
    alt: "Hero illustration for web design and development service",
  },
  "website-maintenance": {
    src: "/images/Maintenance - Hero.png",
    alt: "Hero illustration for website maintenance service",
  },
  "white-label": {
    src: "/images/Service - White Label - hero.png",
    alt: "Hero illustration for white label services",
  },
};

/** Keyed by Gate 5 static page key (`getGate5StaticPage`). */
export const GATE5_STATIC_HERO_ART: Record<string, Gate5HeroArt> = {
  "small-business": {
    src: "/images/web-development-hero.png",
    alt: "Hero illustration for small business production team",
  },
  "white-label-marketing": {
    src: "/images/Service - White Label - hero.png",
    alt: "Hero illustration for white label marketing help",
  },
};

export function getGate5ServiceHeroArt(slug: string): Gate5HeroArt | undefined {
  return GATE5_SERVICE_HERO_ART[slug];
}

export function getGate5StaticHeroArt(key: string): Gate5HeroArt | undefined {
  return GATE5_STATIC_HERO_ART[key];
}
