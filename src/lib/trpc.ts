import superjson from 'superjson';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@/server/trpc/router';
import { httpBatchLink } from '@trpc/client';

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  return process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        httpBatchLink({ url: `${getBaseUrl()}/api/trpc` }),
      ],
    };
  },
  ssr: false,
});

export type { AppRouter } from '@/server/trpc/router';