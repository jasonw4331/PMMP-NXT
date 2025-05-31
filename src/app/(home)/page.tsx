"use client"

import {useCallback, useState} from "react"
import SoftwareCard from "@/components/software-card"
import SoftwareCardSkeleton from "@/components/software-card-skeleton"
import {useInfiniteScroll} from "@/hooks/use-infinite-scroll"
import {fetchSoftwareItems, generateSoftwareItems, type SoftwareItem} from "@/lib/software-data"

export default function SoftwarePage() {
    const [items, setItems] = useState<SoftwareItem[]>(() => generateSoftwareItems(10)) // TODO: initial fetch from API
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [newItemsCount, setNewItemsCount] = useState(0)

    const fetchMore = useCallback(async () => {
        const newItems = await fetchSoftwareItems(page + 1)

        if (newItems.length === 0) {
            setHasMore(false)
            return []
        }

        setItems((prev) => [...prev, ...newItems])
        setPage((prev) => prev + 1)
        setNewItemsCount(newItems.length)

        // Reset new items count after animation
        setTimeout(() => setNewItemsCount(0), 1000)

        // Simulate ending after 50 items for demo
        if (items.length + newItems.length >= 50) {
            setHasMore(false)
        }

        return newItems
    }, [page, items.length])

    const {loading, loadingRef} = useInfiniteScroll({
        fetchMore,
        hasMore,
        threshold: 200,
    })

    return (
        <div className="container mx-auto py-8">
            <div className="software-grid">
                {items.map((item, index) => {
                    const isNew = index >= items.length - newItemsCount
                    return <SoftwareCard key={item.id} item={item} index={index} isNew={isNew}/>
                })}

                {/* Loading skeletons */}
                {loading && (
                    <>
                        {Array.from({length: 5}).map((_, index) => (
                            <SoftwareCardSkeleton key={`skeleton-${index}`}/>
                        ))}
                    </>
                )}
            </div>

            {/* Intersection observer target */}
            <div ref={loadingRef} className="h-10 flex items-center justify-center mt-8">
                {!hasMore && !loading && (
                    <p className="text-zinc-500 dark:text-zinc-400">You&apos;ve reached the end! No more software to
                        load.</p>
                )}
            </div>
        </div>
    )
}
