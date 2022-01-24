import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Metatags from '../components/Metatags'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/')
  })

  return (
    <>
      <Metatags
        title='Not Found'
        tagline={"Whoops! That page couldn't be found."}
      />
      <div className={'not-found'}>
        <h1>Ooops...</h1>
        <h2>That page cannot be found :(</h2>
        <p>
          Click to go back to the{' '}
          <Link href='/'>
            <a>Homepage</a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default NotFound
