import Stepper from "@/app/interview/component/stepper";
import { Card } from "../ui/card";

interface InterviewLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    description?: string;
    showStepper?: boolean;
    currentStep?: number;
}

export default function InterviewLayout({
    children,
    title = "Hirewithtess",
    subtitle = "Create an AI-Powered Interview in Seconds",
    description = "Enter the job details, and let AI generate tailored interview questions for you.",
    showStepper = true,
    currentStep = 1,
}: InterviewLayoutProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 text-center">
            {/* Title & Subtitle */}
            <h1 className="text-2xl font-semibold text-black">{title}</h1>
            <h2 className="text-3xl md:text-4xl font-bold mt-6">{subtitle}</h2>
            <p className="mt-4 text-gray-600 max-w-lg">{description}</p>

            {/* Stepper (Horizontally Centered) */}
            {showStepper && (
                <div className="flex justify-center mt-6 w-full">
                    <Stepper currentStep={currentStep} />
                </div>
            )}

            {/* Main Content (Centered Card) */}
            <Card className="w-full max-w-4xl mt-6 p-6 md:p-8">
                <main className="flex flex-1 items-center justify-center">{children}</main>
            </Card>
        </div>
    );
}
