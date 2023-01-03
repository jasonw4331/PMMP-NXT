'use client'
import Link from 'next/link'
import {
  MdAdminPanelSettings,
  MdAssignment,
  MdOutlinePerson,
} from 'react-icons/md'
import { useSession } from 'next-auth/react'

export default function AdminSidebarSegment() {
  const { data, status } = useSession()

  return status !== 'authenticated' ? (
    <>
      <p className={'text-center'}>
        Sign in to like plugins, leave comments, and follow authors!
      </p>
      <li>
        <label
          htmlFor='SignIn'
          onMouseUp={() => document.getElementById('SideBar')?.click()}>
          <MdOutlinePerson size={24} />
          <span>Sign In</span>
        </label>
      </li>
      <li className={'divider pl-0'}></li>
    </>
  ) : (
    (claims?.admin || claims?.reviewer) && (
      <>
        <li>
          <Link href={'/review'} className={'pl-3'}>
            <MdAssignment size={24} />
            <span>Review Plugins</span>
          </Link>
        </li>
        {claims?.admin && (
          <li>
            <Link href={'/admin'} className={'pl-3'}>
              <MdAdminPanelSettings size={24} />
              <span>Admin Panel</span>
            </Link>
          </li>
        )}
        <li className={'divider pl-0'}></li>
      </>
    )
  )
}
