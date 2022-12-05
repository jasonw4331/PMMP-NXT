'use client'
import Link from 'next/link'
import {
  MdAdminPanelSettings,
  MdAssignment,
  MdOutlinePerson,
} from 'react-icons/md'
import { use, useContext } from 'react'
import { UserContext } from '../../lib/UserContext'
import { IdTokenResult, ParsedToken } from '@firebase/auth'

export default function AdminSidebarSegment() {
  const { user } = useContext(UserContext)
  const tokenResult = user?.getIdTokenResult()
  const claims =
    tokenResult instanceof Promise<IdTokenResult>
      ? (use(tokenResult)?.claims as ParsedToken)
      : null

  return user === null ? (
    <>
      <p className={'text-center'}>
        Sign in to like plugins, leave comments, and follow authors!
      </p>
      <li>
        <Link href={'/login'} className={'pl-3'}>
          <MdOutlinePerson size={24} />
          <span>Sign In</span>
        </Link>
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
