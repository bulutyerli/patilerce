/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn2.thecatapi.com',
      'api.thecatapi.com',
      'cdn2.thedogapi.com',
      'api.thedogapi.com',
    ],
  },
};

module.exports = nextConfig;
