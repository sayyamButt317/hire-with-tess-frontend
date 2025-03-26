
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
      
            <div className="flex flex-col items-center text-center space-y-4">
                <Image src={imageSrc} alt={title} width={200} height={200} />
                <h1 className="text-xl font-semibold">{title}</h1>
                <p className="text-gray-500">{description}</p>
                {children}
            </div>
      
    );
}
