import initAuth from '../../lib/firebase/initAuth'
import { getFirebaseAdmin } from 'next-firebase-auth'

initAuth()

const handler = async (req, res) => {
  async function testDeveloperClaims(claims) {
    const data = await getFirebaseAdmin()
      .firestore()
      .collection('tokens')
      .where('uid', '==', claims.sub)
      .limit(1)
      .get()
    return data.docs.length > 0
  }

  async function testReviewerClaims(claims) {
    const data = await getFirebaseAdmin()
      .firestore()
      .doc(`claims/${claims.email}`)
      .get()
    return data.data()?.reviewer
  }

  async function testAdminClaims(claims) {
    const data = await getFirebaseAdmin()
      .firestore()
      .doc(`claims/${claims.email}`)
      .get()
    return data.data()?.admin
  }

  try {
    const auth = getFirebaseAdmin().auth()

    // Get the ID token passed.
    const idToken = req.body.idToken
    const checkClaims = req.body.checkClaims

    // Verify the ID token and decode its payload.
    const claims = await auth.verifyIdToken(idToken)

    let newClaims = {}
    let newDocData = {}

    // Verify user is eligible for additional privileges.
    if (
      checkClaims.includes('developer') &&
      (await testDeveloperClaims(claims))
    ) {
      // set developer privileges
      newClaims = {
        ...newClaims,
        developer: true,
      }
      newDocData = {
        ...newDocData,
        type: 'developer',
        followers: [],
        recentReleases: [],
        recentSubmissions: [],
      }
    }
    if (
      checkClaims.includes('reviewer') &&
      (await testReviewerClaims(claims))
    ) {
      // set reviewer privileges
      newClaims = {
        ...newClaims,
        reviewer: true,
      }
      newDocData = {
        ...newDocData,
        type: 'reviewer',
      }
    }
    if (checkClaims.includes('admin') && (await testAdminClaims(claims))) {
      // set admin privileges
      newClaims = {
        ...newClaims,
        admin: true,
      }
      newDocData = {
        ...newDocData,
        type: 'admin',
      }
    }
    if (newClaims !== {})
      // Set custom claims on the user.
      await auth.setCustomUserClaims(claims.sub, newClaims)

    if (newDocData !== {})
      await getFirebaseAdmin()
        .firestore()
        .doc(`user/${claims.sub}`)
        .update(newDocData)

    return res.status(200).json({
      status: 'success',
      message: 'User privileges updated.',
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Unexpected error.' })
  }
}

export default handler
