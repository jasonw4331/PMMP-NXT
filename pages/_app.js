import '../styles/globals.css'
import Head from 'next/head'
import initAuth from '../lib/firebase/initAuth'
import Header from '../components/PageWrapper/Header'
import { withAuthUser } from 'next-firebase-auth'
import { useState } from 'react'
import { domAnimation, LazyMotion } from 'framer-motion'
import initEnv from '../lib/initEnv'
import SidebarContext from '../lib/SidebarContext'
import { Theme, useTheme } from 'react-daisyui'

initAuth()
initEnv()

const MyApp = ({ Component, pageProps }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { theme } = useTheme()

  return (
    <>
      <Head>
        <meta name='application-name' content='PMMP NXT' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='PMMP NXT' />
        <meta
          name='description'
          content='The next generation of PocketMine plugin distribution'
        />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-TileColor' content='#121212' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#2a303c' />

        <link
          rel='apple-touch-icon'
          type='image/svg+xml'
          sizes='200x200'
          href='/icons/logo/icon.svg'
        />

        <link rel='manifest' href='/manifest/manifest.webmanifest' />

        <title>PMMP NXT</title>

        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Theme dataTheme={theme}>
        <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
          <LazyMotion strict features={domAnimation}>
            <Header />
            <main
              className={`mt-14 ${
                sidebarOpen ? 'ml-0 sm:ml-60' : 'ml-0'
              } overflow-x-hidden overflow-y-auto overscroll-contain`}>
              <Component {...pageProps} />
            </main>
          </LazyMotion>
        </SidebarContext.Provider>
      </Theme>
    </>
  )
}

export default withAuthUser()(MyApp)
