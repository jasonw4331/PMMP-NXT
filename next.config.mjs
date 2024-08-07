import remarkGfm from 'remark-gfm'
import { default as nextPWA } from 'next-pwa'
import NextBundleAnalyzer from '@next/bundle-analyzer'
import nextMDX from '@next/mdx'

const withPWA = nextPWA({
  dest: 'public',
  sw: '/sw.js',
  disable: process.env.NODE_ENV === 'development',
  cacheOnFrontEndNav: true,
})

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const withMDX = nextMDX({
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

export default withBundleAnalyzer(withPWA(withMDX(nextConfig)))
