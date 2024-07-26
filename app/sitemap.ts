import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  //TODO: parse database for software dynamic routes
  const plugins: MetadataRoute.Sitemap = [
    {
      url: `https://${process.env.NEXT_PUBLIC_API_URL}/plugin/user/plugin1`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.1,
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_API_URL}/plugin/user/plugin2`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
  //TODO: parse database for user dynamic routes
  const users: MetadataRoute.Sitemap = [
    {
      url: `https://${process.env.NEXT_PUBLIC_API_URL}/user/user1`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_API_URL}/user/user2`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3,
    },
  ]

  return [
    {
      url: `https://${process.env.NEXT_PUBLIC_API_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_API_URL}/rules`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_API_URL}/publish`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.7,
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_API_URL}/help`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: `https://${process.env.NEXT_PUBLIC_API_URL}/feed/explore`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...plugins,
    ...users,
  ]
}
