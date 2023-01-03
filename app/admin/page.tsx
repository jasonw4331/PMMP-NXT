import AccessRestriction from '../../components/auth/AccessRestriction'
import { Suspense } from 'react'
import Loading from './loading'

export default async function AdminPage() {
  return (
    <>
      <AccessRestriction />
      <Suspense fallback={<Loading />}>
        <></>
      </Suspense>
    </>
  )
}
