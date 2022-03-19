import Link from 'next/link'
import Image from 'next/image'
import Footer from './Footer'
import { useContext, useEffect, useState } from 'react'
import missingImage from '../public/icons/missing.png'
import githubMark from '../public/icons/GitHub-Mark.svg'
import docsImage from '../public/icons/Docs.ico'
import poggitLogo from '../public/icons/poggit.png'
import discordLogo from '../public/icons/DiscordLogo.svg'
import PMMPNewLogo from '../public/icons/pocketmine_logo2.png'
import {
  AdminPanelSettings,
  AdminPanelSettingsOutlined,
  Apps,
  AppsOutlined,
  Assignment,
  AssignmentOutlined,
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
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { msToTime } from '../lib/timeConverter'
import { AnimatePresence, m } from 'framer-motion'
import { firebaseCloudMessaging } from '../lib/webPush'
import { getMessaging, onMessage } from 'firebase/messaging'
import localforage from 'localforage'
import AppInstallPopup from './AppInstallPopup'
import SidebarContext from './SidebarContext'

const Header = () => {
  const [appsOpen, setAppsOpen] = useState(false)
  const [notifsOpen, setNotifsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [userOpen, setUserOpen] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext)

  return (
    <header className={'dark:text-zinc-500'}>
      <TopBar
        appsOpen={appsOpen}
        setAppsOpen={setAppsOpen}
        notifsOpen={notifsOpen}
        notifications={notifications}
        setNotifsOpen={setNotifsOpen}
        userOpen={userOpen}
        setUserOpen={setUserOpen}
        setPopupOpen={setPopupOpen}
      />
      <AnimatePresence>{sidebarOpen && <SideBar />}</AnimatePresence>
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
        {popupOpen && <AppInstallPopup setPopupOpen={setPopupOpen} />}
      </AnimatePresence>
    </header>
  )
}

export default Header

const TopBar = ({
  appsOpen,
  setAppsOpen,
  notifsOpen,
  notifications,
  setNotifsOpen,
  userOpen,
  setUserOpen,
  setPopupOpen,
}) => {
  const router = useRouter()
  const authUser = useAuthUser()
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext)
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
                  `/results?q=${encodeURI(
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
        <Link href={'/results'}>
          <a className='h-6 w-6 ml-2 sm:ml-4 sm:hidden'>
            <Search className={'hidden dark:inline-block'} />
            <SearchOutlined className={'dark:hidden'} />
          </a>
        </Link>
        <button
          className='h-6 w-6 ml-0 hidden sm:block'
          onClick={() => {
            setPopupOpen(true)
          }}>
          <Build className={'hidden dark:inline-block'} />
          <BuildOutlined className={'dark:hidden'} />
        </button>
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
        {authUser.firebaseUser && (
          <button
            className='h-6 w-6 ml-2 sm:ml-4'
            onClick={() => {
              setNotifsOpen(!notifsOpen)
              setAppsOpen(false)
              setUserOpen(false)
            }}>
            {notifications.every(
              notification => notification.props.seen === true
            ) ? (
              <NotificationsOutlined />
            ) : (
              <Notifications />
            )}
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

const SideBar = () => {
  const router = useRouter()
  const authUser = useAuthUser()
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext)

  return (
    <m.nav
      id={'sidebar'}
      className={`w-60 h-screen fixed z-20 top-0 text-base list-none bg-white rounded drop-shadow-lg dark:bg-zinc-900`}
      key={'sidebar'}
      initial={{ x: -245 }}
      animate={{ x: 0, transition: { ease: 'linear', duration: 0.2 } }}
      exit={{ x: -245, transition: { ease: 'linear', duration: 0.2 } }}>
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
              <span className={'ml-3'}>Home</span>
            </a>
          </Link>
          <Link href={'/feed/explore'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }>
              <Explore className={'hidden dark:inline-block'} />
              <ExploreOutlined className={'dark:hidden'} />
              <span className={'ml-3'}>Explore</span>
            </a>
          </Link>
          <Link href={'/feed/bookmarks'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }>
              <Bookmarks className={'hidden dark:inline-block'} />
              <BookmarksOutlined className={'dark:hidden'} />
              <span className={'ml-3'}>Bookmarked</span>
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
              <span className={'ml-3'}>Library</span>
            </a>
          </Link>
          <Link href={'/feed/history'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }>
              <History className={'hidden dark:inline-block'} />
              <HistoryOutlined className={'dark:hidden'} />
              <span className={'ml-3'}>History</span>
            </a>
          </Link>
          {authUser.claims.developer && (
            <Link href={`/settings/projects`}>
              <a
                className={
                  'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
                }>
                <Extension className={'hidden dark:inline-block'} />
                <ExtensionOutlined className={'dark:hidden'} />
                <span className={'ml-3'}>Your Plugins</span>
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
        {(authUser.claims.reviewer || authUser.claims.admin) && (
          <li
            className={
              'flex flex-col justify-start items-center py-2 list-none w-60'
            }>
            {authUser.claims.reviewer && (
              <Link href={'/review'}>
                <a
                  className={
                    'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
                  }>
                  <Assignment className={'hidden dark:inline-block'} />
                  <AssignmentOutlined className={'dark:hidden'} />
                  <span className={'ml-3'}>Review Plugins</span>
                </a>
              </Link>
            )}
            {authUser.claims.admin && (
              <Link href={'/admin'}>
                <a
                  className={
                    'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
                  }>
                  <AdminPanelSettings className={'hidden dark:inline-block'} />
                  <AdminPanelSettingsOutlined className={'dark:hidden'} />
                  <span className={'ml-3'}>Admin Panel</span>
                </a>
              </Link>
            )}
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
              }
              onClick={() => setSidebarOpen(false)}>
              <Settings className={'hidden dark:inline-block'} />
              <SettingsOutlined className={'dark:hidden'} />
              <span className={'ml-3'}>Settings</span>
            </a>
          </Link>
          <Link href={'/reporthistory'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }>
              <Flag className={'hidden dark:inline-block'} />
              <FlagOutlined className={'dark:hidden'} />
              <span className={'ml-3'}>Report History</span>
            </a>
          </Link>
          <Link href={'/help'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }>
              <Help className={'hidden dark:inline-block'} />
              <HelpOutlined className={'dark:hidden'} />
              <span className={'ml-3'}>Help</span>
            </a>
          </Link>

          <Link href={'https://github.com/jasonwynn10/PMMP-NXT/issues'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              }>
              <Feedback className={'hidden dark:inline-block'} />
              <FeedbackOutlined className={'dark:hidden'} />
              <span className={'ml-3'}>Send Feedback</span>
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
        'invisible sm:visible fixed z-10 top-30 right-32 w-80 my-4 text-base list-none bg-white rounded divide-y divide-zinc-300 drop-shadow-lg dark:bg-zinc-900 dark:divide-zinc-700 border border-zinc-200 dark:border-zinc-700'
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
          iconUrl={discordLogo}
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
  function populateNotifications(messages) {
    setNotifications(
      messages.map(message => (
        <Notification
          onMouseLeave={() => setSeen(message.messageId)}
          key={message.messageId}
          messageId={message.messageId}
          title={message.title}
          body={message.body}
          timestamp={message.timestamp}
          redirectUrl={message.link ?? '/'}
          iconUrl={message.image}
          seen={message.seen}
        />
      ))
    )
    console.log('Populated notifications')
  }

  function addNotification(message) {
    setNotifications([
      ...notifications,
      <Notification
        onMouseLeave={() => setSeen(message.messageId)}
        key={message.messageId}
        messageId={message.messageId}
        title={message.title}
        body={message.body}
        timestamp={message.timestamp}
        redirectUrl={message.link ?? '/'}
        iconUrl={message.image}
        seen={message.seen}
      />,
    ])
    console.log('Updated Notifications list')
  }

  function setSeen(messageId) {
    localforage.getItem('messages').then(messages => {
      if (messages) {
        const newMessages = messages.map(message => {
          if (message.messageId === messageId) {
            message.seen = true
          }
          return message
        })
        localforage.setItem('messages', newMessages).catch(err => {
          console.log(err)
        })
      }
    })
  }

  localforage
    .getItem('messages')
    .then(messages => {
      if (messages) {
        populateNotifications(messages)
      }
    })
    .catch(err => {
      console.log(err)
    })
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
      onMessage(messaging, message => {
        console.log('Received Notification!')
        message = {
          messageId: message.messageId,
          title: message.notification.title,
          body: message.notification.body,
          image: message.notification?.image,
          link: message.fcmOptions?.link,
          timestamp: Date.now(),
          seen: false,
        }
        addNotification(message)
        localforage.getItem('messages').then(messages => {
          if (messages) {
            messages.unshift(message)
            localforage
              .setItem(
                'messages',
                messages.filter(
                  message =>
                    !message.seen || message.timestamp > Date.now() - 2.628e9 // 1 month
                )
              )
              .catch(error => {
                console.log(error)
              })
          }
        })
      })
    }
  })
  return (
    <m.div
      id='notifications'
      className={
        'fixed z-30 top-30 sm:right-24 w-screen sm:w-fit max-w-3xl text-base list-none bg-white sm:rounded divide-y divide-zinc-300 drop-shadow-lg dark:bg-zinc-900 dark:divide-zinc-700 border border-zinc-200 dark:border-zinc-700'
      }
      key={'notifications'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className='py-3 px-4 flex justify-between text-lg text-zinc-900 dark:text-white'>
        <p className='mt-0.5'>Notifications</p>
        <Link href={'/settings/notifications'}>
          <a>
            <Settings className={'hidden dark:inline-block'} />
            <SettingsOutlined className={'dark:hidden'} />
          </a>
        </Link>
      </div>
      <ul className='max-h-[592px] py-1 overflow-y-auto snap-y'>
        {notifications.length > 0 ? (
          notifications
        ) : (
          <li
            className={`py-2 px-4 flex justify-between text-sm text-zinc-700 dark:text-zinc-200`}>
            <div>
              <p className={'break-all font-semibold dark:text-white'}>
                You don&apos;t have any notifications!
              </p>
            </div>
            <div className={'w-16 h-8 mr-3'} />
          </li>
        )}
      </ul>
    </m.div>
  )
}

const Notification = ({
  messageId = '',
  title,
  body,
  timestamp = null,
  redirectUrl = '/',
  iconUrl = null,
  seen = false,
}) => {
  const [seenMessage, setSeenMessage] = useState(seen)
  // TODO: limit title length
  // TODO: mark as seen on hover / click / focus
  if (timestamp !== null)
    timestamp =
      timestamp < 1000 ? 'now' : msToTime(Date.now() - timestamp) + ' ago'
  return (
    <li
      className={`snap-end ${seenMessage ? '' : 'hover:bg-black/5'}`}
      onMouseLeave={() => {
        setSeenMessage(true)
      }}>
      <Link href={redirectUrl} prefetch={false}>
        <a
          className={`py-2 px-4 flex justify-between text-sm text-zinc-700 ${
            seenMessage ? '' : 'hover:bg-zinc-100 '
          } ${seenMessage ? '' : 'dark:hover:bg-zinc-800 '}dark:text-zinc-200 ${
            seenMessage ? '' : 'dark:hover:text-white'
          }`}>
          <div>
            <p className={'break-all font-semibold dark:text-white'}>{body}</p>
            {timestamp && (
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
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext)

  return (
    <m.div
      id='user'
      className={
        'fixed z-30 top-30 sm:right-14 w-screen sm:w-80 text-base list-none bg-white rounded divide-y divide-zinc-300 drop-shadow-lg dark:bg-zinc-900 dark:divide-zinc-700 border border-zinc-200 dark:border-zinc-700'
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
              {authUser.claims.admin
                ? 'Admin '
                : authUser.claims.developer
                ? 'Developer '
                : 'User '}
              Account
            </span>
          )}
        </div>
      </div>
      <ul className='py-1'>
        {(authUser.claims.developer ||
          authUser.claims.reviewer ||
          authUser.claims.admin) && (
          <li>
            <Link
              href={'/user/[username]'}
              as={`/user/${encodeURI(authUser.displayName)}`}>
              <a className='block py-2 px-4 text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'>
                <Person className={'hidden dark:inline-block'} />
                <PersonOutline className={'dark:hidden'} />
                <span className={'ml-2'}>Your Profile</span>
              </a>
            </Link>
          </li>
        )}
        {authUser.claims.admin && (
          <li>
            <Link href={'/admin'}>
              <a className='block py-2 px-4 text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'>
                <AdminPanelSettings className={'hidden dark:inline-block'} />
                <AdminPanelSettingsOutlined className={'dark:hidden'} />
                <span className={'ml-2'}>Admin Panel</span>
              </a>
            </Link>
          </li>
        )}
        <li>
          <button
            onClick={() => {
              setUserOpen(false)
              setNotifications([])
              authUser.signOut()
            }}
            className='w-full block py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'>
            <Logout />
            <span className={'ml-2'}>Sign out</span>
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
            <DarkMode />
            <span className={'ml-2'}>Appearance: Dark</span>
          </button>
          <button
            onClick={() => {
              setTheme('dark')
            }}
            className='w-full block dark:hidden py-2 px-4 text-left text-sm text-zinc-700 hover:bg-zinc-100'>
            <LightMode />
            <span className={'ml-2'}>Appearance: Light</span>
          </button>
        </li>
        <li>
          <Link href={'/settings'}>
            <a
              className='block py-2 px-4 text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'
              onClick={() => setSidebarOpen(false)}>
              <Settings className={'hidden dark:inline-block'} />
              <SettingsOutlined className={'dark:hidden'} />
              <span className={'ml-2'}>Settings</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href={'/help'}>
            <a className='block py-2 px-4 text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'>
              <Help />
              <span className={'ml-2'}>Help</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href={'https://github.com/jasonwynn10/PMMP-NXT/issues'}>
            <a className='block py-2 px-4 text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:hover:text-white'>
              <Feedback className={'hidden dark:inline-block'} />
              <FeedbackOutlined className={'dark:hidden'} />
              <span className={'ml-2'}>Send Feedback</span>
            </a>
          </Link>
        </li>
      </ul>
    </m.div>
  )
}
