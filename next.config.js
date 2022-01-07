const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'raw.githubusercontent.com'],
  },
  dynamicStartUrl: false,
  buildExcludes: [
    /chunks\/images\/.*$/,
  ],
})