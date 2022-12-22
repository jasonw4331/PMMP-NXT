import ReleaseCard from '../../components/cards/ReleaseCard'
import { getSubmitted } from '../../lib/server/ServerFirestoreQueries'

export default async function ReviewPage() {
  const data = await getSubmitted()
  return (
    <ul className={'pt-2 flex flex-wrap gap-x-5 gap-y-10 justify-center'}>
      {data.map(doc => (
        <ReleaseCard key={doc.id} name={doc.id} {...doc} />
      ))}
    </ul>
  )
}
