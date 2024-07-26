import NextAuth from 'next-auth'
import Discord from 'next-auth/providers/discord'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Twitter from 'next-auth/providers/twitter'
import { SupabaseAdapter } from '@auth/supabase-adapter'

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
      // const [googleAccount] = await prisma.account.findMany({
      //   where: { userId: user.id, provider: 'google' },
      // })
      // if (googleAccount.expires_at * 1000 < Date.now()) {
      //   // If the access token has expired, try to refresh it
      //   try {
      //     // https://accounts.google.com/.well-known/openid-configuration
      //     // We need the `token_endpoint`.
      //     const response = await fetch('https://oauth2.googleapis.com/token', {
      //       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      //       body: new URLSearchParams({
      //         client_id: process.env.AUTH_GOOGLE_ID!,
      //         client_secret: process.env.AUTH_GOOGLE_SECRET!,
      //         grant_type: 'refresh_token',
      //         refresh_token: googleAccount.refresh_token,
      //       }),
      //       method: 'POST',
      //     })
      //
      //     const responseTokens = await response.json()
      //
      //     if (!response.ok) throw responseTokens
      //
      //     await prisma.account.update({
      //       data: {
      //         access_token: responseTokens.access_token,
      //         expires_at: Math.floor(
      //           Date.now() / 1000 + responseTokens.expires_in
      //         ),
      //         refresh_token:
      //           responseTokens.refresh_token ?? googleAccount.refresh_token,
      //       },
      //       where: {
      //         provider_providerAccountId: {
      //           provider: 'google',
      //           providerAccountId: googleAccount.providerAccountId,
      //         },
      //       },
      //     })
      //   } catch (error) {
      //     console.error('Error refreshing access token', error)
      //     // The error property can be used client-side to handle the refresh token error
      //     session.error = 'RefreshAccessTokenError'
      //   }
      // }
      session.user.role = user.role
      return session
    },
  },
})
