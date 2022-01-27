import { withAuthUser } from 'next-firebase-auth'
import Metatags from '../components/Metatags'

const Help = () => {
  return (
    <>
      <Metatags title='Help' />
      <ul className={'w-full flex flex-wrap justify-center lg:justify-start'}>
        <li />
      </ul>
    </>
  )
}

export default withAuthUser()(Help)
