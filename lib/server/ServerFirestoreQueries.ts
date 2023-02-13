import 'server-only'
import { firestore as firestoreAdmin } from 'firebase-admin'
import { firestore } from './ServerFirebase'
import DocumentSnapshot = firestoreAdmin.DocumentSnapshot
import QuerySnapshot = firestoreAdmin.QuerySnapshot
import DocumentData = firestoreAdmin.DocumentData

export type CardData = {
  id: string
  author: string
  tagline: string
  icon_url: string
  download_url: string
  created_at: number
  last_updated: number
  description: string
  release_status: number
  min_api: string
  license: string
  main_category: string
  categories: string[]
  subcategories: string[]
  likes: string[]
  dislikes: string[]
}

export async function getTrending(): Promise<CardData[]> {
  const docs = []
  const snapshot = await firestore
    .collectionGroup('plugins')
    .where('release_status', '==', 2)
    .get()
  for (const doc of snapshot.docs) {
    if (doc.ref.parent.parent === null) continue // filter plugins without user docs
    const userDoc = await doc.ref.parent.parent.get()
    const recentPlugins = userDoc.get('recent_releases')
    if (!recentPlugins.includes(doc.id.toString())) continue // filter outdated plugins
    const docData = doc.data()
    docs.push({
      ...docData,
      id: doc.id,
      created_at: docData.created_at.toMillis() || 0, // convert firestore timestamps to milliseconds
      last_updated: docData.last_updated.toMillis() || 0,
    } as CardData)
  }

  return docs
}

export async function getReleases(): Promise<CardData[]> {
  const docs = []
  const snapshot = await firestore
    .collectionGroup('plugins')
    .where('release_status', '==', 2)
    .get()
  for (const doc of snapshot.docs) {
    if (doc.ref.parent.parent === null) continue // filter plugins without user docs
    const userDoc = await doc.ref.parent.parent.get()
    const recentPlugins = userDoc.get('recent_releases')
    if (!recentPlugins.includes(doc.id.toString())) continue // filter outdated plugins
    const docData = doc.data()
    docs.push({
      ...docData,
      id: doc.id,
      created_at: docData.created_at.toMillis() || 0, // convert firestore timestamps to milliseconds
      last_updated: docData.last_updated.toMillis() || 0,
    } as CardData)
  }

  return docs
}

export async function getSubmitted(): Promise<CardData[]> {
  const docs = []
  const snapshot = await firestore
    .collectionGroup('plugins')
    .where('release_status', '==', 1)
    .get()
  for (const doc of snapshot.docs) {
    if (doc.ref.parent.parent === null) continue // filter plugins without user docs
    const userDoc = await doc.ref.parent.parent.get()
    const recentPlugins = userDoc.get('recent_releases')
    if (!recentPlugins.includes(doc.id.toString())) continue // filter outdated plugins
    const docData = doc.data()
    docs.push({
      ...docData,
      id: doc.id,
      created_at: docData.createdAt.toMillis() || 0, // convert firestore timestamps to milliseconds
      last_updated: docData.lastUpdated.toMillis() || 0,
    } as CardData)
  }

  return docs
}

export async function getPlugin(
  username: string,
  plugin: string,
  version: string | null = null
): Promise<CardData | null> {
  let query = firestore.collection('users').where('name', '==', username)
  let userSnapshot: QuerySnapshot<DocumentData>
  let doc: DocumentSnapshot<DocumentData>
  if (version == null) {
    userSnapshot = await query.limit(1).get()
    if (userSnapshot.empty) return null
    doc = await firestore
      .collection('users')
      .doc(userSnapshot.docs[0].id)
      .collection('plugins')
      .doc(plugin)
      .get()
  } else {
    userSnapshot = await query.get()
    if (userSnapshot.empty) return null
    doc = await firestore
      .collection('users')
      .doc(userSnapshot.docs[0].id)
      .collection('plugins')
      .doc(`${plugin}_v${version}`)
      .get()
  }
  const docData = doc.data()
  if (docData === undefined) return null
  return {
    ...docData,
    id: doc.id,
    created_at: docData?.created_at.toMillis() || 0, // convert firestore timestamps to milliseconds
    last_updated: docData?.last_updated.toMillis() || 0,
  } as CardData
}
