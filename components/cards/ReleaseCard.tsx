import Image, { StaticImageData } from 'next/legacy/image'
import missingImage from '@/public/icons/missing.png'
import Link from 'next/link'

export default function ReleaseCard({
  name,
  author,
  tagline,
  download_url = '/404',
  icon_url = missingImage,
}: {
  name: string
  author: string
  tagline: string
  download_url: string
  icon_url: string | StaticImageData
}) {
  return (
    <li
      className={'card card-bordered w-80 bg-base-100 shadow-xl'}
      title={'made by ' + author}>
      <figure className={'px-10 pt-10'}>
        <Image
          src={icon_url}
          alt='Plugin Icon'
          width={205}
          height={205}
          placeholder={typeof icon_url === 'string' ? 'empty' : 'blur'}
          loading={'lazy'}
          className={'rounded-xl'}></Image>
      </figure>
      <div className='card-body items-center text-center'>
        <h2 className='card-title line-clamp-2'>{name.split('_v')[0]}</h2>
        <p className={'line-clamp-2'}>{tagline}</p>
        <div className='card-actions'>
          <button className='btn btn-primary'>
            <Link
              href={'/plugin/[username]/[plugin]'}
              as={`/plugin/${encodeURI(author)}/${encodeURI(name)}`}
              prefetch={false}>
              More Details
            </Link>
          </button>
          <button className='btn btn-secondary'>
            <Link href={download_url}>Download</Link>
          </button>
        </div>
      </div>
    </li>
  )
}
