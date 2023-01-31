import {
  Account as DefaultAccount,
  DefaultSession,
  DefaultUser,
  Profile as DefaultProfile,
} from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt/types'

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user?: {
      /** The user's role. */
      userRole?: 'admin' | 'reviewer' | 'developer' | 'user'
      permissionLevel: number
    } & DefaultSession['user']
  }
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends DefaultUser {}
  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account extends DefaultAccount {}
  /** The OAuth profile returned from your provider */
  interface Profile extends DefaultProfile {}
}

declare module 'next-auth/jwt' {
  interface JWT extends Record<string, unknown>, DefaultJWT {
    /** The user's role. */
    userRole?: 'admin' | 'reviewer' | 'developer' | 'user'
  }
}
