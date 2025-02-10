'use client'

import { MdApps } from 'react-icons/md'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const AppsPopupLazy = dynamic(() => import('@/components/popups/AppsPopup'))

export function NavAppsDropdown() {
  const [showApps, setShowApps] = useState(false)
  return (
    <div className='dropdown dropdown-end' onClick={() => setShowApps(true)}>
      <label tabIndex={0} className='btn btn-ghost btn-circle w-10 md:w-12'>
        <MdApps size={26} />
      </label>
      {showApps && <AppsPopupLazy />}
    </div>
  )
}
