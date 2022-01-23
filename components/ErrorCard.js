import Image from 'next/image'
import Link from 'next/link'
import missingIcon from '../public/icons/missing.png'

const ErrorCard = () => {
  return (
    <li
      className={
        'w-[281px] h-[382px] flex flex-col justify-start items-center bg-zinc-800 bg-cover text-white rounded mb-10 mr-5 tracking-wide'
      }>
      <h1 className={'w-full h-6 px-4 mt-3 font-roboto text-xl leading-6'}>
        There was an error
      </h1>
      <h2 className={'w-full h-5 px-4 mb-2 font-roboto text-sm'}>Error</h2>
      <div className={'w-[205px] h-[205px] mb-5'}>
        <Image src={missingIcon} alt='Missing Icon' width={205} height={205} />
      </div>
      <p
        className={
          'h-9 px-4 mb-3 break-words text-sm text-clip overflow-hidden'
        }>
        Error
      </p>
      <div className={'w-72 h-9 flex justify-center gap-3'}>
        <button
          className={
            'text-purple-400 p-2 font-roboto uppercase text-sm leading-4 tracking-widest'
          }>
          <Link href={'/'}>
            <a>More Details</a>
          </Link>
        </button>
        <button
          className={
            'text-purple-400 p-2 font-roboto uppercase text-sm leading-4 tracking-widest'
          }>
          <Link href={'/'}>
            <a>Download</a>
          </Link>
        </button>
      </div>
    </li>
  )
}

export default ErrorCard
