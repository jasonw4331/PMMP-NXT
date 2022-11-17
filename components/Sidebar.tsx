import Link from 'next/link'
import {
  MdAdminPanelSettings,
  MdAssignment,
  MdBookmarks,
  MdExplore,
  MdFeedback,
  MdFlag,
  MdHelp,
  MdHistory,
  MdHome,
  MdLibraryAdd,
  MdSettings,
} from 'react-icons/all'

export default function Sidebar() {
  return (
    <ul className='menu p-4 overflow-y-auto w-60 bg-base-100 relative overflow-x-hidden'>
      <div className='flex pl-0'>
        <label htmlFor='my-drawer-3' className='btn btn-circle btn-ghost'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block w-6 h-6 stroke-current'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'></path>
          </svg>
        </label>
        <Link href={'/'} className={'font-extrabold text-4xl ml-2'}>
          NXT
        </Link>
      </div>
      <li>
        <Link href={'/'}>
          <MdHome size={24} />
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link href={'/feed/explore'}>
          <MdExplore size={24} />
          <span>Explore</span>
        </Link>
      </li>
      <li>
        <Link href={'/feed/bookmarks'}>
          <MdBookmarks size={24} />
          <span>Bookmarked</span>
        </Link>
      </li>
      <li className={'divider'}></li>
      <li>
        <Link href={'/feed/library'}>
          <MdLibraryAdd size={24} />
          <span>Library</span>
        </Link>
      </li>
      <li>
        <Link href={'/feed/history'}>
          <MdHistory size={24} />
          <span>History</span>
        </Link>
      </li>
      <li className={'divider'}></li>
      <li>
        <Link href={'/review'}>
          <MdAssignment size={24} />
          <span>Review Plugins</span>
        </Link>
      </li>
      <li>
        <Link href={'/admin'}>
          <MdAdminPanelSettings size={24} />
          <span>Admin Panel</span>
        </Link>
      </li>
      <li className={'divider'}></li>
      <li>
        <Link href={'/settings'}>
          <MdSettings size={24} />
          <span>Settings</span>
        </Link>
      </li>
      <li>
        <Link href={'/reporthistory'}>
          <MdFlag size={24} />
          <span>Report History</span>
        </Link>
      </li>
      <li>
        <Link href={'/help'}>
          <MdHelp size={24} />
          <span>Help</span>
        </Link>
      </li>
      <li>
        <Link href={'https://github.com/jasonwynn10/PMMP-NXT/issues'}>
          <MdFeedback size={24} />
          <span>Send Feedback</span>
        </Link>
      </li>
      <div className={'absolute bottom-6'}>
        <footer className={'font-normal text-sm text-base-content text-center'}>
          <h2>&copy; {new Date().getFullYear()} PMMP-NXT</h2>
          <h5>
            Some Icons by <Link href='https://freepik.com'>freepik.com</Link>{' '}
            and <Link href='https://icons8.com'>icons8.com</Link>
          </h5>
        </footer>
      </div>
    </ul>
  )
}
