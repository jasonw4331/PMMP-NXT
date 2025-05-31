"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"
import {
    AlertCircle,
    BarChart3,
    CheckCircle,
    Download,
    Package,
    Settings,
    Star,
    Terminal,
    Upload,
    Users,
} from "lucide-react"

export default function DeveloperConsolePage() {
    const [projects] = useState([
        {
            id: 1,
            name: "Code Editor Pro",
            status: "published",
            downloads: 1250,
            rating: 4.8,
            lastUpdate: "2024-01-15",
        },
        {
            id: 2,
            name: "Database Manager",
            status: "review",
            downloads: 0,
            rating: 0,
            lastUpdate: "2024-01-20",
        },
    ])

    const [analytics] = useState({
        totalDownloads: 1250,
        totalUsers: 890,
        avgRating: 4.8,
        totalProjects: 2,
    })

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-2 mb-8">
                    <Terminal className="h-8 w-8"/>
                    <h1 className="text-3xl font-bold">Developer Console</h1>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="text-2xl font-bold">{analytics.totalDownloads}</div>
                            <p className="text-sm text-muted-foreground">Total Downloads</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
                            <p className="text-sm text-muted-foreground">Active Users</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="text-2xl font-bold">{analytics.avgRating}</div>
                            <p className="text-sm text-muted-foreground">Avg Rating</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="text-2xl font-bold">{analytics.totalProjects}</div>
                            <p className="text-sm text-muted-foreground">Projects</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="projects" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="projects">My Projects</TabsTrigger>
                        <TabsTrigger value="upload">Upload New</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="projects">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-5 w-5"/>
                                    My Projects
                                </CardTitle>
                                <CardDescription>Manage your published software</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {projects.map((project) => (
                                        <div key={project.id}
                                             className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-medium">{project.name}</h3>
                                                    <Badge
                                                        variant={project.status === "published" ? "default" : "secondary"}
                                                        className="flex items-center gap-1"
                                                    >
                                                        {project.status === "published" ? (
                                                            <CheckCircle className="h-3 w-3"/>
                                                        ) : (
                                                            <AlertCircle className="h-3 w-3"/>
                                                        )}
                                                        {project.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Download className="h-4 w-4"/>
                                                        {project.downloads} downloads
                                                    </div>
                                                    {project.rating > 0 && (
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-4 w-4"/>
                                                            {project.rating} rating
                                                        </div>
                                                    )}
                                                    <span>Updated {project.lastUpdate}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline">
                                                    Edit
                                                </Button>
                                                <Button size="sm">View</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="upload">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Upload className="h-5 w-5"/>
                                    Upload New Software
                                </CardTitle>
                                <CardDescription>Submit your software for review and publication</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Software Name</Label>
                                        <Input id="name" placeholder="Enter software name"/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="version">Version</Label>
                                        <Input id="version" placeholder="1.0.0"/>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" placeholder="Describe what your software does..."
                                              rows={4}/>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input id="category" placeholder="e.g., Development, Productivity"/>
                                </div>

                                <div className="space-y-2">
                                    <Label>Software Package</Label>
                                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4"/>
                                        <p className="text-muted-foreground">
                                            Drag and drop your software package here, or click to browse
                                        </p>
                                        <Button variant="outline" className="mt-4">
                                            Choose File
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button className="flex-1">Submit for Review</Button>
                                    <Button variant="outline">Save Draft</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="analytics">
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BarChart3 className="h-5 w-5"/>
                                        Download Analytics
                                    </CardTitle>
                                    <CardDescription>Track your software's performance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64 flex items-center justify-center border rounded-lg">
                                        <p className="text-muted-foreground">Analytics chart would go here</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5"/>
                                        User Engagement
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">890</div>
                                            <p className="text-sm text-muted-foreground">Active Users</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">4.8</div>
                                            <p className="text-sm text-muted-foreground">Avg Rating</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">95%</div>
                                            <p className="text-sm text-muted-foreground">Satisfaction</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="settings">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="h-5 w-5"/>
                                    Developer Settings
                                </CardTitle>
                                <CardDescription>Configure your developer account</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="dev-name">Developer Name</Label>
                                    <Input id="dev-name" defaultValue="John Smith"/>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company">Company/Organization</Label>
                                    <Input id="company" placeholder="Optional"/>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="website">Website</Label>
                                    <Input id="website" placeholder="https://yourwebsite.com"/>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Developer Bio</Label>
                                    <Textarea id="bio" placeholder="Tell users about yourself and your software..."
                                              rows={4}/>
                                </div>

                                <Button>Save Settings</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
