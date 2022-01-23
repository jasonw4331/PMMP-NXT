import Image from 'next/image'
import Link from 'next/link'
import { msToTime } from '../lib/timeConverter'

const Notification = ({
  title,
  timestamp = 0,
  redirectUrl,
  iconUrl = null,
}) => {
  // TODO: limit name size
  // TODO: change name to changelog summary
  // TODO: mark as seen on hover / click / focus
  timestamp = timestamp < 1000 ? 'now' : msToTime(timestamp) + ' ago'
  return (
    <li className={'snap-end'}>
      <Link href={redirectUrl}>
        <a className={'py-2 flex justify-between hover:bg-zinc-900/95'}>
          <div className={'ml-3'}>
            <p className={'max-w-[320px] break-all font-semibold text-white'}>
              {title}
            </p>
            <p className={'mt-1 text-zinc-400'}>Updated {timestamp}</p>
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
