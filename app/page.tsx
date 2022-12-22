import ReleaseCard from '../components/cards/ReleaseCard'
import { getReleases } from '../lib/CommonQueries'

export default async function HomePage() {
  const data = await getReleases()
  return (
    <ul className={'pt-2 flex flex-wrap gap-x-5 gap-y-10 justify-center'}>
      {data.map(doc => (
        <ReleaseCard key={doc.id} name={doc.id} {...doc} />
      ))}
    </ul>
  )
}
