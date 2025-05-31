import type {MetadataRoute} from "next";
import {env} from "@/env";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: env.NEXT_PUBLIC_SEO_TITLE,
        short_name: env.NEXT_PUBLIC_WEBAPP_SHORT_NAME,
        description: env.NEXT_PUBLIC_WEBAPP_DESCRIPTION,
        start_url: env.NEXT_PUBLIC_WEBAPP_STARTPAGE,
        id: env.NEXT_PUBLIC_WEBAPP_STARTPAGE,
        orientation: "any",
        display: "standalone",
        display_override: ["standalone", "browser"],
        background_color: "#020202",
        theme_color: "#18181B",
        icons: [
            {
                src: "/manifest/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/manifest/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
            }
        ],
        protocol_handlers: [],
        related_applications: [],
        shortcuts: [],
    };
}
