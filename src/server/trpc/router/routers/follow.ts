import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import type { Context } from '@/server/trpc/context';
import { db } from '@/server/db';
import { follows } from '@/server/db/schema';

const t = initTRPC.context<Context>().create();

export const followRouter = t.router({
  follow: t.procedure
    .input(z.object({ developerId: z.string() }))
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) throw new Error('Unauthorized');
      await db.insert(follows).values({ id: `f_${Math.random().toString(36).slice(2)}`, userId: ctx.session.user.id, developerId: input.developerId });
      return { success: true };
    }),
  unfollow: t.procedure
    .input(z.object({ developerId: z.string() }))
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) throw new Error('Unauthorized');
      await db.delete(follows).where((t, { and, eq }) => and(eq(t.userId, ctx.session.user.id), eq(t.developerId, input.developerId)));
      return { success: true };
    }),
});