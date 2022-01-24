import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  OAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import Image from 'next/image'
import githubMark from '../public/icons/GitHub-Mark.svg'
import googleLogo from '../public/icons/GoogleLogo.svg'
import { useAuthUser } from 'next-firebase-auth'
import { doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { getApp } from 'firebase/app'
import gitlabIcon from '../public/icons/GitLab-Icon.svg'
import bitbucketMark from '../public/icons/Bitbucket-Mark.svg'

const FirebaseAuth = () => {
  const authUser = useAuthUser()

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
    let result = null
    if (prevUser) result = await linkWithPopup(prevUser, provider)
    else result = await signInWithPopup(getAuth(), provider)

    const db = getFirestore(getApp())
    const docRef = doc(db, `users/${result.user.uid}`)
    try {
      await updateDoc(docRef, {
        accessLevel: 0,
        photoURL: result.user.photoURL,
      })
    } catch (e) {
      await setDoc(docRef, {
        accessLevel: 0,
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
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result)
    const token = credential.accessToken

    const db = getFirestore(getApp())
    const docRef = doc(db, `users/${result.user.uid}`)
    try {
      await updateDoc(docRef, {
        accessLevel: 1,
        followers: [],
        plugins: [],
        gitToken: token,
      })
    } catch (e) {
      await setDoc(docRef, {
        accessLevel: 1,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        followers: [],
        plugins: [],
        gitToken: token,
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

    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result)
    const token = credential.accessToken

    const db = getFirestore(getApp())
    const docRef = doc(db, `users/${result.user.uid}`)
    try {
      await updateDoc(docRef, {
        accessLevel: 1,
        followers: [],
        plugins: [],
        gitToken: token,
      })
    } catch (e) {
      await setDoc(docRef, {
        accessLevel: 1,
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

    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result)
    const token = credential.accessToken

    const db = getFirestore(getApp())
    const docRef = doc(db, `users/${result.user.uid}`)
    try {
      await updateDoc(docRef, {
        accessLevel: 1,
        followers: [],
        plugins: [],
        gitToken: token,
      })
    } catch (e) {
      await setDoc(docRef, {
        accessLevel: 1,
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

const UsernameForm = ({ user }) => {
  const [formValue, setFormValue] = useState('')

  const onSubmit = async e => {
    e.preventDefault()

    await updateProfile(user, { displayName: formValue })
  }

  return (
    <section>
      <h3>Choose a Username</h3>
      <form onSubmit={onSubmit}>
        <input name='username' placeholder='my name' value={formValue} />
        <button
          type='submit'
          className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'
          disabled={formValue !== ''}>
          Choose
        </button>
      </form>
    </section>
  )
}

export default FirebaseAuth
