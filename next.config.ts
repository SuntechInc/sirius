import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  compress: false,
  eslint: {
    ignoreDuringBuilds: true,
  }
}

export default nextConfig
