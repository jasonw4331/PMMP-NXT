import '../styles/globals.css'
import Head from 'next/head'
import initAuth from '../lib/firebase/initAuth'
import { LazyMotion, domAnimation} from 'framer-motion'
import {Toaster} from 'react-hot-toast'

initAuth()

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name='application-name' content='PMMP NXT' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='PMMP NXT' />
      <meta name='description' content='The next generation of PocketMine plugin distribution' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      {/*<meta name='msapplication-config' content='/icons/browserconfig.xml' />*/}
      <meta name='msapplication-TileColor' content='#121212' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='theme-color' content='#121212' />

      <link rel='apple-touch-icon' sizes='16x16' href='/icons/icon-16x16.png' />
      <link rel='apple-touch-icon' sizes='32x32' href='/icons/icon-32x32.png' />
      <link rel='apple-touch-icon' sizes='72x72' href='/icons/icon-72x72.png' />
      <link rel='apple-touch-icon' sizes='96x96' href='/icons/icon-96x96.png' />
      <link rel='apple-touch-icon' sizes='144x144' href='/icons/icon-144x144.png' />
      <link rel='apple-touch-icon' sizes='152x152' href='/icons/icon-152x152.png' />
      <link rel='apple-touch-icon' sizes='192x192' href='/icons/icon-192x192.png' />
      <link rel='apple-touch-icon' sizes='384x384' href='/icons/icon-384x384.png' />
      <link rel='apple-touch-icon' sizes='512x512' href='/icons/icon-512x512.png' />

      <link rel='icon' type='image/png' sizes='16x16' href='/icons/icon-16x16.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/icons/icon-32x32.png' />

      <link rel='manifest' href='/manifest.json' />
      <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' />
      <link rel='shortcut icon' href='/favicon.ico' />
      <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />

      <title>PMMP NXT</title>

      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <LazyMotion strict features={domAnimation}>
      <Component {...pageProps} />
    </LazyMotion>
    <Toaster/>
  </>
)

export default MyApp
