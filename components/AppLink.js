import Image from 'next/image'
import Link from 'next/link'
import missingImage from '../public/icons/missing.png'

const AppLink = ({ appName, redirectLink = '/', iconUrl = null }) => {
  iconUrl = iconUrl ?? missingImage
  return (
    <li className={'hover:bg-black/5'}>
      <Link href={redirectLink}>
        <a
          className={
            'py-2 px-4 flex flex-col rounded-2xl text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:text-zinc-200 dark:hover:text-white'
          }>
          <Image src={iconUrl} height={64} width={64} alt={appName + ' icon'} />
          <center className={'break-all font-semibold dark:text-white'}>
            {appName}
          </center>
        </a>
      </Link>
    </li>
  )
}

export default AppLink
