import { MdLibraryAdd, MdOutlinePerson } from 'react-icons/md'
import Link from 'next/link'
import ReleaseCard from '@/components/cards/ReleaseCard'

export default async function WatchingPage() {
  const releases = [] //await getReleases()
  return (
    <>
      {releases ? (
        <ul className={'pt-2 flex flex-wrap gap-x-5 gap-y-10 justify-center'}>
          {releases.map(doc => (
            <ReleaseCard key={doc.id} name={doc.id} {...doc} />
          ))}
        </ul>
      ) : (
        <div
          className={
            'pt-28 flex flex-col text-center items-center justify-center'
          }>
          <MdLibraryAdd className={'self-center'} size={120} />
          <div className={'my-6'}>
            <h3 className={'mb-4 text-2xl leading-8'}>
              Don&apos;t miss new updates
            </h3>
            <p className={'mt-2'}>
              Sign in to see updates for your favorite plugins
            </p>
          </div>
          <Link className={'btn btn-outline rounded-xl gap-3'} href={'/login'}>
            <MdOutlinePerson size={24} />
            <span>Sign In</span>
          </Link>
        </div>
      )}
    </>
  )
}
