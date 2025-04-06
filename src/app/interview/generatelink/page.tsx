"use client";
import InterviewLayout from "@/components/layout/InterviewLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Download, Share2 } from "lucide-react";
import useFetchInterviewLink from "@/hooks/FetchInterviewLink.hook";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import SocialShare from "@/app/interview/component/share";

export default function GenerateLink() {
    const { data } = useFetchInterviewLink();
    const [copied, setCopied] = useState(false);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const interviewLink = data?.interview_link || "";

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

    const toggleShareOptions = () => {
        setShowShareOptions(!showShareOptions);
    };

    return (
        <InterviewLayout
            subtitle="Your AI Interview is Ready!"
            description="Share the Interview link with candidates and start collecting responses"
            subtitleClassName="font-roboto font-bold text-[34px] mt-6 text-center"
            descriptionClassName="font-roboto font-normal text-[18px] mt-4 text-[#6F6C90] text-center"
            currentStep={4}
            useCard={false}
        >
            <div className="mt-8 flex flex-col sm:w-[384px] mx-auto px-4 mb-8">
                <h1 className="font-[roboto] leading-[46px] font-bold text-[24px] text-center">
                    Interview Link
                </h1>
                <p className="font-openSans font-normal text-[16px] leading-[16px] text-center text-[#6F6C90] mt-2">
                    Copy and share the link with candidates
                </p>

                <div className="flex flex-row gap-3 items-center w-full sm:w-[400px] mt-6 relative">
                    {/* Input Field */}
                    <Input
                        value={interviewLink}
                        readOnly
                        className="pr-16 text-[#4A3AFF] w-full h-[65px] underline cursor-default truncate border border-gray-300 rounded-[14px] px-4"
                    />


                    <Button
                        type="button"
                        variant="ghost"
                        className="absolute right-16 top-1/2 transform -translate-y-1/2 p-2 hover:bg-transparent"
                        onClick={handleCopy}
                    >
                        <Copy size={20} className={copied ? "text-blue-500" : "text-gray-600"} />
                    </Button>


                    <div className="ml-2">
                        <Share2
                            onClick={toggleShareOptions} // Toggle share options
                            className="text-gray-600 bg-slate-200 rounded-full h-[36px] w-[34px] p-1"
                        />
                    </div>
                </div>


                {showShareOptions && (
                    <div className="mt-4">
                        <SocialShare url={interviewLink} title="Share Interview Link with Candidate" />

                    </div>
                )}

                {/* Divider */}
                <div className="m-12  mb-2 w-full mb-4">
                    <hr className="w-[80%] border-gray-300" />
                </div>


                <div className="items-center text-center flex flex-col">
                    <h1 className="w-full sm:w-[680px] h-[46px] font-roboto text-[24px] leading-[46px] font-bold">
                        QR Code
                    </h1>
                    <p className="w-full sm:w-[427px] h-[30px] font-openSans text-[16px] leading-[30px] font-normal text-gray-600">
                        Candidates can scan this QR Code to access the interview
                    </p>

                    {/* QR Code Image */}
                    {data?.qr_code_base64 && (
                        <div className="w-[200px] h-[200px] bg-white flex items-center justify-center rounded-md mt-4 shadow-xl mx-auto">
                            <Image
                                className="w-[200px] h-[200px]"
                                src={`data:image/png;base64,${data.qr_code_base64}`}
                                alt="QR Code"
                                width={216}
                                height={222}
                            />
                        </div>
                    )}

                    <div className="flex flex-row items-center justify-center">
                        <button
                            onClick={handleDownloadQR}
                            className="flex items-center justify-center gap-3 font-roboto text-[18px] leading-[20px] font-bold w-[80%] sm:w-[212px] h-[65px] rounded-[14px] bg-[#1E4B8E] mt-11 text-white"
                        >
                            <Download /> Download
                        </button>
                    </div>

                </div>
            </div>
        </InterviewLayout>
    );
}
