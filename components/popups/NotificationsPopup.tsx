'use client'
import Link from 'next/link'
import { MdSettings } from 'react-icons/md'

export default function NotificationsPopup() {
  // TODO: Add notification data from service worker
  const notifications = []
  return (
    <ul
      tabIndex={0}
      className='menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-screen max-w-sm max-sm:max-w-xs max-sm:-left-60'>
      <div className={'flex flex-row justify-between'}>
        <span className={'mt-3 text-xl'}>Notifications</span>
        <Link
          href={'/settings/notifications'}
          prefetch={false}
          className={'btn btn-ghost btn-circle px-0 py-0'}>
          <MdSettings size={24} />
        </Link>
      </div>
      <li className={'divider divider-vertical h-0'}></li>
      <li>
        {notifications.length < 1 && (
          <span>You don't have any notifications!</span>
        )}
      </li>
    </ul>
  )
}
