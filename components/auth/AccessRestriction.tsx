'use client'
import { useSession } from 'next-auth/react'

export default function AccessRestriction() {
  const { status } = useSession({
    required: true,
  })

  if (status === 'loading') {
    return <div className={'loading'}>Loading...</div>
  }

  return <div>User is logged in</div>
}
