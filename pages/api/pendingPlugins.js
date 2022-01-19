import { getFirebaseAdmin } from 'next-firebase-auth'
import initAuth from '../../lib/firebase/initAuth'
import { postToJSON } from '../../lib/firebase/server/firestoreFuncs'
import semver from 'semver'

initAuth()

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Bad request method' })
  }

  try {
    const { latestOnly = false, name, author } = req.query

    const snapshot = await getFirebaseAdmin()
      .firestore()
      .collectionGroup('plugins')
      .get()
    let latestVersions = []
    let docs = []
    snapshot.docs.forEach(doc => {
      if (name && !doc.id.includes(name)) {
        return
      }
      const data = postToJSON(doc)
      const name1 = doc.id.split('_v')[0]
      const version = doc.id.split('_v')[1]
      if (data.releaseStatus !== 1) {
        // ignore drafts
        return
      }
      if (author && data.author !== author) {
        return
      }
      if (latestOnly === true) {
        if (
          latestVersions[name1] === undefined ||
          semver.satisfies(version, '>' + latestVersions[name], {
            includePrerelease: true,
          })
        ) {
          latestVersions[name1] = version
          latestVersions.push(version)
          docs.push(data)
          return
        }
      }
      docs.push(data)
    })
    return res.status(200).json({ docs })
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
}

export default handler
