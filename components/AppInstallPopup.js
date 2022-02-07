import { Close } from '@mui/icons-material'
import Link from 'next/link'
import { useAuthUser } from 'next-firebase-auth'
import { signInWithGitHub } from '../lib/signIn'
import Image from 'next/image'
import githubMark from '../public/icons/GitHub-Mark.svg'

const AppInstallPopup = ({ setPopupOpen }) => {
  const authUser = useAuthUser()
  return (
    <div
      className='overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-32 z-50 justify-center items-center md:inset-32 h-modal sm:h-full'
      id='large-modal'>
      <div className='relative px-4 w-full max-w-4xl h-full md:h-auto'>
        <div className='relative bg-white rounded-lg shadow dark:bg-zinc-700'>
          <div className='flex justify-between items-center p-5 rounded-t border-b dark:border-zinc-600'>
            <h3 className='text-xl font-medium text-zinc-900 dark:text-white'>
              Releasing Plugins
            </h3>
            <button
              onClick={() => setPopupOpen(false)}
              type='button'
              className='text-zinc-400 bg-transparent hover:bg-zinc-200 hover:text-zinc-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-zinc-600 dark:hover:text-white'
              data-modal-toggle='large-modal'>
              <Close />
            </button>
          </div>
          <ol className='p-6 space-y-6 list-decimal list-inside'>
            {!authUser.firebaseUser.providerData.some(
              ({ providerId }) => providerId === 'github.com'
            ) && (
              <li className='font-semibold leading-relaxed text-zinc-500 dark:text-zinc-300'>
                <span className={'mr-2'}>
                  Sign in with GitHub by clicking here:
                </span>
                <button
                  onClick={signInWithGitHub}
                  className='max-w-sm text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#414a55]'>
                  <div className={'mr-2 -ml-1 w-4 h-4'}>
                    <Image src={githubMark} alt={'Github Mark'} />
                  </div>
                  Sign in with GitHub
                </button>
              </li>
            )}
            <li className='font-semibold leading-relaxed text-zinc-500 dark:text-zinc-300'>
              Install the NXT GitHub App.
            </li>
            <li className='font-semibold leading-relaxed text-zinc-500 dark:text-zinc-300'>
              Choose the github user or organizations to be accessed.
            </li>
            <li className='font-semibold leading-relaxed text-zinc-500 dark:text-zinc-300'>
              Choose your wanted repositories.
            </li>
          </ol>
          <div className='flex items-center p-6 space-x-2 rounded-b border-t border-zinc-200 dark:border-zinc-600'>
            <Link href={'https://github.com/apps/pmmp-nxt'}>
              <a
                type='button'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                {authUser.claims.developer
                  ? 'Manage App Settings'
                  : 'Install App'}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppInstallPopup
