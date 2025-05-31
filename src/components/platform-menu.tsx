"use client"

import {Button} from "@/components/ui/button"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {FileText, Github, Grid2x2, MessageSquare} from "lucide-react"

export default function PlatformMenu() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Grid2x2 className="h-5 w-5"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] mr-4 p-0 bg-popover border-border">
                <div className="grid grid-cols-2 gap-4 p-4">
                    <a href="#"
                       className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors">
                        <svg className="w-6 h-6 text-foreground" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2L2 7L12 12L22 7L12 2Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2 17L12 22L22 17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2 12L12 17L22 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="text-sm text-foreground">PMMP</span>
                    </a>
                    <a href="#"
                       className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors">
                        <MessageSquare className="w-6 h-6 text-foreground"/>
                        <span className="text-sm text-foreground">Forums</span>
                    </a>
                    <a href="#"
                       className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors">
                        <Github className="w-6 h-6 text-foreground"/>
                        <span className="text-sm text-foreground">Github</span>
                    </a>
                    <a href="#"
                       className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors">
                        <FileText className="w-6 h-6 text-foreground"/>
                        <span className="text-sm text-foreground">Docs</span>
                    </a>
                    <a href="#"
                       className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors">
                        <svg className="w-6 h-6 text-foreground" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <path
                                d="M7 17V7L17 12L7 17Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="text-sm text-foreground">Poggit</span>
                    </a>
                    <a href="#"
                       className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors">
                        <svg className="w-6 h-6 text-foreground" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.317 4.37c-1.53-.727-3.17-1.26-4.885-1.553a.056.056 0 00-.059.028c-.16.297-.338.683-.464.992-1.514-.225-3.018-.225-4.5 0-.137-.318-.32-.695-.478-.992a.058.058 0 00-.059-.028c-1.714.293-3.354.826-4.885 1.553a.052.052 0 00-.024.02C.545 10.315-.319 16.094.099 21.802c.002.044.026.084.063.104 2.086 1.53 4.11 2.46 6.091 3.075a.057.057 0 00.062-.02c.337-.46.636-.944.890-1.454a.056.056 0 00-.031-.077c-.663-.252-1.293-.575-1.896-.944a.056.056 0 01-.006-.094c.127-.095.254-.193.375-.292a.056.056 0 01.058-.008c2.946 1.345 6.135 1.345 9.046 0a.056.056 0 01.059.007c.121.1.248.198.376.293a.056.056 0 01-.006.094c-.603.37-1.233.692-1.896.944a.056.056 0 00-.031.077c.26.51.559.994.89 1.454a.056.056 0 00.062.02c1.988-.615 4.012-1.545 6.091-3.075a.056.056 0 00.063-.104c.498-6.553-.838-12.283-3.549-17.413a.044.044 0 00-.024-.02"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                        </svg>
                        <span className="text-sm text-foreground">Discord</span>
                    </a>
                </div>
            </PopoverContent>
        </Popover>
    )
}
