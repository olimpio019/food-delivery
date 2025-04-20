/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  server: {
    port: 5000,
    host: '0.0.0.0',
  },
}

module.exports = nextConfig
