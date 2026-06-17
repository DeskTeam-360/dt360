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
