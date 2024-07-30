import { MdOutlinePerson } from 'react-icons/md'
import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <button onClick={() => signOut()}>
      <MdOutlinePerson size={24} />
      <span>Sign In</span>
    </button>
  )
}
