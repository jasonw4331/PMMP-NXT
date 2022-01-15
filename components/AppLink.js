import Image from 'next/image'
import Link from 'next/link'
import missingImage from '../public/icons/missing.png'

const AppLink = ({ appName, redirectLink = '/', iconUrl = null }) => {
  iconUrl = iconUrl ?? missingImage
  return (
    <li className='text-center snap-end'>
      <Link href={redirectLink}>
        <a>
          <div>
            <Image
              src={iconUrl}
              height={64}
              width={64}
              alt={appName + ' icon'}
            />
          </div>
          <span className='w-16 text-white font-medium'>{appName}</span>
        </a>
      </Link>
    </li>
  )
}

export default AppLink
