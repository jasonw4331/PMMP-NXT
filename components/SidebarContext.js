import { createContext } from 'react'

const SidebarContext = createContext({
  sidebarOpen: true,
  setSidebarOpen: prevState => {},
})
export default SidebarContext
