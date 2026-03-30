import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['138.124.93.89'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.appteka.store',
      },
    ],
  },
};

export default nextConfig;
