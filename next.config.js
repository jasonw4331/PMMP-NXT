const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  dynamicStartUrl: false,
  buildExcludes: [
    /chunks\/images\/.*$/,
  ],
})