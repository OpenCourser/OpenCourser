/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    transpilePackages: ['@opencourser/ui'],
  },
};

module.exports = nextConfig;
