/*
 * Fetch all updated plugin records from firestore
 */
import { firestore } from './ServerFirebase'
import { notFound } from 'next/navigation'

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
  plugin: string,
  username: string
): Promise<CardData> {
  const userSnapshot = await firestore
    .collection('users')
    .where('displayName', '==', username)
    .limit(1)
    .get()
  if (userSnapshot.docs.length < 1) notFound() // throw 404 if user doesn't exist

  const doc = await firestore
    .doc(`users/${userSnapshot.docs[0].id}/plugins/${plugin}`)
    .get()
  const docData = await doc.data()
  return {
    ...docData,
    id: doc.id,
    createdAt: docData?.createdAt.toMillis() || 0, // convert firestore timestamps to milliseconds
    lastUpdated: docData?.lastUpdated.toMillis() || 0,
  } as CardData
}
