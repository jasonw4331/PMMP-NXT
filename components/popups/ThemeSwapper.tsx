'use client'

import { useEffect, useState } from 'react'
import { BiMoon } from 'react-icons/bi'

export default function ThemeSwapper() {
  const [isDark, setIsDark] = useState(
    JSON.parse(
      localStorage.getItem('isdark') ??
        JSON.stringify(
          window.matchMedia('(prefers-color-scheme: dark)').matches // default to dark mode if the user prefers it
        )
    )
  )
  useEffect(() => {
    // save the theme to localStorage so we can retain it across page loads
    localStorage.setItem('isdark', JSON.stringify(isDark))
    // apply data-theme to the document to maintain sync with the theme
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'business' : 'emerald'
    )
  }, [isDark])
  return (
    <label htmlFor={'theme-swap'}>
      <BiMoon size={24} />
      <span>Appearance: {isDark ? 'dark' : 'light'}</span>
      <input
        id={'theme-swap'}
        type={'checkbox'}
        value={'business'}
        defaultChecked={isDark}
        onClick={() => setIsDark(!isDark)}
        className='theme-controller invisible'
      />
    </label>
  )
}
