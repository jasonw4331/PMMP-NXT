import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth'
import Metatags from '../../components/Metatags'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ProjectSettings = ({ sidebarOpen = false }) => {
  const router = useRouter()
  const { installation_id = null, setup_action = null } = router.query
  const authUser = useAuthUser()
  return (
    <>
      <Metatags title='Project Settings' />
      <div
        className={`w-screen h-screen flex flex-row flex-nowrap ${
          sidebarOpen ? 'sm:-ml-60' : 'ml-0'
        }`}>
        <ul
          className={
            'fixed w-60 h-full list-none bg-white bg-opacity-80 dark:bg-zinc-800 overflow-y-auto snap-y dark:divide-zinc-700 dark:border-zinc-700 font-roboto font-normal'
          }>
          <li
            className={
              'py-2 px-6 list-none w-60 h-14 text-zinc-600 dark:text-zinc-200'
            }>
            <span className={'w-full h-full flex flex-col justify-center'}>
              Settings
            </span>
          </li>
          {(authUser.claims.developer ||
            authUser.claims.reviewer ||
            authUser.claims.admin) && (
            <li
              className={
                'py-2 px-6 list-none w-60 h-14 text-sm text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-100'
              }>
              <Link href={'/settings/profile'}>
                <a className={'w-full h-full flex flex-col justify-center'}>
                  Profile
                </a>
              </Link>
            </li>
          )}
          <li
            className={
              'py-2 px-6 list-none w-60 h-14 text-sm text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-100'
            }>
            <Link href={'/settings/admin'}>
              <a
                className={
                  'w-full h-full flex flex-col justify-center active active:bg-zinc-100 dark:active:text-zinc-100'
                }>
                Account
              </a>
            </Link>
          </li>
          <li
            className={
              'py-2 px-6 list-none w-60 h-14 text-sm text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-100'
            }>
            <Link href={'/settings/notifications'}>
              <a className={'w-full h-full flex flex-col justify-center'}>
                Notifications
              </a>
            </Link>
          </li>
          <li
            className={
              'py-2 px-6 list-none w-60 h-14 text-sm text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-100'
            }>
            <Link href={'/settings/appearance'}>
              <a className={'w-full h-full flex flex-col justify-center'}>
                Appearance
              </a>
            </Link>
          </li>
          {authUser.claims.developer && (
            <>
              <li
                className={
                  'py-2 px-6 list-none w-60 h-14 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-100'
                }>
                <Link href={'/settings/projects'}>
                  <a className={'w-full h-full flex flex-col justify-center'}>
                    Projects
                  </a>
                </Link>
              </li>
              <li
                className={
                  'py-2 px-6 list-none w-60 h-14 text-sm text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-100'
                }>
                <Link href={'/settings/keys'}>
                  <a className={'w-full h-full flex flex-col justify-center'}>
                    Account Keys
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className={'ml-60 w-full h-full'}>TEST</div>
      </div>
    </>
  )
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(ProjectSettings)
