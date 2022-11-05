import Link from 'next/link'

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
        <a>Home</a>
      </li>
      <li>
        <a>Explore</a>
      </li>
      <li>
        <a>Bookmarked</a>
      </li>
      <li className={'divider'}></li>
      <li>
        <a>Library</a>
      </li>
      <li>
        <a>History</a>
      </li>
      <li className={'divider'}></li>
      <li>
        <a>Review Plugins</a>
      </li>
      <li>
        <a>Admin Panel</a>
      </li>
      <li className={'divider'}></li>
      <li>
        <a>Settings</a>
      </li>
      <li>
        <a>Report History</a>
      </li>
      <li>
        <a>Help</a>
      </li>
      <li>
        <a>Send Feedback</a>
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
