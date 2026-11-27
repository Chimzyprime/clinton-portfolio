/** @type {import('next').NextConfig} */
const nextConfig = {
  // Surfaces unsafe lifecycle usage early; no other special config is needed
  // for a static portfolio.
  reactStrictMode: true,
  // Allowed image qualities: the default, plus 90 for the hero portrait.
  images: { qualities: [75, 90] },
};

module.exports = nextConfig;
