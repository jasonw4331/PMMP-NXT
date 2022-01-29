import { AuthAction, withAuthUser } from 'next-firebase-auth'
import Metatags from '../../components/Metatags'

const AccountSettings = () => {
  return (
    <>
      <Metatags title='Settings' />
      <ul className={'w-full flex flex-wrap justify-center lg:justify-start'}>
        <li />
      </ul>
    </>
  )
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(AccountSettings)
