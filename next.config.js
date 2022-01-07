const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'raw.githubusercontent.com'],
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    buildExcludes: [/chunks\/images\/.*$/],
    publicExcludes: ['!noprecache/**/*'],
    cacheOnFrontEndNav: true
  }
})