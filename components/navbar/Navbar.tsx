import Link from 'next/link'
import SearchForm from './SearchForm'
import { FaWrench } from 'react-icons/fa'
import { MdApps, MdSearch } from 'react-icons/md'
import dynamic from 'next/dynamic'
import React from 'react'
import NavbarProfile from '@/components/navbar/NavbarProfile'
import UserPopup from '@/components/popups/UserPopup'

// create dynamic components
const NotificationsBadgeLazy = dynamic(
  () => import('@/components/navbar/NotificationsBadge')
)
const NotificationsPopupLazy = dynamic(
  () => import('@/components/popups/NotificationsPopup')
)
const AppsPopupLazy = dynamic(() => import('@/components/popups/AppsPopup'))
const UserPopupLazy = dynamic(() => import('@/components/popups/UserPopup'))

export default async function Navbar() {
  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
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
      <div tabIndex={-1} className='navbar-center basis-1/2 hidden md:block'>
        <SearchForm />
      </div>
      <div className='navbar-end'>
        <Link
          href={'/results'}
          className='btn btn-ghost btn-circle flex md:hidden w-10 md:w-12'>
          <MdSearch size={24} />
        </Link>
        <button className='btn btn-ghost btn-circle w-10 md:w-12'>
          <FaWrench size={22} />
        </button>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle w-10 md:w-12'>
            <MdApps size={26} />
          </label>
          <AppsPopupLazy />
        </div>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle w-10 md:w-12'>
            <NotificationsBadgeLazy />
          </label>
          <NotificationsPopupLazy />
        </div>
        <div className='dropdown dropdown-end md:pl-2'>
          <NavbarProfile />
          <UserPopup />
        </div>
      </div>
    </div>
  )
}
