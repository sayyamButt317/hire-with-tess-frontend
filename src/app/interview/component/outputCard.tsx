import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OutputCardProps {
    res: string[];
    req: string[];
    skill: string[];
    avatarSrc?: string;
    editIconSrc?: string;
    buttonIconSrc?: string;
    buttonText?: string;
    onGenerateClick?: () => void;
}

export default function OutputCard({
    res = [],
    req = [],
    skill = [],
    avatarSrc = "/images/AIAvatar.png",
    // editIconSrc = "/images/edit.png",
    // buttonIconSrc = "/images/Vector.png",
    buttonText = "Generate",
    onGenerateClick
}: OutputCardProps) {
    return (
        <div className="space-y-4 mx-6">
            {/* Responsibilities, Requirements, and Skills Section */}
            <Card className="p-6">
                <div className="text-left">
                    {req.length > 0 && (
                        <div className="mb-4">
                            <h3 className="font-semibold text-black">Responsibilities</h3>
                            <ul className="list-disc pl-5 text-sm">
                                {res.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {req.length > 0 && (
                        <div className="mb-4">
                            <h3 className="font-semibold text-black">Requirements</h3>
                            <ul className="list-disc pl-5 text-sm">
                                {req.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Card>

            {/* Skills  */}

            {skill.length > 0 && (
    <div className="flex items-center gap-4">
        {/* Show image only once */}
        <Image src={avatarSrc} alt="bot" width={40} height={40} />

        {/* Render all inputs in a row */}
        <div className="flex gap-4 w-full">
            {skill.map((item, index) => (
                <Input
                    key={index}
                    placeholder={item}
                    className="w-full text-black cursor-not-allowed"
                    disabled
                />
            ))}
        </div>
    </div>
)}




            {onGenerateClick && (
                <Button onClick={onGenerateClick} className="flex items-center gap-2 mt-4">
                    {buttonText}
                </Button>
            )}

        </div>
    );
}
