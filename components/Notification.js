import Image from 'next/image'
import Link from 'next/link'
import { msToTime } from '../lib/timeConverter'

const Notification = ({
  title,
  timestamp = null,
  redirectUrl = '/',
  iconUrl = null,
}) => {
  // TODO: limit title length
  // TODO: mark as seen on hover / click / focus
  if (timestamp !== null)
    timestamp =
      timestamp < 1000
        ? 'now'
        : msToTime(new Date().getUTCMilliseconds() - timestamp) + ' ago'
  return (
    <li className={'snap-end hover:bg-black/5'}>
      <Link href={redirectUrl}>
        <a
          className={
            'py-2 px-4 flex justify-between text-sm text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:text-zinc-200 dark:hover:text-white'
          }>
          <div>
            <p className={'break-all font-semibold dark:text-white'}>{title}</p>
            {timestamp !== null && (
              <p className={'mt-1 text-zinc-500 dark:text-zinc-400'}>
                Updated {timestamp}
              </p>
            )}
          </div>
          <div className={'w-16 h-16 mr-3'}>
            {iconUrl && (
              <Image
                src={iconUrl}
                height={64}
                width={64}
                alt={title + ' icon'}
              />
            )}
          </div>
        </a>
      </Link>
    </li>
  )
}

export default Notification
