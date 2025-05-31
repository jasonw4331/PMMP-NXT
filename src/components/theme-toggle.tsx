"use client"
import {Moon, Sun} from "lucide-react"
import {useTheme} from "next-themes"
import {DropdownMenuItem} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
    const {setTheme, theme} = useTheme()

    return (
        <DropdownMenuItem onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="gap-2">
            {theme === "light" ? (
                <>
                    <Moon className="h-4 w-4"/>
                    <span>Dark Mode</span>
                </>
            ) : (
                <>
                    <Sun className="h-4 w-4"/>
                    <span>Light Mode</span>
                </>
            )}
        </DropdownMenuItem>
    )
}
