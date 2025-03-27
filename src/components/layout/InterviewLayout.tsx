import Stepper from "@/app/interview/component/stepper";
import { Card } from "../ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface InterviewLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    description?: string;
    showTitle?: boolean;
    showStepper?: boolean;
    currentStep?: number;
    showGoogleLogin?: boolean;
    useCard?: boolean;
    buttons?: { label: string; onClick: () => void }[];
    titleClassName?: string;
    subtitleClassName?: string;
    descriptionClassName?: string;
}

export default function InterviewLayout({
                                            children,
                                            title = "Hirewithtess",
                                            subtitle = "Create an AI-Powered Interview in Seconds",
                                            description = "Enter the job details, and let AI generate tailored interview questions for you.",
                                            showTitle = true,
                                            showStepper = true,
                                            currentStep = 1,
                                            showGoogleLogin = false,
                                            useCard = true,
                                            buttons = [],
                                            titleClassName = "text-[30px] font-normal text-black font-roboto",
                                            subtitleClassName = "font-bold text-[34px] md:text-4xl mt-6 font-roboto",
                                            descriptionClassName = "mt-4 text-[18px] font-normal text-[#6F6C90] max-w-2xl font-roboto"
                                        }: InterviewLayoutProps) {

    const Content = (
        <div className="w-full p-6 md:p-8 flex flex-col items-center">
            {showStepper && (
                <div className="flex flex-col items-center w-full mt-2">
                    <div className="flex justify-center w-full max-w-3xl">
                        <Stepper currentStep={currentStep} />
                    </div>
                    <hr className="w-full border-t border-gray-300 mt-4" />
                </div>
            )}

            {/* Main Content */}
            <div className="w-full">{children}</div>

            {buttons.length > 0 && (
                <div className="flex justify-end gap-2 mt-6 w-full">
                    {buttons.map((btn, index) => (
                        <Button key={index} onClick={btn.onClick} className="w-40 cursor-pointer">
                            {btn.label}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center px-6 md:px-20 py-4 text-center">

            <div>
                {showTitle && <h1 className={titleClassName}>{title}</h1>}
                <h2 className={subtitleClassName}>{subtitle}</h2>
                <p className={descriptionClassName}>{description}</p>
            </div>

            {showGoogleLogin && (
                <Button
                    className="w-[528px] h-[64px] font-normal bg-transparent rounded-2xl mt-10 text-black hover:bg-transparent border-2 border-solid border-gray-500 flex items-center justify-center gap-2"
                >
                    <Image src="/images/google.png" alt="Google Icon" width={20} height={20} />
                    Continue with Google
                </Button>
            )}

            {useCard ? <Card className="w-full mt-8">{Content}</Card> : Content}
        </div>
    );
}
