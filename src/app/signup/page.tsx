'use client'
import { Button } from "@/components/ui/button";
import SignupForm from "../interview/component/signupform";
import Image from "next/image";
import React from "react";
import useGoogleLoginHook from "@/hooks/GoogleLogin.hook";

export default function Signup() {
    const GoogleLoginMutation = useGoogleLoginHook();
    return (

        <>
            <div className="flex flex-col justify-center">
                <h1 className="font-[roboto] font-medium text-[30px] mt-6 w-[607px]">Sign Up to Share Your AI-Generated Interview</h1>
                <p className="font-[roboto] font-medium text-[24px] leading-[24px] text-[#606778] mt-4 w-[642px]">Get started with a 60-day free trial - no credit required!</p>
                <Button
                    onClick={() => GoogleLoginMutation.mutate(
                        {accessToken:""}
                    )}
                    className="w-[528px] h-[64px] border-r-[14px] rounded-[14px] border-[1px] font-[roboto] font-normal bg-transparent text-black
                               hover:bg-transparent border-gray-400 flex items-center justify-center gap-2"
                >
                    <Image src="/images/google.png" alt="Google Icon" width={20} height={20} />
                    Continue with Google
                </Button>
            </div>


                <div className="w-full mt-4 mb-8">
                    <div className="relative flex items-center justify-center w-full">
                        <hr className="w-full h-[1px] my-8 mb-4 bg-[#CBCAD7] border-0 rounded-sm dark:bg-gray-700" />
                        <div className="absolute px-4 font-[Open Sans] font-normal text-[18px] space-x-[28px] bg-white text-gray-600 left-1/2 transform -translate-x-1/2 dark:bg-gray-900">
                            Or
                        </div>
                    </div>

                    <SignupForm/>
                </div>

        </>
    );
}
