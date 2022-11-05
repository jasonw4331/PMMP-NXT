import Image, { StaticImageData } from 'next/image'
import missingImage from '../public/icons/missing.png'
import Link from 'next/link'

export default function Card({
  name,
  author,
  tagline,
  downloadUrl = '/404',
  iconUrl = missingImage,
}: {
  name: string
  author: string
  tagline: string
  downloadUrl: string
  iconUrl: string | StaticImageData
}) {
  return (
    <li className={'card w-96 bg-base-100 shadow-xl'}>
      <figure className={'px-10 pt-10'}>
        <Image
          src={iconUrl}
          alt='Plugin Icon'
          width={205}
          height={205}
          placeholder={typeof iconUrl === 'string' ? 'empty' : 'blur'}
          loading={'lazy'}
          className={'rounded-xl'}></Image>
      </figure>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>
          {name.split('_v')[0]} by {author}
        </h2>
        <p>{tagline}</p>
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
            <Link href={downloadUrl}>Download</Link>
          </button>
        </div>
      </div>
    </li>
  )
}
