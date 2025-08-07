import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth/options';
import { prisma } from '@/server/utils/prisma';

export async function createContext(opts?: CreateNextContextOptions) {
  const session = await getServerSession(authOptions);
  return { session, prisma };
}

export type Context = Awaited<ReturnType<typeof createContext>>;