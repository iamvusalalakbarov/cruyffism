import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.cache = false; // Disable Webpack persistent caching
    return config;
  },
};

export default nextConfig;
