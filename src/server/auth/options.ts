import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { env } from '@/lib/env';
import { prisma } from '@/server/utils/prisma';
import { verifyRegistrationResponseForUser, verifyAuthenticationResponseForUser } from '@/server/auth/passkeys/webauthn';

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID ?? '',
      clientSecret: env.GITHUB_CLIENT_SECRET ?? '',
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      id: 'webauthn',
      name: 'Passkey',
      credentials: {
        payload: { label: 'WebAuthn Payload', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.payload) return null;
        const parsed = JSON.parse(credentials.payload);
        const kind = parsed?.type;
        if (kind === 'attestation') {
          const result = await verifyRegistrationResponseForUser(parsed.data);
          const user = await prisma.user.findUnique({ where: { id: result.userId } });
          return user ? { id: user.id, email: user.email } as any : null;
        }
        if (kind === 'assertion') {
          const result = await verifyAuthenticationResponseForUser(parsed.data);
          const user = await prisma.user.findUnique({ where: { id: result.userId } });
          return user ? { id: user.id, email: user.email } as any : null;
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user = { ...(session.user ?? {}), id: token.sub } as any;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  secret: env.NEXTAUTH_SECRET,
};