"use client"

import {useEffect, useState} from "react"
import {useParams} from "next/navigation"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Alert, AlertDescription} from "@/components/ui/alert"
import {AlertCircle, CheckCircle, Clock, Edit, Eye, Trash2, XCircle} from "lucide-react"
import Image from "next/image"

interface PendingSoftware {
    id: string
    name: string
    tagline: string
    description: string
    version: string
    status: "pending"
    author: {
        username: string
        displayName: string
        avatar: string
    }
    submittedAt: string
    estimatedReviewTime: string
    images: string[]
    category: string
    tags: string[]
    reviewChecklist: {
        item: string
        status: "pending" | "passed" | "failed"
        note?: string
    }[]
}

export default function PendingSoftwarePage() {
    const params = useParams()
    const [software, setSoftware] = useState<PendingSoftware | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPendingSoftware = async () => {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 500))

            const mockSoftware: PendingSoftware = {
                id: "1",
                name: decodeURIComponent(params.software as string).replace(/-/g, " "),
                tagline: "A powerful software solution awaiting review",
                description: `This software is currently pending review by our moderation team. Once approved, it will be available for download by all users.

The review process ensures that all software meets our quality and security standards before being published to the platform.`,
                version: "1.0.0",
                status: "pending",
                author: {
                    username: params.username as string,
                    displayName: (params.username as string).charAt(0).toUpperCase() + (params.username as string).slice(1),
                    avatar: "/placeholder.svg?height=40&width=40",
                },
                submittedAt: "2024-01-22",
                estimatedReviewTime: "2-3 business days",
                images: [
                    "/placeholder.svg?height=400&width=600&text=Pending+Screenshot+1",
                    "/placeholder.svg?height=400&width=600&text=Pending+Screenshot+2",
                ],
                category: "Development",
                tags: ["productivity", "development", "tools"],
                reviewChecklist: [
                    {item: "Security scan", status: "pending"},
                    {item: "Code quality check", status: "pending"},
                    {item: "Documentation review", status: "pending"},
                    {item: "Functionality testing", status: "pending"},
                    {item: "UI/UX evaluation", status: "pending"},
                ],
            }

            setSoftware(mockSoftware)
            setLoading(false)
        }

        fetchPendingSoftware()
    }, [params])

    if (loading) {
        return (
            <div className="container mx-auto py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-muted rounded w-1/3"></div>
                        <div className="h-32 bg-muted rounded"></div>
                        <div className="h-64 bg-muted rounded"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (!software) {
        return (
            <div className="container mx-auto py-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-2xl font-bold mb-4">Software Not Found</h1>
                    <p className="text-muted-foreground">The pending software you're looking for doesn't exist.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold">{software.name}</h1>
                                <Badge
                                    variant="secondary"
                                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                >
                                    <Clock className="h-3 w-3 mr-1"/>
                                    Pending Review
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
                                    <span className="font-medium">{software.author.displayName}</span>
                                    <div className="text-sm text-muted-foreground">@{software.author.username}</div>
                                </div>
                            </div>

                            {/* Submission Info */}
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <span>Submitted: {software.submittedAt}</span>
                                <span>Version: {software.version}</span>
                                <span>Est. review time: {software.estimatedReviewTime}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 min-w-48">
                            <Button variant="outline" className="w-full">
                                <Edit className="h-4 w-4 mr-2"/>
                                Edit Submission
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Eye className="h-4 w-4 mr-2"/>
                                Preview
                            </Button>
                            <Button variant="destructive" className="w-full">
                                <Trash2 className="h-4 w-4 mr-2"/>
                                Withdraw
                            </Button>
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

                {/* Status Alert */}
                <Alert className="mb-6">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertDescription>
                        Your software is currently pending review. Our team will evaluate it
                        within {software.estimatedReviewTime}.
                        You'll receive an email notification once the review is complete.
                    </AlertDescription>
                </Alert>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Screenshots */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Screenshots</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    {software.images.map((image, index) => (
                                        <div key={index}
                                             className="aspect-video relative overflow-hidden rounded-lg border">
                                            <Image
                                                src={image || "/placeholder.svg"}
                                                alt={`Screenshot ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm max-w-none dark:prose-invert">
                                    {software.description.split("\n\n").map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Review Progress */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Review Progress</CardTitle>
                                <CardDescription>Track the status of your submission review</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {software.reviewChecklist.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            {item.status === "pending" && <Clock className="h-4 w-4 text-yellow-500"/>}
                                            {item.status === "passed" &&
                                                <CheckCircle className="h-4 w-4 text-green-500"/>}
                                            {item.status === "failed" && <XCircle className="h-4 w-4 text-red-500"/>}
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{item.item}</p>
                                                {item.note &&
                                                    <p className="text-xs text-muted-foreground">{item.note}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Submission Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Submission Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Status</span>
                                    <Badge variant="secondary">Pending</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Submitted</span>
                                    <span className="font-medium">{software.submittedAt}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Version</span>
                                    <span className="font-medium">{software.version}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Category</span>
                                    <span className="font-medium">{software.category}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Next Steps */}
                        <Card>
                            <CardHeader>
                                <CardTitle>What happens next?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-medium">
                                            1
                                        </div>
                                        <div>
                                            <p className="font-medium">Automated Security Scan</p>
                                            <p className="text-muted-foreground">
                                                Your software will be scanned for security vulnerabilities
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-medium">
                                            2
                                        </div>
                                        <div>
                                            <p className="font-medium">Manual Review</p>
                                            <p className="text-muted-foreground">Our team will review functionality and
                                                quality</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-medium">
                                            3
                                        </div>
                                        <div>
                                            <p className="font-medium">Approval or Feedback</p>
                                            <p className="text-muted-foreground">You'll receive approval or feedback for
                                                improvements</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
