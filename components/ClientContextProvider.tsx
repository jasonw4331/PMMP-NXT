'use client'
import { UserContext, UserContextType } from '../lib/UserContext'
import { useUserData } from '../lib/UserHooks'

export default function ClientContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const userData: UserContextType = useUserData()
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  )
}