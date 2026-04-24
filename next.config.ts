import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.lumacdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.lu.ma",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "social-images.lu.ma",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
