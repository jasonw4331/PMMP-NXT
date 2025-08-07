import withPWA from 'next-pwa';

const isProd = process.env.NODE_ENV === 'production';

const withPwa = withPWA({
  dest: 'public',
  disable: !isProd,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
};

export default withPwa(nextConfig);
