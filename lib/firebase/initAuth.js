import { init } from 'next-firebase-auth'
import absoluteUrl from 'next-absolute-url'

const TWELVE_DAYS_IN_MS = 12 * 60 * 60 * 24 * 1000

const initAuth = () => {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const databaseURL = `https://${projectId}.firebaseio.com`
  const authDomain = `${projectId}.firebaseapp.com`
  const storageBucket = `${projectId}.appspot.com`
  const messagingSenderId =
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID.split(':')[1] || ''
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
          'nxt.jasonwynn10.com',
          'pmmp-nxt.vercel.app',
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
        projectId,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      },
      databaseURL,
    },
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
      authDomain,
      databaseURL,
      projectId,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      messagingSenderId,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      storageBucket,
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
      secure: true,
      signed: true,
    },
  })
}

export default initAuth
