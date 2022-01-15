import { getFirebaseAdmin } from 'next-firebase-auth'
import initAuth from '../../lib/firebase/initAuth'
import semver from 'semver'
import { postToJSON } from '../../lib/firebase/firestoreFuncs'

initAuth()

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Bad request method' })
  }

  try {
    let { name, author } = req.query

    if (name === undefined || author === undefined) {
      return res.status(400).json({ error: 'Missing required information' })
    }

    name = decodeURI(name)
    author = decodeURI(author)

    let version = name.split('_v')[1]

    if (semver.valid(version, { includePrerelease: true }) === null) {
      return res.status(400).json({})
    }

    version = semver.clean(version, { includePrerelease: true })

    const userQuery = await getFirebaseAdmin()
      .firestore()
      .collection('users')
      .limit(1)
      .get()
    const userDoc = userQuery.docs[0]

    if (userDoc === undefined) return res.status(400).json({})

    const snapshot = await getFirebaseAdmin()
      .firestore()
      .collection('users/' + userDoc.id + '/plugins')
      .get()
    if (snapshot.docs.length < 1) return res.status(400).json({})
    let returnData = null
    snapshot.docs.every(doc => {
      if (name && !doc.id.includes(name)) {
        return
      }
      const data = postToJSON(doc)
      const version1 = doc.id.split('_v')[1]
      if (data.releaseStatus <= 1) {
        // ignore drafts
        return
      }
      if (author && data.author !== author) {
        return
      }
      if (semver.eq(version, version1, false)) {
        returnData = data
        return false
      }
    })
    if (returnData === null) return res.status(400).json({})
    return res.status(200).json(returnData)
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
}

export default handler
