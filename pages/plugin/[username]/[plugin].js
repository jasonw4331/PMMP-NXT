import { getFirebaseAdmin, withAuthUser } from 'next-firebase-auth'
import Metatags from '../../../components/Metatags'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { msToDate } from '../../../lib/timeConverter'
import Image from 'next/image'
import missingImage from '../../../public/icons/missing.png'
import { postToJSON } from '../../../lib/firebase/server/firestoreFuncs'

const PluginData = ({ data, description, changelog = null }) => {
  data = data ?? { id: null, tagline: '', imageUrl: null }
  return (
    <>
      <Metatags
        title={data.id.split('_v')[0]}
        tagline={data.tagline}
        image={data.imageUrl}
      />
      <div>
        <div>
          <h1>{data.id.split('_v')[0]}</h1>
          <p>{data.author}</p>
          <p>{msToDate(data.lastUpdated)}</p>
          <div>
            <button>Like</button>
            <button>Dislike</button>
            <div>Ratio bar</div>
            <button>Share</button>
            <button>Download</button>
            <button>Report</button>
          </div>
        </div>
        <div>separator</div>
        <div>
          <div>
            <Image src={missingImage} alt={'Author Image'} />
            <h6>Author</h6>
            <p>Followers</p>
            <button>Follow</button>
          </div>

          <article className={'prose prose-zinc lg:prose-xl'}>
            <MDXRemote {...description} />
          </article>
        </div>
        <div>separator</div>
        {changelog && (
          <>
            <article>
              <MDXRemote {...changelog} />
            </article>
            <div>separator</div>
          </>
        )}
        <div>
          <div>
            <h6>Comments</h6>
            <button>Sort By</button>
          </div>
          <div>
            <Image src={missingImage} alt='There was an error' />
            <textarea />
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
      data,
      description: await serialize(data.description),
      changelog: data.changelog ? await serialize(data.changelog) : null,
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
