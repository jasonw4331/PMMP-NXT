import { AuthAction, withAuthUser } from 'next-firebase-auth'
import FirebaseAuth from '../components/FirebaseAuth'
import Metatags from '../components/Metatags'

const Auth = () => (
  <div className={'top-0'}>
    <Metatags title='Log In' />
    <center>
      <FirebaseAuth />
    </center>
  </div>
)

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth)
