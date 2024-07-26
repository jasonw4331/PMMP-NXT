import ReleaseCard from '@/components/cards/ReleaseCard'

export default async function ExplorePage() {
  const data = [
    {
      id: 'PluginName_v1.0.0',
      author: 'AuthorName',
      tagline: 'A short description of the plugin',
      download_url: '/404',
      icon_url: 'https://via.placeholder.com/205',
    },
  ] //await getTrending()
  return (
    <ul className={'pt-2 flex flex-wrap gap-x-5 gap-y-10 justify-center'}>
      {data.map(doc => (
        <ReleaseCard key={doc.id} name={doc.id} {...doc} />
      ))}
    </ul>
  )
}
