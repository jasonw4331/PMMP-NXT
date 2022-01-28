import initAuth from '../../lib/firebase/initAuth'
import { getFirebaseAdmin } from 'next-firebase-auth'

initAuth()

const handler = async (req, res) => {
  try {
    const auth = getFirebaseAdmin().auth()

    // Get the ID token passed.
    const idToken = req.body.idToken

    // Verify the ID token and decode its payload.
    const claims = await auth.verifyIdToken(idToken)

    let newClaims = {}

    // Verify user is eligible for additional privileges.
    if (claims.firebase.sign_in_provider === 'github.com') {
      // set developer privileges
      newClaims = {
        ...newClaims,
        developer: true,
      }
    }
    if (JSON.parse(process.env.REVIEWERS).includes(claims.email)) {
      // set reviewer privileges
      newClaims = {
        ...newClaims,
        reviewer: true,
      }
    }
    if (JSON.parse(process.env.ADMINS).includes(claims.email)) {
      // set admin privileges
      newClaims = {
        ...newClaims,
        admin: true,
      }
    }
    if (newClaims !== {}) {
      // Set custom claims on the user.
      await auth.setCustomUserClaims(claims.sub, newClaims)
      return res.status(200).json({
        status: 'success',
      })
    } else {
      return res.status(200).json({
        status: 'ineligible',
        message: 'User is not eligible for additional privileges.',
      })
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Unexpected error.' })
  }
}

export default handler
