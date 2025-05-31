"use client"

import {Card, CardFooter, CardHeader} from "@/components/ui/card"
import {Skeleton} from "@/components/ui/skeleton"

export default function SoftwareCardSkeleton() {
    return (
        <Card className="overflow-hidden bg-card border-border animate-pulse">
            <div className="relative aspect-[2/1] overflow-hidden">
                <Skeleton className="w-full h-full bg-muted"/>
            </div>
            <CardHeader>
                <Skeleton className="h-6 w-3/4 bg-muted"/>
                <Skeleton className="h-4 w-full bg-muted"/>
                <Skeleton className="h-4 w-2/3 bg-muted"/>
            </CardHeader>
            <CardFooter className="flex gap-2">
                <Skeleton className="flex-1 h-9 bg-muted"/>
                <Skeleton className="flex-1 h-9 bg-muted"/>
            </CardFooter>
        </Card>
    )
}
