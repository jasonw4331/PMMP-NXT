import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import getAbsoluteURL from '../lib/getAbsoluteURL'
import toast from 'react-hot-toast'
import PluginCard from '../components/PluginCard'
import ErrorCard from '../components/ErrorCard'
import Metatags from '../components/Metatags'

const Review = ({ data }) => {
  data = data.map(doc => (
    <PluginCard
      key={doc.id}
      name={doc.id}
      author={doc.author}
      tagline={doc.tagline}
      iconUrl={doc.iconUrl}
      downloadUrl={doc.downloadUrl}
    />
  ))

  return (
    <>
      <Metatags
        title='Home'
        tagline={'Currently showing ' + data.length + ' reviewed plugins'}
      />
      <ul className={'w-full flex flex-wrap justify-center lg:justify-start'}>
        {data}
      </ul>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  // Optionally, get other props.
  // You can return anything you'd normally return from
  // `getServerSideProps`, including redirects.
  // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
  const token = await AuthUser.getIdToken()
  const endpoint = getAbsoluteURL('/api/pendingPlugins?latestOnly=true', req)
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: token || 'unauthenticated',
    },
  })
  const data = await response.json()
  if (!response.ok) {
    toast.error(JSON.stringify(data))
    return {
      props: {
        data: [<ErrorCard key={0} />],
      },
    }
  }
  return {
    props: {
      data: data.docs,
    },
  }
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Review)
