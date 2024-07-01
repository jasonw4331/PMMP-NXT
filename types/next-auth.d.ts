import { type DefaultSession } from 'next-auth'
import { type DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  interface Session extends DefaultSession {
    // A JWT which can be used as Authorization header with supabase-js for RLS.
    supabaseAccessToken?: string
    user: {
      /** The user's role. */
      user_role?: 'admin' | 'reviewer' | 'developer' | 'user'
    } & DefaultSession['user']
    error?: 'RefreshAccessTokenError'
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends Record<string, unknown>, DefaultJWT {
    /** The user's role. */
    user_role?: 'admin' | 'reviewer' | 'developer' | 'user'
    access_token: string
    expires_at: number
    refresh_token: string
    error?: 'RefreshAccessTokenError'
  }
}
