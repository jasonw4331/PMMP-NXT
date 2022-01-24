import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Footer from './Footer'
import Notification from './Notification'
import AppLink from './AppLink'
import { useEffect, useState } from 'react'
import missingImage from '../public/icons/missing.png'
import githubMark from '../public/icons/GitHub-Mark.svg'
import docsImage from '../public/icons/Docs.ico'
import poggitLogo from '../public/icons/poggit.png'
import discordLogoWhite from '../public/icons/Discord-Logo-White.png'
import PMMPNewLogo from '../public/icons/pocketmine_logo2.png'
import {
  Apps,
  Build,
  DarkMode,
  Feedback,
  Help,
  Keyboard,
  Logout,
  Menu,
  Notifications,
  Person,
  Search,
  Settings,
} from '@mui/icons-material'
import { SidebarData } from './SidebarData'
import { useAuthUser } from 'next-firebase-auth'
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { getApp } from 'firebase/app'

const Navbar = ({ AuthUser, sidebarOpen, setSidebarOpen }) => {
  const authUser = useAuthUser()
  const router = useRouter()
  let [appsOpen, setAppsOpen] = useState(false)
  let [notifsOpen, setNotifsOpen] = useState(false)
  let [userOpen, setUserOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const populateNotifs = async db => {
    const snapshot = await getDocs(
      query(
        collection(db, `/users/${authUser.id}/notifications`),
        where('seen', '==', false),
        orderBy('createdAt'),
        limit(20)
      )
    )
    const notifList = snapshot.docs.map(doc => {
      const data = doc.data()
      return (
        <Notification
          key={doc.id}
          title={data.title}
          timestamp={data.createdAt.toMillis() || 0}
          redirectUrl={data.redirectUrl}
          iconUrl={data.iconUrl}
        />
      )
    })
    setNotifications(notifList)
  }

  useEffect(() => {
    const db = getFirestore(getApp())
    populateNotifs(db)
  }, [notifsOpen]) // depend on notifsOpen to update notifications on open

  return (
    <header className={'dark:text-white'}>
      <div
        id={'navbar'}
        className={
          'w-screen h-14 fixed z-40 top-0 flex flex-nowrap justify-between bg-zinc-900'
        }>
        <div
          id='nav-left'
          className='min-w-fit flex items-center justify-start'>
          <button className={'ml-2 text-3xl bg-none'}>
            <Menu className={'ml-2 text-3xl bg-none'} onClick={toggleSidebar} />
          </button>
          <Link href='/'>
            <a>
              <h1 className='font-extrabold text-4xl text-slate-500 ml-2'>
                NXT
              </h1>
            </a>
          </Link>
        </div>
        <div
          id='nav-center'
          className='w-full max-w-xl hidden sm:flex items-center justify-center mx-2 sm:mx-10'>
          <form
            method='get'
            action='/results'
            className='w-full h-8 mt-2 flex flex-row z-30 items-center object-contain border border-zinc-900 bg-zinc-900'
            noValidate>
            <input
              name='search_query'
              type='text'
              className='w-full h-full pl-0 rounded-l-xl'
              autoComplete='on'
              required={true}
            />
            <button
              type='submit'
              className='h-full w-full max-w-[60px] flex justify-center items-center bg-zinc-700 rounded-r-xl'>
              <Search />
            </button>
          </form>
        </div>
        <div id='nav-right' className='flex items-center justify-end mr-10'>
          <Link href='/search'>
            <a className='h-6 w-6 ml-4 sm:hidden contents'>
              <Search />
            </a>
          </Link>
          {authUser.id && (
            <Link href='/publish'>
              <a className='h-6 w-6 ml-4 hidden sm:block'>
                <Build />
              </a>
            </Link>
          )}
          <button
            className='h-6 w-6 ml-4 hidden sm:block'
            onClick={() => {
              setAppsOpen(!appsOpen)
              setNotifsOpen(false)
              setUserOpen(false)
            }}>
            <Apps />
          </button>
          {authUser.id && (
            <button
              className='h-6 w-6 ml-4 hidden sm:block'
              onClick={() => {
                setNotifsOpen(!notifsOpen)
                setAppsOpen(false)
                setUserOpen(false)
              }}>
              <Notifications />
            </button>
          )}
          <button
            className='w-12 h-12 ml-2.5'
            onClick={() => {
              if (authUser.id === null) {
                router.push('/auth')
                return
              }
              setUserOpen(!userOpen)
              setAppsOpen(false)
              setNotifsOpen(false)
            }}>
            <div className='w-12 h-12 pt-2'>
              <Image
                src={AuthUser.photoURL || missingImage}
                width={32}
                height={32}
                alt='Avatar Image'
                className='rounded-full'
              />
            </div>
          </button>
        </div>
      </div>
      <nav
        id={'sidebar'}
        className={`bg-zinc-900 w-60 h-screen fixed z-20 top-0 transition-transform ease-linear ${
          sidebarOpen ? 'left-0 duration-300' : '-left-full duration-700'
        }`}>
        <div className={'w-full h-14 flex justify-start items-center'}>
          <button className={'ml-2 text-3xl bg-none'}>
            <Menu className={'ml-2 text-3xl bg-none'} onClick={toggleSidebar} />
          </button>
          <Link href='/'>
            <a>
              <h1 className='font-extrabold text-4xl text-slate-500 ml-2'>
                NXT
              </h1>
            </a>
          </Link>
        </div>
        <ul className='w-full flex flex-col justify-center'>
          {SidebarData.map((item, index) => {
            if ((AuthUser.claims.accessLevel ?? 0) < item.accessLevel)
              return null
            return (
              <li key={index} className={item.cName}>
                {item.type === 'link' && (
                  <Link href={item.path}>
                    <a
                      className={
                        'no-underline text-lg w-[95%] h-full flex items-center pt-4 rounded'
                      }>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </Link>
                )}
                {item.type === 'separator' && (
                  <svg viewBox='0 0 227 1' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M-13 1L479.008 1' stroke='#71717a' fill='none' />
                  </svg>
                )}
              </li>
            )
          })}
          <li className='absolute bottom-6'>
            <Footer />
          </li>
        </ul>
      </nav>
      <div id='dropdowns' className='fixed z-40 top-14 right-0 w-[564px]'>
        <div
          id='apps'
          className={
            'max-h-[436px] w-80 ml-32 bg-zinc-800/95 bg-cover ring-zinc-500 ring-1 overflow-hidden ' +
            (appsOpen ? '' : 'hidden')
          }>
          <ul className='max-h-[436px] m-2 grid grid-cols-3 gap-2 items-center justify-center overflow-y-auto snap-y'>
            <AppLink
              appName='PMMP'
              redirectLink='https://pmmp.io'
              iconUrl={PMMPNewLogo}
            />
            <AppLink appName='Forums' redirectLink='https://forums.pmmp.io' />
            <AppLink
              appName='Github'
              redirectLink='https://github.com/pmmp/PocketMine-MP'
              iconUrl={githubMark}
            />
            <AppLink
              appName='Docs'
              redirectLink='https://pmmp.readthedocs.org/'
              iconUrl={docsImage}
            />
            <AppLink
              appName='Poggit'
              redirectLink='https://poggit.pmmp.io'
              iconUrl={poggitLogo}
            />
            <AppLink
              appName='Discord'
              redirectLink='https://poggit.pmmp.io'
              iconUrl={discordLogoWhite}
            />
          </ul>
        </div>
        <div
          id='notifications'
          className={
            'max-h-[642px] w-[384px] ml-28 bg-zinc-800/95 bg-cover ring-zinc-500 ring-1 overflow-hidden ' +
            (notifsOpen ? '' : 'hidden')
          }>
          <div className='flex justify-between align-items-center min-h-[48px]'>
            <h2 className='ml-4 mt-2 text-lg'>Notifications</h2>
            <button className='mr-4 mt-1'>
              <Link href='/notifications'>
                <a>
                  <Notifications />
                </a>
              </Link>
            </button>
          </div>
          <div>
            <svg viewBox='0 0 479 2' xmlns='http://www.w3.org/2000/svg'>
              <path d='M-13 1L479.008 1' stroke='#71717a' fill='none' />
            </svg>
          </div>
          <ul className='max-h-[592px] grid grid-cols-1 gap-1 overflow-y-auto snap-y'>
            {notifications}
          </ul>
        </div>
        <div
          id='user'
          className={
            'max-h-[694px] w-[300px] ml-56 bg-zinc-800/95 bg-cover ring-zinc-500 ring-1 overflow-hidden ' +
            (userOpen ? '' : 'hidden')
          }>
          <div className='min-h-[48px] my-2 flex gap-2 align-items-center'>
            <div className='ml-4 mt-2'>
              <Image
                src={AuthUser.photoURL || missingImage}
                width={40}
                height={40}
                alt='User Icon'
                className='rounded-full'
              />
            </div>
            <div>
              <h2 className='text-lg'>
                {AuthUser.displayName || 'Not logged in'}
              </h2>
              <h4 className='text-sm text-zinc-400'>
                Signed in with {AuthUser.firebaseUser?.providerId || 'none'}
              </h4>
            </div>
          </div>
          <div>
            <svg viewBox='0 0 300 2' xmlns='http://www.w3.org/2000/svg'>
              <path d='M-13 1L479.008 1' stroke='#71717a' fill='none' />
            </svg>
          </div>
          <ul className='max-h-[592px] grid grid-cols-1 gap-1 overflow-y-auto snap-y'>
            <li className='snap-end'>
              <Link href='/profile'>
                <a className='p-3 flex gap-3 hover:bg-zinc-900/90'>
                  <div className='w-6 h-6'>
                    <Person />
                  </div>
                  <p>Your Profile</p>
                </a>
              </Link>
            </li>
            <li className='snap-end'>
              <button
                onClick={() => {
                  setUserOpen(false)
                  setNotifications([])
                  AuthUser.signOut()
                }}
                className='w-full p-3 flex gap-3 hover:bg-zinc-900/90'>
                <div className='w-6 h-6'>
                  <Logout />
                </div>
                <p>Sign out</p>
              </button>
            </li>
            <li>
              <svg viewBox='0 0 300 2' xmlns='http://www.w3.org/2000/svg'>
                <path d='M-13 1L479.008 1' stroke='#71717a' fill='none' />
              </svg>
            </li>
            <li className='snap-end'>
              <button className='w-full p-3 flex gap-3 hover:bg-zinc-900/90'>
                <div className='w-6 h-6'>
                  <DarkMode />
                </div>
                <p>Appearance: Dark</p>
              </button>
            </li>
            <li className='snap-end'>
              <Link href='/settings'>
                <a className='p-3 flex gap-3 hover:bg-zinc-900/90'>
                  <div className='w-6 h-6'>
                    <Settings />
                  </div>
                  <p>Settings</p>
                </a>
              </Link>
            </li>
            <li className='snap-end'>
              <Link href='/help'>
                <a className='p-3 flex gap-3 hover:bg-zinc-900/90'>
                  <div className='w-6 h-6'>
                    <Help />
                  </div>
                  <p>Help</p>
                </a>
              </Link>
            </li>
            <li className='snap-end'>
              <Link href='https://github.com/jasonwynn10/PMMP-NXT/issues'>
                <a className='p-3 flex gap-3 hover:bg-zinc-900/90'>
                  <div className='w-6 h-6'>
                    <Feedback />
                  </div>
                  <p>Send Feedback</p>
                </a>
              </Link>
            </li>
            <li className='snap-end'>
              <button className='w-full p-3 flex gap-3 hover:bg-zinc-900/90'>
                <div className='w-6 h-6'>
                  <Keyboard />
                </div>
                <p>Keyboard shortcuts</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
export default Navbar
