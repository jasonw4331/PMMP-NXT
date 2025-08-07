import { Queue } from 'bullmq';
import { env } from '@/lib/env';

export const notificationsQueue = new Queue('notifications', {
  connection: { url: env.REDIS_URL },
});

export type NotificationJob = {
  userId: string;
  title: string;
  body: string;
  url: string;
};