import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  OAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from 'firebase/auth'
import getAbsoluteURL from './getAbsoluteURL'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { getApp } from 'firebase/app'

export async function setAuthClaims(idToken) {
  const auth = getAuth()
  const res = await fetch(getAbsoluteURL('/api/setCustomClaims', null), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idToken,
      checkClaims: ['admin', 'reviewer', 'developer'],
    }),
  })
  const status = res.status
  if (status === 200) {
    const data = res.json()
    if (data.status === 'success') {
      // force refresh for new auth claims
      return await auth.currentUser.getIdTokenResult(true)
    }
  }
  return null
}

async function signInWithProvider({ provider }) {
  const auth = getAuth()
  const prevUser = auth.currentUser
  let result
  if (prevUser) result = await linkWithPopup(prevUser, provider)
  else result = await signInWithPopup(getAuth(), provider)

  try {
    await setDoc(doc(getFirestore(getApp()), `users/${result.user.uid}`), {
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
    })
    await setAuthClaims(await result.user.getIdToken())
  } catch (e) {
    console.log(e)
  }
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  await signInWithProvider({ provider })
}

export async function signInWithTwitter() {
  const provider = new TwitterAuthProvider()
  // ;['user:email', 'public_repo', 'workflow'].forEach(scope =>
  //   provider.addScope(scope)
  // )
  await signInWithProvider({ provider })
}

export async function signInWithGitHub() {
  const provider = new GithubAuthProvider()
  ;['user:email', 'public_repo', 'workflow'].forEach(scope =>
    provider.addScope(scope)
  )
  await signInWithProvider({ provider })
}

export async function signInWithGitLab() {
  const provider = new OAuthProvider('gitlab.com')
  ;['read_user', 'read_repository'].forEach(scope => provider.addScope(scope))
  await signInWithProvider({ provider })
}

export async function signInWithBitbucket() {
  const provider = new OAuthProvider('bitbucket.org')
  ;['account', 'repository'].forEach(scope => provider.addScope(scope))
  await signInWithProvider({ provider })
}
