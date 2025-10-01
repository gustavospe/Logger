/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configura a porta para 3333
  env: {
    PORT: '3333',
  },
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

export default nextConfig
