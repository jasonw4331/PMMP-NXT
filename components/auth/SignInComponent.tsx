'use client'
import Link from 'next/link'
import { FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa'

export default function SignInComponent() {
  return (
    <section className={'flex justify-center'}>
      <form
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
            type='email'
            placeholder='Email Address'
            className='input input-bordered input-invalid w-full'
            pattern='^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            title='Please enter a valid email address'
          />
          <label className='label hidden input-invalid' htmlFor='email'>
            <span className='label-text-alt text-left'>
              Please enter a valid email address
            </span>
          </label>
        </div>
        <div>
          <input
            id='password'
            type='password'
            placeholder='Password'
            className='input input-bordered input-invalid w-full'
            pattern='(?=^.{6,}$)(?=.*\d)(?=.*[\p{Symbol}\p{Punctuation}]+)(?![.\n\r\t\s\b\p{Other}])(?=.*[A-Z])(?=.*[a-z]).*$'
            title='Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
          />
          <label className='label hidden input-invalid' htmlFor='password'>
            <span className='label-text-alt text-left'>
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
          <button type='submit' className='btn btn-primary w-1/3'>
            Sign Up
          </button>
          <button type='submit' className='btn btn-secondary w-1/3'>
            Log in
          </button>
        </div>

        <div className={'divider uppercase'}>or</div>

        <div className='flex gap-x-3 w-full justify-around'>
          <button className={'btn btn-square btn-info grow'}>
            <FaTwitter size={32} />
          </button>
          <button className={'btn btn-square btn-error grow'}>
            <FaGoogle size={32} />
          </button>
          <button className={'btn btn-square btn-neural grow'}>
            <FaGithub size={32} />
          </button>
        </div>
      </form>
    </section>
  )
}
