'use client'
import Link from 'next/link'
import { MdSettings } from 'react-icons/all'

export default function NotificationsPopup() {
  // TODO: Add notifications from service worker
  return (
    <ul
      tabIndex={0}
      className='menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-screen max-w-sm'>
      <div className={'flex flex-row justify-between'}>
        <span className={'mt-3 text-xl'}>Notifications</span>
        <Link
          href={'/settings/notifications'}
          className={'btn btn-ghost btn-circle px-0 py-0'}>
          <MdSettings size={24} />
        </Link>
      </div>
      <li className={'divider divider-vertical h-0'}></li>
      <li>
        <span>You don't have any notifications!</span>
      </li>
    </ul>
  )
}
