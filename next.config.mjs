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
    nextScriptWorkers: true,
    mdxRs: true,
    turbotrace: {},
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
    ]
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
