'use client'
import Link from 'next/link'
import { FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import {
  auth,
  signInWithGithub,
  signInWithGoogle,
  signInWithTwitter,
} from '../../lib/ClientFirebase'
import { useContext, useState } from 'react'
import { doc, getFirestore, writeBatch } from '@firebase/firestore'
import { UserContext } from '../../lib/UserContext'

export default function SignInComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const { user, username } = useContext(UserContext)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Create refs for both documents if uid is valid
    if (user?.uid) {
      const batch = writeBatch(getFirestore())

      const userDoc = doc(getFirestore(), 'users', user?.uid)
      batch.set(userDoc, {
        username: formValue,
        photoURL: user?.photoURL,
        displayName: user?.displayName,
      })

      const usernameDoc = doc(getFirestore(), 'usernames', formValue)
      batch.set(usernameDoc, { uid: user?.uid })

      await batch.commit()
    }
  }

  return (
    <section className={'flex justify-center'}>
      <form
        onSubmit={onSubmit}
        className={
          'form-control w-full max-w-xs lg:max-w-lg text-center gap-y-3'
        }>
        <Link href={'/'} className={'font-extrabold text-9xl uppercase shrink'}>
          NXT
        </Link>
        <p className={'line-clamp-2'}>
          The next generation of PocketMine-MP plugin distribution
        </p>
        <div>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Email Address'
            className='input input-bordered input-invalid w-full'
            pattern='^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            title='Please enter a valid email address'
          />
          <label className='label hidden input-invalid' htmlFor='email'>
            <span className='label-text-alt'>
              Please enter a valid email address
            </span>
          </label>
        </div>
        <div>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Password'
            className='input input-bordered input-invalid w-full'
            pattern='(?=^.{6,}$)(?=.*\d)(?=.*[\p{Symbol}\p{Punctuation}]+)(?![.\n\r\t\s\b\p{Other}])(?=.*[A-Z])(?=.*[a-z]).*$'
            title='Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
          />
          <label className='label hidden input-invalid' htmlFor='password'>
            <span className='label-text-alt'>
              Password must be: &ge; 6 characters long, &ge; 1 uppercase letter,
              1 lowercase letter, 1 number, and 1 special character.
            </span>
          </label>
        </div>

        <div className={'flex justify-between items-center'}>
          <label className={'label cursor-pointer'}>
            <span className='label-text'>Remember me</span>
            <input type='checkbox' className='checkbox checkbox-primary ml-3' />
          </label>
          <Link href='#!' className='link link-accent'>
            Forgot password?
          </Link>
        </div>

        <div className={'flex justify-around'}>
          <button
            onMouseUp={async () => {
              const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
              )
            }}
            type='submit'
            className='btn btn-primary w-1/3'>
            Sign Up
          </button>
          <button type='submit' className='btn btn-secondary w-1/3'>
            Log in
          </button>
        </div>

        <div className={'divider uppercase'}>or</div>

        <div className='flex gap-x-3 w-full justify-around'>
          <button
            onMouseUp={signInWithTwitter}
            className={'btn btn-square btn-info grow'}>
            <FaTwitter size={32} />
          </button>
          <button
            onMouseUp={signInWithGoogle}
            className={'btn btn-square btn-error grow'}>
            <FaGoogle size={32} />
          </button>
          <button
            onMouseUp={signInWithGithub}
            className={'btn btn-square btn-neural grow'}>
            <FaGithub size={32} />
          </button>
        </div>
      </form>
    </section>
  )
}
