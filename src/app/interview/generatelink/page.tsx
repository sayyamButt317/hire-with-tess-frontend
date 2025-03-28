"use client";
import InterviewLayout from "@/components/layout/InterviewLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Copy, } from "lucide-react";
import useFetchInterviewLink from "@/hooks/FetchInterviewLink.hook";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function GenerateLink() {
    const { data, } = useFetchInterviewLink();
    const [copied, setCopied] = useState(false);
    const interviewLink = data?.interview_link || "";

    console.log(data);
    const handleCopy = () => {
        if (!interviewLink) return;
        navigator.clipboard.writeText(interviewLink);
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };


    return (
        <InterviewLayout
            subtitle="Your AI Interview is Ready!"
            description="Share the Interview link with candidates and start collecting responses"
            subtitleClassName="font-roboto font-bold text-[34px] mt-6"
            descriptionClassName="font-roboto font-normal text-[18px] mt-4 text-[#6F6C90]"
            currentStep={4}
            useCard={false}
        >
            <div className="mt-8">
                <h1 className="font-[roboto] leading-[46px] font-bold text-[24px] ">Interview Link</h1>
                <p className="font-[Open Sans] font-normal text-[16px] leading[16px] text-center text-[#6F6C90] mt-2">
                    Copy and share the link with candidates
                </p>
                <div className="flex items-center max-w-[483px] mx-auto mt-6 relative">
                    <Input
                        value={interviewLink}
                        readOnly
                        className="pr-12 text-[#4A3AFF] w-[438px] h-[65px] underline cursor-default"
                    />
                    <Button
                        type="button"
                        variant="outline"
                        className="absolute right-13 top-1/2 transform -translate-y-1/2 rounded-[14px] border-[1px]"
                        onClick={handleCopy}
                    >

                        <Copy size={20} className={copied ? "text-blue-500 bg-tra" : ""}  />
                    </Button>
                </div>
                <div className="m-18 mb-8">
                    <hr></hr>
                </div>
                <div className="items-center text-center flex flex-col ">
                    <h1 className="w-[680px] h-[46px] font-[roboto] text-[24px] leading-[46px] font-bold ">QR Code</h1>
                    <p className="w-[427px] h-[30px] font-[Open Sans] text-[16px] lading-[30px] font-normal text-gray-600">Candidates can scan this QR Code to access the interview</p>
                    {data?.qr_code_base64 && (
                        <div className="p-4 bg-#FFFFFF">
                            <Image
                                className="w-[250px] h-[250px] mt-6"
                                src={`data:image/png;base64,${data.qr_code_base64}`}
                                alt="QR Code"
                                width={200}
                                height={200}
                            />
                        </div>


                    )}
                </div>
                <button className="w-[212px] h-[65px] rounded-[14px] bg-[#1E4B8E] mt-11 text-white">Download</button>

            </div>
        </InterviewLayout>
    );
}
