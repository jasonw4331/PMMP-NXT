import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Metatags from '../components/Metatags'

export default function ServerError() {
  const router = useRouter()
  useEffect(() => {
    router.push('/')
  })
  return (
    <>
      <Metatags
        title={'Server Error'}
        tagline={'Whoops! a server-side issue occured.'}
      />
      <h1>500 - Server-side error occurred</h1>
    </>
  )
}
