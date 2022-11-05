/*
 * Fetch all updated plugin records from firestore
 */
import { firestore } from './firebase'

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

export default async function getPlugins(): Promise<CardData[]> {
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
