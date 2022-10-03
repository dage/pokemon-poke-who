/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: './',
  swcMinify: true,
  trailingSlash: true,
  basePath: "/portfolio/pokemon-poke-who",
  experimental: {
    images: {
      unoptimized: true
    }
  }
}

module.exports = nextConfig
