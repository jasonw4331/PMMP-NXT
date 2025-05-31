"use client"

import {Button} from "@/components/ui/button"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Bell, Settings} from "lucide-react"

export default function Notifications() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 mr-4 p-0 bg-popover border-border">
                <div className="flex items-center justify-between p-4 pb-2 border-b border-border">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4"/>
                    </Button>
                </div>
                <div className="p-4 pt-2 text-sm text-muted-foreground">You don&apos;t have any notifications!</div>
            </PopoverContent>
        </Popover>
    )
}
