import Stepper from "@/app/interview/component/stepper";
import {Card} from "../ui/card";
import React from "react";
import {Button} from "@/components/ui/button";
import Image from "next/image";


interface InterviewLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    description?: string;
    showStepper?: boolean;
    currentStep?: number;
    showGoogleLogin?: boolean;
    useCard?: boolean;
    buttons?: { label: string; onClick: () => void }[];
}

export default function InterviewLayout({
                                            children,
                                            title = "Hirewithtess",
                                            subtitle = "Create an AI-Powered Interview in Seconds",
                                            description = "Enter the job details, and let AI generate tailored interview questions for you.",
                                            showStepper = true,
                                            currentStep = 1,
                                            showGoogleLogin = true,
                                            useCard = true, // Default to using Card
                                            buttons = [],
                                        }: InterviewLayoutProps) {
    const Content = (
        <div className="w-full p-6 md:p-8 flex flex-col items-center">
            {showStepper && (
                <div className="flex flex-col items-center w-full mt-2">
                    <div className="flex justify-center w-full max-w-3xl">
                        <Stepper currentStep={currentStep}/>
                    </div>
                    <hr className="w-full border-t border-gray-300 mt-4"/>
                </div>
            )}

            {/* Main Content */}
            <div className="w-full">{children}</div>

            {buttons.length > 0 && (
                <div className="flex justify-end gap-2 mt-6 w-full">
                    {buttons.map((btn, index) => (
                        <Button key={index} onClick={btn.onClick} className="w-40">
                            {btn.label}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center px-6 md:px-20 py-4 text-center">
            <h1 className="text-[30px] font-normal text-black">{title}</h1>
            <h2 className="font-bold text-[34px] md:text-4xl mt-6">{subtitle}</h2>
            <p className="mt-4 text-[18px] font-normal text-[#6F6C90] max-w-2xl">{description}</p>

            {showGoogleLogin && (
                <Button
                    className="w-80 bg-transparent mt-6 text-black hover:bg-transparent border-2 border-solid border-gray-500 flex items-center justify-center gap-2">
                    <Image src="/images/google.png" alt="Google Icon" width={20} height={20}/>
                    Continue with Google
                </Button>
            )}

            {useCard ? <Card className="w-full mt-8">{Content}</Card> : Content}
        </div>
    );
}
