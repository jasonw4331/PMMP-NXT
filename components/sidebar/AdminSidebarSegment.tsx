'use client'
import Link from 'next/link'
import { MdAdminPanelSettings, MdAssignment } from 'react-icons/md'

export default function AdminSidebarSegment() {
  return (
    <>
      <li>
        <Link href={'/review'} className={'pl-3'}>
          <MdAssignment size={24} />
          <span>Review Plugins</span>
        </Link>
      </li>
      <li>
        <Link href={'/admin'} className={'pl-3'}>
          <MdAdminPanelSettings size={24} />
          <span>Admin Panel</span>
        </Link>
      </li>
    </>
  )
}
