'use client'
import InterviewLayout from "@/components/layout/InterviewLayout";
import { Button } from "@/components/ui/button";
import SignupForm from "../interview/component/signupform";
import Image from "next/image";
import React from "react";
import useGoogleLoginHook from "@/hooks/GoogleLogin.hook";

export default function Signup() {
    const GoogleLoginMutation = useGoogleLoginHook();
    return (
        <InterviewLayout
            showTitle={false}
            subtitle="Sign Up to Share Your AI-Generated Interview"
            description="Get started with a 60-day free trial - no credit required!"
            showStepper={false}
            showGoogleLogin={false}
            useCard={false}
            subtitleClassName="font-[roboto] font-medium text-[30px] mt-6"
            descriptionClassName="font-[roboto] font-medium text-[24px] text-[#606778] mt-4"
        >
            <div className="flex justify-center">
                <Button
                    onClick={() => GoogleLoginMutation.mutate(
                        {accessToken:""}
                    )}
                    className="w-[528px] h-[64px]  border-r-[14px] border-[1px] font-[roboto] font-normal bg-transparent rounded-2xl mt-10 text-black
                               hover:bg-transparent border-solid border-gray-500 flex items-center justify-center gap-2"
                >
                    <Image src="/images/google.png" alt="Google Icon" width={20} height={20} />
                    Continue with Google
                </Button>
            </div>

            <div className="w-full flex justify-center">
                <div className="w-full mt-4 mb-8">
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-full h-1 my-8 bg-gray-200 border-0 rounded-sm dark:bg-gray-700"/>
                        <div className="absolute px-4 -translate-x-1/2 bg-white text-gray-600 left-1/2 dark:bg-gray-900">
                            Or
                        </div>
                    </div>
                    <SignupForm/>
                </div>
            </div>
        </InterviewLayout>
    );
}
