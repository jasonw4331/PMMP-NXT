import { MdBookmarks, MdOutlinePerson } from 'react-icons/md'
import Link from 'next/link'

export default function FollowingPage() {
  return (
    <>
      <div
        className={
          'pt-28 flex flex-col text-center items-center justify-center'
        }>
        <MdBookmarks className={'self-center'} size={120} />
        <div className={'my-6'}>
          <h3 className={'mb-4 text-2xl leading-8'}>
            Don&apos;t miss new updates
          </h3>
          <p className={'mt-2'}>
            Sign in to see updates from your favorite plugin authors
          </p>
        </div>
        <Link className={'btn btn-outline rounded-xl gap-3'} href={'/login'}>
          <MdOutlinePerson size={24} />
          <span>Sign In</span>
        </Link>
      </div>
    </>
  )
}
