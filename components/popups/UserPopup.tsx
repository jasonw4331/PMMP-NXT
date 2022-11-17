'use client'
import missingImage from '../../public/icons/missing.png'
import Image from 'next/image'
import {
  MdAdminPanelSettings,
  MdHelpOutline,
  MdOutlineDarkMode,
  MdOutlineFeedback,
  MdOutlineLogout,
  MdOutlinePerson,
  MdSettings,
} from 'react-icons/all'
import Link from 'next/link'

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
        <Link href={'/user/username'}>
          <MdOutlinePerson size={24} />
          <span>My Profile</span>
        </Link>
      </li>
      <li>
        <Link href={'/admin'}>
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
        <Link href={'/'}>
          <MdOutlineDarkMode size={24} />
          <span>Appearance: Dark</span>
        </Link>
      </li>
      <li>
        <Link href={'/settings'}>
          <MdSettings size={24} />
          <span>Settings</span>
        </Link>
      </li>
      <li>
        <Link href={'/help'}>
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
