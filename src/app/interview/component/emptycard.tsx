
import Image from "next/image";
import React from "react";

interface NoQuestionProps {
    imageSrc?: string;
    title?: string;
    description?: string;
    children?: React.ReactNode;
}

export default function NoQuestion({
    imageSrc = "/images/Frame.png",
    title = "No Job Description Available",
    description = "Kindly Check on the Generate below to generate Job Description",
    children
}: NoQuestionProps) {
    return (
      
            <div className="flex flex-col items-center ">
                <Image src={imageSrc} alt={title} width={184} height={184}  />
                <h1 className="text-[24px] text-[#170F49]  leading-[46px] font-bold font-[roboto]">{title}</h1>
                <p className="font-[Open Sans] font-normal text-[16px] leading-[30px] text-[#6F6C90]">{description}</p>
                {children}
            </div>
      
    );
}
