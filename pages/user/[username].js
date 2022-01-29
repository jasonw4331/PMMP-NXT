import { getFirebaseAdmin, withAuthUser } from 'next-firebase-auth'
import Metatags from '../../components/Metatags'
import {
  postToJSON,
  userToJSON,
} from '../../lib/firebase/server/firestoreFuncs'
import PluginCard from '../../components/PluginCard'
import { FieldPath } from '@google-cloud/firestore'

const UserData = ({ userData, releasedPlugins = [] }) => {
  releasedPlugins = releasedPlugins.map(plugin => (
    <PluginCard
      key={plugin.id}
      name={plugin.id}
      author={plugin.author}
      tagline={plugin.tagline}
      iconUrl={plugin.iconUrl}
      downloadUrl={plugin.downloadUrl}
    />
  ))
  return (
    <>
      <Metatags title={userData.displayName} image={userData.photoURL} />
      <ul className={'flex'}>{releasedPlugins}</ul>
    </>
  )
}

export async function getStaticProps(context) {
  const { username } = context.params
  try {
    const userSnapshot = await getFirebaseAdmin()
      .firestore()
      .collection('users')
      .where('type', 'in', ['developer', 'reviewer', 'admin'])
      .where('displayName', '==', username)
      .limit(1)
      .get()
    if (
      userSnapshot.docs.length < 1 ||
      userSnapshot.docs[0].data().recentReleases.length < 1
    )
      return {
        notFound: true,
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every hour
        revalidate: 3600, // 1 hour in seconds
      }

    const userData = userToJSON(userSnapshot.docs[0])

    const snapshot = await getFirebaseAdmin()
      .firestore()
      .collection(`users/${userData.id}/plugins/`)
      .where(FieldPath.documentId(), 'in', userData.recentReleases)
      .limit(5)
      .get()
    const releasedPlugins = snapshot.docs
      .sort(
        (
          { likes: likesA, dislikes: dislikesA },
          { likes: likesB, dislikes: dislikesB }
        ) => likesA - dislikesA - (likesB - dislikesB)
      )
      .map(doc => postToJSON(doc))
    return {
      props: {
        userData,
        releasedPlugins,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every day
      revalidate: 86400, // 1 day in seconds
    }
  } catch (e) {
    console.log(e)
  }
  return {
    notFound: true,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every day
    revalidate: 3600, // 1 hour in seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  let paths = []
  try {
    const snapshot = await getFirebaseAdmin()
      .firestore()
      .collection('users')
      .where('recentReleases', '>=', 1)
      .get()
    for (const doc of snapshot.docs) {
      const username = doc.data().displayName
      paths.push({ params: { username } })
    }
  } catch (e) {
    console.log(e)
  }

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default withAuthUser()(UserData)
