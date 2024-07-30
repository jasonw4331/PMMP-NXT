import { MdOutlinePerson } from 'react-icons/md'
import { signIn } from 'next-auth/react'

export function SignInButton() {
  return (
    <button onClick={() => signIn()}>
      <MdOutlinePerson size={24} />
      <span>Sign In</span>
    </button>
  )
}
