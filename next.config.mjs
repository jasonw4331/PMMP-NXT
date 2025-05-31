/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import withSerwistInit from "@serwist/next";

// You may want to use a more robust revision to cache
// files more efficiently.
// A viable option is `git rev-parse HEAD`.
const revision = crypto.randomUUID();

const withSerwist = withSerwistInit({
    cacheOnNavigation: true,
    swSrc: "@/app/sw.ts",
    swDest: "public/sw.js",
    additionalPrecacheEntries: [{url: "/~offline", revision}],
});

const withMDX = nextMDX({
    remarkPlugins: [remarkGfm],
});

/** @type {import("next").NextConfig} */
const config = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
            {
                source: '/sw.js',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/javascript; charset=utf-8',
                    },
                    /*{
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate',
                    },*/
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self'",
                    },
                ],
            },
        ]
    },
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone",
};

export default withSerwist(withMDX(config));
