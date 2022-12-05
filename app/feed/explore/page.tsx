import Card from '../../../components/Card'
import { getTrending } from '../../../lib/CommonQueries'

export default async function ExplorePage() {
  const data = await getTrending()
  return (
    <ul className={'pt-2 flex flex-wrap gap-x-5 gap-y-10 justify-center'}>
      {data.map(doc => (
        <Card key={doc.id} name={doc.id} {...doc} />
      ))}
    </ul>
  )
}
