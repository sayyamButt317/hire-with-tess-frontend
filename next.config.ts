import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
     {
      protocol:'https',
      hostname: "13.60.186.127",
     }
    ],
  },
};

export default nextConfig;
