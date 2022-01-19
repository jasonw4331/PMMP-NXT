import { getFirebaseAdmin, withAuthUser } from 'next-firebase-auth'
import Metatags from '../../components/Metatags'
import {
  postToJSON,
  userToJSON,
} from '../../lib/firebase/server/firestoreFuncs'
import semver from 'semver'

const UserData = ({ data, plugins = [] }) => {
  return (
    <>
      <Metatags title={data.name} image={data.imageUrl} />
      <ul className={'flex flex-col'}>{plugins}</ul>
    </>
  )
}

export async function getStaticProps(context) {
  const { username } = context.params

  const userSnapshot = await getFirebaseAdmin()
    .firestore()
    .collection('users')
    .where('accessLevel', '>=', '1')
    .where('displayName', '==', username)
    .limit(1)
    .get()
  const userData = userToJSON(userSnapshot)
  if (userData.accessLevel < 1)
    return {
      notFound: true,
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every hour
      revalidate: 3600, // 1 hour in seconds
    }

  let found = []
  let last = null
  for (let i = 0; i < 3; i++) {
    const snapshot = await getFirebaseAdmin()
      .firestore()
      .collection(`users/${userSnapshot.docs[0].id}/plugins/`)
      .where('likes', '>', 0)
      .orderBy('likes', 'desc')
      .startAt(last)
      .limit(5)
      .get()
    last = snapshot
    let lastVersion = []
    if (snapshot.docs.length < 1) break
    snapshot.docs.forEach(doc => {
      const name = doc.id.split('_v')[0]
      const version = doc.id.split('_v')[1]
      if (
        semver.gt(version, lastVersion[name] ?? '0.0.0', {
          includePrerelease: true,
        })
      ) {
        lastVersion[name] = version
      }
    })
    snapshot.docs.forEach(doc => {
      lastVersion.forEach((version, name) => {
        if (doc.id === `${name}_v${version}`) {
          found.push(postToJSON(doc))
          // TODO: filter out versions higher than in found list
        }
      })
    })
    if (snapshot.docs.length < 5) break
  }
  return {
    props: {
      userData,
      plugins: found,
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
  const snapshot = await getFirebaseAdmin()
    .firestore()
    .collection('users')
    .where('accessLevel', '>=', '1')
    .orderBy('accessLevel', 'asc')
    .get()
  // Get the paths we want to pre-render based on released plugins
  const paths = snapshot.docs.map(async doc => ({
    params: { username: (await doc.data()).displayName },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default withAuthUser()(UserData)
