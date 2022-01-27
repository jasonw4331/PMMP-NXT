import Link from 'next/link'
import Image from 'next/image'
import Footer from './Footer'
import { useCallback, useEffect, useState } from 'react'
import missingImage from '../public/icons/missing.png'
import githubMark from '../public/icons/GitHub-Mark.svg'
import docsImage from '../public/icons/Docs.ico'
import poggitLogo from '../public/icons/poggit.png'
import discordLogoWhite from '../public/icons/Discord-Logo-White.png'
import PMMPNewLogo from '../public/icons/pocketmine_logo2.png'
import {
  Apps,
  AppsOutlined,
  Assignment,
  AssignmentIndOutlined,
  Bookmarks,
  BookmarksOutlined,
  Build,
  BuildOutlined,
  DarkMode,
  Explore,
  ExploreOutlined,
  Extension,
  ExtensionOutlined,
  Feedback,
  FeedbackOutlined,
  Flag,
  FlagOutlined,
  Help,
  HelpOutlined,
  History,
  HistoryOutlined,
  Home,
  HomeOutlined,
  LibraryAdd,
  LibraryAddOutlined,
  LightMode,
  Logout,
  Menu,
  Notifications,
  NotificationsOutlined,
  Person,
  PersonOutline,
  Search,
  SearchOutlined,
  Settings,
  SettingsOutlined,
} from '@mui/icons-material'
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
import { useTheme } from 'next-themes'
import debounce from 'lodash.debounce'
import { useRouter } from 'next/router'
import { msToTime } from '../lib/timeConverter'
import { AnimatePresence, m } from 'framer-motion'
import { firebaseCloudMessaging } from '../lib/webPush'
import { getMessaging, onMessage } from 'firebase/messaging'

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [appsOpen, setAppsOpen] = useState(false)
  const [notifsOpen, setNotifsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    <Notification
      key={0}
      title={'You have no new notifications!'}
      redirectUrl={'/'}
    />,
  ])
  const [userOpen, setUserOpen] = useState(false)

  useEffect(() => {
    setToken()

    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init()
        if (token) {
          getMessage()
        }
      } catch (error) {
        console.log(error)
      }
    }

    function getMessage() {
      const messaging = getMessaging()
      onMessage(messaging, message => console.log('foreground ', message))
    }
  }, [])

  return (
    <header className={'dark:text-zinc-500'}>
      <TopBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        appsOpen={appsOpen}
        setAppsOpen={setAppsOpen}
        notifsOpen={notifsOpen}
        setNotifsOpen={setNotifsOpen}
        userOpen={userOpen}
        setUserOpen={setUserOpen}
      />
      <AnimatePresence exitBeforeEnter>
        {sidebarOpen && <SideBar setSidebarOpen={setSidebarOpen} />}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {appsOpen && <AppsWindow />}
        {notifsOpen && (
          <NotificationsWindow
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}
        {userOpen && (
          <UserWindow
            setUserOpen={setUserOpen}
            setNotifications={setNotifications}
          />
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header

const TopBar = ({
  sidebarOpen,
  setSidebarOpen,
  appsOpen,
  setAppsOpen,
  notifsOpen,
  setNotifsOpen,
  userOpen,
  setUserOpen,
}) => {
  const router = useRouter()
  const authUser = useAuthUser()
  return (
    <div
      id={'navbar'}
      className={
        'w-screen h-14 fixed z-30 top-0 flex flex-nowrap justify-between bg-white dark:bg-zinc-900'
      }>
      <div id='nav-left' className='min-w-fit flex items-center justify-start'>
        <button className={'ml-2 text-3xl bg-none'}>
          <Menu
            className={'ml-2 text-3xl bg-none'}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </button>
        <Link href='/'>
          <a>
            <h1 className='font-extrabold text-4xl text-slate-500 ml-2'>NXT</h1>
          </a>
        </Link>
      </div>
      <div
        id='nav-center'
        className='w-full max-w-2xl hidden sm:flex items-center justify-center ml-5 mr-2.5 md:mx-10'>
        <div className='w-full hidden relative mr-3 md:mr-0 sm:block'>
          <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <Search className={'w-5 h-5 text-zinc-500'} />
          </div>
          <input
            type='search'
            autoComplete={'on'}
            className='block p-2 pl-10 w-full text-zinc-900 bg-zinc-50 rounded-lg border border-zinc-200 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search...'
            onKeyDown={e => {
              if (e.key === 'Enter') {
                router.push(
                  `/search?q=${encodeURI(
                    document.querySelector('input').value
                  )}`
                )
              }
            }}
          />
        </div>
      </div>
      <div
        id='nav-right'
        className='flex items-center justify-end sm:mr-5 md:mr-10'>
        <Link href='/search'>
          <a className='h-6 w-6 ml-2 sm:ml-4 sm:hidden'>
            <Search className={'hidden dark:inline-block'} />
            <SearchOutlined className={'dark:hidden'} />
          </a>
        </Link>
        {authUser.id && (
          <Link href='/publish'>
            <a className='h-6 w-6 ml-0 hidden sm:block'>
              <Build className={'hidden dark:inline-block'} />
              <BuildOutlined className={'dark:hidden'} />
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
          <Apps className={'hidden dark:inline-block'} />
          <AppsOutlined className={'dark:hidden'} />
        </button>
        {authUser.id && (
          <button
            className='h-6 w-6 ml-2 sm:ml-4'
            onClick={() => {
              setNotifsOpen(!notifsOpen)
              setAppsOpen(false)
              setUserOpen(false)
            }}>
            <Notifications className={'hidden dark:inline-block'} />
            <NotificationsOutlined className={'dark:hidden'} />
          </button>
        )}
        <button
          className='w-12 h-12 ml-1.5 sm:ml-2.5'
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
              src={authUser.photoURL || missingImage}
              width={32}
              height={32}
              alt='Avatar Image'
              className='rounded-full'
            />
          </div>
        </button>
      </div>
    </div>
  )
}

const SideBar = ({ setSidebarOpen }) => {
  const router = useRouter()
  const authUser = useAuthUser()
  return (
    <m.nav
      id={'sidebar'}
      className={`w-60 h-screen fixed z-20 top-0 text-base list-none bg-white rounded drop-shadow-lg dark:bg-zinc-900`}
      key={'sidebar'}
      initial={{ x: -245 }}
      animate={{ x: 0, transition: { ease: 'linear', duration: 0.3 } }}
      exit={{ x: -245, transition: { ease: 'linear', duration: 0.3 } }}>
      <div className={'w-full h-14 flex justify-start items-center'}>
        <button className={'ml-2 text-3xl bg-none'}>
          <Menu
            className={'ml-2 text-3xl bg-none'}
            onClick={() => setSidebarOpen(false)}
          />
        </button>
        <Link href='/'>
          <a>
            <h1 className='font-extrabold text-4xl text-slate-500 ml-2'>NXT</h1>
          </a>
        </Link>
      </div>
      <ul className='py-1 overflow-y-auto snap-y divide-y divide-zinc-300 dark:divide-zinc-700 dark:border-zinc-700'>
        <li
          className={
            'flex flex-col justify-start items-center py-2 list-none w-60'
          }>
          <Link href={'/'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }>
              <Home className={'hidden dark:inline-block'} />
              <HomeOutlined className={'dark:hidden'} />
              <span>Home</span>
            </a>
          </Link>
          <Link href={'/feed/explore'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }>
              <Explore className={'hidden dark:inline-block'} />
              <ExploreOutlined className={'dark:hidden'} />
              <span>Explore</span>
            </a>
          </Link>
          <Link href={'/feed/bookmarks'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }>
              <Bookmarks className={'hidden dark:inline-block'} />
              <BookmarksOutlined className={'dark:hidden'} />
              <span>Bookmarked</span>
            </a>
          </Link>
        </li>
        <li
          className={
            'flex flex-col justify-start items-center py-2 list-none w-60'
          }>
          <Link href={'/feed/library'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }>
              <LibraryAdd className={'hidden dark:inline-block'} />
              <LibraryAddOutlined className={'dark:hidden'} />
              <span>Library</span>
            </a>
          </Link>
          <Link href={'/feed/history'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }>
              <History className={'hidden dark:inline-block'} />
              <HistoryOutlined className={'dark:hidden'} />
              <span>History</span>
            </a>
          </Link>

          {authUser.firebaseUser && (
            <Link href={`/${encodeURI(authUser.displayName)}`}>
              <a
                className={
                  'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
                }>
                <Extension className={'hidden dark:inline-block'} />
                <ExtensionOutlined className={'dark:hidden'} />
                <span>Your Plugins</span>
              </a>
            </Link>
          )}
        </li>
        {!authUser.firebaseUser && (
          <li
            className={'flex flex-col justify-start py-2 px-4 list-none w-60'}>
            <p
              className={
                'w-full block py-1 text-left text-sm text-zinc-700 dark:text-zinc-200'
              }>
              Sign in to like plugins, comment, and follow.
            </p>
            <button
              className={
                'block max-w-fit py-1.5 px-2.5 text-left text-sm text-zinc-700 rounded border hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }
              onClick={() => {
                if (authUser.id === null) {
                  router.push('/auth')
                }
              }}>
              <Person className={'hidden dark:inline-block'} />
              <PersonOutline className={'dark:hidden'} />
              <span>Sign In</span>
            </button>
          </li>
        )}
        {authUser.firebaseUser && (
          <li
            className={
              'flex flex-col justify-start items-center py-2 list-none w-60'
            }>
            <Link href={'/review'}>
              <a
                className={
                  'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
                }>
                <Assignment className={'hidden dark:inline-block'} />
                <AssignmentIndOutlined className={'dark:hidden'} />
                <span>Review Plugins</span>
              </a>
            </Link>
          </li>
        )}
        <li
          className={
            'flex flex-col justify-start items-center py-2 list-none w-60'
          }>
          <Link href={'/settings'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }>
              <Settings className={'hidden dark:inline-block'} />
              <SettingsOutlined className={'dark:hidden'} />
              <span>Settings</span>
            </a>
          </Link>
          <Link href={'/reporthistory'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }>
              <Flag className={'hidden dark:inline-block'} />
              <FlagOutlined className={'dark:hidden'} />
              <span>Report History</span>
            </a>
          </Link>
          <Link href={'/help'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }>
              <Help className={'hidden dark:inline-block'} />
              <HelpOutlined className={'dark:hidden'} />
              <span>Help</span>
            </a>
          </Link>

          <Link href={'https://github.com/jasonwynn10/PMMP-NXT/issues'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }>
              <Feedback className={'hidden dark:inline-block'} />
              <FeedbackOutlined className={'dark:hidden'} />
              <span>Send Feedback</span>
            </a>
          </Link>
        </li>
      </ul>
      <div className='absolute bottom-6'>
        <Footer />
      </div>
    </m.nav>
  )
}

const AppsWindow = () => {
  return (
    <m.div
      id='apps'
      className={
        'fixed z-10 top-30 right-32 w-80 my-4 text-base list-none bg-white rounded divide-y divide-zinc-300 drop-shadow-lg dark:bg-zinc-900 dark:divide-zinc-700 border border-zinc-200 dark:border-zinc-700'
      }
      key={'apps'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <ul className='max-h-96 m-2 grid grid-cols-3 gap-2'>
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
    </m.div>
  )
}

const AppLink = ({ appName, redirectLink = '/', iconUrl = null }) => {
  iconUrl = iconUrl ?? missingImage
  return (
    <li className={'hover:bg-black/5'}>
      <Link href={redirectLink}>
        <a
          className={
            'py-2 px-4 flex flex-col rounded-2xl text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
          }>
          <Image src={iconUrl} height={64} width={64} alt={appName + ' icon'} />
          <center className={'break-all font-semibold dark:text-white'}>
            {appName}
          </center>
        </a>
      </Link>
    </li>
  )
}

const NotificationsWindow = ({ notifications, setNotifications }) => {
  const authUser = useAuthUser()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const populateNotifs = useCallback(
    debounce(async db => {
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
      setNotifications(
        notifList.length > 0
          ? notifList
          : [
              <Notification
                key={0}
                title={'You have no new notifications!'}
                redirectUrl={'/'}
              />,
            ]
      )
    }),
    []
  )
  useEffect(() => {
    const db = getFirestore(getApp())
    populateNotifs(db)
  })
  return (
    <m.div
      id='notifications'
      className={
        'fixed z-10 top-30 right-24 max-w-3xl my-4 text-base list-none bg-white rounded divide-y divide-zinc-300 drop-shadow-lg dark:bg-zinc-900 dark:divide-zinc-700 border border-zinc-200 dark:border-zinc-700'
      }
      key={'notifications'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className='py-3 px-4 flex justify-between text-lg text-zinc-900 dark:text-white'>
        <p className='mt-0.5'>Notifications</p>
        <Link href='/notifications'>
          <a>
            <Settings className={'hidden dark:inline-block'} />
            <SettingsOutlined className={'dark:hidden'} />
          </a>
        </Link>
      </div>
      <ul className='max-h-[592px] py-1 overflow-y-auto snap-y'>
        {notifications}
      </ul>
    </m.div>
  )
}

const Notification = ({
  title,
  timestamp = null,
  redirectUrl = '/',
  iconUrl = null,
}) => {
  // TODO: limit title length
  // TODO: mark as seen on hover / click / focus
  if (timestamp !== null)
    timestamp =
      timestamp < 1000 ? 'now' : msToTime(new Date() - timestamp) + ' ago'
  return (
    <li className={'snap-end hover:bg-black/5'}>
      <Link href={redirectUrl}>
        <a
          className={
            'py-2 px-4 flex justify-between text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
          }>
          <div>
            <p className={'break-all font-semibold dark:text-white'}>{title}</p>
            {timestamp !== null && (
              <p className={'mt-1 text-zinc-500 dark:text-zinc-400'}>
                Updated {timestamp}
              </p>
            )}
          </div>
          <div className={'w-16 h-16 mr-3'}>
            {iconUrl && (
              <Image
                src={iconUrl}
                height={64}
                width={64}
                alt={title + ' icon'}
              />
            )}
          </div>
        </a>
      </Link>
    </li>
  )
}

const UserWindow = ({ setUserOpen, setNotifications }) => {
  const authUser = useAuthUser()
  const { setTheme } = useTheme()
  return (
    <m.div
      id='user'
      className={
        'fixed z-10 top-30 right-14 w-80 my-4 text-base list-none bg-white rounded divide-y divide-zinc-300 drop-shadow-lg dark:bg-zinc-900 dark:divide-zinc-700 border border-zinc-200 dark:border-zinc-700'
      }
      key={'user'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className='py-3 px-4 flex gap-2 block text-sm text-zinc-900 dark:text-white'>
        <Image
          src={authUser.photoURL || missingImage}
          width={40}
          height={40}
          alt='User Icon'
          className='rounded-full'
        />
        <div>
          <span className='block text-sm text-zinc-900 dark:text-white'>
            {authUser.displayName || 'Not logged in'}
          </span>
          {authUser.firebaseUser && (
            <span className='block text-sm font-medium text-zinc-500 truncate dark:text-zinc-400'>
              Signed in with{' '}
              {authUser.firebaseUser?.providerData.some(
                ({ providerId }) => providerId === 'github.com'
              )
                ? 'GitHub'
                : authUser.firebaseUser?.providerData[0].providerId}
            </span>
          )}
        </div>
      </div>
      <ul className='py-1'>
        <li>
          <Link
            href={`/user/${encodeURI(authUser.displayName)}`}
            as={'/profile'}>
            <a className='block py-2 px-4 text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'>
              <p>
                <Person className={'hidden dark:inline-block'} />
                <PersonOutline className={'dark:hidden'} />
                Your Profile
              </p>
            </a>
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              setUserOpen(false)
              setNotifications([
                <Notification
                  key={0}
                  title={'You have no new notifications!'}
                  redirectUrl={'/'}
                />,
              ])
              authUser.signOut()
            }}
            className='w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'>
            <p>
              <Logout />
              Sign out
            </p>
          </button>
        </li>
      </ul>
      <ul className='py-1'>
        <li>
          <button
            onClick={() => {
              setTheme('light')
            }}
            className='w-full hidden dark:block py-2 px-4 text-left text-sm hover:bg-zinc-600 text-zinc-200 hover:text-white'>
            <p>
              <DarkMode />
              Appearance: Dark
            </p>
          </button>
          <button
            onClick={() => {
              setTheme('dark')
            }}
            className='w-full block dark:hidden py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100'>
            <p>
              <LightMode />
              Appearance: Light
            </p>
          </button>
        </li>
        <li>
          <Link href='/settings'>
            <a className='block py-2 px-4 text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'>
              <p>
                <Settings className={'hidden dark:inline-block'} />
                <SettingsOutlined className={'dark:hidden'} />
                Settings
              </p>
            </a>
          </Link>
        </li>
        <li>
          <Link href='/help'>
            <a className='block py-2 px-4 text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'>
              <p>
                <Help />
                Help
              </p>
            </a>
          </Link>
        </li>
        <li>
          <Link href='https://github.com/jasonwynn10/PMMP-NXT/issues'>
            <a className='block py-2 px-4 text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'>
              <p>
                <Feedback className={'hidden dark:inline-block'} />
                <FeedbackOutlined className={'dark:hidden'} />
                Send Feedback
              </p>
            </a>
          </Link>
        </li>
      </ul>
    </m.div>
  )
}
