import Image from "next/image";
import { Input } from "@/components/ui/input";

interface QuestionProps {
    questions: string[];
}

export default function Question({ questions }: QuestionProps) {
    if (questions.length === 0) {
        return <p className="text-gray-500">No questions available.</p>;
    }

    return (
        <div className="text-left space-y-2 w-full">
            <h2 className="text-lg font-semibold mt-4 mb-6">AI Powered Questions:</h2>
            <ul className="space-y-4 w-full">
                {questions.map((question, index) => (
                    <div key={index} className="flex items-center gap-4 w-full">
                        <Image src="/images/AIAvatar.png" alt="bot" width={40} height={40} />
                        <Input
                            placeholder={question}
                            className="w-full"
                            
                        />
                    </div>
                ))}
            </ul>
        </div>
    );
}
