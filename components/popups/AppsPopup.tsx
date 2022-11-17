import Link from 'next/link'
import {
  CgWebsite,
  FaGithub,
  IoLogoDiscord,
  IoMdGitPullRequest,
  MdOutlineForum,
  TiDocumentText,
} from 'react-icons/all'

export default function AppsPopup() {
  return (
    <ul
      tabIndex={0}
      className='menu menu-horizontal dropdown-content mt-16 p-2 gap-2 shadow bg-base-100 rounded-box w-screen max-w-xs'>
      <li>
        <Link href={'https://pmmp.io/'} className={'flex flex-col'}>
          <IoMdGitPullRequest size={64} />
          PMMP
        </Link>
      </li>
      <li>
        <Link href={'https://forums.pmmp.io/'} className={'flex flex-col'}>
          <MdOutlineForum size={64} />
          Forums
        </Link>
      </li>
      <li>
        <Link
          href={'https://github.com/pmmp/PocketMine-MP'}
          className={'flex flex-col'}>
          <FaGithub size={64} />
          Github
        </Link>
      </li>
      <li>
        <Link
          href={'https://pmmp.readthedocs.org/'}
          className={'flex flex-col'}>
          <TiDocumentText size={64} />
          Docs
        </Link>
      </li>
      <li>
        <Link href={'https://poggit.pmmp.io/'} className={'flex flex-col'}>
          <CgWebsite size={64} />
          Poggit
        </Link>
      </li>
      <li>
        <Link
          href={'https://discord.gg/WhbenPxsx9'}
          className={'flex flex-col'}>
          <IoLogoDiscord size={64} />
          Discord
        </Link>
      </li>
    </ul>
  )
}
