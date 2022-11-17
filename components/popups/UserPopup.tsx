'use client'
import missingImage from '../../public/icons/missing.png'
import Image from 'next/image'
import {
  MdAdminPanelSettings,
  MdHelpOutline,
  MdOutlineDarkMode,
  MdOutlineFeedback,
  MdOutlineLightMode,
  MdOutlineLogout,
  MdOutlinePerson,
  MdSettings,
} from 'react-icons/md'
import Link from 'next/link'
import { themeChange } from 'theme-change'

export default function UserPopup() {
  return (
    <ul
      tabIndex={0}
      className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-screen max-w-sm max-sm:max-w-xs max-sm:-left-72'>
      <div className={'my-1 mx-2 h-10 flex gap-2 block text-sm'}>
        <Image
          src={missingImage}
          width={40}
          height={40}
          alt='User Icon'
          className='rounded-full'
        />
        <div>
          <span className='block text-sm'>Not logged in</span>
        </div>
      </div>
      <li className={'divider divider-vertical h-0'}></li>
      <li>
        <Link href={'/user/username'} prefetch={false}>
          <MdOutlinePerson size={24} />
          <span>My Profile</span>
        </Link>
      </li>
      <li>
        <Link href={'/admin'} prefetch={false}>
          <MdAdminPanelSettings size={24} />
          <span>Admin Panel</span>
        </Link>
      </li>
      <li>
        <Link href={'/'}>
          <MdOutlineLogout size={24} />
          <span>Sign Out</span>
        </Link>
      </li>
      <li className={'divider divider-vertical h-0'}></li>
      <li>
        <button
          id={'light-button'}
          data-toggle-theme='business,light'
          data-act-class={'visible'}
          onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
          onMouseUp={(e: React.MouseEvent) => {
            themeChange()
            e.currentTarget.className = 'hidden'
            e.currentTarget.parentElement!.querySelector(
              '#dark-button'
            )!.className = ''
          }}
          className={'dark:hidden'}>
          <MdOutlineLightMode size={24} />
          <span>Appearance: Light</span>
        </button>
        <button
          id={'dark-button'}
          data-toggle-theme='business,light'
          data-act-class={'visible'}
          onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
          onMouseUp={(e: React.MouseEvent) => {
            themeChange()
            e.currentTarget.className = 'hidden'
            e.currentTarget.parentElement!.querySelector(
              '#light-button'
            )!.className = ''
          }}
          className={'hidden dark:visible'}>
          <MdOutlineDarkMode size={24} />
          <span>Appearance: Dark</span>
        </button>
      </li>
      <li>
        <Link href={'/settings'} prefetch={false}>
          <MdSettings size={24} />
          <span>Settings</span>
        </Link>
      </li>
      <li>
        <Link href={'/help'} prefetch={false}>
          <MdHelpOutline size={24} />
          <span>Help</span>
        </Link>
      </li>
      <li>
        <Link href={'https://github.com/jasonwynn10/PMMP-NXT/issues'}>
          <MdOutlineFeedback size={24} />
          <span>Send Feedback</span>
        </Link>
      </li>
    </ul>
  )
}
