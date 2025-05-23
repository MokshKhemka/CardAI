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
  },
}

// Next.js configuration file
// Customizes the build and runtime behavior of Next.js
// Add any custom webpack configurations here if needed

export default nextConfig
