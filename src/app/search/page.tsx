"use client"

import type React from "react"
import {useEffect, useState} from "react"
import {useSearchParams} from "next/navigation"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Search} from "lucide-react"
import {generateSoftwareItems, type SoftwareItem} from "@/lib/software-data"

export default function SearchPage() {
    const searchParams = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("q") || "")
    const [results, setResults] = useState<SoftwareItem[]>([])
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState("all")

    useEffect(() => {
        if (query.trim()) {
            performSearch(query)
        }
    }, [query])

    const performSearch = async (searchQuery: string) => {
        setLoading(true)
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const allItems = generateSoftwareItems(30)
        const filtered = allItems.filter(
            (item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.tagline.toLowerCase().includes(searchQuery.toLowerCase()),
        )

        setResults(filtered)
        setLoading(false)
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            performSearch(query)
        }
    }

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Search</h1>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-8">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <Input
                                placeholder="Search for software..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Searching..." : "Search"}
                        </Button>
                    </div>
                </form>

                {/* Filters */}
                <div className="flex gap-4 mb-6">
                    <Button variant={filter === "all" ? "default" : "outline"} size="sm"
                            onClick={() => setFilter("all")}>
                        All Results
                    </Button>
                    <Button
                        variant={filter === "downloadable" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter("downloadable")}
                    >
                        Downloadable
                    </Button>
                    <Button variant={filter === "web" ? "default" : "outline"} size="sm"
                            onClick={() => setFilter("web")}>
                        Web Apps
                    </Button>
                </div>

                {/* Results */}
                {query && (
                    <div className="mb-4">
                        <p className="text-muted-foreground">
                            {loading ? "Searching..." : `Found ${results.length} results for "${query}"`}
                        </p>
                    </div>
                )}

                <div className="space-y-4">
                    {results.map((item) => (
                        <Card key={item.id} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl">{item.name}</CardTitle>
                                        <CardDescription className="mt-2">{item.tagline}</CardDescription>
                                    </div>
                                    <Badge variant={item.hasDownload ? "default" : "secondary"}>
                                        {item.hasDownload ? "Downloadable" : "Web App"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2">
                                    <Button size="sm">View Details</Button>
                                    {item.hasDownload && (
                                        <Button size="sm" variant="outline">
                                            Download
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {results.length === 0 && query && !loading && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No results found for "{query}"</p>
                        <p className="text-sm text-muted-foreground mt-2">Try different keywords or browse our
                            categories</p>
                    </div>
                )}
            </div>
        </div>
    )
}
