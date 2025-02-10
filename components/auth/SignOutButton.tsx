import { MdOutlinePerson } from 'react-icons/md'
import { useCorbado } from '@corbado/react'

export function SignOutButton() {
  const { logout } = useCorbado()
  return (
    <button onClick={() => logout()}>
      <MdOutlinePerson size={24} />
      <span>Sign In</span>
    </button>
  )
}
