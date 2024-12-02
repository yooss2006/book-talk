import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shopping-phinf.pstatic.net",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
