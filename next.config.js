const remarkGfm = require('remark-gfm')

const withPWA = require('next-pwa')({
  dest: 'public',
  sw: '/sw.js',
  disable: process.env.NODE_ENV === 'development',
  cacheOnFrontEndNav: true,
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withMDX = require('@next/mdx')({
  remarkPlugins: [remarkGfm],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    nextScriptWorkers: true,
    mdxRs: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      '*.googleusercontent.com',
      'raw.githubusercontent.com',
      'avatars.githubusercontent.com',
    ],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
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
  output: 'standalone',
}

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer(withPWA(withMDX(nextConfig)))
