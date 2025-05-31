"use client"

import {Button} from "@/components/ui/button"
import {
    Code,
    Compass,
    Eye,
    Flag,
    GitBranch,
    HelpCircle,
    History,
    Home,
    Menu,
    MessageSquare,
    PlugIcon as Plugin,
    Settings,
    Terminal,
    Users,
} from "lucide-react"
import Link from "next/link"
import {useGitHub} from "@/contexts/github-context"

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export default function Sidebar({isOpen, onClose}: SidebarProps) {
    const {isGitHubLinked} = useGitHub()

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
                     onClick={onClose}/>
            )}

            {/* Sidebar */}
            <div
                className={`${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
                    isOpen ? "md:block" : "md:hidden"
                }`}
            >
                <div className="flex h-full flex-col bg-background border-r border-border">
                    {/* Header */}
                    <div className="flex items-center gap-2 p-4 h-16 lg:p-2 border-b border-border">
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <Menu className="h-6 w-6"/>
                        </Button>
                        <div className="font-bold text-xl text-foreground">NXT</div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-2">
                        <Link href="/">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                                <Home className="h-4 w-4"/>
                                Home
                            </Button>
                        </Link>
                        <Link href="/explore">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                                <Compass className="h-4 w-4"/>
                                Explore
                            </Button>
                        </Link>
                        <Link href="/followed">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                                <Users className="h-4 w-4"/>
                                Followed Authors
                            </Button>
                        </Link>
                        <Link href="/watching">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                                <Eye className="h-4 w-4"/>
                                Watching
                            </Button>
                        </Link>
                        <Link href="/history">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                                <History className="h-4 w-4"/>
                                History
                            </Button>
                        </Link>
                        <Link href="/plugins">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                                <Plugin className="h-4 w-4"/>
                                Review Plugins
                            </Button>
                        </Link>
                        {isGitHubLinked && (
                            <>
                                <Link href="/dev/projects">
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <Code className="h-4 w-4"/>
                                        My Projects
                                    </Button>
                                </Link>
                                <Link href="/dev/repositories">
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <GitBranch className="h-4 w-4"/>
                                        Repositories
                                    </Button>
                                </Link>
                                <Link href="/dev/console">
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <Terminal className="h-4 w-4"/>
                                        Developer Console
                                    </Button>
                                </Link>
                            </>
                        )}
                        <Link href="/settings">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                                <Settings className="h-4 w-4"/>
                                Settings
                            </Button>
                        </Link>
                        <Link href="/reports">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                                <Flag className="h-4 w-4"/>
                                Report History
                            </Button>
                        </Link>
                        <Link href="/help">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                                <HelpCircle className="h-4 w-4"/>
                                Help
                            </Button>
                        </Link>
                        <Link href="/feedback">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                                <MessageSquare className="h-4 w-4"/>
                                Send Feedback
                            </Button>
                        </Link>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 text-xs text-muted-foreground border-t border-border">
                        <p>© 2023 PMMP: NXT</p>
                        <p>Some Icons by freepik.com and icons8.com</p>
                    </div>
                </div>
            </div>
        </>
    )
}
