import Image from 'next/legacy/image'
import missingImage from '@/public/icons/missing.png'
import { auth } from '@/auth'

export default async function NavbarProfile() {
  const session = await auth()
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
