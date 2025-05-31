"use client"

import type React from "react"
import {useState} from "react"
import Navbar from "./navbar"
import Sidebar from "./sidebar"

export default function LayoutWithSidebar({children}: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
            <div
                className={`flex flex-col flex-1 overflow-hidden`}
            >
                <Navbar onSidebarOpen={toggleSidebar} sidebarOpen={sidebarOpen}/>
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    )
}
