/* eslint-disable @next/next/no-head-element */
import './globals.css'
import Navbar from '../components/navbar/Navbar'
import { Linefont, Noto_Sans, Wavefont } from 'next/font/google'
import Sidebar from '@/components/sidebar/Sidebar'

const noto_sans = Noto_Sans({
  weight: ['400'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-noto-sans',
})

const linefont = Linefont({
  weight: ['400'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-line',
})

const wavefont = Wavefont({
  weight: ['400'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-wave',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang={'en'}
      className={`${noto_sans.variable} ${linefont.variable} ${wavefont.variable}`}>
      <body>
        <div className='drawer'>
          <input id='SideBar' type='checkbox' className='drawer-toggle' />
          <div className='drawer-content flex flex-col'>
            <Navbar />
            <main>{children}</main>
          </div>
          <div className='drawer-side'>
            <label htmlFor='SideBar' className='drawer-overlay'></label>
            <Sidebar />
          </div>
        </div>
      </body>
    </html>
  )
}
