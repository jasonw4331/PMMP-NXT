'use client'
import Link from 'next/link'
import {
  MdAdminPanelSettings,
  MdAssignment,
  MdOutlinePerson,
} from 'react-icons/md'
import { signIn, useSession } from 'next-auth/react'

export default function AdminSidebarSegment() {
  const { data: session } = useSession()

  return session?.user?.user_role === null ? (
    <>
      <p className={'text-center'}>
        Sign in to like plugins, leave comments, and follow authors!
      </p>
      <li>
        <label htmlFor='SignIn' onMouseUp={e => signIn()}>
          <MdOutlinePerson size={24} />
          <span>Sign In</span>
        </label>
      </li>
      <li className={'divider pl-0'}></li>
    </>
  ) : (
    <>
      <li>
        <Link href={'/review'} className={'pl-3'}>
          <MdAssignment size={24} />
          <span>Review Plugins</span>
        </Link>
      </li>
      {session?.user?.user_role === 'admin' && (
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
}
