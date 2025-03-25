import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OutputCardProps {
    res: string[];
    req: string[];
    skill: string[];
    avatarSrc?: string;
    buttonText?: string;
    onGenerateClick?: () => void;
}

export default function OutputCard({
    res = [],
    req = [],
    skill = [],
    avatarSrc = "/images/AIAvatar.png",
    buttonText = "Generate",
    onGenerateClick
}: OutputCardProps) {
    return (
        <div className="space-y-4 px-4 sm:px-6 md:px-8">
            {/* Responsibilities, Requirements, and Skills Section */}
            <Card className="p-4 sm:p-6">
                <div className="text-left">
                    {res.length > 0 && (
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

            {/* Skills Section */}
            {skill.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Image src={avatarSrc} alt="bot" width={40} height={40} className="shrink-0" />
                    <div className="flex flex-wrap gap-2 w-full">
                        {skill.map((item, index) => (
                            <Input
                                key={index}
                                placeholder={item}
                                className="w-full sm:w-auto text-black cursor-not-allowed"
                                disabled
                            />
                        ))}
                    </div>
                </div>
            )}

            {onGenerateClick && (
                <Button onClick={onGenerateClick} className="w-full sm:w-auto flex items-center gap-2 mt-4">
                    {buttonText}
                </Button>
            )}
        </div>
    );
}
