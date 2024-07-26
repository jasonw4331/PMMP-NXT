import Link from 'next/link'
import { MdBookmarks, MdHistory, MdLibraryAdd } from 'react-icons/md'
import { auth } from '@/auth'

export default async function SignedInSidebarSegment() {
  const session = await auth()
  return session?.user ? (
    <>
      <li>
        <Link href={'/feed/following'} className={'pl-3'} prefetch={false}>
          <MdBookmarks size={24} />
          <span>Followed Authors</span>
        </Link>
      </li>
      <li className={'divider pl-0 h-1'} />
      <li>
        <Link href={'/feed/watching'} className={'pl-3'} prefetch={false}>
          <MdLibraryAdd size={24} />
          <span>Watching</span>
        </Link>
      </li>
      <li>
        <Link href={'/feed/history'} className={'pl-3'} prefetch={false}>
          <MdHistory size={24} />
          <span>History</span>
        </Link>
      </li>
    </>
  ) : null
}
