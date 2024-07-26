import Link from 'next/link'
import {
  MdExplore,
  MdFeedback,
  MdFlag,
  MdHelp,
  MdHome,
  MdSettings,
} from 'react-icons/md'
import dynamic from 'next/dynamic'

const AdminSidebarSegmentLazy = dynamic(
  () => import('@/components/sidebar/AdminSidebarSegment')
)
const SignedInSidebarSegmentLazy = dynamic(
  () => import('@/components/sidebar/SignedInSidebarSegment')
)

export default function Sidebar() {
  return (
    <ul
      className={
        'menu p-2 w-60 h-screen bg-base-300 overflow-x-hidden flex-nowrap flex-col'
      }>
      <div className={'flex pl-0'}>
        <label htmlFor='SideBar' className='btn btn-circle btn-ghost'>
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
        <Link href={'/'} className={'btn btn-ghost text-4xl'}>
          NXT
        </Link>
      </div>
      <li>
        <Link href={'/'} className={'pl-3'}>
          <MdHome size={24} />
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link href={'/feed/explore'} className={'pl-3'} prefetch={false}>
          <MdExplore size={24} />
          <span>Explore</span>
        </Link>
      </li>
      <SignedInSidebarSegmentLazy />
      <li className={'divider divider-vertical pl-0'}></li>
      <AdminSidebarSegmentLazy />
      <li>
        <Link href={'/settings'} className={'pl-3'} prefetch={false}>
          <MdSettings size={24} />
          <span>Settings</span>
        </Link>
      </li>
      <li>
        <Link href={'/reporthistory'} className={'pl-3'} prefetch={false}>
          <MdFlag size={24} />
          <span>Report History</span>
        </Link>
      </li>
      <li>
        <Link href={'/help'} className={'pl-3'} prefetch={false}>
          <MdHelp size={24} />
          <span>Help</span>
        </Link>
      </li>
      <li>
        <Link
          href={'https://github.com/jasonwynn10/PMMP-NXT/issues'}
          className={'pl-3'}
          prefetch={false}>
          <MdFeedback size={24} />
          <span>Send Feedback</span>
        </Link>
      </li>
      <div className={'mt-auto'}>
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
