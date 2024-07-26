import RSS from 'rss'

export async function GET() {
  const feed = new RSS({
    title: 'Followed Plugins',
    description: '',
    generator: '',
    feed_url: `https://${process.env.NEXT_BASE_URL}/feed/following.xml`,
    site_url: `https://${process.env.NEXT_BASE_URL}/`,
    managingEditor: '',
    webMaster: '',
    copyright: `Copyright ${new Date().getFullYear().toString()}, PMMP NXT`,
    language: 'en-US',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  })

  const allPosts = [] //await getPostsMeta()

  if (allPosts) {
    allPosts.map(post => {
      feed.item({
        title: post.title,
        description: post.description,
        url: `https://${process.env.NEXT_BASE_URL}/posts/${post.id}`,
        categories: post.tags || [],
        author: 'PMMP NXT',
        date: post.date,
      })
    })
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
