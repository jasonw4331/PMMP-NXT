"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Download, Search, Star, TrendingUp} from "lucide-react"
import SoftwareCard from "@/components/software-card"
import {generateSoftwareItems} from "@/lib/software-data"

const categories = ["All", "Development", "Productivity", "Security", "Media", "Utilities", "Games", "Education"]

const featuredSoftware = [
    {
        id: "featured-1",
        name: "AI Code Assistant",
        tagline: "Revolutionary AI-powered coding companion",
        image: "/placeholder.svg?height=200&width=400",
        hasDownload: true,
        featured: true,
        downloads: 50000,
        rating: 4.9,
    },
    {
        id: "featured-2",
        name: "Cloud Sync Pro",
        tagline: "Seamless file synchronization across all devices",
        image: "/placeholder.svg?height=200&width=400",
        hasDownload: true,
        featured: true,
        downloads: 35000,
        rating: 4.7,
    },
    {
        id: "featured-3",
        name: "Security Shield",
        tagline: "Advanced protection for your digital life",
        image: "/placeholder.svg?height=200&width=400",
        hasDownload: true,
        featured: true,
        downloads: 42000,
        rating: 4.8,
    },
]

export default function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [sortBy, setSortBy] = useState("popular")
    const [software] = useState(generateSoftwareItems(20))

    const filteredSoftware = software.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tagline.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesSearch
    })

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4">Explore Software</h1>
                    <p className="text-muted-foreground">Discover amazing software for every need</p>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            placeholder="Search software..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-48">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-48">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popular">Most Popular</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="rating">Highest Rated</SelectItem>
                            <SelectItem value="downloads">Most Downloads</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Tabs defaultValue="featured" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="featured">Featured</TabsTrigger>
                        <TabsTrigger value="trending">Trending</TabsTrigger>
                        <TabsTrigger value="new">New Releases</TabsTrigger>
                        <TabsTrigger value="categories">Categories</TabsTrigger>
                    </TabsList>

                    <TabsContent value="featured">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold">Featured Software</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredSoftware.map((item) => (
                                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                        <div className="relative aspect-[2/1] overflow-hidden">
                                            <img
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <Badge
                                                className="absolute top-2 left-2 bg-yellow-500 text-black">Featured</Badge>
                                        </div>
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                {item.name}
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                                                    <span className="text-sm">{item.rating}</span>
                                                </div>
                                            </CardTitle>
                                            <CardDescription>{item.tagline}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <Download className="h-4 w-4"/>
                                                    {item.downloads.toLocaleString()} downloads
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button className="flex-1">Download</Button>
                                                <Button variant="outline">Learn More</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="trending">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-6 w-6"/>
                                <h2 className="text-2xl font-semibold">Trending This Week</h2>
                            </div>
                            <div className="software-grid">
                                {filteredSoftware.slice(0, 12).map((item, index) => (
                                    <SoftwareCard key={item.id} item={item} index={index}/>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="new">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold">New Releases</h2>
                            <div className="software-grid">
                                {filteredSoftware.slice(5, 17).map((item, index) => (
                                    <SoftwareCard key={item.id} item={item} index={index}/>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="categories">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold">Browse by Category</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {categories.slice(1).map((category) => (
                                    <Card key={category} className="hover:shadow-md transition-shadow cursor-pointer">
                                        <CardHeader className="text-center">
                                            <CardTitle className="text-lg">{category}</CardTitle>
                                            <CardDescription>{Math.floor(Math.random() * 50) + 10} software
                                                packages</CardDescription>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
