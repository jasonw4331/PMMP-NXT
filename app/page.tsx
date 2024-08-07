import ReleaseCard from '@/components/cards/ReleaseCard'

export default async function HomePage() {
  const data = [
    {
      id: 'Plugin_v1.0.0',
      author: 'Author',
      tagline: 'A tagline',
    },
  ] //await getReleases()
  return (
    <ul className={'pt-2 flex flex-wrap gap-x-5 gap-y-10 justify-center'}>
      {data.map(doc => (
        <ReleaseCard key={doc.id} name={doc.id} {...doc} />
      ))}
    </ul>
  )
}
