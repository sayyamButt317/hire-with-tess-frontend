import { useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InputWrapper from "./InputWrapper";

interface OutputCardProps {
    res: string[];
    req: string[];
    skill: string[];
    avatarSrc?: string;
    buttonText?: string;
    showAvatar?: boolean;
    onGenerateClick?: () => void;
}

export default function OutputCard({
                                       res = [],
                                       req = [],
                                       skill = [],
                                       avatarSrc = "/images/AIAvatar.png",
                                       buttonText = "Generate",
                                       showAvatar = true,
                                       onGenerateClick
                                   }: OutputCardProps) {

    const [skills, setSkills] = useState<string[]>(skill);

    const removeSkill = (index: number) => {
        setSkills((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
                {showAvatar && (
                    <Image src={avatarSrc} alt="bot" width={40} height={40} className="shrink-0" />
                )}
                <Card className="p-4 sm:p-6 w-full">
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
            </div>


            {skills.length > 0 && (
                <div className="flex items-start gap-4">
                    {showAvatar && (
                        <Image src={avatarSrc} alt="bot" width={40} height={40} className="shrink-0" />
                    )}
                    <Card className="p-4 sm:p-6 w-full">
                        <InputWrapper items={skills} onRemove={removeSkill} />
                    </Card>
                </div>
            )}

            {onGenerateClick && (
                <Button onClick={onGenerateClick} className="w-full sm:w-auto flex items-center gap-2">
                    {buttonText}
                </Button>
            )}
        </div>
    );
}
