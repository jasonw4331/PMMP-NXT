'use client'

import { MdOutlinePerson } from 'react-icons/md'
import { signOut } from '@/auth'

export default function SignOutButton() {
  return (
    <button onClick={() => signOut()}>
      <MdOutlinePerson size={24} />
      <span>Sign In</span>
    </button>
  )
}
