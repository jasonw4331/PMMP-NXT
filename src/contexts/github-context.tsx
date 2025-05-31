"use client"

import {createContext, type ReactNode, useContext, useState} from "react"

interface GitHubContextType {
    isGitHubLinked: boolean
    setIsGitHubLinked: (value: boolean) => void
}

const GitHubContext = createContext<GitHubContextType | undefined>(undefined)

export function GitHubProvider({children}: { children: ReactNode }) {
    const [isGitHubLinked, setIsGitHubLinked] = useState(false)

    return <GitHubContext.Provider value={{isGitHubLinked, setIsGitHubLinked}}>{children}</GitHubContext.Provider>
}

export function useGitHub() {
    const context = useContext(GitHubContext)
    if (context === undefined) {
        throw new Error("useGitHub must be used within a GitHubProvider")
    }
    return context
}
