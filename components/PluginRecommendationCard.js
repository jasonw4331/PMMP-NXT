import Image from 'next/image'
import Link from 'next/link'
import missingImage from '../public/icons/missing.png'

const PluginRecommendationCard = ({
  name,
  author,
  downloads,
  redirectUrl = '/404',
  iconUrl = missingImage,
}) => {
  return (
    <li className={'flex mt-2 max-h-24'}>
      <Link href={redirectUrl}>
        <a>
          <div className={'flex'}>
            <div className={'basis-auto mr-2 aspect-video'}>
              <Image
                src={iconUrl}
                width={168}
                height={94}
                alt={"Recommended Plugin's Icon"}
              />
            </div>
            <div className={''}>
              <div>
                <h3 className={'font-semibold line-clamp-2'}>{name}</h3>
                <h4 className={'text-xs font-extralight'}>{author}</h4>
                <p className={'text-xs font-extralight'}>
                  {downloads} downloads
                </p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default PluginRecommendationCard
