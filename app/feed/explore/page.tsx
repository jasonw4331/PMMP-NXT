import ReleaseCard from '../../../components/cards/ReleaseCard'
import { getTrending } from '../../../lib/ServerFirestoreQueries'

export default async function ExplorePage() {
  const data = await getTrending()
  return (
    <ul className={'pt-2 flex flex-wrap gap-x-5 gap-y-10 justify-center'}>
      {data.map(doc => (
        <ReleaseCard key={doc.id} name={doc.id} {...doc} />
      ))}
    </ul>
  )
}
