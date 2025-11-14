import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper routing on Vercel
  reactStrictMode: true,
  // Don't specify output - let Vercel auto-detect
};

export default nextConfig;
