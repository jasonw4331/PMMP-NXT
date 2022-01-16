import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'
import Metatags from '../../components/Metatags'
import getAbsoluteURL from '../../lib/getAbsoluteURL'
import toast from 'react-hot-toast'

const UserData = ({ data, plugins = [] }) => {
  return (
    <>
      <Metatags title={data.name} image={data.imageUrl} />
      <ul className={'flex flex-col'}>{plugins}</ul>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req, query }) => {
    // Optionally, get other props.
    // You can return anything you'd normally return from
    // `getServerSideProps`, including redirects.
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    const token = await AuthUser.getIdToken()
    const endpoint = getAbsoluteURL(
      '/api/userData?name=' + encodeURI(query.username),
      req
    )
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
          data: [
            {
              description: 'Not OK',
            },
          ],
          plugins: [],
        },
      }
    }
    return {
      props: {
        data: [],
        plugins: data.docs,
      },
    }
  }
)

export default withAuthUser()(UserData)
