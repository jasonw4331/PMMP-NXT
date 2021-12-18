import Footer from "./Footer"
import { Toaster } from 'react-hot-toast'

const Layout = ({ children }) => {
  return (
    <>
      <div className="content">
        { children }
      </div>
      <Toaster/>
      <Footer />
    </>
  );
}

export default Layout;