import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '@/lib/env';
import * as schema from './schema';

const globalForDb = global as unknown as { pool?: Pool; db?: ReturnType<typeof drizzle<typeof schema>> };

const pool = globalForDb.pool ?? new Pool({ connectionString: env.DATABASE_URL });
export const db = globalForDb.db ?? drizzle(pool, { schema });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool;
  globalForDb.db = db;
}
