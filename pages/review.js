import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'
import Metatags from '../components/Metatags'
import getAbsoluteURL from '../lib/getAbsoluteURL'
import toast from "react-hot-toast";
import PluginCard from "../components/PluginCard";

const Review = ({ data }) => {
  const AuthUser = useAuthUser()
  return (
    <div>
      <Metatags title='Review Queue' tagline={'plugin review queue contains ' + 1 + ' plugins'} image='TODO: cog image' />
      {...data}
    </div>
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
  const endpoint = getAbsoluteURL('/api/pendingPlugins', req)
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token || 'unauthenticated',
    },
    body: JSON.stringify({
      latestOnly: true
    })
  })
  const data = await response.json()
  if (!response.ok) {
    toast.error(JSON.stringify(data))
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  return {
    props: {
      // eslint-disable-next-line react/jsx-key
      data: data.map(doc => <PluginCard name={doc.id.split('_v')[0]} author={doc.author} tagline={doc.tagline} iconUrl={doc.iconUrl} />),
    },
  }
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Review)
