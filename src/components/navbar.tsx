"use client"

import type React from "react"
import {useState} from "react"
import {useRouter} from "next/navigation"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Menu, Search, Wrench} from "lucide-react"
import PlatformMenu from "./platform-menu"
import Notifications from "./notifications"
import UserMenu from "./user-menu"

interface NavbarProps {
    onSidebarOpen: () => void
    sidebarOpen: boolean
}

export default function Navbar({onSidebarOpen, sidebarOpen}: NavbarProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <div
            className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="relative flex h-16 items-center justify-between px-4">
                {/* Left side - Sidebar Toggle and Logo */}
                <div className="flex items-center gap-2 w-[88px]">
                    {!sidebarOpen && (
                        <>
                            <Button variant="ghost" size="icon" onClick={onSidebarOpen}>
                                <Menu className="h-6 w-6"/>
                            </Button>
                            <span className="text-xl font-bold text-foreground">NXT</span>
                        </>
                    )}
                </div>

                {/* Centered Search */}
                <div className="hidden sm:block fixed left-1/2 top-4 -translate-x-1/2 w-full max-w-md px-4 z-10">
                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <Search className="absolute left-7 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <Input
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 bg-background border-input text-foreground placeholder:text-muted-foreground focus:ring-ring"
                            />
                        </div>
                    </form>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center gap-2 ml-auto">
                    <Button variant="ghost" size="icon" className="hidden lg:inline-flex">
                        <Wrench className="h-5 w-5"/>
                    </Button>
                    <div className="hidden md:block">
                        <PlatformMenu/>
                    </div>
                    <div className="hidden md:block">
                        <Notifications/>
                    </div>
                    <div className="hidden sm:block">
                        <UserMenu/>
                    </div>
                </div>
            </div>
        </div>
    )
}
