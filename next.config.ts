import type { NextConfig } from "next";

const wpRest =
  process.env.WORDPRESS_REST_BASE_URL?.trim() || process.env.NEXT_PUBLIC_WORDPRESS_REST_BASE_URL?.trim();
let wpImageHost: string | undefined;
if (wpRest) {
  try {
    const protoSplit = wpRest.includes("://") ? wpRest : `https://${wpRest}`;
    wpImageHost = new URL(protoSplit).hostname;
  } catch {
    wpImageHost = undefined;
  }
}

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    /** Ganti file di `public/` dengan nama path sama: cache optimizer default 4h; 0 = lebih cepat ambil versi baru */
    minimumCacheTTL: 0,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      ...(wpImageHost
        ? ([{ protocol: "https" as const, hostname: wpImageHost, pathname: "/**" as const }] as const)
        : []),
    ],
  },
};

export default nextConfig;
