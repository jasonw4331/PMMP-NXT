import Image from 'next/image'
import githubMark from '../public/icons/GitHub-Mark.svg'
import googleLogo from '../public/icons/GoogleLogo.svg'
import twitterLogo from '../public/icons/TwitterLogo.svg'
import gitlabIcon from '../public/icons/GitLab-Icon.svg'
import bitbucketMark from '../public/icons/Bitbucket-Mark.svg'
import {
  signInWithBitbucket,
  signInWithGitHub,
  signInWithGitLab,
  signInWithGoogle,
  signInWithTwitter,
} from '../lib/signIn'

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
  return (
    <div className={'w-full max-w-md flex flex-wrap justify-center gap-2'}>
      <button
        onClick={signInWithGoogle}
        className='max-w-sm text-white bg-[#3469c1] hover:bg-[#3469c1]/90 focus:ring-4 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 dark:hover:bg-[#4285F4] mr-2 mb-2'>
        <div className={'mr-2 -ml-1 w-4 h-4'}>
          <Image src={googleLogo} alt={'Google Logo'} />
        </div>
        Sign in with Google
      </button>
      <button
        onClick={signInWithTwitter}
        disabled={true}
        className='hidden max-w-sm text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2'>
        <div className={'mr-2 -ml-1 w-4 h-4'}>
          <Image src={twitterLogo} alt={'Twitter Logo'} />
        </div>
        Sign in with Twitter
      </button>
      <button
        onClick={signInWithGitHub}
        className='max-w-sm text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#414a55] mr-2 mb-2'>
        <div className={'mr-2 -ml-1 w-4 h-4'}>
          <Image src={githubMark} alt={'Github Mark'} />
        </div>
        Sign in with GitHub
      </button>
      <button
        onClick={signInWithGitLab}
        disabled={true}
        className='hidden max-w-sm text-white bg-[#c6592a] hover:bg-[#ec6a32]/90 focus:ring-4 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#ec6a32] mr-2 mb-2'>
        <div className={'mr-2 -ml-1 w-4 h-4'}>
          <Image src={gitlabIcon} alt={'GitLab Icon'} />
        </div>
        Sign in with GitLab
      </button>
      <button
        onClick={signInWithBitbucket}
        disabled={true}
        className='hidden max-w-sm text-white bg-[#0747a6] hover:bg-[#0a67f2]/90 focus:ring-4 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#0a67f2] mr-2 mb-2'>
        <div className={'mr-2 -ml-1 w-4 h-4'}>
          <Image src={bitbucketMark} alt={'Bitbucket Mark'} />
        </div>
        Sign in with Bitbucket
      </button>
    </div>
  )
}

export default FirebaseAuth
