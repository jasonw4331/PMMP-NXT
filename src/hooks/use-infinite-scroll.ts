"use client"

import {useCallback, useEffect, useRef, useState} from "react"

interface UseInfiniteScrollProps {
    fetchMore: () => Promise<any[]>
    hasMore: boolean
    threshold?: number
}

export function useInfiniteScroll({fetchMore, hasMore, threshold = 100}: UseInfiniteScrollProps) {
    const [loading, setLoading] = useState(false)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadingRef = useRef<HTMLDivElement | null>(null)

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return

        setLoading(true)
        try {
            await fetchMore()
        } catch (error) {
            console.error("Error loading more items:", error)
        } finally {
            setLoading(false)
        }
    }, [fetchMore, hasMore, loading])

    useEffect(() => {
        if (!loadingRef.current) return

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                if (entry.isIntersecting && hasMore && !loading) {
                    loadMore()
                }
            },
            {rootMargin: `${threshold}px`},
        )

        observerRef.current.observe(loadingRef.current)

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [hasMore, loading, loadMore, threshold])

    return {loading, loadingRef}
}
