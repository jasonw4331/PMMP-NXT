import Link from 'next/link'
import { MdAdminPanelSettings, MdAssignment } from 'react-icons/md'
import { auth } from '@/auth'
import SignInButton from '@/components/auth/SignInButton'

export default async function AdminSidebarSegment() {
  const session = await auth()

  return !session?.user.role ? (
    <>
      <p className={'text-center'}>
        Sign in to like plugins, leave comments, and follow authors!
      </p>
      <li>
        <SignInButton />
      </li>
      <li className={'divider divider-vertical pl-0'}></li>
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
      <li className={'divider divider-vertical pl-0'}></li>
    </>
  )
}
