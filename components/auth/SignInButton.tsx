'use client'

import { MdOutlinePerson } from 'react-icons/md'
import { signIn } from '@/auth'

export default function SignInButton() {
  return (
    <button onClick={() => signIn()}>
      <MdOutlinePerson size={24} />
      <span>Sign In</span>
    </button>
  )
}
