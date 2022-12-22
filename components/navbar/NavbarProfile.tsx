'use client'
import Image from 'next/image'
import missingImage from '../../public/icons/missing.png'
import UserPopup from '../popups/UserPopup'
import { UserContext } from '../../lib/client/UserContext'
import { useContext } from 'react'

export default function NavbarProfile() {
  const { user } = useContext(UserContext)
  return (
    <>
      <label tabIndex={0} className='btn btn-ghost btn-square avatar'>
        <div className={'w-10 rounded-xl'}>
          <Image
            src={user?.photoURL ?? missingImage}
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
