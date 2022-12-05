import 'client-only'
import { doc, getFirestore, onSnapshot } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './ClientFirebase'
import { UserContextType } from './UserContext'

// Custom hook to read  auth record and user profile doc
export function useUserData(): UserContextType {
  const [user = null] = useAuthState(auth)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe

    if (user) {
      // const ref = firestore.collection('users').doc(user.uid);
      const ref = doc(getFirestore(), 'users', user.uid)
      unsubscribe = onSnapshot(ref, doc => {
        setUsername(doc.data()?.username)
      })
    } else {
      setUsername(null)
    }

    return unsubscribe
  }, [user])

  return { user, username }
}
