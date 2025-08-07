import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/server/auth/options';
import { db } from '@/server/db';

export async function createContext(_opts?: CreateNextContextOptions) {
  const session = await getServerSession(authOptions);
  return { session, db };
}

export async function createFetchContext(_opts: FetchCreateContextFnOptions) {
  const session = await getServerSession(authOptions);
  return { session, db };
}

export type Context = Awaited<ReturnType<typeof createContext>>;