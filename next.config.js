/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn2.thecatapi.com',
      'api.thecatapi.com',
      'cdn2.thedogapi.com',
      'api.thedogapi.com',
      'flagcdn.com',
      'lh3.googleusercontent.com',
      'tailwish-pets.s3.eu-central-1.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
