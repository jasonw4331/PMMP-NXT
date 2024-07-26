import { notFound, useSearchParams } from 'next/navigation'

export const revalidate = 43200 // revalidate every 12 hours

export default async function Head({
  params,
}: {
  params: { username: string; plugin: string }
}) {
  const searchParams = useSearchParams()
  const pluginData = {
    id: 'plugin_v1.0.0',
    tagline: 'A plugin for PocketMine-MP',
    icon_url: '/icons/logo/icon.svg',
  } //await getPlugin()
  if (pluginData === null) notFound()
  const [pluginName, pluginVersion] = pluginData.id.split('_v')

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

      <title>{pluginName} | PMMP NXT</title>

      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content='https://pmmp.io/nxt' />
      <meta name='twitter:title' content={pluginName + ' | PMMP NXT'} />
      <meta name='twitter:description' content={pluginData.tagline} />
      <meta name='twitter:image' content={pluginData.icon_url} />
      <meta name='twitter:creator' content='@jasonwynn10' />

      <meta property='og:type' content='website' />
      <meta property='og:title' content={pluginName + ' | PMMP NXT'} />
      <meta property='og:description' content={pluginData.tagline} />
      <meta property='og:site_name' content='PMMP NXT' />
      <meta property='og:url' content='https://pmmp.io/nxt' />
      <meta property='og:image' content={pluginData.icon_url} />
    </>
  )
}
