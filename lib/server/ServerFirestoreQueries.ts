import { firestore } from './ServerFirebase'
import { firestore as firestoreAdmin } from 'firebase-admin'
import DocumentSnapshot = firestoreAdmin.DocumentSnapshot
import QuerySnapshot = firestoreAdmin.QuerySnapshot
import DocumentData = firestoreAdmin.DocumentData

export type CardData = {
  id: string
  author: string
  tagline: string
  iconUrl: string
  downloadUrl: string
  createdAt: number
  lastUpdated: number
  description: string
  releaseStatus: number
  minAPI: string
  license: string
  mainCategory: string
  categories: string[]
  subCategories: string[]
  likes: string[]
  dislikes: string[]
}

export async function getTrending(): Promise<CardData[]> {
  const docs = []
  const snapshot = await firestore
    .collectionGroup('plugins')
    .where('releaseStatus', '==', 2)
    .get()
  for (const doc of snapshot.docs) {
    if (doc.ref.parent.parent === null) continue // filter plugins without user docs
    const userDoc = await doc.ref.parent.parent.get()
    const recentPlugins = userDoc.get('recentReleases')
    if (!recentPlugins.includes(doc.id.toString())) continue // filter outdated plugins
    const docData = await doc.data()
    docs.push({
      ...docData,
      id: doc.id,
      createdAt: docData.createdAt.toMillis() || 0, // convert firestore timestamps to milliseconds
      lastUpdated: docData.lastUpdated.toMillis() || 0,
    } as CardData)
  }

  return docs
}

export async function getReleases(): Promise<CardData[]> {
  const docs = []
  const snapshot = await firestore
    .collectionGroup('plugins')
    .where('releaseStatus', '==', 2)
    .get()
  for (const doc of snapshot.docs) {
    if (doc.ref.parent.parent === null) continue // filter plugins without user docs
    const userDoc = await doc.ref.parent.parent.get()
    const recentPlugins = userDoc.get('recentReleases')
    if (!recentPlugins.includes(doc.id.toString())) continue // filter outdated plugins
    const docData = await doc.data()
    docs.push({
      ...docData,
      id: doc.id,
      createdAt: docData.createdAt.toMillis() || 0, // convert firestore timestamps to milliseconds
      lastUpdated: docData.lastUpdated.toMillis() || 0,
    } as CardData)
  }

  return docs
}

export async function getSubmitted(): Promise<CardData[]> {
  const docs = []
  const snapshot = await firestore
    .collectionGroup('plugins')
    .where('releaseStatus', '==', 1)
    .get()
  for (const doc of snapshot.docs) {
    if (doc.ref.parent.parent === null) continue // filter plugins without user docs
    const userDoc = await doc.ref.parent.parent.get()
    const recentPlugins = userDoc.get('recentReleases')
    if (!recentPlugins.includes(doc.id.toString())) continue // filter outdated plugins
    const docData = await doc.data()
    docs.push({
      ...docData,
      id: doc.id,
      createdAt: docData.createdAt.toMillis() || 0, // convert firestore timestamps to milliseconds
      lastUpdated: docData.lastUpdated.toMillis() || 0,
    } as CardData)
  }

  return docs
}

export async function getPlugin(
  username: string,
  plugin: string,
  version: string | null = null
): Promise<CardData | null> {
  let query = firestore.collection('users').where('displayName', '==', username)
  let userSnapshot: QuerySnapshot<DocumentData>
  let doc: DocumentSnapshot<DocumentData>
  if (version === null || version === undefined) {
    userSnapshot = await query.limit(1).get()
    if (userSnapshot.empty) return null
    doc = await firestore
      .doc(`users/${userSnapshot.docs[0].id}/plugins/${plugin}`)
      .get()
  } else {
    userSnapshot = await query.get()
    if (userSnapshot.empty) return null
    doc = await firestore
      .doc(`users/${userSnapshot.docs[0].id}/plugins/${plugin}_v${version}`)
      .get()
  }
  const docData = await doc.data()
  return {
    ...docData,
    id: doc.id,
    createdAt: docData?.createdAt.toMillis() || 0, // convert firestore timestamps to milliseconds
    lastUpdated: docData?.lastUpdated.toMillis() || 0,
  } as CardData
}
