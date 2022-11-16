/* eslint-disable @next/next/no-head-element */
import './globals.css'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export const revalidate = 43200 // revalidate every 12 hours

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <div className='drawer'>
          <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
          <div className='drawer-content flex flex-col'>
            <Navbar />
            <main>{children}</main>
          </div>
          <div className='drawer-side'>
            <label htmlFor='my-drawer-3' className='drawer-overlay'></label>
            <Sidebar />
          </div>
        </div>
      </body>
    </html>
  )
}
