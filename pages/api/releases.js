import {getFirebaseAdmin} from 'next-firebase-auth'
import initAuth from '../../lib/firebase/initAuth'
import {postToJSON} from "../../lib/firebase/firestoreFuncs";
import semver from "semver";

initAuth()

const handler = async (req, res) => {
  if(req.method !== 'GET' && req.method !== 'POST') {
    return res.status(400).json({ error: 'Bad request method' })
  }

  try {
    const { latestOnly = undefined, name = undefined, author = undefined } = req.body

    const snapshot = await getFirebaseAdmin().firestore().collectionGroup('plugins').get()
    let latestVersions = []
    let docs = []
    snapshot.docs.forEach((doc) => {
      if(name !== undefined && !doc.id.includes(name)) {
        return
      }
      const { author: author1, releaseStatus } = postToJSON(doc)
      const name1 = doc.id.split('_v')[0]
      const version = doc.id.split('_v')[1]
      if(releaseStatus <= 1) { // ignore drafts
        return
      }
      if(author !== undefined && author !== author1) {
        return
      }
      if(latestOnly === true) {
        if(latestVersions[name1] === undefined || semver.satisfies(version, '>' + latestVersions[name], { includePrerelease: true })) {
          latestVersions[name1] = version
          docs[name1] = doc
        }
      }else{
        docs[name1] = doc
        docs.push(doc)
      }
    })
    return res.status(200).json(docs.map(doc => postToJSON(doc)))
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
}

export default handler
