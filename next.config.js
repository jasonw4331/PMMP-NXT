const withPWA = require('next-pwa')({
  dest: 'public',
  sw: '/sw.js',
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/chunks\/images\/.*$/],
  publicExcludes: ['!noprecache/**/*'],
  cacheOnFrontEndNav: true,
})

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'raw.githubusercontent.com',
      'avatars.githubusercontent.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/releases',
        destination: '/',
        permanent: true,
      },
      {
        source: '/settings',
        destination: '/settings/admin',
        permanent: true,
      },
    ]
  },
  swcMinify: true,
})
