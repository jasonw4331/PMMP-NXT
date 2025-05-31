"use client"

import {useEffect, useState} from "react"
import {useParams} from "next/navigation"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Separator} from "@/components/ui/separator"
import {Download, Eye, FileText, Flag, Github, Globe, Heart, MessageSquare, Share2, Shield, Star} from "lucide-react"
import Image from "next/image"

interface SoftwareData {
    id: string
    name: string
    tagline: string
    description: string
    version: string
    status: "published" | "pending" | "reviewing"
    author: {
        username: string
        displayName: string
        avatar: string
        verified: boolean
    }
    stats: {
        downloads: number
        rating: number
        reviews: number
        favorites: number
        views: number
    }
    images: string[]
    category: string
    tags: string[]
    requirements: {
        os: string[]
        memory: string
        storage: string
        other: string[]
    }
    changelog: {
        version: string
        date: string
        changes: string[]
    }[]
    publishedAt: string
    updatedAt: string
    website?: string
    github?: string
    license: string
}

export default function SoftwarePage() {
    const params = useParams()
    const [software, setSoftware] = useState<SoftwareData | null>(null)
    const [loading, setLoading] = useState(true)
    const [isFavorited, setIsFavorited] = useState(false)

    useEffect(() => {
        // Simulate API call to fetch software data
        const fetchSoftware = async () => {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 500))

            // Mock data based on URL params
            const mockSoftware: SoftwareData = {
                id: "1",
                name: decodeURIComponent(params.software as string).replace(/-/g, " "),
                tagline: "A powerful and intuitive software solution",
                description: `This is a comprehensive software package designed to meet your needs. It offers a wide range of features including advanced functionality, user-friendly interface, and robust performance. 

The software has been carefully crafted with attention to detail and user experience in mind. It supports multiple platforms and provides seamless integration with existing workflows.

Key features include:
- Advanced functionality with intuitive controls
- Cross-platform compatibility
- Regular updates and improvements
- Comprehensive documentation and support
- Active community of users and developers`,
                version: "2.1.0",
                status: "published",
                author: {
                    username: params.username as string,
                    displayName: (params.username as string).charAt(0).toUpperCase() + (params.username as string).slice(1),
                    avatar: "/placeholder.svg?height=40&width=40",
                    verified: true,
                },
                stats: {
                    downloads: 15420,
                    rating: 4.7,
                    reviews: 89,
                    favorites: 234,
                    views: 2840,
                },
                images: [
                    "/placeholder.svg?height=400&width=600&text=Screenshot+1",
                    "/placeholder.svg?height=400&width=600&text=Screenshot+2",
                    "/placeholder.svg?height=400&width=600&text=Screenshot+3",
                ],
                category: "Development",
                tags: ["productivity", "development", "tools", "cross-platform"],
                requirements: {
                    os: ["Windows 10+", "macOS 10.15+", "Linux"],
                    memory: "4 GB RAM minimum, 8 GB recommended",
                    storage: "500 MB available space",
                    other: ["Internet connection for updates", "Modern web browser"],
                },
                changelog: [
                    {
                        version: "2.1.0",
                        date: "2024-01-20",
                        changes: [
                            "Added new dashboard interface",
                            "Improved performance by 30%",
                            "Fixed critical security vulnerability",
                            "Added dark mode support",
                        ],
                    },
                    {
                        version: "2.0.5",
                        date: "2024-01-10",
                        changes: ["Bug fixes and stability improvements", "Updated dependencies", "Minor UI enhancements"],
                    },
                ],
                publishedAt: "2023-12-15",
                updatedAt: "2024-01-20",
                website: "https://example.com",
                github: "https://github.com/user/repo",
                license: "MIT License",
            }

            setSoftware(mockSoftware)
            setLoading(false)
        }

        fetchSoftware()
    }, [params])

    if (loading) {
        return (
            <div className="container mx-auto py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-muted rounded w-1/3"></div>
                        <div className="h-64 bg-muted rounded"></div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-32 bg-muted rounded"></div>
                            <div className="h-32 bg-muted rounded"></div>
                            <div className="h-32 bg-muted rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!software) {
        return (
            <div className="container mx-auto py-8">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-2xl font-bold mb-4">Software Not Found</h1>
                    <p className="text-muted-foreground">The software you're looking for doesn't exist or has been
                        removed.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold">{software.name}</h1>
                                <Badge variant="default" className="bg-green-600">
                                    Published
                                </Badge>
                            </div>
                            <p className="text-xl text-muted-foreground mb-4">{software.tagline}</p>

                            {/* Author Info */}
                            <div className="flex items-center gap-3 mb-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={software.author.avatar || "/placeholder.svg"}
                                                 alt={software.author.displayName}/>
                                    <AvatarFallback>{software.author.displayName[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{software.author.displayName}</span>
                                        {software.author.verified && <Shield className="h-4 w-4 text-blue-500"/>}
                                    </div>
                                    <span className="text-sm text-muted-foreground">@{software.author.username}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Download className="h-4 w-4"/>
                                    {software.stats.downloads.toLocaleString()} downloads
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                                    {software.stats.rating} ({software.stats.reviews} reviews)
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart className="h-4 w-4"/>
                                    {software.stats.favorites} favorites
                                </div>
                                <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4"/>
                                    {software.stats.views} views
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 min-w-48">
                            <Button size="lg" className="w-full">
                                <Download className="h-4 w-4 mr-2"/>
                                Download v{software.version}
                            </Button>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1"
                                        onClick={() => setIsFavorited(!isFavorited)}>
                                    <Heart
                                        className={`h-4 w-4 mr-1 ${isFavorited ? "fill-red-500 text-red-500" : ""}`}/>
                                    {isFavorited ? "Favorited" : "Favorite"}
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Share2 className="h-4 w-4"/>
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Flag className="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Tags and Category */}
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary">{software.category}</Badge>
                        <div className="flex gap-2">
                            {software.tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Screenshots and Description */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Screenshots */}
                        <Card>
                            <CardContent className="p-0">
                                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                                    <Image
                                        src={software.images[0] || "/placeholder.svg"}
                                        alt="Software screenshot"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex gap-2 overflow-x-auto">
                                        {software.images.map((image, index) => (
                                            <div key={index}
                                                 className="relative w-20 h-12 flex-shrink-0 rounded overflow-hidden">
                                                <Image
                                                    src={image || "/placeholder.svg"}
                                                    alt={`Screenshot ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tabs */}
                        <Tabs defaultValue="description" className="space-y-4">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="description">Description</TabsTrigger>
                                <TabsTrigger value="changelog">Changelog</TabsTrigger>
                                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                                <TabsTrigger value="support">Support</TabsTrigger>
                            </TabsList>

                            <TabsContent value="description">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>About this software</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="prose prose-sm max-w-none dark:prose-invert">
                                            {software.description.split("\n\n").map((paragraph, index) => (
                                                <p key={index}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="changelog">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Version History</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            {software.changelog.map((version, index) => (
                                                <div key={index}>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="font-semibold">v{version.version}</h4>
                                                        <span
                                                            className="text-sm text-muted-foreground">{version.date}</span>
                                                    </div>
                                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                        {version.changes.map((change, changeIndex) => (
                                                            <li key={changeIndex}>{change}</li>
                                                        ))}
                                                    </ul>
                                                    {index < software.changelog.length - 1 &&
                                                        <Separator className="mt-4"/>}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="reviews">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>User Reviews</CardTitle>
                                        <CardDescription>{software.stats.reviews} reviews</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {/* Sample reviews */}
                                            {[1, 2, 3].map((review) => (
                                                <div key={review} className="border-b pb-4 last:border-b-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback>U{review}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium">User{review}</span>
                                                                <div className="flex">
                                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                                        <Star key={star}
                                                                              className="h-3 w-3 fill-yellow-400 text-yellow-400"/>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <span
                                                                className="text-xs text-muted-foreground">2 days ago</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm">Great software! Very easy to use and does
                                                        exactly what I needed.</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="support">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Support & Resources</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 p-3 border rounded-lg">
                                                <FileText className="h-5 w-5"/>
                                                <div>
                                                    <p className="font-medium">Documentation</p>
                                                    <p className="text-sm text-muted-foreground">Complete user guide and
                                                        API reference</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 border rounded-lg">
                                                <MessageSquare className="h-5 w-5"/>
                                                <div>
                                                    <p className="font-medium">Community Forum</p>
                                                    <p className="text-sm text-muted-foreground">Get help from other
                                                        users</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 border rounded-lg">
                                                <Github className="h-5 w-5"/>
                                                <div>
                                                    <p className="font-medium">Report Issues</p>
                                                    <p className="text-sm text-muted-foreground">Submit bugs and feature
                                                        requests</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Right Column - Info and Requirements */}
                    <div className="space-y-6">
                        {/* Software Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Software Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Version</span>
                                    <span className="font-medium">{software.version}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">License</span>
                                    <span className="font-medium">{software.license}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Published</span>
                                    <span className="font-medium">{software.publishedAt}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Updated</span>
                                    <span className="font-medium">{software.updatedAt}</span>
                                </div>
                                <Separator/>
                                <div className="space-y-2">
                                    {software.website && (
                                        <Button variant="outline" className="w-full justify-start">
                                            <Globe className="h-4 w-4 mr-2"/>
                                            Website
                                        </Button>
                                    )}
                                    {software.github && (
                                        <Button variant="outline" className="w-full justify-start">
                                            <Github className="h-4 w-4 mr-2"/>
                                            Source Code
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* System Requirements */}
                        <Card>
                            <CardHeader>
                                <CardTitle>System Requirements</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2">Operating System</h4>
                                    <div className="space-y-1">
                                        {software.requirements.os.map((os, index) => (
                                            <div key={index} className="text-sm text-muted-foreground">
                                                • {os}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Memory</h4>
                                    <p className="text-sm text-muted-foreground">{software.requirements.memory}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Storage</h4>
                                    <p className="text-sm text-muted-foreground">{software.requirements.storage}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Additional Requirements</h4>
                                    <div className="space-y-1">
                                        {software.requirements.other.map((req, index) => (
                                            <div key={index} className="text-sm text-muted-foreground">
                                                • {req}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Related Software */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Related Software</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-center gap-3 p-2 border rounded-lg">
                                            <div className="w-10 h-10 bg-muted rounded"></div>
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">Related Software {item}</p>
                                                <p className="text-xs text-muted-foreground">By Developer{item}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
