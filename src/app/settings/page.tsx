"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Switch} from "@/components/ui/switch"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import {Checkbox} from "@/components/ui/checkbox"
import {ThemeToggle} from "@/components/theme-toggle"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertTriangle,
    Bell,
    Clock,
    Download,
    Key,
    Lock,
    Monitor,
    Palette,
    Plus,
    Save,
    Shield,
    Smartphone,
    Trash2,
    User,
    UserX,
} from "lucide-react"

interface Passkey {
    id: string
    name: string
    deviceType: "mobile" | "desktop" | "security-key"
    createdAt: string
    lastUsed: string
}

export default function SettingsPage() {
    const [profile, setProfile] = useState({
        username: "user123",
        email: "user@example.com",
        bio: "Software enthusiast and developer",
    })

    const [notifications, setNotifications] = useState({
        emailUpdates: true,
        pushNotifications: false,
        weeklyDigest: true,
        securityAlerts: true,
    })

    const [privacy, setPrivacy] = useState({
        profileVisibility: "public",
        showEmail: false,
        allowMessages: true,
    })

    const [passkeys, setPasskeys] = useState<Passkey[]>([
        {
            id: "1",
            name: "iPhone 15 Pro",
            deviceType: "mobile",
            createdAt: "2024-01-15",
            lastUsed: "2024-01-20",
        },
        {
            id: "2",
            name: "MacBook Pro",
            deviceType: "desktop",
            createdAt: "2024-01-10",
            lastUsed: "2024-01-19",
        },
    ])

    const [isCreatingPasskey, setIsCreatingPasskey] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [deleteStep, setDeleteStep] = useState(1)
    const [deleteConfirmation, setDeleteConfirmation] = useState("")
    const [deleteAcknowledgments, setDeleteAcknowledgments] = useState({
        dataLoss: false,
        noRecovery: false,
        downloadedData: false,
        finalConfirm: false,
    })
    const [isDeleting, setIsDeleting] = useState(false)

    const handleSave = () => {
        console.log("Settings saved:", {profile, notifications, privacy})
    }

    const createPasskey = async () => {
        setIsCreatingPasskey(true)
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
                    id: new TextEncoder().encode(profile.username),
                    name: profile.email,
                    displayName: profile.username,
                },
                pubKeyCredParams: [
                    {alg: -7, type: "public-key"},
                    {alg: -257, type: "public-key"},
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
                const newPasskey: Passkey = {
                    id: Date.now().toString(),
                    name: `New Device ${passkeys.length + 1}`,
                    deviceType: "desktop",
                    createdAt: new Date().toISOString().split("T")[0],
                    lastUsed: new Date().toISOString().split("T")[0],
                }
                setPasskeys([...passkeys, newPasskey])
            }
        } catch (err) {
            console.error("Error creating passkey:", err)
        } finally {
            setIsCreatingPasskey(false)
        }
    }

    const removePasskey = (id: string) => {
        setPasskeys(passkeys.filter((p) => p.id !== id))
    }

    const getDeviceIcon = (deviceType: string) => {
        switch (deviceType) {
            case "mobile":
                return <Smartphone className="h-4 w-4"/>
            case "desktop":
                return <Monitor className="h-4 w-4"/>
            case "security-key":
                return <Key className="h-4 w-4"/>
            default:
                return <Key className="h-4 w-4"/>
        }
    }

    const exportData = async () => {
        // Simulate data export
        const userData = {
            profile,
            downloads: ["Code Editor Pro", "Database Manager", "Task Manager"],
            favorites: ["Security Suite", "File Converter", "Screen Recorder"],
            settings: {notifications, privacy},
            exportDate: new Date().toISOString(),
        }

        const dataStr = JSON.stringify(userData, null, 2)
        const dataBlob = new Blob([dataStr], {type: "application/json"})
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `nxt-account-data-${new Date().toISOString().split("T")[0]}.json`
        link.click()
        URL.revokeObjectURL(url)
    }

    const verifyPasskeyForDeletion = async () => {
        try {
            const challenge = new Uint8Array(32)
            crypto.getRandomValues(challenge)

            const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
                challenge,
                timeout: 60000,
                userVerification: "required",
            }

            const credential = await navigator.credentials.get({
                publicKey: publicKeyCredentialRequestOptions,
            })

            if (credential) {
                setDeleteStep(2)
            }
        } catch (err) {
            console.error("Passkey verification failed:", err)
            alert("Passkey verification failed. Please try again.")
        }
    }

    const deleteAccount = async () => {
        setIsDeleting(true)
        try {
            // Simulate account deletion API call
            await new Promise((resolve) => setTimeout(resolve, 3000))

            // In a real app, this would redirect to a goodbye page or login
            alert("Account deleted successfully. You will be redirected to the homepage.")
            window.location.href = "/"
        } catch (err) {
            console.error("Account deletion failed:", err)
            alert("Account deletion failed. Please try again or contact support.")
        } finally {
            setIsDeleting(false)
        }
    }

    const canProceedToFinalStep = () => {
        return (
            deleteConfirmation === profile.username &&
            deleteAcknowledgments.dataLoss &&
            deleteAcknowledgments.noRecovery &&
            deleteAcknowledgments.downloadedData &&
            deleteAcknowledgments.finalConfirm
        )
    }

    const resetDeleteDialog = () => {
        setDeleteStep(1)
        setDeleteConfirmation("")
        setDeleteAcknowledgments({
            dataLoss: false,
            noRecovery: false,
            downloadedData: false,
            finalConfirm: false,
        })
        setDeleteDialogOpen(false)
    }

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Settings</h1>

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="passkeys">Passkeys</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="privacy">Privacy</TabsTrigger>
                        <TabsTrigger value="appearance">Appearance</TabsTrigger>
                        <TabsTrigger value="account">Account</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5"/>
                                    Profile Information
                                </CardTitle>
                                <CardDescription>Update your profile information and preferences</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            value={profile.username}
                                            onChange={(e) => setProfile({...profile, username: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={profile.bio}
                                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="passkeys">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Key className="h-5 w-5"/>
                                    Passkey Management
                                </CardTitle>
                                <CardDescription>Manage your passkeys for secure, passwordless
                                    authentication</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="bg-muted/50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">About Passkeys</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Passkeys are a secure, passwordless way to sign in. They use your device's
                                        built-in security (like
                                        Face ID, Touch ID, or Windows Hello) and are more secure than passwords.
                                    </p>
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <h4 className="font-medium">Add New Passkey</h4>
                                        <p className="text-sm text-muted-foreground">Create a new passkey for this
                                            device</p>
                                    </div>
                                    <Button onClick={createPasskey} disabled={isCreatingPasskey}>
                                        <Plus className="h-4 w-4 mr-2"/>
                                        {isCreatingPasskey ? "Creating..." : "Add Passkey"}
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-medium">Your Passkeys</h4>
                                    {passkeys.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <Key className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                                            <p>No passkeys configured</p>
                                            <p className="text-sm">Add a passkey to enable secure, passwordless
                                                sign-in</p>
                                        </div>
                                    ) : (
                                        passkeys.map((passkey) => (
                                            <div key={passkey.id}
                                                 className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    {getDeviceIcon(passkey.deviceType)}
                                                    <div>
                                                        <h5 className="font-medium">{passkey.name}</h5>
                                                        <div className="text-sm text-muted-foreground">
                                                            Created {passkey.createdAt} • Last used {passkey.lastUsed}
                                                        </div>
                                                    </div>
                                                </div>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="outline" size="sm">
                                                            <Trash2 className="h-4 w-4"/>
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Remove Passkey</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to remove "{passkey.name}"? You
                                                                won't be able to use this passkey
                                                                to sign in anymore.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => removePasskey(passkey.id)}>Remove</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {passkeys.length === 1 && (
                                    <div
                                        className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5"/>
                                        <div className="text-sm">
                                            <p className="font-medium text-yellow-800 dark:text-yellow-200">Only one
                                                passkey configured</p>
                                            <p className="text-yellow-700 dark:text-yellow-300">
                                                Consider adding a backup passkey to avoid being locked out of your
                                                account.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-5 w-5"/>
                                    Notification Preferences
                                </CardTitle>
                                <CardDescription>Choose what notifications you want to receive</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Email Updates</Label>
                                        <p className="text-sm text-muted-foreground">Receive updates about new software
                                            and features</p>
                                    </div>
                                    <Switch
                                        checked={notifications.emailUpdates}
                                        onCheckedChange={(checked) => setNotifications({
                                            ...notifications,
                                            emailUpdates: checked
                                        })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Push Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Get notified about important
                                            updates</p>
                                    </div>
                                    <Switch
                                        checked={notifications.pushNotifications}
                                        onCheckedChange={(checked) => setNotifications({
                                            ...notifications,
                                            pushNotifications: checked
                                        })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Weekly Digest</Label>
                                        <p className="text-sm text-muted-foreground">Weekly summary of new software and
                                            updates</p>
                                    </div>
                                    <Switch
                                        checked={notifications.weeklyDigest}
                                        onCheckedChange={(checked) => setNotifications({
                                            ...notifications,
                                            weeklyDigest: checked
                                        })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Security Alerts</Label>
                                        <p className="text-sm text-muted-foreground">Important security notifications
                                            (recommended)</p>
                                    </div>
                                    <Switch
                                        checked={notifications.securityAlerts}
                                        onCheckedChange={(checked) => setNotifications({
                                            ...notifications,
                                            securityAlerts: checked
                                        })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="privacy">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5"/>
                                    Privacy Settings
                                </CardTitle>
                                <CardDescription>Control your privacy and data sharing preferences</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Profile Visibility</Label>
                                    <Select
                                        value={privacy.profileVisibility}
                                        onValueChange={(value) => setPrivacy({...privacy, profileVisibility: value})}
                                    >
                                        <SelectTrigger>
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="public">Public</SelectItem>
                                            <SelectItem value="private">Private</SelectItem>
                                            <SelectItem value="friends">Friends Only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Show Email</Label>
                                        <p className="text-sm text-muted-foreground">Display your email on your public
                                            profile</p>
                                    </div>
                                    <Switch
                                        checked={privacy.showEmail}
                                        onCheckedChange={(checked) => setPrivacy({...privacy, showEmail: checked})}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Allow Messages</Label>
                                        <p className="text-sm text-muted-foreground">Let other users send you
                                            messages</p>
                                    </div>
                                    <Switch
                                        checked={privacy.allowMessages}
                                        onCheckedChange={(checked) => setPrivacy({...privacy, allowMessages: checked})}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="appearance">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Palette className="h-5 w-5"/>
                                    Appearance
                                </CardTitle>
                                <CardDescription>Customize the look and feel of the application</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Theme</Label>
                                        <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                                    </div>
                                    <ThemeToggle/>
                                </div>
                                <div className="space-y-2">
                                    <Label>Language</Label>
                                    <Select defaultValue="en">
                                        <SelectTrigger className="w-48">
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Español</SelectItem>
                                            <SelectItem value="fr">Français</SelectItem>
                                            <SelectItem value="de">Deutsch</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Timezone</Label>
                                    <Select defaultValue="utc">
                                        <SelectTrigger className="w-64">
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="utc">UTC</SelectItem>
                                            <SelectItem value="est">Eastern Time</SelectItem>
                                            <SelectItem value="pst">Pacific Time</SelectItem>
                                            <SelectItem value="cet">Central European Time</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="account">
                        <div className="space-y-6">
                            {/* Data Export */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Download className="h-5 w-5"/>
                                        Export Your Data
                                    </CardTitle>
                                    <CardDescription>Download a copy of your account data</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Download Account Data</p>
                                            <p className="text-sm text-muted-foreground">
                                                Export your profile, downloads, favorites, and settings
                                            </p>
                                        </div>
                                        <Button onClick={exportData} variant="outline">
                                            <Download className="h-4 w-4 mr-2"/>
                                            Export Data
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Account Deletion */}
                            <Card className="border-destructive/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-destructive">
                                        <UserX className="h-5 w-5"/>
                                        Delete Account
                                    </CardTitle>
                                    <CardDescription>Permanently delete your account and all associated
                                        data</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5"/>
                                                <div className="text-sm">
                                                    <p className="font-medium text-destructive mb-2">Warning: This
                                                        action cannot be undone</p>
                                                    <ul className="space-y-1 text-muted-foreground">
                                                        <li>• Your profile and account will be permanently deleted</li>
                                                        <li>• All your downloads, favorites, and settings will be lost
                                                        </li>
                                                        <li>• You will lose access to any software you've published</li>
                                                        <li>• This action cannot be reversed</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive" className="w-full">
                                                    <UserX className="h-4 w-4 mr-2"/>
                                                    Delete My Account
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-md">
                                                <DialogHeader>
                                                    <DialogTitle className="flex items-center gap-2 text-destructive">
                                                        <UserX className="h-5 w-5"/>
                                                        Delete Account
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        {deleteStep === 1 && "Verify your identity to proceed with account deletion"}
                                                        {deleteStep === 2 && "Confirm account deletion"}
                                                    </DialogDescription>
                                                </DialogHeader>

                                                {deleteStep === 1 && (
                                                    <div className="space-y-4">
                                                        <div className="bg-muted/50 p-4 rounded-lg">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Lock className="h-4 w-4"/>
                                                                <span className="font-medium">Security Verification Required</span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">
                                                                Please verify your identity using your passkey before
                                                                proceeding.
                                                            </p>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button variant="outline" onClick={resetDeleteDialog}>
                                                                Cancel
                                                            </Button>
                                                            <Button variant="destructive"
                                                                    onClick={verifyPasskeyForDeletion}>
                                                                <Key className="h-4 w-4 mr-2"/>
                                                                Verify with Passkey
                                                            </Button>
                                                        </DialogFooter>
                                                    </div>
                                                )}

                                                {deleteStep === 2 && (
                                                    <div className="space-y-4">
                                                        <div className="space-y-3">
                                                            <div>
                                                                <Label htmlFor="delete-confirmation">
                                                                    Type your username "{profile.username}" to confirm
                                                                </Label>
                                                                <Input
                                                                    id="delete-confirmation"
                                                                    value={deleteConfirmation}
                                                                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                                                                    placeholder={profile.username}
                                                                    className="mt-1"
                                                                />
                                                            </div>

                                                            <div className="space-y-3">
                                                                <div className="flex items-center space-x-2">
                                                                    <Checkbox
                                                                        id="data-loss"
                                                                        checked={deleteAcknowledgments.dataLoss}
                                                                        onCheckedChange={(checked) =>
                                                                            setDeleteAcknowledgments({
                                                                                ...deleteAcknowledgments,
                                                                                dataLoss: checked as boolean,
                                                                            })
                                                                        }
                                                                    />
                                                                    <Label htmlFor="data-loss" className="text-sm">
                                                                        I understand that all my data will be
                                                                        permanently deleted
                                                                    </Label>
                                                                </div>

                                                                <div className="flex items-center space-x-2">
                                                                    <Checkbox
                                                                        id="no-recovery"
                                                                        checked={deleteAcknowledgments.noRecovery}
                                                                        onCheckedChange={(checked) =>
                                                                            setDeleteAcknowledgments({
                                                                                ...deleteAcknowledgments,
                                                                                noRecovery: checked as boolean,
                                                                            })
                                                                        }
                                                                    />
                                                                    <Label htmlFor="no-recovery" className="text-sm">
                                                                        I understand this action cannot be undone
                                                                    </Label>
                                                                </div>

                                                                <div className="flex items-center space-x-2">
                                                                    <Checkbox
                                                                        id="downloaded-data"
                                                                        checked={deleteAcknowledgments.downloadedData}
                                                                        onCheckedChange={(checked) =>
                                                                            setDeleteAcknowledgments({
                                                                                ...deleteAcknowledgments,
                                                                                downloadedData: checked as boolean,
                                                                            })
                                                                        }
                                                                    />
                                                                    <Label htmlFor="downloaded-data"
                                                                           className="text-sm">
                                                                        I have exported any data I want to keep
                                                                    </Label>
                                                                </div>

                                                                <div className="flex items-center space-x-2">
                                                                    <Checkbox
                                                                        id="final-confirm"
                                                                        checked={deleteAcknowledgments.finalConfirm}
                                                                        onCheckedChange={(checked) =>
                                                                            setDeleteAcknowledgments({
                                                                                ...deleteAcknowledgments,
                                                                                finalConfirm: checked as boolean,
                                                                            })
                                                                        }
                                                                    />
                                                                    <Label htmlFor="final-confirm"
                                                                           className="text-sm font-medium">
                                                                        I want to permanently delete my account
                                                                    </Label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <DialogFooter>
                                                            <Button variant="outline" onClick={resetDeleteDialog}>
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                onClick={deleteAccount}
                                                                disabled={!canProceedToFinalStep() || isDeleting}
                                                            >
                                                                {isDeleting ? (
                                                                    <>
                                                                        <Clock className="h-4 w-4 mr-2 animate-spin"/>
                                                                        Deleting Account...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <UserX className="h-4 w-4 mr-2"/>
                                                                        Delete Account Permanently
                                                                    </>
                                                                )}
                                                            </Button>
                                                        </DialogFooter>
                                                    </div>
                                                )}
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="flex justify-end mt-6">
                    <Button onClick={handleSave} className="flex items-center gap-2">
                        <Save className="h-4 w-4"/>
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    )
}
