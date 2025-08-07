import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import type { Context } from '@/server/trpc/context';
import { prisma } from '@/server/utils/prisma';

const t = initTRPC.context<Context>().create();

export const followRouter = t.router({
  follow: t.procedure
    .input(z.object({ developerId: z.string() }))
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) throw new Error('Unauthorized');
      await prisma.follow.create({ data: { userId: ctx.session.user.id, developerId: input.developerId } });
      return { success: true };
    }),
  unfollow: t.procedure
    .input(z.object({ developerId: z.string() }))
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) throw new Error('Unauthorized');
      await prisma.follow.deleteMany({ where: { userId: ctx.session.user.id, developerId: input.developerId } });
      return { success: true };
    }),
});