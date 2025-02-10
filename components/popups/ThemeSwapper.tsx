'use client'

import { BiMoon } from 'react-icons/bi'

export default function ThemeSwapper() {
  return (
    <label htmlFor={'theme-swap'}>
      <BiMoon size={24} />
      <span>Appearance: {globalThis.isDark ? 'dark' : 'light'}</span>
      <input
        id={'theme-swap'}
        type={'checkbox'}
        value={'business'}
        defaultChecked={globalThis.isDark}
        onClick={() => globalThis.setIsDark(!globalThis.isDark)}
        className='theme-controller invisible'
      />
    </label>
  )
}
