const softwareTemplates = [
    {
        name: "Code Editor Pro",
        tagline: "Lightning-fast code editing with AI assistance",
        hasDownload: true,
    },
    {
        name: "Database Manager",
        tagline: "Manage your databases with ease",
        hasDownload: true,
    },
    {
        name: "Cloud Storage",
        tagline: "Secure cloud storage for your files",
        hasDownload: false,
    },
    {
        name: "Task Manager",
        tagline: "Stay organized and boost productivity",
        hasDownload: true,
    },
    {
        name: "Security Suite",
        tagline: "Complete protection for your system",
        hasDownload: true,
    },
    {
        name: "Network Monitor",
        tagline: "Real-time network performance tracking",
        hasDownload: false,
    },
    {
        name: "Backup Solution",
        tagline: "Never lose your important data",
        hasDownload: true,
    },
    {
        name: "System Optimizer",
        tagline: "Keep your system running at peak performance",
        hasDownload: true,
    },
    {
        name: "File Converter",
        tagline: "Convert files to any format instantly",
        hasDownload: true,
    },
    {
        name: "Screen Recorder",
        tagline: "Professional screen recording made simple",
        hasDownload: true,
    },
    {
        name: "Photo Editor",
        tagline: "Professional photo editing made simple",
        hasDownload: true,
    },
    {
        name: "Video Player",
        tagline: "High-quality video playback for all formats",
        hasDownload: true,
    },
    {
        name: "Music Studio",
        tagline: "Create and edit music with professional tools",
        hasDownload: false,
    },
    {
        name: "Web Browser",
        tagline: "Fast and secure web browsing experience",
        hasDownload: true,
    },
    {
        name: "Email Client",
        tagline: "Manage all your emails in one place",
        hasDownload: true,
    },
]

export interface SoftwareItem {
    id: string
    name: string
    tagline: string
    image: string
    hasDownload: boolean
}

let currentId = 1

export function generateSoftwareItems(count: number): SoftwareItem[] {
    const items: SoftwareItem[] = []

    for (let i = 0; i < count; i++) {
        const template = softwareTemplates[i % softwareTemplates.length]
        const variation = Math.floor(i / softwareTemplates.length) + 1

        items.push({
            id: `software-${currentId++}`,
            name: variation > 1 ? `${template.name} ${variation}` : template.name,
            tagline: template.tagline,
            image: `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(template.name)}`,
            hasDownload: template.hasDownload,
        })
    }

    return items
}

export async function fetchSoftwareItems(page: number, limit = 10): Promise<SoftwareItem[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400))

    return generateSoftwareItems(limit)
}
