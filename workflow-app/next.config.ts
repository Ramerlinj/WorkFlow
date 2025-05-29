import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: ['www.headshotpro.com','ui-avatars.com', 'localhost', "*", 'pbs.twimg.com', 'i.ytimg.com', 'example.com']
  },
};

export default nextConfig;
