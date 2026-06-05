import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    /** Next.js Image Optimization (WebP/AVIF, responsive widths). Phase 1: home + about tuned with `sizes`. */
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "deskteam360.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "clone.deskteam360.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.deskteam360.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
