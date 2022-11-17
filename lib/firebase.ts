import * as firebaseAdmin from 'firebase-admin'
import 'server-only'

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const databaseURL = `https://${projectId}.firebaseio.com`
const authDomain = `${projectId}.firebaseapp.com`
const storageBucket = `${projectId}.appspot.com`
const messagingSenderId =
  process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.split(':')[1] || ''

export const firebaseConfig: firebaseAdmin.AppOptions = {
  credential: firebaseAdmin.credential.cert({
    projectId,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  } as firebaseAdmin.ServiceAccount),
  databaseURL,
  serviceAccountId: process.env.FIREBASE_CLIENT_EMAIL,
  storageBucket,
  projectId,
}

function createFirebaseApp(
  config: firebaseAdmin.AppOptions
): firebaseAdmin.app.App {
  try {
    return firebaseAdmin.app()
  } catch {
    return firebaseAdmin.initializeApp(config)
  }
}

export const firebaseApp = createFirebaseApp(firebaseConfig)
export default firebaseAdmin

// Auth exports
export const auth = firebaseAdmin.auth()

// Firestore exports
export const firestore = firebaseAdmin.firestore()

// Storage exports
export const storage = firebaseAdmin.storage()
