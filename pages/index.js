import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'
import Metatags from '../components/Metatags'
import getAbsoluteURL from '../lib/getAbsoluteURL'
import PluginCard from '../components/PluginCard'
import ErrorCard from '../components/ErrorCard'

const Home = ({ data = [] }) => {
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

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req }) => {
    const token = await AuthUser.getIdToken()
    const endpoint = getAbsoluteURL('/api/releases?readOnly=true', req)
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: token || 'unauthenticated',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      return {
        props: {
          data: [],
        },
      }
    }
    return {
      props: {
        data: data,
      },
    }
  }
)

export default withAuthUser()(Home)
