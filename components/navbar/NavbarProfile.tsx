import Image from 'next/legacy/image'
import missingImage from '@/public/icons/missing.png'
import { useCorbado } from '@corbado/react'

export default function NavbarProfile() {
  const { user } = useCorbado()
  const session = null
  return (
    <label tabIndex={0} className='btn btn-ghost btn-square avatar'>
      <div className={'w-10 rounded-xl'}>
        <Image
          src={session?.user?.image ?? missingImage}
          width={40}
          height={40}
          alt='User Profile Image'
          priority
        />
      </div>
    </label>
  )
}
