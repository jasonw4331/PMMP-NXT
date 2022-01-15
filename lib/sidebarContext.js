import { createContext } from 'react'

export const SidebarContext = createContext({
  sidebarOpen: false,
  setSidebarOpen: value => null,
})
