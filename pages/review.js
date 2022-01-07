import {AuthAction, useAuthUser, withAuthUser, withAuthUserTokenSSR,} from 'next-firebase-auth'
import getAbsoluteURL from '../lib/getAbsoluteURL'
import toast from 'react-hot-toast'
import PluginCard from '../components/PluginCard'
import Navbar from "../components/Navbar";
import {useState} from "react";

const Review = ({data}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const AuthUser = useAuthUser()

  data = data.map(doc => (
    <PluginCard key={doc.id} name={doc.id.split('_v')[0]} author={doc.author} tagline={doc.tagline}
                iconUrl={doc.iconUrl} downloadUrl={doc.downloadUrl}/>))

  let remapped = []

  let divider = 6
  if (sidebarOpen)
    divider = 5

  for (let i = 0, j = 0; i <= data.length / divider; i++, j += divider) {
    if (remapped[i] === undefined)
      remapped[i] = []
    remapped[i].push(data.slice(j, j + divider))
  }

  data = remapped.map((arr, index) => {
    return (<div key={index} className="flex w-full">
      {arr}
    </div>)
  })

  return (
    <>
      <Navbar AuthUser={AuthUser} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <main
        className={"absolute top-14 max-h-[94vh] right-0 overflow-x-hidden overflow-y-auto overscroll-contain pt-2 pr-2"}>
        <ul className={"flex flex-col"}>
          {data}
        </ul>
      </main>
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
      data: data.docs,
    },
  }
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Review)
