import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import Metatags from '../components/Metatags'
import getAbsoluteURL from "../lib/getAbsoluteURL";
import toast from "react-hot-toast";
import PluginCard from "../components/PluginCard";
import ErrorCard from "../components/ErrorCard";

const Home = ({ data = [] }) => {
  const AuthUser = useAuthUser()
  return (
    <div>
      <Metatags title='Home' tagline={'Currently showing '+data.length+' reviewed plugins'} image='' />
      {data}
    </div>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req }) => {
    const token = await AuthUser.getIdToken()
    const endpoint = getAbsoluteURL('/api/releases', req)
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
        props: {
          data: [
            // eslint-disable-next-line react/jsx-key
            <ErrorCard />
          ]
        }
      }
    }
    return {
      props: {
        // eslint-disable-next-line react/jsx-key
        data: data.map(doc => <PluginCard name={doc.id.split('_v')[0]} author={doc.author} tagline={doc.tagline} iconUrl={doc.iconUrl} />),
      },
    }
  }
)

export default withAuthUser()(Home)
