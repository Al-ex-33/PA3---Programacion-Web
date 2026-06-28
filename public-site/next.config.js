/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:4000/api',
  },
};

module.exports = nextConfig;
