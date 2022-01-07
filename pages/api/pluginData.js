import {getFirebaseAdmin} from 'next-firebase-auth'
import initAuth from '../../lib/firebase/initAuth'
import semver from 'semver'
import {postToJSON} from '../../lib/firebase/firestoreFuncs'

initAuth()

const handler = async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(400).json({error: 'Bad request method'})
  }

  try {
    let {latestOnly = false, name, author} = req.body

    if (name === undefined || author === undefined) {
      return res.status(400).json({error: 'Missing required information'})
    }

    name = decodeURI(name)
    author = decodeURI(author)

    const userQuery = await getFirebaseAdmin().firestore().collection('users').limit(1).get()
    const userDoc = userQuery.docs[0]

    if (userDoc === undefined)
      return res.status(200).json({docs: [{description: "User data could not be found"}]})

    const snapshot = await getFirebaseAdmin().firestore().collection('users/' + userDoc.id + '/plugins').get()
    if (snapshot.docs.length < 1)
      return res.status(200).json({docs: [{description: "Plugin data could not be found"}]})

    let latestVersions = []
    let docs = []
    snapshot.docs.forEach((doc) => {
      if (name && !doc.id.includes(name)) {
        return
      }
      const data = postToJSON(doc)
      const name1 = doc.id.split('_v')[0]
      const version = doc.id.split('_v')[1]
      if (data.releaseStatus <= 1) { // ignore drafts
        return
      }
      if (author && data.author !== author) {
        return
      }
      if (latestOnly === true) {
        if (latestVersions[name1] === undefined || semver.satisfies(version, '>' + latestVersions[name], {includePrerelease: true})) {
          latestVersions[name1] = version
          latestVersions.push(version)
          docs.push(data)
          return
        }
      }
      docs.push(data)
    })
    return res.status(200).json({docs})
  } catch (e) {
    return res.status(400).json({error: e.message})
  }
}

export default handler