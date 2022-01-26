import '../styles/globals.css'
import Head from 'next/head'
import initAuth from '../lib/firebase/initAuth'
import { Toaster } from 'react-hot-toast'
import Header from '../components/Header'
import { withAuthUser } from 'next-firebase-auth'
import { useState } from 'react'
import { ThemeProvider } from 'next-themes'

initAuth()

const MyApp = ({ Component, pageProps }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
        {/*<meta name='msapplication-config' content='/icons/browserconfig.xml' />*/}
        <meta name='msapplication-TileColor' content='#121212' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#121212' />

        <link
          rel='apple-touch-icon'
          type='image/svg+xml'
          sizes='200x200'
          href='/icons/logo/icon.svg'
        />

        <link rel='manifest' href='/manifest.json' />
        <link
          rel='mask-icon'
          type='image/svg+xml'
          href='/icons/logo/icon.svg'
          color='#5bbad5'
        />
        <link
          rel='shortcut icon'
          type='image/svg+xml'
          href='/icons/logo/icon.svg'
        />

        <link
          rel='icon'
          type='image/svg+xml'
          sizes='200x200'
          href='/icons/logo/icon.svg'
        />

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap'
          rel='stylesheet'
        />

        <title>PMMP NXT</title>

        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <ThemeProvider attribute={'class'} defaultTheme={'dark'}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main
          className={`mt-14 ${
            sidebarOpen ? 'ml-0 sm:ml-60' : 'ml-0'
          } overflow-x-hidden overflow-y-auto overscroll-contain p-2`}>
          <Component {...pageProps} />
        </main>
        <Toaster />
      </ThemeProvider>
    </>
  )
}

export default withAuthUser()(MyApp)
