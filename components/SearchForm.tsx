'use client'
import { useRouter } from 'next/navigation'

export default function SearchForm() {
  const router = useRouter()
  return (
    <div className='form-control'>
      <div className={'input-group relative'}>
        <input
          type='text'
          placeholder='Search…'
          onKeyDown={e => {
            if (e.key === 'Enter') {
              router.push(
                `/results?q=${encodeURI(
                  document.querySelector('input')?.value || ''
                )}`
              )
            }
          }}
          className={'input input-bordered pl-10'}
        />
        <div className={'absolute left-0 pl-2.5 pt-2.5 pointer-events-none'}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={'h-6 w-6'}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
