'use client'

import dynamic from 'next/dynamic'
import NotificationsBadge from '@/components/navbar/NotificationsBadge'
import { useState } from 'react'

const NotificationsPopupLazy = dynamic(
  () => import('@/components/popups/NotificationsPopup')
)

export function NavNotificationsDropdown() {
  const [showNotifications, setShowNotifications] = useState(false)
  return (
    <div
      className='dropdown dropdown-end'
      onClick={() => setShowNotifications(true)}>
      <label tabIndex={0} className='btn btn-ghost btn-circle w-10 md:w-12'>
        <NotificationsBadge />
      </label>
      {showNotifications && <NotificationsPopupLazy />}
    </div>
  )
}
