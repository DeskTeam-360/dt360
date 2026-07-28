import type { NextConfig } from "next";

function getWordPressImageHostnames(): string[] {
  const hostnames = new Set<string>(["deskteam360.com", "www.deskteam360.com"]);
  const siteUrl = process.env.WORDPRESS_SITE_URL || process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL;

  if (siteUrl) {
    try {
      hostnames.add(new URL(siteUrl).hostname);
    } catch {
      // ignore invalid URL
    }
  }

  process.env.WORDPRESS_IMAGE_HOSTS?.split(",")
    .map((host) => host.trim())
    .filter(Boolean)
    .forEach((host) => hostnames.add(host));

  return [...hostnames];
}

const nextConfig: NextConfig = {
  output: "standalone",
  // Explicit: no trailing slash (Next default). /about/ → 308 /about
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap_index.xml",
        permanent: true,
      },

      // --- GSC P3 / issue 102 — clear 301s (P1-Case-study + P1-Blog-redirect) ---
      // trailingSlash: false → sources without trailing slash (/path/ → 308 /path first)

      // Row: case-studies/bobby-k-designs-case-study
      {
        source: "/case-studies/bobby-k-designs-case-study",
        destination:
          "/case-studies/bobby-k-designs-has-a-cleaner-plate-to-work-on-growing-their-business-without-getting-stuck-in-the-nitty-gritty",
        permanent: true,
      },
      // Row: duct-tape-marketing-case-study (+ trailing variant in GSC)
      {
        source: "/duct-tape-marketing-case-study",
        destination:
          "/case-studies/see-how-duct-tape-marketing-was-able-to-get-better-quality-projects-done-faster-and-less-expensive-than-their-previous-provider",
        permanent: true,
      },
      // Row: how-to-outsource-presentation-design
      {
        source: "/how-to-outsource-presentation-design",
        destination: "/blog/how-to-outsource-web-design",
        permanent: true,
      },
      // Row: outsource-web-development
      {
        source: "/outsource-web-development",
        destination: "/blog/outsourced-web-development-guide",
        permanent: true,
      },
      // Row: bare duct-tape case-study slug (missing /case-studies/ prefix)
      {
        source:
          "/see-how-duct-tape-marketing-was-able-to-get-better-quality-projects-done-faster-and-less-expensive-than-their-previous-provider",
        destination:
          "/case-studies/see-how-duct-tape-marketing-was-able-to-get-better-quality-projects-done-faster-and-less-expensive-than-their-previous-provider",
        permanent: true,
      },
      // Row: sidekick-marketing-case-study
      {
        source: "/sidekick-marketing-case-study",
        destination:
          "/case-studies/sidekick-marketing-is-easily-saving-20-hours-a-week-and-with-that-time-tripled-his-investment-the-first-month",
        permanent: true,
      },
      // Row: smash-wave-case-study
      {
        source: "/smash-wave-case-study",
        destination:
          "/case-studies/smash-wave-has-been-able-to-save-20-hours-a-week-and-has-tripled-their-profit-i-couldnt-have-done-it-without-deskteam360",
        permanent: true,
      },
      // Row: website-redesign-process
      {
        source: "/website-redesign-process",
        destination: "/blog/website-redesign-cost",
        permanent: true,
      },
      // Row: why-unlimited-design-subscriptions-fail
      {
        source: "/why-unlimited-design-subscriptions-fail",
        destination: "/blog/graphic-design-subscription-services-guide",
        permanent: true,
      },
    ];
  },
  images: {
    /** Next.js Image Optimization (WebP/AVIF, responsive widths). Phase 1: home + about tuned with `sizes`. */
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: getWordPressImageHostnames().map((hostname) => ({
      protocol: "https" as const,
      hostname,
      pathname: "/**",
    })),
  },
};

export default nextConfig;
