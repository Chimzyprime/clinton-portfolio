/** @type {import('next').NextConfig} */
const nextConfig = {
  // Surfaces unsafe lifecycle usage early; no other special config is needed
  // for a static portfolio.
  reactStrictMode: true,
};

module.exports = nextConfig;
