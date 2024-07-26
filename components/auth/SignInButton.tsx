'use client'

import { signIn } from 'next-auth/react'
import { MdOutlinePerson } from 'react-icons/md'

export default function SignInButton() {
  return (
    <button onClick={() => signIn()}>
      <MdOutlinePerson size={24} />
      <span>Sign In</span>
    </button>
  )
}
