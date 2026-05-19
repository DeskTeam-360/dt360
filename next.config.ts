import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    /** Replace a file in `public/` with the same path name: optimizer cache default 4h; 0 = pick up new version sooner */
    minimumCacheTTL: 0,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
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
    ],
  },
};

export default nextConfig;
