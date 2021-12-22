import Image from 'next/image'
import Link from "next/link";

const AppLink = ({ appName, redirectLink = "/", iconUrl = '/icons/missing.png' }) => {
  return (
    <li className="text-center snap-end">
      <Link href={redirectLink}>
        <a>
          <div>
            <Image src={iconUrl} height={64} width={64} alt={appName + " icon"}/>
          </div>
          <span className="w-16 text-white font-medium">{appName}</span>
        </a>
      </Link>
    </li>
  )
}

export default AppLink