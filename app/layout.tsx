import '@/app/globals.css'
import Navbar from '@/components/navbar/Navbar'
import { Linefont, Noto_Sans, Wavefont } from 'next/font/google'
import Sidebar from '@/components/sidebar/Sidebar'
import FirstTimeModal from '@/components/FirstTimeModal'

const noto_sans = Noto_Sans({
  weight: ['400'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-noto-sans',
  subsets: ['latin'],
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
    <html lang={'en'} className={`font-sans`}>
      <body>
        <div className='drawer'>
          <input id='SideBar' type='checkbox' className='drawer-toggle' />
          <div className='drawer-content flex flex-col'>
            <Navbar />
            <main>{children}</main>
          </div>
          <div className='drawer-side'>
            <label
              htmlFor='SideBar'
              aria-label='close sidebar'
              className='drawer-overlay'></label>
            <Sidebar />
          </div>
        </div>
        <FirstTimeModal />
      </body>
    </html>
  )
}
