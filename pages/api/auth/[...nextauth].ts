import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import { firestore } from '../../../lib/server/ServerFirebase'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account !== null) token.userRole = 'user'
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client
      // TODO: fetch user info from firebase
      return session
    },
  },
  adapter: FirestoreAdapter({ firestore }),
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_APP_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    logo: process.env.NEXTAUTH_URL + '/icons/logo/icon.svg',
  },
} satisfies AuthOptions)
