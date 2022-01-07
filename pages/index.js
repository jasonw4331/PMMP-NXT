import {withAuthUser, withAuthUserTokenSSR,} from 'next-firebase-auth'
import Metatags from '../components/Metatags'
import getAbsoluteURL from '../lib/getAbsoluteURL'
import toast from 'react-hot-toast'
import PluginCard from '../components/PluginCard'
import ErrorCard from '../components/ErrorCard'
import {useContext} from "react";
import {SidebarContext} from "../lib/sidebarContext";

const Home = ({data = []}) => {
  const {sidebarOpen} = useContext(SidebarContext)

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
      <Metatags title='Home' tagline={'Currently showing ' + data.length + ' reviewed plugins'}/>
      <ul className={"flex flex-col"}>
        {data}
      </ul>
    </>
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
            <ErrorCard key={0}/>
          ]
        }
      }
    }
    return {
      props: {
        data: data.docs,
      },
    }
  }
)

export default withAuthUser()(Home)
