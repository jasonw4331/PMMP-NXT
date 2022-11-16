import Card from '../components/Card'
import { getReleases } from '../lib/GetPlugin'

export const revalidate = 43200 // revalidate every 12 hours

export default async function HomePage() {
  const data = await getReleases()
  return (
    <ul className={'pt-2 flex flex-wrap gap-x-5 gap-y-10 justify-center'}>
      {data.map(doc => (
        <Card key={doc.id} name={doc.id} {...doc} />
      ))}
    </ul>
  )
}
