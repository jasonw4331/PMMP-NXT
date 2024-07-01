import ReleaseCard from '../../components/cards/ReleaseCard'
import AccessRestriction from '../../components/auth/AccessRestriction'
import { Suspense } from 'react'
import Loading from './loading'

export default async function ReviewPage() {
  return (
    <>
      <AccessRestriction />
      <Suspense fallback={<Loading />}>
        <ul className={'pt-2 flex flex-wrap gap-x-5 gap-y-10 justify-center'}>
          {(await getSubmitted()).map(doc => (
            <ReleaseCard key={doc.id} name={doc.id} {...doc} />
          ))}
        </ul>
      </Suspense>
    </>
  )
}
