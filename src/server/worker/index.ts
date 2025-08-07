import { Worker } from 'bullmq';
import { env } from '@/lib/env';
import webpush from 'web-push';
import { prisma } from '@/server/utils/prisma';

webpush.setVapidDetails(env.NEXT_PUBLIC_APP_URL, env.VAPID_PUBLIC_KEY ?? '', env.VAPID_PRIVATE_KEY ?? '');

const worker = new Worker(
  'notifications',
  async (job) => {
    const { userId, title, body, url } = job.data as { userId: string; title: string; body: string; url: string };
    const subs = await prisma.pushSubscription.findMany({ where: { userId } });
    await Promise.all(
      subs.map((s) =>
        webpush.sendNotification(
          {
            endpoint: s.endpoint,
            keys: { p256dh: s.p256dh, auth: s.auth },
          } as any,
          JSON.stringify({ title, body, url })
        )
      )
    );
  },
  { connection: { url: env.REDIS_URL } }
);

worker.on('completed', (job) => console.log('Notification sent', job.id));
worker.on('failed', (job, err) => console.error('Notification failed', job?.id, err));