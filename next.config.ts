import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    /** Ganti file di `public/` dengan nama path sama: cache optimizer default 4h; 0 = lebih cepat ambil versi baru */
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
