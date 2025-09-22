/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // API 라우트 사용을 위해 주석 처리
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
}

module.exports = nextConfig
