"use client"

import {Button} from "@/components/ui/button"
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {ArrowRight, Download} from "lucide-react"
import Image from "next/image"

interface SoftwareItem {
    id: string
    name: string
    tagline: string
    image: string
    hasDownload: boolean
}

interface SoftwareCardProps {
    item: SoftwareItem
    index: number
    isNew?: boolean
}

export default function SoftwareCard({item, index, isNew = false}: SoftwareCardProps) {
    return (
        <Card
            className={`software-card overflow-hidden hover:shadow-lg bg-card border-border transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl ${
                isNew ? "animate-slideInUp" : ""
            }`}
            style={{
                animationDelay: isNew ? `${(index % 5) * 100}ms` : "0ms",
            }}
        >
            <div className="relative aspect-[2/1] overflow-hidden">
                <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-300"
                    priority={index < 5}
                />
            </div>
            <CardHeader>
                <CardTitle className="text-lg text-card-foreground">{item.name}</CardTitle>
                <CardDescription className="line-clamp-2">{item.tagline}</CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-2">
                <Button
                    className="flex-1 min-w-0 h-9 px-2 py-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white transition-all duration-200">
                    <Download className="mr-2 h-4 w-4"/>
                    <span className="truncate block">Download</span>
                </Button>
                <Button variant="secondary" className="flex-1 min-w-0 h-9 px-2 py-1 transition-all duration-200">
                    <ArrowRight className="mr-2 h-4 w-4"/>
                    <span className="truncate block">Learn More</span>
                </Button>
            </CardFooter>
        </Card>
    )
}
