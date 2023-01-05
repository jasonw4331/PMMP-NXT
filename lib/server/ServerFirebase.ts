//import 'server-only'
import * as firebaseAdmin from 'firebase-admin'

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
)

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const databaseURL = `https://${projectId}.firebaseio.com`
//const authDomain = `${projectId}.firebaseapp.com`
const storageBucket = `${projectId}.appspot.com`
//const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.split(':')[1] || ''

export const firebaseConfig: firebaseAdmin.AppOptions = {
  credential: firebaseAdmin.credential.cert(serviceAccount),
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

const firebaseApp = createFirebaseApp(firebaseConfig)
export default firebaseAdmin

// Auth exports
export const auth = firebaseAdmin.auth()

// Firestore exports
export const firestore = firebaseAdmin.firestore()

// Storage exports
export const storage = firebaseAdmin.storage()
