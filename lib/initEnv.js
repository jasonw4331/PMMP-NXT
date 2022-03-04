import { getFirebaseAdmin } from 'next-firebase-auth'

const initEnv = async () => {
  if (process.env.updated === 'true' || typeof window !== 'undefined') return
  const snapshot = await getFirebaseAdmin().firestore().doc('meta/config').get()
  const docData = snapshot.data()

  try {
    process.env = {
      ...process.env,
      ...docData,
      updated: 'true',
    }
  } catch (e) {
    console.error(e)
  }
}

export default initEnv
