import { getFirebaseAdmin } from 'next-firebase-auth'
import semver from 'semver'

export async function getUserDocByUsername(displayName) {
  const usersRef = getFirebaseAdmin().firestore().collection('users')
  const query = usersRef.where('displayName', '==', displayName).limit(1)
  return (await query.get()).docs[0]
}

export async function getPluginDocByName(pluginName) {
  const snapshot = await getFirebaseAdmin()
    .firestore()
    .collectionGroup('plugins')
    .get()
  let latestVersion = null
  let lastDoc = null
  snapshot.docs.forEach(doc => {
    if (!doc.id.includes(pluginName)) {
      return
    }
    const { releaseStatus } = postToJSON(doc)
    const version = doc.id.split('_v')[1]
    if (releaseStatus < 1) {
      // skip drafts
      return
    }
    if (
      latestVersion === null ||
      semver.satisfies(version, '>' + latestVersion, {
        includePrerelease: true,
      })
    ) {
      latestVersion = version
      lastDoc = doc
    }
  })
  return lastDoc
}

export function postToJSON(doc) {
  const data = doc.data()
  return {
    ...data,
    id: doc.id,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis() || 0,
    lastUpdated: data.lastUpdated.toMillis() || 0,
  }
}

export function userToJSON(doc) {
  const data = doc.data()
  return {
    ...data,
    id: doc.id,
  }
}
