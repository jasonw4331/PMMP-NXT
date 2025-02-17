import RSS from "rss"
import { type NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/auth/actions"

export const GET = async (request: NextRequest) => {
  const { user } = await getUser()
  const feed = new RSS({
    title: "Recently Viewed Plugins",
    description: "",
    generator: "",
    feed_url: `https://${process.env.NEXT_BASE_URL}/feed/history.xml`,
    site_url: `https://${process.env.NEXT_BASE_URL}/`,
    managingEditor: "",
    webMaster: "",
    copyright: `Copyright ${new Date().getFullYear().toString()}, PMMP NXT`,
    language: "en-US",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  })

  const allPosts = [
    {
      id: "Plugin_v1.0.0",
      title: "Test",
      description: "Test",
      url: `https://${process.env.NEXT_BASE_URL}/posts/1`,
      categories: ["test"],
      tags: ["test"],
      date: new Date().toUTCString(),
    },
  ] //await getHistory()

  if (allPosts) {
    allPosts.map(post => {
      feed.item({
        title: post.title,
        description: post.description,
        url: `https://${process.env.NEXT_BASE_URL}/posts/${post.id}`,
        categories: post.tags || [],
        author: "",
        date: post.date,
      })
    })
  }

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}
