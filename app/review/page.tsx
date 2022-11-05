import Card from '../../components/Card'
import { getSubmitted } from '../../lib/GetPlugin'

export default async function Review() {
  const data = await getSubmitted()
  return (
    <ul className={'pt-2 flex flex-wrap gap-x-5 gap-y-10 justify-center'}>
      {data.map(doc => (
        <Card key={doc.id} name={doc.id} {...doc} />
      ))}
    </ul>
  )
}
