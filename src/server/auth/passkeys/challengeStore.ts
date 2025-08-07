import { redis } from '@/server/auth/redis';

const CHALLENGE_TTL_SECONDS = 60 * 5;

export async function storeChallenge(key: string, challenge: string): Promise<void> {
  await redis.set(`webauthn:challenge:${key}`, challenge, 'EX', CHALLENGE_TTL_SECONDS);
}

export async function getAndDeleteChallenge(key: string): Promise<string | null> {
  const redisKey = `webauthn:challenge:${key}`;
  const value = await redis.get(redisKey);
  if (value) await redis.del(redisKey);
  return value;
}