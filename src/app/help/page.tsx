"use client"

import {useState} from "react"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Book, ExternalLink, Mail, MessageCircle, Search} from "lucide-react"

const faqData = [
    {
        id: "1",
        question: "How do I download software from NXT?",
        answer:
            "To download software, simply browse our catalog, click on the software you want, and click the 'Download' button. Make sure you have sufficient storage space and meet the system requirements.",
        category: "Downloads",
    },
    {
        id: "2",
        question: "Is all software on NXT free?",
        answer:
            "Most software on NXT is free to use. Some premium software may require a license or subscription. This will be clearly marked on the software's page.",
        category: "Pricing",
    },
    {
        id: "3",
        question: "How do I create an account?",
        answer:
            "Click the 'Sign In' button in the user menu and select 'Create Account'. You can sign up using your email or link your GitHub account for additional developer features.",
        category: "Account",
    },
    {
        id: "4",
        question: "What are the system requirements?",
        answer:
            "System requirements vary by software. Each software page lists the minimum requirements. Generally, you'll need a modern operating system and sufficient RAM and storage.",
        category: "Technical",
    },
    {
        id: "5",
        question: "How do I report a bug or issue?",
        answer:
            "You can report bugs through the 'Send Feedback' option in the user menu, or contact our support team directly. Please include as much detail as possible about the issue.",
        category: "Support",
    },
    {
        id: "6",
        question: "Can I contribute software to NXT?",
        answer:
            "Yes! If you're a developer, you can submit your software for review. Link your GitHub account to access developer tools and submission features.",
        category: "Development",
    },
]

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")

    const categories = ["all", "Downloads", "Pricing", "Account", "Technical", "Support", "Development"]

    const filteredFAQ = faqData.filter((item) => {
        const matchesSearch =
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4">Help Center</h1>
                    <p className="text-muted-foreground">Find answers to common questions and get support</p>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        placeholder="Search for help..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category === "all" ? "All Topics" : category}
                        </Button>
                    ))}
                </div>

                {/* Quick Links */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Book className="h-5 w-5"/>
                                Documentation
                            </CardTitle>
                            <CardDescription>Comprehensive guides and tutorials</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" size="sm" className="w-full">
                                View Docs <ExternalLink className="h-4 w-4 ml-2"/>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <MessageCircle className="h-5 w-5"/>
                                Community Forum
                            </CardTitle>
                            <CardDescription>Connect with other users and developers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" size="sm" className="w-full">
                                Visit Forum <ExternalLink className="h-4 w-4 ml-2"/>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Mail className="h-5 w-5"/>
                                Contact Support
                            </CardTitle>
                            <CardDescription>Get direct help from our support team</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" size="sm" className="w-full">
                                Contact Us <ExternalLink className="h-4 w-4 ml-2"/>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* FAQ */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                    {filteredFAQ.length > 0 ? (
                        <Accordion type="single" collapsible className="space-y-2">
                            {filteredFAQ.map((item) => (
                                <AccordionItem key={item.id} value={item.id} className="border rounded-lg px-4">
                                    <AccordionTrigger className="text-left">
                                        <div className="flex items-center gap-2">
                                            <span>{item.question}</span>
                                            <Badge variant="secondary" className="text-xs">
                                                {item.category}
                                            </Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No results found for your search.</p>
                            <p className="text-sm text-muted-foreground mt-2">Try different keywords or browse all
                                topics.</p>
                        </div>
                    )}
                </div>

                {/* Contact Section */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Still need help?</CardTitle>
                        <CardDescription>Can't find what you're looking for? Our support team is here to
                            help.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <Button>
                                <Mail className="h-4 w-4 mr-2"/>
                                Email Support
                            </Button>
                            <Button variant="outline">
                                <MessageCircle className="h-4 w-4 mr-2"/>
                                Live Chat
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
