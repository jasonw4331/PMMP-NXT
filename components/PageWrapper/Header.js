import Link from 'next/link'
import Image from 'next/image'
import Footer from './Footer'
import { useContext, useEffect, useState } from 'react'
import missingImage from '../../public/icons/missing.png'
import githubMark from '../../public/icons/GitHub-Mark.svg'
import docsImage from '../../public/icons/Docs.ico'
import poggitLogo from '../../public/icons/poggit.png'
import discordLogo from '../../public/icons/DiscordLogo.svg'
import PMMPNewLogo from '../../public/icons/pocketmine_logo2.png'
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
import { useTheme } from 'react-daisyui'
import { useRouter } from 'next/router'
import { msToTime } from '../../lib/timeConverter'
import { AnimatePresence, m } from 'framer-motion'
import { firebaseCloudMessaging } from '../../lib/webPush'
import { getMessaging, onMessage } from 'firebase/messaging'
import localforage from 'localforage'
import AppInstallPopup from '../AppInstallPopup'
import SidebarContext from '../../lib/SidebarContext'

const Header = () => {
  const [appsOpen, setAppsOpen] = useState(false)
  const [notifsOpen, setNotifsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [userOpen, setUserOpen] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext)

  return (
    <header>
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
  const { theme } = useTheme()
  return (
    <div
      id={'navbar'}
      className={
        'w-screen h-14 fixed z-30 top-0 flex flex-nowrap justify-between bg-base-300'
      }>
      <div id='nav-left' className='min-w-fit flex items-center justify-start'>
        <button className={'ml-2 text-3xl'}>
          <Menu
            className={'ml-2 text-3xl'}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </button>
        <Link href='/'>
          <a>
            <h1 className='font-extrabold text-4xl ml-2'>NXT</h1>
          </a>
        </Link>
      </div>
      <div
        id='nav-center'
        className='w-full max-w-2xl hidden sm:flex items-center justify-center ml-5 mr-2.5 md:mx-10'>
        <div className='w-full hidden relative mr-3 md:mr-0 sm:block'>
          <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <Search className={'w-5 h-5 '} />
          </div>
          <input
            type='search'
            autoComplete={'on'}
            className='block p-2 pl-10 w-full bg-base-100 rounded-lg border border-base-200 sm:text-sm focus:ring-blue-500 focus:border-blue-500'
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
            {theme === 'light' ? <Search /> : <SearchOutlined />}
          </a>
        </Link>
        <button
          className='h-6 w-6 ml-0 hidden sm:block'
          onClick={() => {
            setPopupOpen(true)
          }}>
          {theme === 'light' ? <Build /> : <BuildOutlined />}
        </button>
        <button
          className='h-6 w-6 ml-4 hidden sm:block'
          onClick={() => {
            setAppsOpen(!appsOpen)
            setNotifsOpen(false)
            setUserOpen(false)
          }}>
          {theme === 'light' ? <Apps /> : <AppsOutlined />}
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
  const { theme } = useTheme()

  return (
    <m.nav
      id={'sidebar'}
      className={`w-60 h-screen fixed z-20 top-0 list-none bg-base-300 rounded drop-shadow-lg`}
      key={'sidebar'}
      initial={{ x: -245 }}
      animate={{ x: 0, transition: { ease: 'linear', duration: 0.2 } }}
      exit={{ x: -245, transition: { ease: 'linear', duration: 0.2 } }}>
      <div className={'w-full h-14 flex justify-start items-center'}>
        <button className={'ml-2 text-3xl'}>
          <Menu
            className={'ml-2 text-3xl'}
            onClick={() => setSidebarOpen(false)}
          />
        </button>
        <Link href='/'>
          <a>
            <h1 className='font-extrabold text-4xl ml-2'>NXT</h1>
          </a>
        </Link>
      </div>
      <ul className='py-1 overflow-y-auto snap-y divide-y divide-base-content'>
        <li
          className={
            'flex flex-col justify-start items-center py-2 list-none w-60'
          }>
          <Link href={'/'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm hover:bg-base-200'
              }>
              {theme === 'light' ? <Home /> : <HomeOutlined />}
              <span className={'ml-3'}>Home</span>
            </a>
          </Link>
          <Link href={'/feed/explore'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm hover:bg-base-200'
              }>
              {theme === 'light' ? <Explore /> : <ExploreOutlined />}
              <span className={'ml-3'}>Explore</span>
            </a>
          </Link>
          <Link href={'/feed/bookmarks'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm hover:bg-base-200'
              }>
              {theme === 'light' ? <Bookmarks /> : <BookmarksOutlined />}
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
                'w-full block py-2 px-4 text-left text-sm hover:bg-base-200'
              }>
              {theme === 'light' ? <LibraryAdd /> : <LibraryAddOutlined />}
              <span className={'ml-3'}>Library</span>
            </a>
          </Link>
          <Link href={'/feed/history'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm hover:bg-base-200'
              }>
              {theme === 'light' ? <History /> : <HistoryOutlined />}
              <span className={'ml-3'}>History</span>
            </a>
          </Link>
          {authUser.claims.developer && (
            <Link href={`/settings/projects`}>
              <a
                className={
                  'w-full block py-2 px-4 text-left text-sm hover:bg-base-200'
                }>
                {theme === 'light' ? <Extension /> : <ExtensionOutlined />}
                <span className={'ml-3'}>Your Plugins</span>
              </a>
            </Link>
          )}
        </li>
        {!authUser.firebaseUser && (
          <li
            className={'flex flex-col justify-start py-2 px-4 list-none w-60'}>
            <p className={'w-full block py-1 text-left text-sm'}>
              Sign in to like plugins, comment, and follow.
            </p>
            <button
              className={
                'block max-w-fit py-1.5 px-2.5 text-left text-sm rounded border hover:bg-base-200'
              }
              onClick={() => {
                if (authUser.id === null) {
                  router.push('/auth')
                }
              }}>
              {theme === 'light' ? <Person /> : <PersonOutline />}
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
                    'w-full block py-2 px-4 text-left text-sm hover:bg-base-200'
                  }>
                  {theme === 'light' ? <Assignment /> : <AssignmentOutlined />}
                  <span className={'ml-3'}>Review Plugins</span>
                </a>
              </Link>
            )}
            {authUser.claims.admin && (
              <Link href={'/admin'}>
                <a
                  className={
                    'w-full block py-2 px-4 text-left text-sm hover:bg-base-200'
                  }>
                  {theme === 'light' ? (
                    <AdminPanelSettings />
                  ) : (
                    <AdminPanelSettingsOutlined />
                  )}
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
                'w-full block py-2 px-4 text-left text-sm hover:bg-base-200'
              }
              onClick={() => setSidebarOpen(false)}>
              {theme === 'light' ? <Settings /> : <SettingsOutlined />}
              <span className={'ml-3'}>Settings</span>
            </a>
          </Link>
          <Link href={'/reporthistory'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm hover:bg-base-200'
              }>
              {theme === 'light' ? <Flag /> : <FlagOutlined />}
              <span className={'ml-3'}>Report History</span>
            </a>
          </Link>
          <Link href={'/help'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm hover:bg-base-200'
              }>
              {theme === 'light' ? <Help /> : <HelpOutlined />}
              <span className={'ml-3'}>Help</span>
            </a>
          </Link>

          <Link href={'https://github.com/jasonwynn10/PMMP-NXT/issues'}>
            <a
              className={
                'w-full block py-2 px-4 text-left text-sm hover:bg-base-200'
              }>
              {theme === 'light' ? <Feedback /> : <FeedbackOutlined />}
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
        'invisible sm:visible fixed z-10 top-30 right-32 w-80 my-4 list-none bg-base-300 rounded drop-shadow-lg border border-base-200'
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
    <li className={'hover:bg-base/5'}>
      <Link href={redirectLink}>
        <a
          className={
            'py-2 px-4 flex flex-col rounded-2xl text-sm hover:bg-base-200'
          }>
          <Image src={iconUrl} height={64} width={64} alt={appName + ' icon'} />
          <center className={'break-all font-semibold'}>{appName}</center>
        </a>
      </Link>
    </li>
  )
}

const NotificationsWindow = ({ notifications, setNotifications }) => {
  const { theme } = useTheme()

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
        'fixed z-30 top-30 sm:right-24 w-screen sm:w-fit max-w-3xl list-none bg-base-300 sm:rounded divide-y divide-base-content drop-shadow-lg border border-base-200'
      }
      key={'notifications'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className='py-3 px-4 flex justify-between text-lg'>
        <p className='mt-0.5'>Notifications</p>
        <Link href={'/settings/notifications'}>
          <a>{theme === 'light' ? <Settings /> : <SettingsOutlined />}</a>
        </Link>
      </div>
      <ul className='max-h-[592px] py-1 overflow-y-auto snap-y'>
        {notifications.length > 0 ? (
          notifications
        ) : (
          <li className={`py-2 px-4 flex justify-between text-sm`}>
            <div>
              <p className={'break-all font-semibold '}>
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
          className={`py-2 px-4 flex justify-between text-sm ${
            seenMessage ? '' : 'hover:bg-base-200 '
          }`}>
          <div>
            <p className={'break-all font-semibold '}>{body}</p>
            {timestamp && <p className={'mt-1'}>Updated {timestamp}</p>}
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
  const { theme, setTheme } = useTheme()
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext)

  return (
    <m.div
      id='user'
      className={
        'fixed z-30 top-30 sm:right-14 w-screen sm:w-80 list-none bg-base-300 rounded divide-y divide-base-content drop-shadow-lg border border-base-200'
      }
      key={'user'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className='py-3 px-4 flex gap-2 block text-sm'>
        <Image
          src={authUser.photoURL || missingImage}
          width={40}
          height={40}
          alt='User Icon'
          className='rounded-full'
        />
        <div>
          <span className='block text-sm'>
            {authUser.displayName || 'Not logged in'}
          </span>
          {authUser.firebaseUser && (
            <span className='block text-sm font-medium truncate '>
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
              <a className='block py-2 px-4 text-sm hover:bg-base-200'>
                {theme === 'light' ? <Person /> : <PersonOutline />}
                <span className={'ml-2'}>Your Profile</span>
              </a>
            </Link>
          </li>
        )}
        {authUser.claims.admin && (
          <li>
            <Link href={'/admin'}>
              <a className='block py-2 px-4 text-sm hover:bg-base-200'>
                {theme === 'light' ? (
                  <AdminPanelSettings />
                ) : (
                  <AdminPanelSettingsOutlined />
                )}
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
            className='w-full block py-2 px-4 text-left text-sm hover:bg-base-200'>
            <Logout />
            <span className={'ml-2'}>Sign out</span>
          </button>
        </li>
      </ul>
      <ul className='py-1'>
        <li>
          {theme === 'dark' ? (
            <button
              onClick={() => {
                setTheme('light')
              }}
              className='w-full py-2 px-4 text-left text-sm hover:bg-base-200'>
              <DarkMode />
              <span className={'ml-2'}>Appearance: {theme}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setTheme('dark')
              }}
              className='w-full py-2 px-4 text-left text-sm hover:bg-base-200'>
              <LightMode />
              <span className={'ml-2'}>Appearance: {theme}</span>
            </button>
          )}
        </li>
        <li>
          <Link href={'/settings'}>
            <a
              className='block py-2 px-4 text-sm hover:bg-base-200'
              onClick={() => setSidebarOpen(false)}>
              <Settings className={'hidden dark:inline-block'} />
              <SettingsOutlined className={'dark:hidden'} />
              <span className={'ml-2'}>Settings</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href={'/help'}>
            <a className='block py-2 px-4 text-sm hover:bg-base-200'>
              <Help />
              <span className={'ml-2'}>Help</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href={'https://github.com/jasonwynn10/PMMP-NXT/issues'}>
            <a className='block py-2 px-4 text-sm hover:bg-base-200'>
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
