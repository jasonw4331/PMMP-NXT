'use client'

import NavbarProfile from '@/components/navbar/NavbarProfile'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const UserPopupLazy = dynamic(() => import('@/components/popups/UserPopup'))

export function NavUserDropdown() {
  const [showUser, setShowUser] = useState(false)
  return (
    <div
      className='dropdown dropdown-end md:pl-2'
      onClick={() => setShowUser(true)}>
      <NavbarProfile />
      {showUser && <UserPopupLazy />}
    </div>
  )
}
