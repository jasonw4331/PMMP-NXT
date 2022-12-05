import 'client-only'
import { Context, createContext } from 'react'
import { User } from '@firebase/auth'

export type UserContextType = {
  user: User | null
  username: string | null
}

export const UserContext: Context<UserContextType> = createContext({
  user: null,
  username: null,
} as UserContextType)
