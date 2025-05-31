"use client"

import {useEffect, useState} from "react"
import {useParams} from "next/navigation"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Alert, AlertDescription} from "@/components/ui/alert"
import {Progress} from "@/components/ui/progress"
import {AlertCircle, CheckCircle, Clock, Edit, Eye, FileText, MessageSquare, Search, XCircle} from "lucide-react"
import Image from "next/image"

interface ReviewingSoftware {
    id: string
    name: string
    tagline: string
    description: string
    version: string
    status: "reviewing"
    author: {
        username: string
        displayName: string
        avatar: string
    }
    submittedAt: string
    reviewStartedAt: string
    estimatedCompletion: string
    images: string[]
    category: string
    tags: string[]
    reviewProgress: number
    reviewSteps: {
        step: string
        status: "completed" | "in-progress" | "pending"
        completedAt?: string
        reviewer?: string
        notes?: string
    }[]
    feedback: {
        id: string
        reviewer: string
        message: string
        timestamp: string
        type: "info" | "warning" | "error"
    }[]
}

export default function ReviewingSoftwarePage() {
    const params = useParams()
    const [software, setSoftware] = useState<ReviewingSoftware | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReviewingSoftware = async () => {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 500))

            const mockSoftware: ReviewingSoftware = {
                id: "1",
                name: decodeURIComponent(params.software as string).replace(/-/g, " "),
                tagline: "A powerful software solution currently under review",
                description: `This software is currently being reviewed by our moderation team. The review process includes security scanning, functionality testing, and quality assurance.

Our reviewers are carefully evaluating all aspects of the software to ensure it meets our platform standards.`,
                version: "1.0.0",
                status: "reviewing",
                author: {
                    username: params.username as string,
                    displayName: (params.username as string).charAt(0).toUpperCase() + (params.username as string).slice(1),
                    avatar: "/placeholder.svg?height=40&width=40",
                },
                submittedAt: "2024-01-20",
                reviewStartedAt: "2024-01-21",
                estimatedCompletion: "2024-01-24",
                images: [
                    "/placeholder.svg?height=400&width=600&text=Review+Screenshot+1",
                    "/placeholder.svg?height=400&width=600&text=Review+Screenshot+2",
                ],
                category: "Development",
                tags: ["productivity", "development", "tools"],
                reviewProgress: 65,
                reviewSteps: [
                    {
                        step: "Initial submission review",
                        status: "completed",
                        completedAt: "2024-01-21 10:30",
                        reviewer: "ReviewBot",
                    },
                    {
                        step: "Security vulnerability scan",
                        status: "completed",
                        completedAt: "2024-01-21 11:15",
                        reviewer: "SecurityBot",
                        notes: "No critical vulnerabilities found",
                    },
                    {
                        step: "Code quality analysis",
                        status: "completed",
                        completedAt: "2024-01-21 14:20",
                        reviewer: "QualityBot",
                        notes: "Code quality score: 8.5/10",
                    },
                    {
                        step: "Functionality testing",
                        status: "in-progress",
                        reviewer: "TestingTeam",
                    },
                    {
                        step: "UI/UX evaluation",
                        status: "pending",
                    },
                    {
                        step: "Final approval",
                        status: "pending",
                    },
                ],
                feedback: [
                    {
                        id: "1",
                        reviewer: "SecurityBot",
                        message: "Security scan completed successfully. No critical vulnerabilities detected.",
                        timestamp: "2024-01-21 11:15",
                        type: "info",
                    },
                    {
                        id: "2",
                        reviewer: "QualityBot",
                        message: "Code quality analysis complete. Consider improving documentation for better maintainability.",
                        timestamp: "2024-01-21 14:20",
                        type: "warning",
                    },
                    {
                        id: "3",
                        reviewer: "TestingTeam",
                        message: "Currently testing core functionality. Initial tests look promising.",
                        timestamp: "2024-01-22 09:30",
                        type: "info",
                    },
                ],
            }

            setSoftware(mockSoftware)
            setLoading(false)
        }

        fetchReviewingSoftware()
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
                    <p className="text-muted-foreground">The software under review you're looking for doesn't exist.</p>
                </div>
            </div>
        )
    }

    const getStepIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="h-4 w-4 text-green-500"/>
            case "in-progress":
                return <Clock className="h-4 w-4 text-blue-500"/>
            case "pending":
                return <Clock className="h-4 w-4 text-gray-400"/>
            default:
                return <Clock className="h-4 w-4 text-gray-400"/>
        }
    }

    const getFeedbackIcon = (type: string) => {
        switch (type) {
            case "info":
                return <AlertCircle className="h-4 w-4 text-blue-500"/>
            case "warning":
                return <AlertCircle className="h-4 w-4 text-yellow-500"/>
            case "error":
                return <XCircle className="h-4 w-4 text-red-500"/>
            default:
                return <AlertCircle className="h-4 w-4 text-blue-500"/>
        }
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
                                <Badge variant="default" className="bg-blue-600">
                                    <Search className="h-3 w-3 mr-1"/>
                                    Under Review
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

                            {/* Review Info */}
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <span>Submitted: {software.submittedAt}</span>
                                <span>Review started: {software.reviewStartedAt}</span>
                                <span>Est. completion: {software.estimatedCompletion}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 min-w-48">
                            <Button variant="outline" className="w-full" disabled>
                                <Edit className="h-4 w-4 mr-2"/>
                                Edit (Locked)
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Eye className="h-4 w-4 mr-2"/>
                                Preview
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
                    <Search className="h-4 w-4"/>
                    <AlertDescription>
                        Your software is currently under review by our team. The review is {software.reviewProgress}%
                        complete.
                        Estimated completion: {software.estimatedCompletion}.
                    </AlertDescription>
                </Alert>

                {/* Review Progress */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Review Progress</CardTitle>
                        <CardDescription>{software.reviewProgress}% complete</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Progress value={software.reviewProgress} className="mb-4"/>
                        <div className="space-y-4">
                            {software.reviewSteps.map((step, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    {getStepIcon(step.status)}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium">{step.step}</p>
                                            {step.completedAt && <span
                                                className="text-xs text-muted-foreground">{step.completedAt}</span>}
                                        </div>
                                        {step.reviewer &&
                                            <p className="text-sm text-muted-foreground">Reviewer: {step.reviewer}</p>}
                                        {step.notes &&
                                            <p className="text-sm text-blue-600 dark:text-blue-400">{step.notes}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

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
                        {/* Review Feedback */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5"/>
                                    Review Feedback
                                </CardTitle>
                                <CardDescription>Messages from our review team</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {software.feedback.map((feedback) => (
                                        <div key={feedback.id} className="border-l-2 border-muted pl-4">
                                            <div className="flex items-start gap-2 mb-1">
                                                {getFeedbackIcon(feedback.type)}
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-medium text-sm">{feedback.reviewer}</span>
                                                        <span
                                                            className="text-xs text-muted-foreground">{feedback.timestamp}</span>
                                                    </div>
                                                    <p className="text-sm mt-1">{feedback.message}</p>
                                                </div>
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
                                    <Badge variant="default">Under Review</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Submitted</span>
                                    <span className="font-medium">{software.submittedAt}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Review Started</span>
                                    <span className="font-medium">{software.reviewStartedAt}</span>
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

                        {/* Help */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Need Help?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start">
                                        <FileText className="h-4 w-4 mr-2"/>
                                        Review Guidelines
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        <MessageSquare className="h-4 w-4 mr-2"/>
                                        Contact Support
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
