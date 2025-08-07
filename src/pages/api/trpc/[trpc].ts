import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter, createContext } from '@/server/trpc/router';

export default createNextApiHandler({
  router: appRouter,
  createContext,
});