import Image from "next/image";
import Link from "next/link";
import missingIcon from '../public/icons/missing.png'

const ErrorCard = () => {
  return (
    <li
      className="h-[382px] w-[281px] p-2 flex flex-col justify-between items-center bg-zinc-800 bg-cover text-white rounded-lg mb-10 mr-5 last:mr-0">
      <h1 className="w-full px-4 mb-2 font-roboto truncate text-lg">There was an error</h1>
      <h2 className="w-full px-5 mb-2 text-zinc-400 font-roboto truncate text-sm">Error</h2>
      <div className="w-[208px] h-[208px] mb-2">
        <Image src={missingIcon} alt='Plugin Icon' width={208} height={208}/>
      </div>
      <p className="w-5/6 h-[48px] break-words text-clip overflow-hidden">Error</p>
      <div className="h-9 flex justify-center gap-2">
        <button className="text-purple-400 p-2 font-roboto uppercase">
          <Link href="/">
            <a>
              More Details
            </a>
          </Link>
        </button>
        <button className="text-purple-400 p-2 font-roboto uppercase ">
          <Link href="/">
            <a>
              Download
            </a>
          </Link>
        </button>
      </div>
    </li>
  )
}

export default ErrorCard