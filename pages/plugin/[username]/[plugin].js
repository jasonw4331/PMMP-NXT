import {AuthAction, useAuthUser, withAuthUser, withAuthUserTokenSSR} from 'next-firebase-auth'
import Metatags from '../../../components/Metatags'
import getAbsoluteURL from '../../../lib/getAbsoluteURL'
import toast from 'react-hot-toast'
import {serialize} from 'next-mdx-remote/serialize'
import {MDXRemote} from 'next-mdx-remote'

const PluginData = ({data = [], markdown}) => {
  const AuthUser = useAuthUser()
  return (
    <main>
      <Metatags title={data[0].name}/>
      <article className="prose prose-zinc lg:prose-xl">
        <MDXRemote {...markdown} />
      </article>
    </main>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({AuthUser, req, query}) => {
  // Optionally, get other props.
  // You can return anything you'd normally return from
  // `getServerSideProps`, including redirects.
  // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
  const token = await AuthUser.getIdToken()
  const endpoint = getAbsoluteURL('/api/pluginData', req)
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token || 'unauthenticated',
    },
    body: JSON.stringify({
      latestOnly: true,
      name: query.plugin,
      author: query.username,
    })
  })
  const data = await response.json()
  if (data)
    console.log(data)
  if (!response.ok) {
    toast.error(JSON.stringify(data))
    return {
      props: {
        data: [
          {
            description: "Not OK"
          }
        ]
      }
    }
  }
  return {
    props: {
      data: data.docs,
      markdown: await serialize(data.docs[0].description)
    },
  }
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(PluginData)