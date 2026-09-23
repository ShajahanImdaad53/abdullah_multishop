import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.atlas.lk',
      },
      {
        protocol: 'https',
        hostname: 'www.promateworld.com',
      }
    ],
  },
};

export default nextConfig;
