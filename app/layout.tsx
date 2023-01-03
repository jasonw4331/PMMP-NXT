/* eslint-disable @next/next/no-head-element */
import './globals.css'
import Sidebar from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import PopupModal from '../components/popups/PopupModal'
import SignInComponent from '../components/auth/SignInComponent'
import Providers from '../components/auth/providers'

export const revalidate = 43200 // revalidate every 12 hours

function SignInModal() {
  return (
    <PopupModal id='SignIn'>
      <SignInComponent />
    </PopupModal>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <div className='drawer'>
          <input id='SideBar' type='checkbox' className='drawer-toggle' />
          <Providers>
            <div className='drawer-content flex flex-col'>
              <Navbar />
              <main>{children}</main>
            </div>
            <div className='drawer-side'>
              <label htmlFor='SideBar' className='drawer-overlay'></label>
              <Sidebar />
            </div>
          </Providers>
        </div>
        <SignInModal />
      </body>
    </html>
  )
}
