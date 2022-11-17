import Link from 'next/link'
import SearchForm from './SearchForm'
import {
  FaWrench,
  IoMdNotificationsOutline,
  MdApps,
  MdSearch,
} from 'react-icons/all'
import AppsPopup from '../popups/AppsPopup'
import NotificationsPopup from '../popups/NotificationsPopup'
import Image from 'next/image'
import missingImage from '../../public/icons/missing.png'
import UserPopup from '../popups/UserPopup'

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
      <div className='navbar-center basis-1/2 hidden lg:block'>
        <SearchForm />
      </div>
      <div className='navbar-end'>
        <Link
          href={'/results'}
          className='btn btn-ghost btn-circle flex lg:hidden'>
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
            <div className='indicator'>
              <IoMdNotificationsOutline size={24} />
              <span className='badge badge-sm badge-primary indicator-item'>
                1
              </span>
            </div>
          </label>
          <NotificationsPopup />
        </div>
        <div className='dropdown dropdown-end pl-2'>
          <label tabIndex={0} className='btn btn-ghost btn-square avatar'>
            <div className={'w-10 rounded-xl'}>
              <Image
                src={missingImage} // TODO: Replace with user avatar
                width={1}
                height={1}
                alt='User Profile Image'
              />
            </div>
          </label>
          <UserPopup />
        </div>
      </div>
    </div>
  )
}
