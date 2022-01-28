import { getFirebaseAdmin, withAuthUser } from 'next-firebase-auth'
import Metatags from '../../components/Metatags'
import {
  postToJSON,
  userToJSON,
} from '../../lib/firebase/server/firestoreFuncs'
import PluginCard from '../../components/PluginCard'

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
      <ul className={'flex flex-col'}>{releasedPlugins}</ul>
    </>
  )
}

export async function getStaticProps(context) {
  const { username } = context.params
  try {
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

    const userData = userToJSON(userSnapshot.docs[0])

    const snapshot = await getFirebaseAdmin()
      .firestore()
      .collection(`users/${userData.id}/plugins/`)
      .where('id', 'in', userData.recentReleases)
      .orderBy('likes', 'desc')
      .limit(5) // TODO: increase if necessary
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
      .where('plugins', '>=', '1')
      .get()
    // Get the paths we want to pre-render based on released plugins
    paths = snapshot.docs.map(async doc => ({
      params: { username: (await doc.data()).displayName },
    }))
  } catch (e) {
    console.log(e)
  }

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default withAuthUser()(UserData)
