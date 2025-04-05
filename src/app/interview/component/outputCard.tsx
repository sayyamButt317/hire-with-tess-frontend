import { useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InputWrapper from "./InputWrapper";
import { Pencil } from "lucide-react";
import { useSkillStore } from "@/store/InputStore";
import useResReqHook from "@/hooks/UpdateResReq.hook";
import useStore from "@/store/home.store";
import { toast } from "sonner";

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
    onGenerateClick,
}: OutputCardProps) {
    const [skills, setSkills] = useState<string[]>(skill);
    const [editedRes, setEditedRes] = useState<string>(res.join("\n"));
    const [editedReq, setEditedReq] = useState<string>(req.join("\n"));
    const { isEditable, setIsEditable } = useSkillStore();
    const ReqResMutation = useResReqHook();
    const { jobDescription, jobTitle, jobType, companyName, salary, location, currency } = useStore();

    const removeSkill = (index: number) => {
        setSkills((prev) => prev.filter((_, i) => i !== index));
    };

    const handleEdit = () => {
        setIsEditable(!isEditable);
    };

    const handleSave = () => {
        const updatedRes = editedRes.split("\n").map((line) => line.trim()).filter((line) => line !== "");
        const updatedReq = editedReq.split("\n").map((line) => line.trim()).filter((line) => line !== "");

        if (
            updatedRes.join("\n") === res.join("\n") &&
            updatedReq.join("\n") === req.join("\n") &&
            JSON.stringify(skills) === JSON.stringify(skill)
        ) {
            toast.info("No changes made.");
            return;
        }
        ReqResMutation.mutate({
            data: {
                job_description: jobDescription,
                job_title: jobTitle,
                job_type: jobType,
                company_name: companyName,
                location: location,
                salary: salary,
                currency: currency,
                skills: skills,
                responsibilities: updatedRes,
                requirements: updatedReq,
            },
        },) 
                setIsEditable(false);  
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
                                <div className="flex flex-row justify-between">
                                    <h3 className="font-normal font-openSans  text-[14px] leading-[24px] text-black">
                                        Responsibilities
                                    </h3>
                                    <Pencil
                                        size={18}
                                        color="#718096"
                                        style={{ cursor: "pointer" }}
                                        onClick={handleEdit}
                                    />
                                </div>

                                {isEditable ? (
                                    <div>
                                        <textarea
                                            value={editedRes}
                                            onChange={(e) => setEditedRes(e.target.value)}
                                            className="w-full p-2 border rounded-md h-40 resize-none"
                                        />
                                    </div>
                                ) : (
                                    <ul className="list-disc pl-5 font-normal font-openSans  text-[14px] leading-[24px] text-black">
                                    {editedRes.split("\n").filter(line => line.trim()).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                                )}
                            </div>
                        )}

                        {req.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-normal font-openSans  text-[14px] leading-[24px] text-black">
                                    Requirements
                                </h3>
                                {isEditable ? (
                                <textarea
                                    value={editedReq}
                                    onChange={(e) => setEditedReq(e.target.value)}
                                    className="w-full p-2 border rounded-md h-40 resize-none"
                                />
                            ) : (
                                <ul className="list-disc pl-5 font-normal font-openSans  text-[14px] leading-[24px] text-black">
                                    {editedReq.split("\n").filter(line => line.trim()).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            )}
                            </div>
                        )}
                        {isEditable && (
                            <Button onClick={handleSave} className="w-60 sm:w-auto flex items-end gap-2">
                                Save Changes
                            </Button>
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


