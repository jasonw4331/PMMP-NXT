import Link from 'next/link'
import SearchForm from './SearchForm'
import { FaWrench, MdApps, MdSearch } from 'react-icons/all'
import AppsPopup from '../popups/AppsPopup'
import NotificationsPopup from '../popups/NotificationsPopup'
import NotificationsBadge from './NotificationsBadge'
import NavbarProfile from './NavbarProfile'

export default function Navbar() {
  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
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
      <div tabIndex={-1} className='navbar-center basis-1/2 hidden md:block'>
        <SearchForm />
      </div>
      <div className='navbar-end'>
        <Link
          href={'/results'}
          className='btn btn-ghost btn-circle flex md:hidden'>
          <MdSearch size={24} />
        </Link>
        <button className='btn btn-ghost btn-circle'>
          <FaWrench size={22} />
        </button>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle'>
            <MdApps size={26} />
          </label>
          <AppsPopup />
        </div>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle'>
            <NotificationsBadge />
          </label>
          <NotificationsPopup />
        </div>
        <div className='dropdown dropdown-end pl-2'>
          <NavbarProfile />
        </div>
      </div>
    </div>
  )
}
