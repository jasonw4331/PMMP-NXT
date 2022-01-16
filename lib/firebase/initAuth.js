import { init } from 'next-firebase-auth'
import absoluteUrl from 'next-absolute-url'

const TWELVE_DAYS_IN_MS = 12 * 60 * 60 * 24 * 1000

const initAuth = () => {
  init({
    debug: false,

    authPageURL: ({ ctx }) => {
      const isServerSide = typeof window === 'undefined'
      const origin = isServerSide
        ? absoluteUrl(ctx.req).origin
        : window.location.origin
      const destPath =
        typeof window === 'undefined' ? ctx.resolvedUrl : window.location.href
      const destURL = new URL(destPath, origin)
      return `auth?destination=${encodeURIComponent(destURL)}`
    },

    // This demonstrates setting a dynamic destination URL when
    // redirecting from auth pages. Alternatively, you can simply
    // specify `appPageURL: '/'`.
    appPageURL: ({ ctx }) => {
      const isServerSide = typeof window === 'undefined'
      const origin = isServerSide
        ? absoluteUrl(ctx.req).origin
        : window.location.origin
      const params = isServerSide
        ? new URL(ctx.req.url, origin).searchParams
        : new URLSearchParams(window.location.search)
      const destinationParamVal = params.get('destination')
        ? decodeURIComponent(params.get('destination'))
        : undefined

      // By default, go to the index page if the destination URL
      // is invalid or unspecified.
      let destURL = '/'
      if (destinationParamVal) {
        // Verify the redirect URL host is allowed.
        // https://owasp.org/www-project-web-security-testing-guide/v41/4-Web_Application_Security_Testing/11-Client_Side_Testing/04-Testing_for_Client_Side_URL_Redirect
        const allowedHosts = [
          'localhost:3000',
          'poggit-tailwind.web.app',
          'poggit-tailwind.firebaseapp.com',
        ]
        const allowed =
          allowedHosts.indexOf(new URL(destinationParamVal).host) > -1
        if (allowed) {
          destURL = destinationParamVal
        } else {
          console.warn(
            `Redirect destination host must be one of ${allowedHosts.join(
              ', '
            )}.`
          )
        }
      }
      return destURL
    },
    loginAPIEndpoint: '/api/login',
    logoutAPIEndpoint: '/api/logout',
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Using JSON to handle newline problems when storing the
        // key as a secret in Vercel. See:
        // https://github.com/vercel/vercel/issues/749#issuecomment-707515089
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
          : undefined,
      },
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    },
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    },
    cookies: {
      name: 'PMMPNXT',
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: TWELVE_DAYS_IN_MS,
      overwrite: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'true',
      signed: true,
    },
  })
}

export default initAuth
