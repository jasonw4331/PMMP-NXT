import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  OAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import Image from 'next/image'
import githubMark from '../public/icons/GitHub-Mark.svg'
import googleLogo from '../public/icons/GoogleLogo.svg'
import { doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import { getApp } from 'firebase/app'
import gitlabIcon from '../public/icons/GitLab-Icon.svg'
import bitbucketMark from '../public/icons/Bitbucket-Mark.svg'
import getAbsoluteURL from '../lib/getAbsoluteURL'

const FirebaseAuth = () => {
  return (
    <div className={'w-full h-full flex justify-center'}>
      <div className={'bg-zinc-900 w-full max-w-xl rounded-2xl px-3 py-1'}>
        <SignInButtons />
      </div>
    </div>
  )
}

const SignInButtons = () => {
  async function signInWithGoogle() {
    const auth = getAuth()
    const prevUser = auth.currentUser
    const provider = new GoogleAuthProvider()
    let result
    if (prevUser) result = await linkWithPopup(prevUser, provider)
    else result = await signInWithPopup(getAuth(), provider)

    const idToken = await result.user.getIdToken()
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
      res.json().then(data => {
        if (data.status === 'success') {
          // force refresh for new auth claims
          auth.currentUser.getIdToken(true)
        }
      })
    }

    const db = getFirestore(getApp())
    const docRef = doc(db, `users/${result.user.uid}`)
    try {
      await updateDoc(docRef, {
        photoURL: result.user.photoURL,
      })
    } catch (e) {
      await setDoc(docRef, {
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      })
    }
  }

  async function signInWithGitHub() {
    const auth = getAuth()
    const prevUser = auth.currentUser
    const provider = new GithubAuthProvider()
    ;['user:email', 'public_repo', 'workflow'].forEach(scope =>
      provider.addScope(scope)
    )
    let result
    if (prevUser) result = await linkWithPopup(prevUser, provider)
    else result = await signInWithPopup(getAuth(), provider)

    const idToken = await result.user.getIdToken()
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
      res.json().then(data => {
        if (data.status === 'success') {
          // force refresh for new auth claims
          auth.currentUser.getIdToken(true)
        }
      })
    }

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
        followers: [],
        plugins: [],
      })
    } catch (e) {
      await setDoc(docRef, {
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        followers: [],
        plugins: [],
      })
    }
  }

  async function signInWithGitLab() {
    const auth = getAuth()
    const prevUser = auth.currentUser
    const provider = new OAuthProvider('gitlab.com')
    ;['user:email', 'public_repo', 'workflow'].forEach(scope =>
      provider.addScope(scope)
    )
    let result
    if (prevUser) result = await linkWithPopup(prevUser, provider)
    else result = await signInWithPopup(getAuth(), provider)

    const idToken = await result.user.getIdToken()
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
      res.json().then(data => {
        if (data.status === 'success') {
          // force refresh for new auth claims
          auth.currentUser.getIdToken(true)
        }
      })
    }

    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result)
    const token = credential.accessToken

    const db = getFirestore(getApp())
    const docRef = doc(db, `users/${result.user.uid}`)
    try {
      await updateDoc(docRef, {
        followers: [],
        plugins: [],
        gitToken: token,
      })
    } catch (e) {
      await setDoc(docRef, {
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        followers: [],
        plugins: [],
        gitToken: token,
      })
    }
  }

  async function signInWithBitbucket() {
    const auth = getAuth()
    const prevUser = auth.currentUser
    const provider = new OAuthProvider('bitbucket.org')
    ;['user:email', 'public_repo', 'workflow'].forEach(scope =>
      provider.addScope(scope)
    )
    let result
    if (prevUser) result = await linkWithPopup(prevUser, provider)
    else result = await signInWithPopup(getAuth(), provider)

    const idToken = await result.user.getIdToken()
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
      res.json().then(data => {
        if (data.status === 'success') {
          // force refresh for new auth claims
          auth.currentUser.getIdToken(true)
        }
      })
    }

    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result)
    const token = credential.accessToken

    const db = getFirestore(getApp())
    const docRef = doc(db, `users/${result.user.uid}`)
    try {
      await updateDoc(docRef, {
        followers: [],
        plugins: [],
        gitToken: token,
      })
    } catch (e) {
      await setDoc(docRef, {
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        followers: [],
        plugins: [],
        gitToken: token,
      })
    }
  }

  return (
    <div className={'w-full max-w-md flex flex-wrap justify-center gap-2'}>
      <button
        onClick={signInWithGoogle}
        className='max-w-sm text-white bg-[#3469c1] hover:bg-[#3469c1]/90 focus:ring-4 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 dark:hover:bg-[#4285F4] mr-2 mb-2'>
        <div className={'mr-2 -ml-1 w-4 h-4'}>
          <Image src={googleLogo} alt={'Google Logo'} />
        </div>
        Sign in with Google
      </button>
      <button
        onClick={signInWithGitHub}
        className='max-w-sm text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#414a55] mr-2 mb-2'>
        <div className={'mr-2 -ml-1 w-4 h-4'}>
          <Image src={githubMark} alt={'Github Mark'} />
        </div>
        Sign in with GitHub
      </button>
      <button
        onClick={signInWithGitLab}
        disabled={true}
        className='hidden max-w-sm text-white bg-[#c6592a] hover:bg-[#ec6a32]/90 focus:ring-4 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#ec6a32] mr-2 mb-2'>
        <div className={'mr-2 -ml-1 w-4 h-4'}>
          <Image src={gitlabIcon} alt={'GitLab Icon'} />
        </div>
        Sign in with GitLab
      </button>
      <button
        onClick={signInWithBitbucket}
        disabled={true}
        className='hidden max-w-sm text-white bg-[#0747a6] hover:bg-[#0a67f2]/90 focus:ring-4 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#0a67f2] mr-2 mb-2'>
        <div className={'mr-2 -ml-1 w-4 h-4'}>
          <Image src={bitbucketMark} alt={'Bitbucket Mark'} />
        </div>
        Sign in with Bitbucket
      </button>
    </div>
  )
}

export default FirebaseAuth
