import OnboardingForm from "@/components/onboarding-form"

export default function OnboardingPage() {
    return (
        <div className="container mx-auto max-w-md py-12">
            <h1 className="text-3xl font-bold mb-6 text-center">Create Your Account</h1>
            <OnboardingForm/>
        </div>
    )
}
