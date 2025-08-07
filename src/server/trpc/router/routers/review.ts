import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import type { Context } from '@/server/trpc/context';
import { db } from '@/server/db';
import { reviews } from '@/server/db/schema';

const t = initTRPC.context<Context>().create();

export const ReviewCreateInput = z.object({
  productId: z.string(),
  rating: z.number().min(1).max(5),
  content: z.string().min(1),
});

export const reviewRouter = t.router({
  create: t.procedure
    .input(ReviewCreateInput)
    .output(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) throw new Error('Unauthorized');
      const id = `rev_${Math.random().toString(36).slice(2)}`;
      await db.insert(reviews).values({ id, productId: input.productId, userId: ctx.session.user.id, rating: input.rating, content: input.content });
      const r = { id, status: 'PENDING' as const };
      return r;
    }),

  listByProduct: t.procedure
    .input(z.object({ productId: z.string() }))
    .output(z.array(z.object({ id: z.string(), rating: z.number(), content: z.string(), status: z.string() })))
    .query(async ({ input }) => {
      const rs = await db.query.reviews.findMany({
        where: (t, { and, eq }) => and(eq(t.productId, input.productId), eq(t.status, 'APPROVED')),
        orderBy: (t, { desc }) => [desc(t.createdAt)],
        columns: { id: true, rating: true, content: true, status: true },
      });
      return rs;
    }),
});