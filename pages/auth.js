import { AuthAction, withAuthUser } from 'next-firebase-auth'
import FirebaseAuth from '../components/FirebaseAuth'
import Metatags from '../components/Metatags'

const Auth = () => (
  <>
    <Metatags title='Sign in' />
    <div className={'w-full flex flex-wrap justify-center lg:justify-start'}>
      <FirebaseAuth />
    </div>
  </>
)

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth)
