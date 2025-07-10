import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  compress: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  }
}

export default nextConfig
