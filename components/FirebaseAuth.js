import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import Image from 'next/image'
import githubMark from '../public/icons/GitHub-Mark.svg'
import googleLogo from '../public/icons/GoogleLogo.svg'
import { useAuthUser } from 'next-firebase-auth'
import { useState } from 'react'
import { Password } from '@mui/icons-material'

const FirebaseAuth = () => {
  const authUser = useAuthUser()

  return authUser.id !== null ? (
    <UsernameForm user={authUser} />
  ) : (
    <SignInButtons />
  )
}

const SignInButtons = () => {
  async function signInWithEmail() {
    createUserWithEmailAndPassword(getAuth(), '', '')
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        // ...
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
      })
  }

  async function signInWithGoogle() {
    signInWithPopup(getAuth(), new GoogleAuthProvider())
      .then(result => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken

        // The signed-in user info.
        const user = result.user
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }

  async function signInWithGitHub() {
    const provider = new GithubAuthProvider()
    ;['user:email', 'public_repo', 'workflow'].forEach(scope =>
      provider.addScope(scope)
    )
    signInWithPopup(getAuth(), provider)
      .then(result => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result)
        const token = credential.accessToken

        // The signed-in user info.
        const user = result.user
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error)
        // ...
      })
  }

  return (
    <div className={'max-w-sm'}>
      <button
        onClick={signInWithEmail}
        className='w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center justify-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700'>
        <Password className={'mr-2 -ml-1 w-4 h-4'} />
        Sign in with Email and Password
      </button>
      <button
        onClick={signInWithGoogle}
        className='w-full text-white bg-[#3469c1] hover:bg-[#3469c1]/90 focus:ring-4 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 dark:hover:bg-[#4285F4] mr-2 mb-2'>
        <div className={'mr-2 -ml-1 w-4 h-4'}>
          <Image src={googleLogo} alt={'Google Logo'} />
        </div>
        Sign in with Google
      </button>
      <button
        onClick={signInWithGitHub}
        className='w-full text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#414a55] mr-2 mb-2'>
        <div className={'mr-2 -ml-1 w-4 h-4'}>
          <Image src={githubMark} alt={'Github Mark'} />
        </div>
        Sign in with GitHub
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
