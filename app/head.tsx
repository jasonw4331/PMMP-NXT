import { getReleases } from '../lib/server/ServerFirestoreQueries'

export default async function Head() {
  const data = await getReleases()

  return (
    <>
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

      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossOrigin='anonymous'
      />

      <meta name='viewport' content='initial-scale=1.0, width=device-width' />

      <title>Home | PMMP NXT</title>

      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content='https://pmmp.io/nxt' />
      <meta name='twitter:title' content='PMMP NXT | Home' />
      <meta
        name='twitter:description'
        content={`Currently showing ${data.length} reviewed plugins`}
      />
      <meta name='twitter:creator' content='@jasonwynn10' />

      <meta property='og:type' content='website' />
      <meta property='og:title' content='PMMP NXT | Home' />
      <meta
        property='og:description'
        content={`Currently showing ${data.length} reviewed plugins`}
      />
      <meta property='og:site_name' content='PMMP NXT' />
      <meta property='og:url' content='https://pmmp.io/nxt' />
    </>
  )
}
