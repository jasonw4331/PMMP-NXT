import missingImage from '@/public/icons/missing.png'
import Image from 'next/legacy/image'
import {
  MdAdminPanelSettings,
  MdHelpOutline,
  MdOutlineFeedback,
  MdOutlineLogout,
  MdOutlinePerson,
  MdSettings,
} from 'react-icons/md'
import Link from 'next/link'
import ThemeSwapper from '@/components/ThemeSwapper'
import { signOut } from 'next-auth/react'
import { auth } from '@/auth'
import SignInButton from '@/components/auth/SignInButton'

export default async function UserPopup() {
  const session = await auth()

  return (
    <ul
      tabIndex={0}
      className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-screen max-w-sm max-sm:max-w-xs max-sm:-left-72'>
      <div className={'my-1 mx-2 h-10 flex gap-2 block text-sm'}>
        <Image
          src={session?.user?.image ?? missingImage}
          width={40}
          height={40}
          alt='User Icon'
          className='rounded-full'
        />
        <div>
          <span className='block text-sm'>
            {session?.user?.name ?? 'Not logged in'}
          </span>
          <span className='block text-sm font-medium'>
            {session?.user?.user_role != null
              ? session.user.user_role + ' Account'
              : ''}
          </span>
        </div>
      </div>
      <li className={'divider divider-vertical h-0'}></li>
      {session?.user?.name != null && (
        <li>
          <Link href={'/user/' + encodeURI(session.user.name)} prefetch={false}>
            <MdOutlinePerson size={24} />
            <span>My Profile</span>
          </Link>
        </li>
      )}
      {session?.user?.user_role === 'admin' && (
        <li>
          <Link href={'/admin'} prefetch={false}>
            <MdAdminPanelSettings size={24} />
            <span>Admin Panel</span>
          </Link>
        </li>
      )}
      <li>
        {!session?.user ? (
          <SignInButton />
        ) : (
          <button
            onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
            onMouseUp={e => signOut({ callbackUrl: '/' })}
            onContextMenu={(e: React.MouseEvent) => e.preventDefault()}>
            <MdOutlineLogout size={24} />
            <span>Sign Out</span>
          </button>
        )}
      </li>
      <li className={'divider divider-vertical h-0'}></li>
      <li>
        <ThemeSwapper />
      </li>
      <li>
        <Link href={'/settings'} prefetch={false}>
          <MdSettings size={24} />
          <span>Settings</span>
        </Link>
      </li>
      <li>
        <Link href={'/help'} prefetch={false}>
          <MdHelpOutline size={24} />
          <span>Help</span>
        </Link>
      </li>
      <li>
        <Link href={'https://github.com/jasonwynn10/PMMP-NXT/issues'}>
          <MdOutlineFeedback size={24} />
          <span>Send Feedback</span>
        </Link>
      </li>
    </ul>
  )
}
