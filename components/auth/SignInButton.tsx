'use client'

import { MdOutlinePerson } from 'react-icons/md'
import { useRouter } from 'next/navigation'

export function SignInButton() {
  const router = useRouter()
  return (
    <button onClick={() => router.push('/login')}>
      <MdOutlinePerson size={24} />
      <span>Sign In</span>
    </button>
  )
}
