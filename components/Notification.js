import Image from 'next/image'
import Link from 'next/link'
import { msToTime } from '../lib/timeConverter'
import missingImage from '../public/icons/missing.png'

const Notification = ({
  name,
  version,
  timestamp = 0,
  redirectUrl,
  iconUrl = missingImage,
}) => {
  // TODO: limit name size
  // TODO: change name to changelog summary
  timestamp = timestamp < 1000 ? 'now' : msToTime(timestamp) + ' ago'
  return (
    <li className='snap-end'>
      <Link href={redirectUrl}>
        <a className='py-2 flex justify-between hover:bg-zinc-900/90'>
          <div className='ml-3'>
            <p className='max-w-[320px] break-all font-semibold text-white'>
              {name} v{version}
            </p>
            <p className='mt-1 text-zinc-400'>{'Updated ' + timestamp}</p>
          </div>
          <div className='mr-3'>
            <Image src={iconUrl} height={64} width={64} alt={name + ' icon'} />
          </div>
        </a>
      </Link>
    </li>
  )
}

export default Notification
