import Head from 'next/head';

const Metatags = ({ title, tagline = '', image = '' }) => {
  return (
    <Head>
      <title>{title}</title>

      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content='https://pmmp.io/nxt' />
      <meta name='twitter:title' content={'PMMP NXT | ' + title} />
      <meta name='twitter:description' content={tagline} />
      <meta name='twitter:image' content={image} />
      <meta name='twitter:creator' content='@jasonwynn10' />

      <meta property='og:type' content='website' />
      <meta property='og:title' content={'PMMP NXT | ' + title} />
      <meta property='og:description' content={tagline} />
      <meta property='og:site_name' content='PMMP NXT' />
      <meta property='og:url' content='https://pmmp.io/nxt' />
      <meta property='og:image' content={image} />
    </Head>
  )
}

export default Metatags