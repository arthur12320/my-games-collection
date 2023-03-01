/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.netshoes.com.br',
        port: ''
      },
    ],
  },

}

module.exports = nextConfig
