import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/webp"],
    qualities: [74, 82],
    minimumCacheTTL: 2_592_000,
  },
  async headers() {
    return [
      {
        source: "/og-v3.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" },
        ],
      },
    ];
  },
};

export default nextConfig;
