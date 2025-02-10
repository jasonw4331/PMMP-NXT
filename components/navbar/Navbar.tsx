import Link from 'next/link'
import SearchForm from './SearchForm'
import { FaWrench } from 'react-icons/fa'
import { MdSearch } from 'react-icons/md'
import React from 'react'
import { NavAppsDropdown } from '@/components/navbar/NavAppsDropdown'
import { NavNotificationsDropdown } from '@/components/navbar/NavNotificationsDropdown'
import { NavUserDropdown } from '@/components/navbar/NavUserDropdown'

export default function Navbar() {
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
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </label>
        <Link href={'/'} className={`text-4xl font-mono font-extrabold ml-2`}>
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
        <NavAppsDropdown />
        <NavNotificationsDropdown />
        <NavUserDropdown />
      </div>
    </div>
  )
}
