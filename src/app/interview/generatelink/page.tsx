"use client";
import InterviewLayout from "@/components/layout/InterviewLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Copy, Download, Share2} from "lucide-react";
import useFetchInterviewLink from "@/hooks/FetchInterviewLink.hook";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function GenerateLink() {
    const { data } = useFetchInterviewLink();
    const [copied, setCopied] = useState(false);
    const interviewLink = data?.interview_link || "";

    console.log(data);

    const handleCopy = () => {
        if (!interviewLink) return;
        navigator.clipboard.writeText(interviewLink);
        setCopied(true);
        toast("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadQR = () => {
        if (!data?.qr_code_base64) return;

        const link = document.createElement("a");
        link.href = `data:image/png;base64,${data.qr_code_base64}`;
        link.download = "QR_Code.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("QR Code downloaded successfully!");
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
                <h1 className="font-[roboto] leading-[46px] font-bold text-[24px]">Interview Link</h1>
                <p className="font-openSans  font-normal text-[16px] leading-[16px] text-center text-[#6F6C90] mt-2">
                    Copy and share the link with candidates
                </p>
                <div className="flex items-center w-[483px] h-[65px] leading-[14px] mx-auto mt-6 relative">
                <Input
                    value={interviewLink}
                    readOnly
                    className="pr-16 text-[#4A3AFF] w-full h-[65px] underline cursor-default truncate border border-gray-300 rounded-[14px] px-4"
                />
                <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-transparent"
                    onClick={handleCopy}
                >
                    <Copy size={20} className={copied ? "text-blue-500" : "text-gray-600"} />
                </Button>

            </div>


                <div className="m-12 mb-2">
                    <hr />
                </div>
                <div className="items-center text-center flex flex-col">
                    <h1 className="w-[680px] h-[46px] font-roboto text-[24px] leading-[46px] font-bold">QR Code</h1>
                    <p className="w-[427px] h-[30px] font-openSans  text-[16px] leading-[30px] font-normal text-gray-600">
                        Candidates can scan this QR Code to access the interview
                    </p>
                    {data?.qr_code_base64 && (
                        <div className="w-[200px] h-[200px] bg-white shadow-sm flex items-center justify-center rounded-md mt-4">
                            <Image
                                className="w-[200px] h-[200px]"
                                src={`data:image/png;base64,${data.qr_code_base64}`}
                                alt="QR Code"
                                width={216}
                                height={222}
                            />
                        </div>
                    )}
                    <button
                        onClick={handleDownloadQR}
                        className="flex items-center justify-center gap-3 font-roboto text-[18px] leading-[20px] font-bold w-[212px] h-[65px] rounded-[14px] bg-[#1E4B8E] mt-11 text-white"
                    >
                        <Download /> Download
                    </button>
                </div>
            </div>
        </InterviewLayout>
    );
}
