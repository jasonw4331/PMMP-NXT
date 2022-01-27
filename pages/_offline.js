import { withAuthUser } from 'next-firebase-auth'
import Metatags from '../components/Metatags'

const Offline = () => {
  return (
    <>
      <Metatags title='You are Offline' />
      <ul className={'w-full flex flex-wrap justify-center lg:justify-start'}>
        <li />
      </ul>
    </>
  )
}

export default withAuthUser()(Offline)
