import NextAuth from 'next-auth';
import { authOptions } from '@/server/auth/options';

export default NextAuth(authOptions);