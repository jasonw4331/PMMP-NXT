import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { z } from 'zod';
import { createContext, type Context } from '@/server/trpc/context';
import { authRouter } from './routers/auth';
import { productRouter } from './routers/product';
import { githubRouter } from './routers/github';
import { pushRouter } from './routers/push';
import { followRouter } from './routers/follow';
import { reviewRouter } from './routers/review';

const t = initTRPC.context<Context>().create({ transformer: superjson });

export const appRouter = t.router({
  auth: authRouter,
  product: productRouter,
  github: githubRouter,
  push: pushRouter,
  follow: followRouter,
  review: reviewRouter,
});

export type AppRouter = typeof appRouter;

export { createContext };