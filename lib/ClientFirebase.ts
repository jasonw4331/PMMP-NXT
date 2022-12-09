import 'client-only'
import {
  FirebaseApp,
  FirebaseOptions,
  getApp,
  initializeApp,
} from 'firebase/app'
import {
  Auth,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
  TwitterAuthProvider,
} from 'firebase/auth'

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
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
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

export const signInWithTwitter = async () =>
  await signInWithRedirect(auth, new TwitterAuthProvider())

export const signInWithGoogle = async () =>
  await signInWithRedirect(auth, new GoogleAuthProvider())

export const signInWithGithub = async () =>
  await signInWithRedirect(
    auth,
    new GithubAuthProvider().addScope('user:email')
  )

// Messaging exports
//export const messaging: Messaging = getMessaging(firebaseApp)
