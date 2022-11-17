'use client'
import { IoMdNotificationsOutline } from 'react-icons/all'

export default function NotificationsBadge() {
  // TODO: Add notification count from service worker
  const notifications = []
  return notifications.length > 0 ? (
    <div className='indicator'>
      <IoMdNotificationsOutline size={24} />
      <span className='badge badge-sm badge-primary indicator-item'>1</span>
    </div>
  ) : (
    <IoMdNotificationsOutline size={24} />
  )
}
