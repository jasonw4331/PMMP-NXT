import Image from 'next/image'
import Link from 'next/link'
import missingImage from '../public/icons/missing.png'

const PluginCard = ({name, author, tagline, downloadUrl = "/404", iconUrl = missingImage}) => {
  return (
    <li
      className="h-[382px] w-[281px] p-2 flex flex-col justify-between items-center bg-zinc-800 bg-cover text-white rounded-lg mb-10 mr-5 last:mr-0">
      <h1 className="w-full px-4 mb-2 font-roboto truncate text-lg">{name.split('_v')[0]}</h1>
      <h2 className="w-full px-5 mb-2 text-zinc-400 font-roboto truncate text-sm">{author}</h2>
      <div className="w-[208px] h-[208px] mb-2">
        <Image src={iconUrl} alt='Plugin Icon' width={208} height={208}/>
      </div>
      <p className="w-5/6 h-[48px] break-words text-clip overflow-hidden">{tagline}</p>
      <div className="h-9 flex justify-center gap-2">
        <button className="text-purple-400 p-2 font-roboto uppercase">
          <Link href={"/plugin/" + encodeURI(author) + "/" + encodeURI(name)}>
            <a>
              More Details
            </a>
          </Link>
        </button>
        <button className="text-purple-400 p-2 font-roboto uppercase ">
          <Link href={downloadUrl}>
            <a>
              Download
            </a>
          </Link>
        </button>
      </div>
    </li>
  )
}

export default PluginCard