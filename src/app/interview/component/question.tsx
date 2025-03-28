import Image from "next/image";
import { Input } from "@/components/ui/input";

interface QuestionProps {
    questions: string[];
    showImage?: boolean;
}

export default function Question({ questions, showImage = true }: QuestionProps) {
    return (
        <div className="text-left space-y-2 w-full">
            <h2 className="text-lg font-semibold mt-4 mb-6">AI Powered Questions:</h2>
            <ul className="space-y-4 w-full">
                {questions.map((question, index) => (
                    <div key={index} className="flex items-center gap-4 w-full">
                        {showImage && (
                            <Image src="/images/AIAvatar.png" alt="bot" width={40} height={40} />
                        )}
                        <Input
                            value={question}
                            readOnly
                            className="w-full h-[68px] rounded-[14px] border-1 text-black bg-white"
                        />
                    </div>
                ))}
            </ul>
        </div>
    );
}
