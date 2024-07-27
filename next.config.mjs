/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.giphy.com'],
  },
  env: {
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  },
};

export default nextConfig;
