import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ensure API routes work correctly
  async rewrites() {
    return [];
  },
};

export default nextConfig;
