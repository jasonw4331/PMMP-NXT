import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import type { Context } from '@/server/trpc/context';
import webpush from 'web-push';
import { env } from '@/lib/env';
import { db } from '@/server/db';
import { pushSubscriptions } from '@/server/db/schema';

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
      const existing = await db.query.pushSubscriptions.findFirst({ where: (t, { eq }) => eq(t.endpoint, input.endpoint) });
      if (existing) {
        await db.update(pushSubscriptions)
          .set({ p256dh: input.keys.p256dh, auth: input.keys.auth, userId: ctx.session.user.id })
          .where((t, { eq }) => eq(t.endpoint, input.endpoint));
      } else {
        await db.insert(pushSubscriptions).values({
          id: `ps_${Math.random().toString(36).slice(2)}`,
          endpoint: input.endpoint,
          p256dh: input.keys.p256dh,
          auth: input.keys.auth,
          userId: ctx.session.user.id,
        });
      }
      return { success: true };
    }),

  unsubscribe: t.procedure
    .input(z.object({ endpoint: z.string() }))
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) throw new Error('Unauthorized');
      await db.delete(pushSubscriptions).where((t, { and, eq }) => and(eq(t.endpoint, input.endpoint), eq(t.userId, ctx.session.user.id)));
      return { success: true };
    }),
});