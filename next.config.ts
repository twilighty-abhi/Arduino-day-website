import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "content.arduino.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.arduino.cc",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
