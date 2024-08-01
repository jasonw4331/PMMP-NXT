'use client'
import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'

export default function FirstTimeModal() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(
    JSON.parse(localStorage.getItem('isFirstTimeUser') ?? JSON.stringify(true))
  )
  useEffect(() => {
    // save the first time check to localStorage so we can retain it across page loads
    localStorage.setItem('isFirstTimeUser', JSON.stringify(isFirstTimeUser))
    // show the modal if it's the first time the user is visiting the site
    if (isFirstTimeUser) {
      const element = document.getElementById(
        'FirstTimeModal'
      ) as HTMLDialogElement
      element.showModal()
      setIsFirstTimeUser(false)
    }
  }, [isFirstTimeUser])

  return (
    <dialog id='FirstTimeModal' className='modal modal-bottom sm:modal-middle'>
      <div className='modal-box'>
        <h3 className='text-5xl font-bold'>Hello there</h3>
        <p className='py-6'>
          Sign in to like plugins, leave comments, and follow authors!
        </p>
        <div className='modal-action'>
          <form method='dialog'>
            {/* any button will close the modal */}
            <button className='btn btn-primary' onClick={() => signIn()}>
              Create an Account
            </button>
          </form>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </div>
    </dialog>
  )
}
