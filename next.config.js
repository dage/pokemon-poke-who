/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: './',
  swcMinify: true,
  experimental: {
    images: {
      unoptimized: true
    }
  }
}

module.exports = nextConfig
