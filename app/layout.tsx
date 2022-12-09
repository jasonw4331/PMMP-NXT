/* eslint-disable @next/next/no-head-element */
import './globals.css'
import Sidebar from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import ClientContextProvider from '../components/ClientContextProvider'
import PopupModal from '../components/popups/PopupModal'
import SignInComponent from '../components/auth/SignInComponent'

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
          <ClientContextProvider>
            <input id='SideBar' type='checkbox' className='drawer-toggle' />
            <div className='drawer-content flex flex-col'>
              <Navbar />
              <main>{children}</main>
            </div>
            <div className='drawer-side'>
              <label htmlFor='SideBar' className='drawer-overlay'></label>
              <Sidebar />
            </div>
          </ClientContextProvider>
        </div>
        <SignInModal />
      </body>
    </html>
  )
}
