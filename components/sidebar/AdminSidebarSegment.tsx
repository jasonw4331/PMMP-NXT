import Link from 'next/link'
import { MdAdminPanelSettings, MdAssignment } from 'react-icons/md'
import { SignInButton } from '@/components/auth/SignInButton'
import { useCorbado } from '@corbado/react'

export default function AdminSidebarSegment() {
  const { loading, isAuthenticated, logout } = useCorbado()
  const session = null

  return !isAuthenticated ? (
    <>
      <p className={'text-center'}>
        Sign in to like plugins, leave comments, and follow authors!
      </p>
      <li>
        <SignInButton />
      </li>
      <li className={'divider pl-0 h-1'} />
    </>
  ) : (
    <>
      {(session?.user.role === 'reviewer' ||
        session?.user.role === 'admin') && (
        <li>
          <Link href={'/review'} className={'pl-3'} prefetch={false}>
            <MdAssignment size={24} />
            <span>Review Plugins</span>
          </Link>
        </li>
      )}
      {session?.user.role === 'admin' && (
        <li>
          <Link href={'/admin'} className={'pl-3'} prefetch={false}>
            <MdAdminPanelSettings size={24} />
            <span>Admin Panel</span>
          </Link>
        </li>
      )}
      <li className={'divider pl-0 h-1'} />
    </>
  )
}
