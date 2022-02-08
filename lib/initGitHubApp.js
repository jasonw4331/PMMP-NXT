import { App } from '@octokit/app'
import { getFirebaseAdmin } from 'next-firebase-auth'

const GITHUB_APP = new App({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
  oauth: {
    clientId: process.env.GITHUB_APP_CLIENT_ID,
    clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
  },
  webhooks: {
    secret: process.env.GITHUB_APP_WEBHOOK_SECRET,
  },
})

const Oauth = GITHUB_APP.oauth

Oauth.on(
  ['token.created', 'token.reset', 'token.refreshed', 'token.scoped'],
  async context => {
    const {
      data: { email },
    } = await context.octokit.request('GET /user')

    const firestore = getFirebaseAdmin().firestore()
    const auth = getFirebaseAdmin().auth()

    const firebaseUser = await auth.getUserByEmail(email)
    await firestore.doc(`tokens/${context.token}`).set({
      uid: firebaseUser.uid,
    })
    await auth.setCustomUserClaims(firebaseUser.uid, {
      developer: true,
    })
    await firestore.doc(`users/${firebaseUser.uid}`).update({
      type: 'developer',
      followers: [],
      recentReleases: [],
      recentSubmissions: [],
    })
  }
)

Oauth.on(['token.deleted', 'authorization.deleted'], async context => {
  await getFirebaseAdmin().firestore().doc(`tokens/${context.token}`).delete()
})

export default GITHUB_APP
