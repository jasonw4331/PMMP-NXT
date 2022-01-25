const withPWA = require('next-pwa')
const { withPlaiceholder } = require('@plaiceholder/next')

module.exports = withPlaiceholder(
  withPWA({
    reactStrictMode: true,
    images: {
      domains: [
        'lh3.googleusercontent.com',
        'raw.githubusercontent.com',
        'avatars.githubusercontent.com',
      ],
    },
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development',
      buildExcludes: [/chunks\/images\/.*$/],
      publicExcludes: ['!noprecache/**/*'],
      cacheOnFrontEndNav: true,
    },
    async redirects() {
      return [
        {
          source: '/releases',
          destination: '/',
          permanent: true,
        },
      ]
    },
    swcMinify: true,
  })
)
