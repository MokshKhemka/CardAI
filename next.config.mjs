/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['example.com'],
    deviceSizes: [640, 750, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96],
  },
  optimizeFonts: true,
  compress: true,
}

// Next.js configuration file
// Customizes the build and runtime behavior of Next.js
// Add any custom webpack configurations here if needed

export default nextConfig
