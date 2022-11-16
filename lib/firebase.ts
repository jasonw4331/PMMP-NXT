import * as firebaseAdmin from 'firebase-admin'
import { app, AppOptions } from 'firebase-admin'
import App = app.App
import 'server-only'

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const databaseURL = `https://${projectId}.firebaseio.com`
const authDomain = `${projectId}.firebaseapp.com`
const storageBucket = `${projectId}.appspot.com`
const messagingSenderId =
  process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.split(':')[1] || ''

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain,
  databaseURL,
  projectId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket,
}

function createFirebaseApp(config: AppOptions): App {
  try {
    return firebaseAdmin.app()
  } catch {
    return firebaseAdmin.initializeApp(config)
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig)

// Auth exports
export const auth = firebaseApp.auth()

// Firestore exports
export const firestore = firebaseApp.firestore()

// Storage exports
export const storage = firebaseApp.storage()
export const STATE_CHANGED = 'state_changed'
