import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import type { Context } from '@/server/trpc/context';
import { prisma } from '@/server/utils/prisma';

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
      const r = await prisma.review.create({
        data: { productId: input.productId, userId: ctx.session.user.id, rating: input.rating, content: input.content },
        select: { id: true, status: true },
      });
      return r;
    }),

  listByProduct: t.procedure
    .input(z.object({ productId: z.string() }))
    .output(z.array(z.object({ id: z.string(), rating: z.number(), content: z.string(), status: z.string() })))
    .query(async ({ input }) => {
      const rs = await prisma.review.findMany({
        where: { productId: input.productId, status: 'APPROVED' },
        orderBy: { createdAt: 'desc' },
        select: { id: true, rating: true, content: true, status: true },
      });
      return rs;
    }),
});