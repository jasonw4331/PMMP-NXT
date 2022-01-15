import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import FirebaseAuth from '../components/FirebaseAuth'
import Metatags from '../components/Metatags'

const Auth = () => (
  <div className='top-0'>
    <Metatags title='Log In' />
    <FirebaseAuth />
  </div>
)

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})()

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Auth)
