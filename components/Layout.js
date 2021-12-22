import { Toaster } from 'react-hot-toast'
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="relative">
        { children }
      </main>
      <Toaster/>
    </>
  );
}

export default Layout;