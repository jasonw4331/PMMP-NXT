import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import type { Context } from '@/server/trpc/context';
import webpush from 'web-push';
import { env } from '@/lib/env';
import { prisma } from '@/server/utils/prisma';

const t = initTRPC.context<Context>().create();

webpush.setVapidDetails(env.NEXT_PUBLIC_APP_URL, env.VAPID_PUBLIC_KEY ?? '', env.VAPID_PRIVATE_KEY ?? '');

export const PushSubscriptionSchema = z.object({
  endpoint: z.string(),
  keys: z.object({ p256dh: z.string(), auth: z.string() }),
});

export const pushRouter = t.router({
  subscribe: t.procedure
    .input(PushSubscriptionSchema)
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) throw new Error('Unauthorized');
      await prisma.pushSubscription.upsert({
        where: { endpoint: input.endpoint },
        update: { p256dh: input.keys.p256dh, auth: input.keys.auth, userId: ctx.session.user.id },
        create: {
          endpoint: input.endpoint,
          p256dh: input.keys.p256dh,
          auth: input.keys.auth,
          userId: ctx.session.user.id,
        },
      });
      return { success: true };
    }),

  unsubscribe: t.procedure
    .input(z.object({ endpoint: z.string() }))
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) throw new Error('Unauthorized');
      await prisma.pushSubscription.deleteMany({ where: { endpoint: input.endpoint, userId: ctx.session.user.id } });
      return { success: true };
    }),
});