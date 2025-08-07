import superjson from 'superjson';
import { createTRPCNext } from '@trpc/next';
import { httpBatchLink, createTRPCClient } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/trpc/router';

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  return process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })],
    };
  },
  ssr: false,
});

export const trpcReact = createTRPCReact<AppRouter>();

export function createTrpcClient() {
  return createTRPCClient<AppRouter>({
    links: [httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })],
    transformer: superjson,
  });
}

export type { AppRouter } from '@/server/trpc/router';