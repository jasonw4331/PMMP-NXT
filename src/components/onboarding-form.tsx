"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import useMultiStepForm from "@/lib/use-multi-step-form"
import {CheckCircle2, Github} from "lucide-react"
import {useGitHub} from "@/contexts/github-context"

export default function OnboardingForm() {
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")
    const {setIsGitHubLinked} = useGitHub()

    const {currentStepIndex, step, isFirstStep, isLastStep, back, next} = useMultiStepForm([
        <UsernameStep key="username" username={username} setUsername={setUsername}/>,
        <PasskeyStep key="passkey" username={username}/>,
        <GitHubLinkStep key="github" setIsGitHubLinked={setIsGitHubLinked}/>,
        <SuccessStep key="success" username={username}/>,
    ])

    const handleNext = () => {
        if (currentStepIndex === 0 && username.trim() === "") {
            setError("Username is required")
            return
        }
        setError("")
        next()
    }

    return (
        <Card className="w-full bg-card border-border">
            <CardHeader>
                <CardTitle className="text-card-foreground">
                    {isLastStep ? "Account Created" : `Step ${currentStepIndex + 1}`}
                </CardTitle>
            </CardHeader>
            <CardContent>{step}</CardContent>
            <CardFooter className="flex justify-between">
                {!isFirstStep && (
                    <Button variant="outline" onClick={back}>
                        Back
                    </Button>
                )}
                {!isLastStep && <Button onClick={handleNext}>{currentStepIndex === 2 ? "Finish" : "Next"}</Button>}
            </CardFooter>
            {error && <p className="text-destructive text-sm mt-2 text-center pb-4">{error}</p>}
        </Card>
    )
}

function UsernameStep({username, setUsername}: { username: string; setUsername: (username: string) => void }) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">
                    Choose a username
                </Label>
                <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-background border-input text-foreground"
                />
            </div>
        </div>
    )
}

function PasskeyStep({username}: { username: string }) {
    const [isCreating, setIsCreating] = useState(false)

    const createPasskey = async () => {
        setIsCreating(true)
        try {
            const challenge = new Uint8Array(32)
            crypto.getRandomValues(challenge)

            const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
                challenge,
                rp: {
                    name: "NXT",
                    id: window.location.hostname,
                },
                user: {
                    id: new TextEncoder().encode(username),
                    name: username,
                    displayName: username,
                },
                pubKeyCredParams: [
                    {alg: -7, type: "public-key"}, // ES256
                    {alg: -257, type: "public-key"}, // RS256
                ],
                authenticatorSelection: {
                    authenticatorAttachment: "platform",
                    userVerification: "required",
                    residentKey: "required",
                },
                timeout: 60000,
                attestation: "direct",
            }

            const credential = await navigator.credentials.create({
                publicKey: publicKeyCredentialCreationOptions,
            })

            if (credential) {
                console.log("Passkey created successfully:", credential)
            }
        } catch (err) {
            console.error("Error creating passkey:", err)
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <div className="space-y-4">
            <p className="text-foreground">
                Create a passkey for your account. This will be used to sign in securely without a password.
            </p>
            <Button onClick={createPasskey} disabled={isCreating}>
                {isCreating ? "Creating Passkey..." : "Create Passkey"}
            </Button>
        </div>
    )
}

function GitHubLinkStep({setIsGitHubLinked}: { setIsGitHubLinked: (value: boolean) => void }) {
    const [isLinking, setIsLinking] = useState(false)

    const linkGitHub = async () => {
        setIsLinking(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsGitHubLinked(true)
        setIsLinking(false)
    }

    return (
        <div className="space-y-4">
            <p className="text-foreground">Link your GitHub account to unlock developer options.</p>
            <Button onClick={linkGitHub} disabled={isLinking}>
                <Github className="mr-2 h-4 w-4"/>
                {isLinking ? "Linking GitHub..." : "Link GitHub Account"}
            </Button>
            <p className="text-sm text-muted-foreground">
                You can skip this step if you don't want to link your GitHub account.
            </p>
        </div>
    )
}

function SuccessStep({username}: { username: string }) {
    return (
        <div className="text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto"/>
            <p className="text-xl font-semibold text-foreground">Welcome, {username}!</p>
            <p className="text-muted-foreground">Your account has been created successfully.</p>
        </div>
    )
}
