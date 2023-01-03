'use client'
import Link from 'next/link'
import { FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa'
import {
  signInWithGithub,
  signInWithGoogle,
  signInWithTwitter,
} from '../../lib/client/ClientFirebase'
import { doc, getFirestore, writeBatch } from 'firebase/firestore'
import * as z from 'zod'
import {
  createTsForm,
  createUniqueFieldSchema,
  useDescription,
} from '@ts-react/form'
import { useSession } from 'next-auth/react'

function TextField({
  type,
  required,
  pattern,
}: {
  type: string
  required: boolean
  pattern: string
}) {
  const { label, placeholder } = useDescription()
  return (
    <div>
      <input
        id={type}
        name={type}
        type={type}
        required={required}
        placeholder={placeholder}
        className='input input-bordered input-invalid w-full'
        pattern={pattern}
        title={label}
      />
      <label className='label hidden input-invalid' htmlFor={type}>
        <span className='label-text-alt'>{label}</span>
      </label>
    </div>
  )
}

const username = createUniqueFieldSchema(z.string(), 'username')
const email = createUniqueFieldSchema(z.string(), 'email')
const password = createUniqueFieldSchema(z.string(), 'password')

const mapping = [
  [username, TextField] as const,
  [email, TextField] as const,
  [password, TextField] as const,
] as const

const SignInForm = createTsForm(mapping)

const SignInSchema = z.object({
  username: z.string().min(3).max(20, 'Username is too long'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long.')
    .regex(
      /(?=.*\d)(?=.*[\p{Symbol}\p{Punctuation}]+)(?![.\n\r\t\s\b\p{Other}])(?=.*[A-Z])(?=.*[a-z]).*/u,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    ),
})

export default function SignInComponent() {
  const { data: userData, status } = useSession()
  async function onSubmit(data: z.infer<typeof SignInSchema>) {
    // Create refs for both documents if uid is valid
    if (userData?.user) {
      const batch = writeBatch(getFirestore())

      const userDoc = doc(getFirestore(), 'users', user?.uid)
      batch.set(userDoc, {
        username: data.username,
        photoURL: userData.user.image,
        displayName: userData.user.name,
      })

      const usernameDoc = doc(getFirestore(), 'usernames', data.username)
      batch.set(usernameDoc, { uid: user?.uid })

      await batch.commit()
    }
  }

  return (
    <section className={'flex justify-center'}>
      <SignInForm
        schema={SignInSchema}
        onSubmit={onSubmit}
        formProps={{
          className:
            'form-control w-full max-w-xs lg:max-w-lg text-center gap-y-3',
        }}
        renderBefore={() => (
          <>
            <Link
              href={'/'}
              className={'font-extrabold text-9xl uppercase shrink'}>
              NXT
            </Link>
            <p className={'line-clamp-2'}>
              The next generation of PocketMine-MP plugin distribution
            </p>
          </>
        )}
        renderAfter={() => (
          <>
            <div className={'flex justify-between items-center'}>
              <label className={'label cursor-pointer'}>
                <span className='label-text'>Remember me</span>
                <input
                  type='checkbox'
                  className='checkbox checkbox-primary ml-3'
                />
              </label>
              <Link href='#' className='link link-accent'>
                Forgot password?
              </Link>
            </div>

            <div className={'flex justify-around'}>
              <button
                type='submit'
                name='SignUp'
                value={'SignUp'}
                className='btn btn-primary w-1/3'>
                Sign Up
              </button>
              <button
                type='submit'
                name='LogIn'
                value={'LogIn'}
                className='btn btn-secondary w-1/3'>
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
          </>
        )}
        props={{
          username: {
            type: 'username',
            required: true,
            pattern: '[a-zA-Z0-9_]{3,20}',
          },
          email: {
            type: 'email',
            required: false,
            pattern:
              '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
          },
          password: {
            type: 'password',
            required: false,
            pattern:
              '(?=.*\\d)(?=.*[\\p{Symbol}\\p{Punctuation}]+)(?![.\\n\\r\\t\\s\\b\\p{Other}])(?=.*[A-Z])(?=.*[a-z]).*',
          },
        }}
      />
    </section>
  )
}
