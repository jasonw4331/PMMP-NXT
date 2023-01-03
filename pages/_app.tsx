import { SessionProvider, useSession } from 'next-auth/react'
import { AppProps } from 'next/app'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      {Component.auth !== undefined ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

function Auth({ children }: { children: React.ReactNode }): JSX.Element {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return children
}
