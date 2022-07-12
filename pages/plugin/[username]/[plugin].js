import { getFirebaseAdmin, withAuthUser } from 'next-firebase-auth'
import Metatags from '../../../components/Metatags'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'
import missingImage from '../../../public/icons/missing.png'
import { postToJSON } from '../../../lib/firebase/server/firestoreFuncs'
import Link from 'next/link'
import {
  BookmarkAddOutlined,
  DownloadOutlined,
  ShareOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from '@mui/icons-material'
import PluginRecommendationCard from '../../../components/PluginRecommendationCard'

const PluginData = ({
  id,
  tagline,
  imageUrl,
  thumbnail,
  downloads,
  lastUpdated,
  description,
  changelog,
  authorLink,
  author,
  authorFollows,
  likes,
  dislikes,
  recommendations,
}) => {
  recommendations = recommendations.map(recommendation => {
    // eslint-disable-next-line react/jsx-key
    return <PluginRecommendationCard {...recommendation} />
  })
  return (
    <>
      <Metatags title={id.split('_v')[0]} tagline={tagline} image={imageUrl} />
      <div className={'flex justify-around max-w-[1754px] bg-zinc-800'}>
        <div
          id={'primary'}
          className={
            'flex-grow flex-shrink max-w-[1274.67px] min-w-[640px] p-3'
          }>
          <div id={'primary-inner'} className={''}>
            {thumbnail && (
              <div id={'thumbnail'}>
                <Image src={missingImage} alt={'Plugin Thumbnail'} />
              </div>
            )}
            <div id={'active-metadata'} className={''}>
              <div
                id={'info'}
                className={
                  (thumbnail ? 'pt-10 ' : '') +
                  'pb-4 border-b-2 border-zinc-600'
                }>
                <h1 className={'font-roboto text-lg font-normal break-words'}>
                  {id.split('_v')[0]}
                </h1>
                <h2 className={'font-roboto text-base font-normal break-words'}>
                  {tagline}
                </h2>
                <div
                  id={'subinfo'}
                  className={'flex items-center justify-between'}>
                  <div
                    id={'subinfo-text'}
                    className={
                      'max-h-5 overflow-hidden font-roboto font-normal text-sm text-zinc-500 display-webkit-box'
                    }>
                    <div id={'count'} className={'inline-block'}>
                      <span className={'inline'}>{downloads} downloads</span>
                    </div>
                    <div id={'date'} className={'inline-block'}>
                      <span className='mx-2 inline'>&bull;</span>
                      <time
                        className={'inline'}
                        dateTime={new Date(lastUpdated).toUTCString()}>
                        {new Intl.DateTimeFormat('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        }).format(lastUpdated)}
                      </time>
                    </div>
                  </div>
                  <div id={'subinfo-buttons'} className={'-mt-0.5 flex gap-2'}>
                    <button>
                      <ThumbUpOutlined />
                      <span
                        className={
                          'font-roboto text-base font-normal capitalize'
                        }
                        aria-label={likes + ' likes'}>
                        {likes}
                      </span>
                    </button>
                    <button>
                      <ThumbDownOutlined />
                      <span
                        className={
                          'font-roboto text-base font-normal capitalize'
                        }
                        aria-label={dislikes + ' dislikes'}>
                        {dislikes}
                      </span>
                    </button>
                    <button>
                      <ShareOutlined />
                      <span
                        className={
                          ' font-roboto text-base font-normal capitalize'
                        }>
                        SHARE
                      </span>
                    </button>
                    <button>
                      <DownloadOutlined />
                      <span
                        className={
                          ' font-roboto text-base font-normal capitalize'
                        }>
                        DOWNLOAD
                      </span>
                    </button>
                    <button>
                      <BookmarkAddOutlined />
                      <span
                        className={
                          ' font-roboto text-base font-normal capitalize'
                        }>
                        SAVE
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div
                id={'meta'}
                className={'mb-6 pb-4 border-b-2 border-zinc-600'}>
                <div
                  id={'top-row'}
                  className={'flex flex-grow flex-shrink mb-6 pt-4'}>
                  <div className={'basis-full flex'}>
                    <Link
                      id={'author-image'}
                      className={'rounded-full'}
                      href={authorLink}>
                      <a>
                        <Image
                          src={imageUrl ?? missingImage}
                          width={48}
                          height={48}
                          alt={'Author Profile Image'}
                          className={'rounded-full'}
                        />
                      </a>
                    </Link>
                    <div id={'upload-info'} className={'ml-4'}>
                      <Link id={'author-name'} href={authorLink}>
                        {author}
                      </Link>
                      <h4 id={'author-followers'} className={'mr-2'}>
                        {authorFollows} Followers
                      </h4>
                    </div>
                  </div>
                  <button
                    id={'follow-btn'}
                    className={
                      'rounded bg-zinc-500 text-white font-roboto text-sm font-normal capitalize px-4 py-2.5 max-h-9'
                    }>
                    FOLLOW
                  </button>
                </div>
              </div>
            </div>
            <div id={'comments'} className={''}></div>
          </div>
        </div>
        <div id={'secondary'} className={'min-w-[300px] p-3'}>
          <div id={'secondary-inner'} className={''}>
            <ul id={'panels'}></ul>
            <ul id={'related'} className={'flex flex-col'}>
              {recommendations}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps(context) {
  const { username, plugin } = context.params
  const userSnapshot = await getFirebaseAdmin()
    .firestore()
    .collection('users')
    .where('displayName', '==', username)
    .limit(1)
    .get()
  if (userSnapshot.docs.length < 1)
    return {
      notFound: true,
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every hour
      revalidate: 3600, // 1 hour in seconds
    }
  const snapshot = await getFirebaseAdmin()
    .firestore()
    .doc(`users/${userSnapshot.docs[0].id}/plugins/${plugin}`)
    .get()
  const data = postToJSON(snapshot)
  if (data === undefined)
    return {
      notFound: true,
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every hour
      revalidate: 3600, // 1 hour in seconds
    }
  return {
    props: {
      author: 'Author name',
      authorLink: '/',
      authorFollows: 0,
      license: 'No License',
      minAPI: '4.0.0',
      tagline: '',
      downloads: 0,
      lastUpdated: 'now',
      ...data,
      likes: data.likes.length,
      dislikes: data.dislikes.length,
      description: await serialize(data.description),
      changelog: data.changelog ? await serialize(data.changelog) : null,
      recommendations: [
        {
          key: 0,
          name: 'NativeDimensions',
          author: 'Jason Wynn',
          downloads: 0,
        },
        {
          key: 1,
          name: 'NativeDimensions',
          author: 'Jason Wynn',
          downloads: 0,
        },
        {
          key: 2,
          name: 'NativeDimensions',
          author: 'Jason Wynn',
          downloads: 0,
        },
        {
          key: 3,
          name: 'NativeDimensions',
          author: 'Jason Wynn',
          downloads: 0,
        },
        {
          key: 4,
          name: 'NativeDimensions',
          author: 'Jason Wynn',
          downloads: 0,
        },
        {
          key: 5,
          name: 'NativeDimensions',
          author: 'Jason Wynn',
          downloads: 0,
        },
        {
          key: 6,
          name: 'NativeDimensions',
          author: 'Jason Wynn',
          downloads: 0,
        },
        {
          key: 7,
          name: 'NativeDimensions',
          author: 'Jason Wynn',
          downloads: 0,
        },
        {
          key: 8,
          name: 'NativeDimensions',
          author: 'Jason Wynn',
          downloads: 0,
        },
        {
          key: 9,
          name: 'NativeDimensions',
          author: 'Jason Wynn',
          downloads: 0,
        },
      ],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every day
    revalidate: 86400, // 1 day in seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const paths = []
  try {
    const snapshot = await getFirebaseAdmin()
      .firestore()
      .collectionGroup('plugins')
      .where('releaseStatus', '==', 2)
      .orderBy('createdAt', 'asc')
      .get()
    for (const doc of snapshot.docs) {
      const userDoc = await doc.ref.parent.parent.get()
      const recentPlugins = userDoc.get('recentReleases')
      if (!doc.id in recentPlugins) continue
      const data = postToJSON(doc)
      paths.push(data)
    }
  } catch (e) {
    console.log(e)
  }

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return {
    paths: paths.map(doc => ({
      params: { username: doc.author, plugin: doc.id },
    })),
    fallback: 'blocking',
  }
}

export default withAuthUser()(PluginData)
