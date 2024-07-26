'use client'

import { signOut } from 'next-auth/react'
import { MdOutlinePerson } from 'react-icons/md'

export default function SignOutButton() {
  return (
    <button onClick={() => signOut()}>
      <MdOutlinePerson size={24} />
      <span>Sign In</span>
    </button>
  )
}
