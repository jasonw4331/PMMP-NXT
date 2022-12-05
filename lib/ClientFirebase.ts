import 'client-only'
import {
  FirebaseApp,
  FirebaseOptions,
  getApp,
  initializeApp,
} from '@firebase/app'
import {
  Auth,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from '@firebase/auth'
import { getMessaging, Messaging } from '@firebase/messaging'

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const databaseURL = `https://${projectId}.firebaseio.com`
const authDomain = `${projectId}.firebaseapp.com`
const storageBucket = `${projectId}.appspot.com`
const messagingSenderId =
  process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.split(':')[1] || ''

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} as FirebaseOptions

function createFirebaseApp(config: FirebaseOptions): FirebaseApp {
  try {
    return getApp()
  } catch {
    return initializeApp(config)
  }
}

const firebaseApp: FirebaseApp = createFirebaseApp(firebaseConfig)

// Auth exports
export const auth: Auth = getAuth(firebaseApp)
export const googleAuthProvider = new GoogleAuthProvider()
export const githubAuthProvider = new GithubAuthProvider()
export const twitterAuthProvider = new TwitterAuthProvider()

// Messaging exports
export const messaging: Messaging = getMessaging(firebaseApp)
