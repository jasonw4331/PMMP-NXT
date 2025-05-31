import {createEnv} from "@t3-oss/env-nextjs";
import {z} from "zod";

export const env = createEnv({
    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {
        DATABASE_URL: z.string().url(),
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),

        // Supabase
        SUPABASE_JWT: z.string().min(32, "JWT key must be at least 32 characters"),
        SUPABASE_SERVICE_KEY: z.string(),
    },

    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    client: {
        // SEO
        NEXT_PUBLIC_SEO_TITLE: z.string().optional(),
        NEXT_PUBLIC_SEO_DESCRIPTION: z.string().optional(),
        NEXT_PUBLIC_SEO_KEYWORDS: z.string().optional(),
        NEXT_PUBLIC_SEO_GOOGLE_SITE_VERIFICATION: z.string().optional(),

        //Web App
        NEXT_PUBLIC_WEBAPP_NAME: z.string(),
        NEXT_PUBLIC_WEBAPP_SHORT_NAME: z.string(),
        NEXT_PUBLIC_WEBAPP_DESCRIPTION: z.string(),
        NEXT_PUBLIC_WEBAPP_STARTPAGE: z.string(),

        // Supabase
        NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    },

    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,

        // SEO
        NEXT_PUBLIC_SEO_TITLE: process.env.NEXT_PUBLIC_SEO_TITLE,
        NEXT_PUBLIC_SEO_DESCRIPTION: process.env.NEXT_PUBLIC_SEO_DESCRIPTION,
        NEXT_PUBLIC_SEO_KEYWORDS: process.env.NEXT_PUBLIC_SEO_KEYWORDS,
        NEXT_PUBLIC_SEO_GOOGLE_SITE_VERIFICATION:
        process.env.NEXT_PUBLIC_SEO_GOOGLE_SITE_VERIFICATION,

        //Web App
        NEXT_PUBLIC_WEBAPP_NAME: process.env.NEXT_PUBLIC_WEBAPP_NAME,
        NEXT_PUBLIC_WEBAPP_SHORT_NAME: process.env.NEXT_PUBLIC_WEBAPP_SHORT_NAME,
        NEXT_PUBLIC_WEBAPP_DESCRIPTION: process.env.NEXT_PUBLIC_WEBAPP_DESCRIPTION,
        NEXT_PUBLIC_WEBAPP_STARTPAGE: process.env.NEXT_PUBLIC_WEBAPP_STARTPAGE,

        // Supabase
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        SUPABASE_JWT: process.env.SUPABASE_JWT,
        SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
    },
    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
     * useful for Docker builds.
     */
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    /**
     * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
     * `SOME_VAR=''` will throw an error.
     */
    emptyStringAsUndefined: true,
});
