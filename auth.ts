import NextAuth from 'next-auth'
import Discord, { DiscordProfile } from 'next-auth/providers/discord'
import GitHub, { GitHubProfile } from 'next-auth/providers/github'
import Google, { GoogleProfile } from 'next-auth/providers/google'
import Twitter, { TwitterProfile } from 'next-auth/providers/twitter'
import { SupabaseAdapter } from '@auth/supabase-adapter'
import jose from 'jose'
import { JWTPayload } from 'jose/dist/types/types'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      authorization: { params: { email: true } }, // https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
      profile(profile) {
        return { role: profile.role ?? 'user', ...profile }
      },
    }),
    Twitter({
      authorization: { params: {} }, // https://developer.twitter.com/en/docs/twitter-for-websites/log-in-with-twitter/guides/implementing-sign-in-with-twitter
      profile(profile) {
        return { role: profile.role ?? 'user', ...profile }
      },
    }),
    GitHub({
      authorization: { params: { access_type: 'offline', prompt: 'consent' } }, // https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
      profile(profile) {
        return { role: profile.role ?? 'developer', ...profile }
      },
    }),
    Google({
      authorization: { params: { access_type: 'offline', prompt: 'consent' } }, // https://developers.google.com/identity/protocols/oauth2/web-server#creatingclient
      profile(profile) {
        return { role: profile.role ?? 'user', ...profile }
      },
    }),
    // Passkey({
    //   formFields: {
    //     username: { label: 'Username', type: 'text', required: true },
    //     email: { label: 'Email', type: 'email', required: true },
    //   },
    // }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.AUTH_SUPABASE_URL as string,
    secret: process.env.AUTH_SUPABASE_SERVICE_ROLE_KEY as string,
  }),
  //experimental: { enableWebAuthn: true },
  callbacks: {
    async session({ session, user }) {
      // TODO: automatic token rotation
      const signingSecret = process.env.AUTH_SUPABASE_JWT
      if (signingSecret) {
        const secret = new TextEncoder().encode(signingSecret)
        session.supabaseAccessToken = await new jose.SignJWT({
          aud: 'authenticated',
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: 'authenticated',
        } satisfies JWTPayload).sign(secret)
      }
      session.user.role = user.role
      return session
    },
  },
})
