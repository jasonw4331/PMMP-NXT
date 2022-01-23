import { getFirebaseAdmin, verifyIdToken } from 'next-firebase-auth'
import initAuth from '../../lib/firebase/initAuth'
import {
  getUserDocByUsername,
  postToJSON,
} from '../../lib/firebase/server/firestoreFuncs'
import semver from 'semver'
import Cors from 'cors'
import initMiddleware from '../../lib/initMiddleware'

initAuth()

const cors = initMiddleware(
  Cors({
    origin: '*',
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

const handler = async (req, res) => {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({ error: 'Missing Authorization header value' })
  }
  const token = req.headers.authorization

  await cors(req, res)

  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Bad request method' })
  }

  let AuthUser

  // This "unauthenticated" token is just a demo of the
  // "SSR with no token" example.
  if (token === 'unauthenticated') {
    return res.status(401).json({ error: 'Not authorized. No token given' })
  } else {
    try {
      AuthUser = await verifyIdToken(token)
    } catch (e) {
      console.error(e)
      return res.status(403).json({ error: 'Not authorized' })
    }

    if (AuthUser.claims.accessLevel < 1) {
      return res.status(403).json({ error: 'Not authorized' })
    }

    const {
      name,
      version,
      author,
      tagline = '',
      description = '',
      iconUrl = '',
      fileUrl = '',
      license = 'MIT',
      minAPI = '4.0.0',
      changelog = '',
      releaseStatus = 1,
    } = req.body
    const docName = name + '_v' + version

    let refNameMatched = false
    let submittedVersionIncremented = true
    let licensesMatch = true

    const userDoc = await getUserDocByUsername(AuthUser.displayName)
    const pluginsRef = userDoc.ref.collection('plugins')
    pluginsRef.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (!doc.id.includes(name)) {
          return
        }
        if (doc.id === docName) {
          refNameMatched = true
          return
        }
        const { license, releaseStatus } = postToJSON(doc)
        if (releaseStatus < 1) {
          return
        }
        if (
          semver.satisfies(doc.id.split('_v')[1], '>' + version, {
            includePrerelease: true,
          })
        ) {
          submittedVersionIncremented = false
          return
        }
        if (license !== 'custom' && license !== license) {
          licensesMatch = false
        }
      })
    })
    if (refNameMatched) {
      return res.status(400).json({
        error: 'A plugin has already been submitted with that version',
      })
    }
    if (!submittedVersionIncremented) {
      return res.status(400).json({
        error: 'Given version is not newer than previous submission',
      })
    }
    if (!licensesMatch) {
      return res.status(400).json({ error: 'License Mismatch' })
    }
    if (tagline.length > 100) {
      return res.status(400).json({ error: 'Given tagline is too large' })
    }
    // TODO: test if minAPI in supported API list

    if (license !== 'custom') {
      let validLicense = false
      const licenseRes = await fetch(
        'https://raw.githubusercontent.com/spdx/license-list-data/master/json/licenses.json'
      )
      const licenseJSON = await licenseRes.json()
      licenseJSON.licenses.every(({ licenseId }) => {
        if (licenseId === license) {
          validLicense = true
          return
        }
        return true
      })
      if (!validLicense) {
        return res.status(400).json({ error: 'License invalid' })
      }
    }

    try {
      await pluginsRef.doc(docName).set({
        'author': author,
        'tagline': tagline,
        'description': description,
        'iconUrl': iconUrl,
        'fileUrl': fileUrl,
        'license': license,
        'minAPI': minAPI,
        'createdAt': getFirebaseAdmin().firestore.FieldValue.serverTimestamp(),
        'lastUpdated':
          getFirebaseAdmin().firestore.FieldValue.serverTimestamp(),
        'dislikes': 0,
        'likes': 0,
        'releaseStatus': releaseStatus,
        'changelog': changelog,
      })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }
  return res.status(200).json({ message: 'success' })
}

export default handler
