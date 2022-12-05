import { MdHistory, MdOutlinePerson } from 'react-icons/md'
import Link from 'next/link'

export default function HistoryPage() {
  return (
    <>
      <div
        className={
          'pt-28 flex flex-col text-center items-center justify-center'
        }>
        <MdHistory className={'self-center'} size={120} />
        <div className={'my-6'}>
          <h3 className={'mb-4 text-2xl leading-8'}>
            Keep track of what you view
          </h3>
          <p className={'mt-2'}>Page history isn't viewable when signed out.</p>
        </div>
        <Link className={'btn btn-outline rounded-xl gap-3'} href={'/login'}>
          <MdOutlinePerson size={24} />
          <span>Sign In</span>
        </Link>
      </div>
    </>
  )
}
