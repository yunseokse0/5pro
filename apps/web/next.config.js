const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@5pro/ui'],
  // Remove @5pro/db from transpilePackages in production build
  // as we use mock data in demo mode
  output: process.env.NEXT_PUBLIC_DEMO_MODE === 'true' ? 'standalone' : undefined,
};

module.exports = withNextIntl(nextConfig);
