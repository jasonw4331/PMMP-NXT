"use client"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Code,
    GitBranch,
    HelpCircle,
    LogIn,
    MessageSquare,
    Settings,
    ShieldCheck,
    Terminal,
    User,
    UserCircle,
} from "lucide-react"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {ThemeToggle} from "./theme-toggle"
import {useGitHub} from "@/contexts/github-context"

export default function UserMenu() {
    const {isGitHubLinked} = useGitHub()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-muted">
                            <User className="h-4 w-4"/>
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-2 bg-popover border-border" align="end">
                <DropdownMenuLabel className="flex items-center gap-2 text-muted-foreground">
                    <UserCircle className="h-4 w-4"/>
                    <div>
                        <p className="text-sm font-normal text-foreground">Not logged in</p>
                        <p className="text-xs font-normal">User Account</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="gap-2">
                        <User className="h-4 w-4"/>
                        My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                        <ShieldCheck className="h-4 w-4"/>
                        Admin Panel
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                        <LogIn className="h-4 w-4"/>
                        Sign In
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                {isGitHubLinked && (
                    <>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="gap-2">
                                <Code className="h-4 w-4"/>
                                My Projects
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                                <GitBranch className="h-4 w-4"/>
                                Repositories
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                                <Terminal className="h-4 w-4"/>
                                Developer Console
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </>
                )}
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <ThemeToggle/>
                    <DropdownMenuItem className="gap-2">
                        <Settings className="h-4 w-4"/>
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="gap-2">
                        <HelpCircle className="h-4 w-4"/>
                        Help
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                        <MessageSquare className="h-4 w-4"/>
                        Send Feedback
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
