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
  return <div className="text-sm opacity-70">User</div>;
}
