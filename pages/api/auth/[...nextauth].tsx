import NextAuth, { User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import TwitterProvider from 'next-auth/providers/twitter'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../../../lib/client/ClientFirebase'

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const databaseURL = `https://${projectId}.firebaseio.com`
const authDomain = `${projectId}.firebaseapp.com`
const storageBucket = `${projectId}.appspot.com`
const messagingSenderId =
  process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.split(':')[1] || ''

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign-in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass select HTML attributes to the <input> tag through the object.
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'johnsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (credentials === undefined) return null

        // logic here to look up the user from the credentials supplied

        let credential
        try {
          credential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          )
        } catch (e) {
          credential = await createUserWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          )
        }

        const user = credential.user

        return {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        } as User
      },
    }),
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
  ],
  adapter: FirestoreAdapter({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }),
  callbacks: {
    session({ session, token, user }) {
      return session // The return type will match the one returned in `useSession()`
    },
  },
})
