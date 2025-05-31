import {defaultCache} from "@serwist/next/worker";
import type {PrecacheEntry, SerwistGlobalConfig} from "serwist";
import {Serwist} from "serwist";

declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        // Change this attribute's name to your `injectionPoint`.
        // `injectionPoint` is an InjectManifest option.
        // See https://serwist.pages.dev/docs/build/configuring
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: defaultCache,
    fallbacks: {
        entries: [
            {
                url: "/~Offline",
                matcher({request}) {
                    return request.destination === "document";
                },
            },
        ],
    },
});

self.addEventListener("push", (event) => {
    const data: {
        title: string;
        message?: string;
    } = JSON.parse(event.data?.text() ?? '{ title: "" }') as {
        title: string;
        message?: string;
    };
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.message,
            icon: "/icons/android-chrome-192x192.png",
        }),
    );
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(
        self.clients.matchAll({type: "window", includeUncontrolled: true}).then((clientList) => {
            let client = null;
            for (const windowClient of clientList) {
                if (windowClient.focused) {
                    client = windowClient;
                }
            }
            return client?.focus() ?? self.clients.openWindow("/");
        }),
    );
});

serwist.addEventListeners();