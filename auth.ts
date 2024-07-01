import NextAuth from 'next-auth'
import Discord from 'next-auth/providers/discord'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Passkey from 'next-auth/providers/passkey'
import Twitter from 'next-auth/providers/twitter'
import { SupabaseAdapter } from '@auth/supabase-adapter'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { email: true } },
      profile(profile) {
        return { role: profile.user_role ?? 'user', ...profile }
      },
    }),
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      authorization: { params: {} },
      profile(profile) {
        return { role: profile.user_role ?? 'user', ...profile }
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: { params: {} },
      profile(profile) {
        return { role: profile.user_role ?? 'user', ...profile }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: { params: { access_type: 'offline', prompt: 'consent' } },
      profile(profile) {
        return { role: profile.user_role ?? 'user', ...profile }
      },
    }),
    Passkey({
      formFields: {
        username: { label: 'Username', type: 'text', required: true },
        email: { label: 'Email', type: 'email', required: true },
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.AUTH_SUPABASE_URL,
    secret: process.env.AUTH_SUPABASE_SERVICE_ROLE_KEY,
  }),
  experimental: { enableWebAuthn: true },
  callbacks: {
    session({ session, user }) {
      // in places like `useSession().data.user` or `auth().user`
      return {
        ...session,
        user: {
          ...session.user,
        },
      }
    },
  },
})
