import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  OAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import getAbsoluteURL from './getAbsoluteURL'
import { doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
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

export async function signInWithGoogle() {
  const auth = getAuth()
  const prevUser = auth.currentUser
  const provider = new GoogleAuthProvider()
  let result
  if (prevUser) result = await linkWithPopup(prevUser, provider)
  else result = await signInWithPopup(getAuth(), provider)

  const tokenResult = await setAuthClaims(await result.user.getIdToken())

  try {
    await setDoc(doc(getFirestore(getApp()), `users/${result.user.uid}`), {
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      type: tokenResult?.claims.admin
        ? 'admin'
        : tokenResult?.claims.reviewer
        ? 'reviewer'
        : 'user',
    })
  } catch (e) {
    console.log(e)
  }
}

export async function signInWithGitHub() {
  const auth = getAuth()
  const prevUser = auth.currentUser
  const provider = new GithubAuthProvider()
  ;['user:email', 'public_repo', 'workflow'].forEach(scope =>
    provider.addScope(scope)
  )
  let result
  if (prevUser) result = await linkWithPopup(prevUser, provider)
  else result = await signInWithPopup(getAuth(), provider)

  const tokenResult = await setAuthClaims(await result.user.getIdToken())

  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  const credential = GithubAuthProvider.credentialFromResult(result)
  const token = credential.accessToken

  const db = getFirestore(getApp())

  // Save the GitHub access token to the tokens collection
  try {
    await setDoc(doc(db, `tokens/${token}`), {
      host: 'github',
      uid: result.user.uid,
    })
  } catch (e) {
    console.log(e)
  }

  // Save the user data to the users collection
  const docRef = doc(db, `users/${result.user.uid}`)
  try {
    await updateDoc(docRef, {
      type: tokenResult?.claims.admin
        ? 'admin'
        : tokenResult?.claims.reviewer
        ? 'reviewer'
        : 'developer',
    })
  } catch (e) {
    await setDoc(docRef, {
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      followers: [],
      recentReleases: [],
      recentSubmissions: [],
      type: tokenResult?.claims.admin
        ? 'admin'
        : tokenResult?.claims.reviewer
        ? 'reviewer'
        : 'developer',
    })
  }
  try {
    if (prevUser)
      await updateProfile(prevUser, { displayName: result.user.displayName })
  } catch (e) {
    console.log(e)
  }
}

export async function signInWithGitLab() {
  const auth = getAuth()
  const prevUser = auth.currentUser
  const provider = new OAuthProvider('gitlab.com')
  ;['read_user', 'read_repository'].forEach(scope => provider.addScope(scope))
  let result
  if (prevUser) result = await linkWithPopup(prevUser, provider)
  else result = await signInWithPopup(getAuth(), provider)

  const tokenResult = await setAuthClaims(await result.user.getIdToken())

  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  const credential = GithubAuthProvider.credentialFromResult(result)
  const token = credential.accessToken

  const db = getFirestore(getApp())

  // Save the GitHub access token to the tokens collection
  try {
    await setDoc(doc(db, `tokens/${token}`), {
      host: 'gitlab',
      uid: result.user.uid,
    })
  } catch (e) {
    console.log(e)
  }

  const docRef = doc(db, `users/${result.user.uid}`)
  try {
    await updateDoc(docRef, {
      type: tokenResult?.claims.admin
        ? 'admin'
        : tokenResult?.claims.reviewer
        ? 'reviewer'
        : 'developer',
    })
  } catch (e) {
    await setDoc(docRef, {
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      followers: [],
      recentReleases: [],
      recentSubmissions: [],
      type: tokenResult?.claims.admin
        ? 'admin'
        : tokenResult?.claims.reviewer
        ? 'reviewer'
        : 'developer',
    })
  }
}

export async function signInWithBitbucket() {
  const auth = getAuth()
  const prevUser = auth.currentUser
  const provider = new OAuthProvider('bitbucket.org')
  ;['account', 'repository'].forEach(scope => provider.addScope(scope))
  let result
  if (prevUser) result = await linkWithPopup(prevUser, provider)
  else result = await signInWithPopup(getAuth(), provider)

  const tokenResult = await setAuthClaims(await result.user.getIdToken())

  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  const credential = GithubAuthProvider.credentialFromResult(result)
  const token = credential.accessToken

  const db = getFirestore(getApp())

  // Save the GitHub access token to the tokens collection
  try {
    await setDoc(doc(db, `tokens/${token}`), {
      host: 'bitbucket',
      uid: result.user.uid,
    })
  } catch (e) {
    console.log(e)
  }

  const docRef = doc(db, `users/${result.user.uid}`)
  try {
    await updateDoc(docRef, {
      type: tokenResult.claims.admin
        ? 'admin'
        : tokenResult.claims.reviewer
        ? 'reviewer'
        : 'developer',
    })
  } catch (e) {
    await setDoc(docRef, {
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      followers: [],
      recentReleases: [],
      recentSubmissions: [],
      type: tokenResult.claims.admin
        ? 'admin'
        : tokenResult.claims.reviewer
        ? 'reviewer'
        : 'developer',
    })
  }
}
