import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'database.webni.st',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
