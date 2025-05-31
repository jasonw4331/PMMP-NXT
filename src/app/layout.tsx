import type React from "react"
import "@/styles/globals.css"
import {Noto_Sans} from "next/font/google"
import LayoutWithSidebar from "@/components/layout-with-sidebar"
import {GitHubProvider} from "@/contexts/github-context"
import {ThemeProvider} from "@/components/theme-provider"

const Noto = Noto_Sans({subsets: ["latin"]})

export const metadata = {
    title: "NXT",
    description: "NXT Application Interface",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${Noto.className} bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <GitHubProvider>
                <LayoutWithSidebar>{children}</LayoutWithSidebar>
            </GitHubProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}
