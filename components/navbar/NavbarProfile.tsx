'use client'
import Image from 'next/image'
import missingImage from '../../public/icons/missing.png'
import UserPopup from '../popups/UserPopup'
import { useSession } from 'next-auth/react'

export default function NavbarProfile() {
  const { data, status } = useSession()
  return (
    <>
      <label tabIndex={0} className='btn btn-ghost btn-square avatar'>
        <div className={'w-10 rounded-xl'}>
          <Image
            src={data?.user?.image ?? missingImage}
            width={40}
            height={40}
            alt='User Profile Image'
          />
        </div>
      </label>
      <UserPopup />
    </>
  )
}
