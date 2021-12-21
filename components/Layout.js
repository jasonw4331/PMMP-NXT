import Footer from "./Footer"
import { Toaster } from 'react-hot-toast'
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      { children }
      <Toaster/>
    </>
  );
}

export default Layout;