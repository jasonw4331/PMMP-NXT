'use client'
import { useRouter } from 'next/navigation'
import { MdSearch } from 'react-icons/md'

export default function SearchForm() {
  const router = useRouter()
  return (
    <div className='form-control'>
      <div className={'relative flex'}>
        <input
          id='searchbar'
          type='text'
          placeholder='Search…'
          onKeyDown={e => {
            if (e.key === 'Enter') {
              router.push(
                `/results?q=${encodeURI(
                  (document.querySelector('#searchbar') as HTMLInputElement)
                    ?.value || ''
                )}`
              )
            }
          }}
          className={'input input-bordered pl-10 grow'}
        />
        <div className={'absolute left-0 pl-2.5 pt-3 pointer-events-none'}>
          <MdSearch className={'h-6 w-6'} size={24} />
        </div>
      </div>
    </div>
  )
}
