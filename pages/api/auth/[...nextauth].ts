import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import TwitterProvider from 'next-auth/providers/twitter'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import { firebaseConfig } from '../../../lib/server/ServerFirebase'

export const authOptions: AuthOptions = {
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client
      // TODO: fetch user info from firebase
      return session
    },
  },
  adapter: FirestoreAdapter(firebaseConfig),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        console.log(profile)
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_APP_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET as string,
      profile(profile) {
        console.log(profile)
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
      allowDangerousEmailAccountLinking: true,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      profile(profile) {
        console.log(profile)
        return {
          id: profile.id_str,
          name: profile.name,
          email: profile.email,
          image: profile.profile_image_url_https.replace(
            /_normal\.(jpg|png|gif)$/,
            '.$1'
          ),
        }
      },
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
