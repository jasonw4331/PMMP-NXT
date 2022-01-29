import Image from 'next/image'
import Link from 'next/link'
import missingImage from '../public/icons/missing.png'

const PluginCard = ({
  name,
  author,
  tagline,
  downloadUrl = '/404',
  iconUrl = missingImage,
}) => {
  return (
    <li
      className={
        'w-[281px] h-[382px] flex flex-col justify-start items-center bg-cover dark:text-white rounded mb-10 mr-5 tracking-wide border border-gray-200 shadow-md dark:bg-zinc-800 dark:border-gray-700'
      }>
      <h1
        className={
          'w-full h-6 px-4 mt-3 font-roboto text-xl leading-6 line-clamp-1'
        }>
        {name.split('_v')[0]}
      </h1>
      <h2 className={'w-full h-5 px-4 mb-2 font-roboto text-sm line-clamp-1'}>
        {author}
      </h2>
      <div className={'w-[205px] h-[205px] mb-5'}>
        <Image
          src={iconUrl}
          alt='Plugin Icon'
          width={205}
          height={205}
          placeholder={typeof iconUrl === 'string' ? 'empty' : 'blur'}
          loading={'lazy'}
        />
      </div>
      <p
        className={
          'px-4 mb-3 break-words text-sm text-clip line-clamp-2 overflow-hidden'
        }>
        {tagline}
      </p>
      <div className={'w-72 h-9 flex justify-center gap-3'}>
        <button
          className={
            'text-purple-400 p-2 font-roboto uppercase text-sm leading-4 tracking-widest'
          }>
          <Link
            href={'/plugin/[username]/[plugin]'}
            as={`/plugin/${encodeURI(author)}/${encodeURI(name)}`}
            prefetch={false}>
            <a>More Details</a>
          </Link>
        </button>
        <button
          className={
            'text-purple-400 p-2 font-roboto uppercase text-sm leading-4 tracking-widest'
          }>
          <Link href={downloadUrl}>
            <a>Download</a>
          </Link>
        </button>
      </div>
    </li>
  )
}

export default PluginCard
